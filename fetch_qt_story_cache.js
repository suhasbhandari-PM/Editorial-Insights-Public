const fs = require('fs');
const path = require('path');

const PAGE_SIZE = 50;

function parseArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const part = String(argv[i] || '');
    if (!part.startsWith('--')) {
      continue;
    }
    const key = part.slice(2);
    const next = i + 1 < argv.length ? argv[i + 1] : '';
    if (next && !String(next).startsWith('--')) {
      options[key] = next;
      i++;
    } else {
      options[key] = 'true';
    }
  }
  return options;
}

function sixMonthsAgo(fromDate) {
  const d = new Date(fromDate.getTime());
  d.setMonth(d.getMonth() - 6);
  return d;
}

function toIso(value) {
  if (!Number.isFinite(Number(value))) return '';
  return new Date(Number(value)).toISOString();
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'user-agent': 'Mozilla/5.0'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
}

function timeWindows(startDate, endDate, windowDays) {
  const windows = [];
  let cursor = new Date(startDate.getTime());
  cursor.setUTCHours(0, 0, 0, 0);
  const spanMs = Math.max(1, Number(windowDays) || 30) * 24 * 60 * 60 * 1000;

  while (cursor < endDate) {
    const next = new Date(cursor.getTime() + spanMs);
    if (next > endDate) {
      next.setTime(endDate.getTime());
    }
    windows.push({
      startMs: cursor.getTime(),
      endMs: next.getTime() - 1
    });
    cursor = next;
  }

  return windows;
}

function normalizeStory(story) {
  const sections = Array.isArray(story.sections) ? story.sections : [];
  const tags = Array.isArray(story.tags) ? story.tags : [];
  const primarySection = sections.length ? (sections[0]['display-name'] || sections[0].name || sections[0].slug || '') : '';
  return {
    id: story.id || '',
    headline: story.headline || '',
    slug: story.slug || '',
    url: story.url || '',
    author_name: story['author-name'] || '',
    author_id: story['author-id'] || '',
    published_at_ms: story['published-at'] || '',
    published_at_iso: toIso(story['published-at']),
    first_published_at_ms: story['first-published-at'] || '',
    first_published_at_iso: toIso(story['first-published-at']),
    last_published_at_ms: story['last-published-at'] || '',
    last_published_at_iso: toIso(story['last-published-at']),
    story_template: story['story-template'] || '',
    primary_section: primarySection,
    sections_json: JSON.stringify(sections),
    tags_json: JSON.stringify(tags),
    subheadline: story.subheadline || '',
    hero_image_key: story['hero-image-s3-key'] || '',
    metadata_json: JSON.stringify(story.metadata || {})
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const site = String(args.site || 'dh').toLowerCase();
  const siteBaseUrl = site === 'pv'
    ? 'https://www.prajavani.net'
    : 'https://www.deccanherald.com';
  const outputName = String(args.output || `${site}_qt_story_cache_last_6_months.csv`);
  const windowDays = Math.max(1, Number(args['window-days']) || 30);
  const baseUrl = `${siteBaseUrl}/api/v1/advanced-search`;
  const outputCsv = path.join(process.cwd(), outputName);
  const now = new Date();
  const cutoff = sixMonthsAgo(now);
  const cutoffMs = cutoff.getTime();
  const headers = [
    'id',
    'headline',
    'slug',
    'url',
    'author_name',
    'author_id',
    'published_at_ms',
    'published_at_iso',
    'first_published_at_ms',
    'first_published_at_iso',
    'last_published_at_ms',
    'last_published_at_iso',
    'story_template',
    'primary_section',
    'sections_json',
    'tags_json',
    'subheadline',
    'hero_image_key',
    'metadata_json'
  ];

  const seenIds = new Set();
  const rows = [];
  const windows = timeWindows(cutoff, now, windowDays);

  console.log(`Cutoff: ${cutoff.toISOString()}`);
  console.log(`Site: ${siteBaseUrl}`);
  console.log(`Output: ${outputCsv}`);
  console.log(`Using ${windows.length} windows of ${windowDays} day(s) each`);

  for (const window of windows) {
    let offset = 0;
    let pages = 0;
    console.log(`Window ${new Date(window.startMs).toISOString()} -> ${new Date(window.endMs).toISOString()}`);

    while (true) {
      const url =
        `${baseUrl}?content-types=story&sort=latest-published&limit=${PAGE_SIZE}&offset=${offset}` +
        `&published-after=${window.startMs}&published-before=${window.endMs}`;
      const data = await fetchJson(url);
      const stories = Array.isArray(data.items) ? data.items : [];
      if (!stories.length) {
        console.log(`No stories returned at offset ${offset} for window. Stopping window.`);
        break;
      }

      pages += 1;

      for (const story of stories) {
        const publishedMs = Number(story['last-published-at'] || story['published-at'] || 0);
        if (!publishedMs || publishedMs < cutoffMs) {
          continue;
        }
        if (seenIds.has(story.id)) {
          continue;
        }
        seenIds.add(story.id);
        rows.push(normalizeStory(story));
      }

      console.log(`Window page ${pages}: offset=${offset}, returned=${stories.length}, kept=${rows.length}`);

      if (stories.length < PAGE_SIZE) {
        break;
      }

      offset += PAGE_SIZE;
    }
  }

  const output = [headers.join(',')];
  for (const row of rows) {
    output.push(headers.map((key) => csvEscape(row[key])).join(','));
  }
  fs.writeFileSync(outputCsv, output.join('\r\n'), 'utf8');

  console.log(`Wrote ${rows.length} rows to ${outputCsv}`);
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
