# Editorial Insights — Analytics Dashboard

A Google Apps Script analytics dashboard for editorial teams at Deccan Herald and Prajavani. Blends published-date filtered story metadata from the CMS with live GA4 page-view data and Google Search Console signals into a single interface.

> **Note:** This is a sanitised public copy of the production repository, shared for reference and portfolio purposes. Spreadsheet IDs, deployment IDs, and service account credentials have been replaced with placeholders. The production version is maintained separately and is not represented here.

---

## Live Static Demo

A read-only static version of the dashboard is available at `dashboard.html`. It loads a pre-built snapshot of anonymised sample data directly — no Apps Script, no Google account required.

To run it locally:

```bash
python -m http.server 8000
```

Open: `http://localhost:8000/dashboard.html`

It will also work when deployed to GitHub Pages without any server-side setup.

---

## Features

### Story-Level Analytics
Pulls published story metadata from the CMS and matches it against GA4 page view and user data filtered by landing page path. Each story row shows: page views, total users, GSC search clicks, impressions, CTR, Discover clicks, section, author, template, and tags.

### Group Tables
Aggregate views by section, section family, author, tag, and story template — with HHI concentration scores and average-per-story metrics.

### Referrer Breakdown
Per-story and per-group referrer panels showing traffic split across Google Discover, Google Search, Direct, Within Site, Google News, and other sources.

### URL Trend View
Hourly referrer time series per story URL, with snapshot-backed preview before the live GA4 call resolves.

### Search Console Split
Separate tabs for organic Search and Discover with clicks, impressions, CTR, and position per story.

### Scheduled Snapshot Pipeline
Dashboard data is computed on a schedule and stored as a snapshot per property. Loading the dashboard returns the latest snapshot instantly — no blocking GA4 calls on page load.

---

## Setup

### Apps Script

1. Replace placeholder spreadsheet IDs in `code.gs` with your own Google Sheet IDs
2. Replace `YOUR_GA4_PROPERTY_ID` with your GA4 property ID
3. Set up a Google service account with Analytics readonly and Search Console readonly scopes
4. Store the service account JSON in Apps Script properties under `GA4_SERVICE_ACCOUNT_JSON`
5. Deploy as a Web App with `ANYONE_WITH_LINK` access
6. Set up a time-based trigger to call `scheduledRefresh` every hour

### Story Cache

The dashboard uses a Quintype CMS story cache for published-date filtering. `fetch_qt_story_cache.js` is a standalone Node.js script that syncs stories from the Quintype API into a Google Sheet.

See `quintype-qt-website-api.md` for the Quintype API reference used in the sync.

---

## Data Files (Sample)

- `dashboard_sample_snapshot.json` — pre-built dashboard output with anonymised data (used by static demo)
- `dashboard_snapshot_input.json` — raw GA4 + GSC input data for the snapshot period

All numeric values in the sample data have been scaled and the GA4 property ID replaced with a placeholder.
