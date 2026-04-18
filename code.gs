/**
 * Full-screen GA4 + content dashboard backend.
 */

const PRODUCTION_DEPLOYMENT_ID = 'YOUR_DEPLOYMENT_ID';
const STAGING_DEPLOYMENT_ID = 'YOUR_DEPLOYMENT_ID';

const CONTENT_SOURCE_CONFIG = {
  'properties/YOUR_GA4_PROPERTY_ID': {
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    searchConsoleSiteUrl: 'https://www.deccanherald.com/',
    storyCache: {
      spreadsheetId: 'YOUR_STORY_CACHE_SPREADSHEET_ID',
      sheetNames: ['dh_qt_story_cache_last_6_months', 'DH QT Story Cache', 'Sheet1'],
      columns: {
        id: ['id'],
        publishedAt: ['published_at_iso', 'last_published_at_iso', 'published_at_ms', 'last_published_at_ms'],
        lastPublishedAt: ['last_published_at_iso', 'published_at_iso', 'last_published_at_ms', 'published_at_ms'],
        section: ['primary_section', 'section'],
        title: ['headline', 'title'],
        slug: ['slug'],
        url: ['url'],
        author: ['author_name', 'author'],
        template: ['story_template', 'template'],
        tagsJson: ['tags_json'],
        sectionsJson: ['sections_json']
      }
    },
    sheetNames: {
      stories: ['DH'],
      tags: ['DH Tags'],
      sections: ['DH Sections']
    },
    columns: {
      stories: {
        publishedAt: ['published at', 'published_at', 'published date', 'publish date'],
        section: ['section', 'section name'],
        title: ['title', 'story title'],
        slug: ['slug', 'story slug'],
        url: ['url', 'story url'],
        author: ['author', 'owner'],
        template: ['template']
      },
      tags: {
        storySlug: ['story slug', 'slug'],
        tagName: ['tag name', 'tag', 'tags']
      },
      sections: {
        storySlug: ['story slug', 'slug'],
        sectionName: ['section name', 'section'],
        level1: ['section level 1', 'section_level_1', 'level 1'],
        level2: ['section level 2', 'section_level_2', 'level 2'],
        level3: ['section level 3', 'section_level_3', 'level 3']
      }
    }
  },
  'properties/YOUR_GA4_PROPERTY_ID_PV': {
    spreadsheetId: 'YOUR_SPREADSHEET_ID_PV',
    searchConsoleSiteUrl: 'https://www.prajavani.net/',
    storyCache: {
      spreadsheetId: 'YOUR_STORY_CACHE_SPREADSHEET_ID_PV',
      sheetNames: ['Sheet1', 'pv_qt_story_cache_last_6_months', 'PV QT Story Cache'],
      columns: {
        id: ['id'],
        publishedAt: ['published_at_iso', 'last_published_at_iso', 'published_at_ms', 'last_published_at_ms'],
        lastPublishedAt: ['last_published_at_iso', 'published_at_iso', 'last_published_at_ms', 'published_at_ms'],
        section: ['primary_section', 'section'],
        title: ['headline', 'title'],
        slug: ['slug'],
        url: ['url'],
        author: ['author_name', 'author'],
        template: ['story_template', 'template'],
        tagsJson: ['tags_json'],
        sectionsJson: ['sections_json']
      }
    },
    sheetNames: {
      stories: ['PV', 'DH', 'Stories'],
      tags: ['PV Tags', 'DH Tags', 'Tags'],
      sections: ['PV Sections', 'PV Section', 'DH Sections', 'Sections']
    },
    columns: {
      stories: {
        publishedAt: ['published at', 'published_at', 'published date', 'publish date'],
        section: ['section', 'section name', 'primary section'],
        title: ['title', 'story title'],
        slug: ['slug', 'story slug'],
        url: ['url', 'story url'],
        author: ['author', 'owner', 'writer', 'byline'],
        template: ['template', 'story template']
      },
      tags: {
        storySlug: ['story slug', 'slug'],
        tagName: ['tag name', 'tag', 'tags']
      },
      sections: {
        storySlug: ['story slug', 'slug'],
        sectionName: ['section name', 'section'],
        level1: ['section level 1', 'section_level_1', 'level 1'],
        level2: ['section level 2', 'section_level_2', 'level 2'],
        level3: ['section level 3', 'section_level_3', 'level 3']
      }
    }
  }
};

const PROPERTY_OPTIONS = [
  { value: 'properties/YOUR_GA4_PROPERTY_ID_PV', label: 'PV' },
  { value: 'properties/YOUR_GA4_PROPERTY_ID', label: 'DH' }
];

// Optional: set this to force where logs/snapshots are stored.
const SOURCE_SPREADSHEET_ID = '';
const DEFAULT_PROPERTY = 'properties/YOUR_GA4_PROPERTY_ID';
const GA4_METRICS = ['screenPageViews', 'totalUsers'];
const GA4_PATH_DIMENSION = 'landingPage';
const GA4_SERVICE_ACCOUNT_JSON_PROPERTY = 'GA4_SERVICE_ACCOUNT_JSON';
const GOOGLE_API_SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/webmasters.readonly'
];
const GA4_SERVICE_ACCOUNT_TOKEN_CACHE_KEY = 'ga4_service_account_access_token';
const SEARCH_CONSOLE_PAGE_SIZE = 25000;
const SEARCH_CONSOLE_MAX_PAGES = 4;
const SEARCH_CONSOLE_FALLBACK_MAX_STORIES = 1000;
const GA4_PAGE_SIZE = 20000;
const GA4_MAX_PAGES = 5;
const GA4_MAX_RUNTIME_MS = 240000;
const GA4_FILTER_BATCH_SIZE = 200;
const GA4_MAX_FILTERED_BATCHES = 120;
const GA4_REFERRER_MAX_SLUGS = 2000;
const URL_TREND_TOP_REFERRERS = 10;
const URL_TREND_WINDOW_HOURS = 120;
const TOP_LIMIT = 20;
const STORY_CACHE_RETENTION_MONTHS = 6;
const STORY_CACHE_PAGE_SIZE = 50;
const STORY_CACHE_INITIAL_LOOKBACK_HOURS = 72;
const STORY_CACHE_SYNC_OVERLAP_HOURS = 6;
const STORY_CACHE_MAX_PAGES_PER_SYNC = 200;
const SECTION_TREE_SHEET = 'Section Tree';
const SECTION_TREE_HEADERS = [
  'section_id',
  'slug',
  'name',
  'display_name',
  'parent_id',
  'root_id',
  'root_name',
  'level_1',
  'level_2',
  'level_3',
  'depth',
  'path_json',
  'synced_at_iso'
];
const STORY_CACHE_HEADERS = [
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
  'metadata_json',
  'synced_at_iso'
];
const AUTO_REFRESH_TIMEZONE = 'Asia/Kolkata';
const AUTO_REFRESH_START_HOUR = 6;
const AUTO_REFRESH_END_HOUR = 22;
const AUTO_REFRESH_TARGET_MINUTE = 0;
const AUTO_REFRESH_DAYS_BACK = 30;
const AUTO_REFRESH_LOG_SHEET = 'Dashboard Refresh Log';
const HOURLY_SNAPSHOTS_SHEET = 'Hourly Snapshots';
const HOURLY_SNAPSHOT_RETENTION_DAYS = 7;
const HOURLY_SNAPSHOT_HEADERS = [
  'property_id',
  'snapshot_hour',
  'slug',
  'story_id',
  'title',
  'section',
  'author',
  'published_at',
  'cumulative_views',
  'cumulative_users'
];
const AUTO_REFRESH_LOG_HEADERS = [
  'timestamp',
  'status',
  'message',
  'property_id',
  'start_date',
  'end_date',
  'ga4_api_calls',
  'ga4_rows_path',
  'ga4_rows_referrer',
  'story_count'
];
const DASHBOARD_SNAPSHOT_SHEET = 'Dashboard Snapshot';
const DASHBOARD_SNAPSHOT_HEADERS = [
  'property_id',
  'generated_at',
  'start_date',
  'end_date',
  'chunk_count',
  'updated_by'
];
const DASHBOARD_SNAPSHOT_CHUNK_COL_START = 7;
const DASHBOARD_SNAPSHOT_CHUNK_SIZE = 45000;
const SNAPSHOT_EXPORT_LOG_SHEET = 'Snapshot JSON Exports';
const SNAPSHOT_EXPORT_LOG_HEADERS = [
  'timestamp',
  'property_id',
  'start_date',
  'end_date',
  'payload_length',
  'file_name',
  'file_url',
  'created_by'
];
const USAGE_LOG_SHEET = 'GA4 Usage Log';
const USAGE_LOG_HEADERS = [
  'timestamp',
  'user_email',
  'source',
  'property_id',
  'api_calls',
  'rows_processed',
  'hour_remaining',
  'hour_consumed',
  'day_remaining',
  'day_consumed',
  'concurrent_remaining',
  'concurrent_consumed',
  'url_path'
];
const USAGE_LOG_MAX_READ_ROWS = 2000;
const USAGE_SERIES_POINTS = 30;

function doGet(e) {
  const template = HtmlService.createTemplateFromFile('AdvancedReportGUI');
  const appEnvironment = getAppEnvironment_();
  const isTesting = appEnvironment === 'staging' || appEnvironment === 'dev';
  const requestedProperty = cleanString_(e && e.parameter ? e.parameter.property : '');
  template.appEnvironment = appEnvironment;
  template.pageTitle = isTesting ? 'GA4 Content Dashboard - Testing' : 'GA4 Content Dashboard';
  template.headerTitle = isTesting ? 'Editorial Insights Testing' : 'Editorial Insights';
  template.requestedProperty = requestedProperty;
  return template.evaluate()
    .setTitle(template.pageTitle)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getAppEnvironment_() {
  const serviceUrl = cleanString_(ScriptApp.getService().getUrl());
  if (serviceUrl.indexOf(STAGING_DEPLOYMENT_ID) !== -1) {
    return 'staging';
  }
  if (serviceUrl.indexOf(PRODUCTION_DEPLOYMENT_ID) !== -1) {
    return 'production';
  }
  if (/\/dev(?:[/?#]|$)/i.test(serviceUrl)) {
    return 'dev';
  }
  return 'unknown';
}

function onOpen() {
  addEditorialInsightsMenu_();
}

function addEditorialInsightsMenu_() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Editorial Insights')
    .addItem('Export DH Snapshot JSON', 'exportDhSnapshotJson_')
    .addItem('Export PV Snapshot JSON', 'exportPvSnapshotJson_')
    .addToUi();
}

function installEditorialInsightsMenuTriggers_() {
  clearInstallableTriggerByHandler_('addEditorialInsightsMenu_');
  const seen = {};
  let created = 0;
  const propertyIds = Object.keys(CONTENT_SOURCE_CONFIG);
  for (let i = 0; i < propertyIds.length; i++) {
    const spreadsheetId = cleanString_(CONTENT_SOURCE_CONFIG[propertyIds[i]] && CONTENT_SOURCE_CONFIG[propertyIds[i]].spreadsheetId);
    if (!spreadsheetId || seen[spreadsheetId]) {
      continue;
    }
    seen[spreadsheetId] = true;
    ScriptApp.newTrigger('addEditorialInsightsMenu_')
      .forSpreadsheet(spreadsheetId)
      .onOpen()
      .create();
    created++;
  }
  return 'Created ' + created + ' installable onOpen trigger(s) for Editorial Insights menu.';
}

function exportDhSnapshotJson_() {
  exportLatestDashboardSnapshotJson_('properties/YOUR_GA4_PROPERTY_ID');
}

function exportPvSnapshotJson_() {
  exportLatestDashboardSnapshotJson_('properties/YOUR_GA4_PROPERTY_ID_PV');
}

function repairDhStoryCacheIsoColumns() {
  return repairStoryCacheIsoColumns_('properties/YOUR_GA4_PROPERTY_ID');
}

function repairPvStoryCacheIsoColumns() {
  return repairStoryCacheIsoColumns_('properties/YOUR_GA4_PROPERTY_ID_PV');
}

function exportLatestDashboardSnapshotJson_(propertyId) {
  const snapshot = getDashboardSnapshotPayload_(propertyId);
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  const spreadsheet = getDashboardStorageSpreadsheet_(property);
  const propertyLabel = safePropertyId_(property).replace('properties/', '') || 'property';
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  const fileName = [
    'dashboard_snapshot',
    propertyLabel,
    cleanString_(snapshot.startDate) || 'start',
    'to',
    cleanString_(snapshot.endDate) || 'end',
    stamp + '.json'
  ].join('_');
  const file = createSnapshotExportFile_(spreadsheet, fileName, snapshot.payload);
  const logSheet = getOrCreateSnapshotExportLogSheet_(property);
  const createdBy = cleanString_(Session.getActiveUser().getEmail()) || 'unknown';

  logSheet.appendRow([
    new Date(),
    property,
    cleanString_(snapshot.startDate),
    cleanString_(snapshot.endDate),
    snapshot.payload.length,
    file.getName(),
    file.getUrl(),
    createdBy
  ]);

  spreadsheet.setActiveSheet(logSheet);
  logSheet.getRange(logSheet.getLastRow(), 7).activate();
  spreadsheet.toast('Snapshot JSON exported. Open the URL in "Snapshot JSON Exports".', 'Editorial Insights', 8);
}

function getDashboardMetadata() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
  return {
    properties: PROPERTY_OPTIONS,
    defaultProperty: DEFAULT_PROPERTY,
    defaultStartDate: formatDateForInput_(start),
    defaultEndDate: formatDateForInput_(today)
  };
}

/**
 * Run once from the Apps Script editor to force OAuth consent for cross-spreadsheet reads.
 */
function authorizeContentSources_() {
  const properties = Object.keys(CONTENT_SOURCE_CONFIG);
  const checked = [];
  for (let i = 0; i < properties.length; i++) {
    const propertyId = properties[i];
    const spreadsheet = getContentSpreadsheet_(propertyId);
    checked.push({
      propertyId: propertyId,
      spreadsheetId: spreadsheet.getId(),
      spreadsheetName: spreadsheet.getName()
    });
  }
  return {
    ok: true,
    checked: checked
  };
}

function getUniversalUsage(params) {
  const propertyId = sanitizePropertyId_(params && params.propertyId ? params.propertyId : DEFAULT_PROPERTY);
  return readUniversalUsageSummary_(propertyId);
}

function getLatestDashboardSnapshot(params) {
  const propertyId = sanitizePropertyId_(params && params.propertyId ? params.propertyId : DEFAULT_PROPERTY);
  return readDashboardSnapshot_(propertyId);
}

function debugStorySource(params) {
  const propertyId = sanitizePropertyId_(params && params.propertyId ? params.propertyId : DEFAULT_PROPERTY);
  const startDate = parseDateInput_(params && params.startDate);
  const endDate = parseDateInput_(params && params.endDate);
  const sampleLimit = Math.max(1, Math.min(20, toNumber_(params && params.limit) || 8));
  const usingStoryCache = shouldUseStoryCache_(propertyId);
  const spreadsheet = usingStoryCache ? getStoryCacheSpreadsheet_(propertyId) : getContentSpreadsheet_(propertyId);
  const sheet = usingStoryCache ? getStoryCacheSheet_(propertyId, true) : getSourceSheet_(propertyId, 'stories', true);
  const source = getContentSourceConfig_(propertyId);
  const columns = getSheetColumnsByAliases_(
    sheet,
    usingStoryCache ? source.storyCache.columns : source.columns.stories,
    true
  );
  const lastCol = sheet.getLastColumn();
  const headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];
  const rowCount = columns.publishedAt.length;
  const samples = [];
  let inRangeCount = 0;
  let parsedCount = 0;
  let slugCount = 0;
  const dayStart = startDate
    ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0).getTime()
    : null;
  const dayEnd = endDate
    ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999).getTime()
    : null;

  for (let i = 0; i < rowCount; i++) {
    const rawPublishedAt = columns.publishedAt[i];
    const parsedPublishedAt = parseSheetDate_(rawPublishedAt);
    const slug = normalizePath_(columns.slug[i] || columns.url[i]);
    if (slug) {
      slugCount++;
    }
    if (parsedPublishedAt) {
      parsedCount++;
      const publishedMs = parsedPublishedAt.getTime();
      if ((dayStart === null || publishedMs >= dayStart) && (dayEnd === null || publishedMs <= dayEnd)) {
        inRangeCount++;
      }
    }
    if (samples.length < sampleLimit) {
      samples.push({
        row: i + 2,
        rawPublishedAt: rawPublishedAt,
        parsedPublishedAt: parsedPublishedAt ? parsedPublishedAt.toISOString() : '',
        rawSlug: columns.slug[i],
        rawUrl: columns.url[i],
        normalizedSlug: slug
      });
    }
  }

  return {
    propertyId: propertyId,
    appEnvironment: getAppEnvironment_(),
    usingStoryCache: usingStoryCache,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetName: spreadsheet.getName(),
    sheetName: sheet.getName(),
    headers: headers,
    rowCount: rowCount,
    parsedPublishedAtCount: parsedCount,
    normalizedSlugCount: slugCount,
    inRangeCount: inRangeCount,
    requestedStartDate: startDate ? formatDateForInput_(startDate) : '',
    requestedEndDate: endDate ? formatDateForInput_(endDate) : '',
    samples: samples
  };
}

function setupDashboardAutoRefreshTrigger() {
  deleteDashboardAutoRefreshTrigger();
  ScriptApp.newTrigger('runScheduledDashboardRefresh')
    .timeBased()
    .everyMinutes(1)
    .create();
  return {
    ok: true,
    message: 'Minute trigger created. Refresh runs at minute 00 each hour within IST window.'
  };
}

function deleteDashboardAutoRefreshTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'runScheduledDashboardRefresh') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  return { ok: true, message: 'Deleted runScheduledDashboardRefresh triggers.' };
}

function clearInstallableTriggerByHandler_(handlerName) {
  const target = cleanString_(handlerName);
  if (!target) {
    return;
  }
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === target) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

function runScheduledDashboardRefresh() {
  const now = new Date();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    appendAutoRefreshLog_({
      status: 'skipped',
      message: 'Another scheduled refresh is already running',
      propertyId: 'all',
      startDate: '',
      endDate: '',
      ga4ApiCalls: 0,
      ga4RowsByPath: 0,
      ga4RowsByReferrer: 0,
      storyCount: 0
    });
    return {
      ok: true,
      skipped: true,
      message: 'Skipped: another scheduled refresh is already running.'
    };
  }

  try {
    const endDateIso = Utilities.formatDate(now, AUTO_REFRESH_TIMEZONE, 'yyyy-MM-dd');
    const endDate = parseDateInput_(endDateIso);
    const startDate = new Date(endDate.getTime());
    startDate.setDate(startDate.getDate() - AUTO_REFRESH_DAYS_BACK);
    const startDateIso = Utilities.formatDate(startDate, AUTO_REFRESH_TIMEZONE, 'yyyy-MM-dd');

    const propertyIds = PROPERTY_OPTIONS.map(function (item) {
      return sanitizePropertyId_(item.value);
    });
    const results = [];
    const errors = [];

    for (let i = 0; i < propertyIds.length; i++) {
      const payload = {
        propertyId: propertyIds[i],
        startDate: startDateIso,
        endDate: endDateIso
      };

      try {
        const syncStats = syncStoryCacheForProperty_(payload.propertyId, now);
        const data = getDashboardData(payload);
        const snapshotStats = writeRollingHourlySnapshots_(payload.propertyId, data.allStories, now);
        appendAutoRefreshLog_({
          status: 'success',
          message:
            'Scheduled dashboard refresh complete. ' +
            describeStoryCacheSyncStats_(syncStats) + ' ' +
            'Hourly snapshots wrote ' + snapshotStats.writtenRows + ' rows; pruned ' + snapshotStats.prunedRows + '.',
          propertyId: payload.propertyId,
          startDate: payload.startDate,
          endDate: payload.endDate,
          ga4ApiCalls: data.meta && data.meta.ga4ApiCalls ? data.meta.ga4ApiCalls : 0,
          ga4RowsByPath: data.meta && data.meta.ga4RowsByPath ? data.meta.ga4RowsByPath : 0,
          ga4RowsByReferrer: data.meta && data.meta.ga4RowsByReferrer ? data.meta.ga4RowsByReferrer : 0,
          storyCount: data.meta && data.meta.storyCount ? data.meta.storyCount : 0
        });
        results.push({
          propertyId: payload.propertyId,
          ok: true,
          meta: data.meta || {},
          storyCacheSync: syncStats,
          hourlySnapshots: snapshotStats
        });
      } catch (propertyError) {
        const msg = String(propertyError && propertyError.message ? propertyError.message : propertyError);
        appendAutoRefreshLog_({
          status: 'error',
          message: msg,
          propertyId: payload.propertyId,
          startDate: payload.startDate,
          endDate: payload.endDate,
          ga4ApiCalls: 0,
          ga4RowsByPath: 0,
          ga4RowsByReferrer: 0,
          storyCount: 0
        });
        errors.push({
          propertyId: payload.propertyId,
          message: msg
        });
      }
    }

    if (errors.length) {
      return {
        ok: false,
        skipped: false,
        message: 'Scheduled refresh finished with errors for some properties.',
        results: results,
        errors: errors
      };
    }

    return {
      ok: true,
      skipped: false,
      message: 'Scheduled dashboard refresh complete for all properties.',
      results: results
    };
  } catch (error) {
    appendAutoRefreshLog_({
      status: 'error',
      message: String(error && error.message ? error.message : error),
      propertyId: 'all',
      startDate: '',
      endDate: '',
      ga4ApiCalls: 0,
      ga4RowsByPath: 0,
      ga4RowsByReferrer: 0,
      storyCount: 0
    });
    throw error;
  } finally {
    lock.releaseLock();
  }
}

function getDashboardData(params) {
  const startDate = parseDateInput_(params && params.startDate);
  const endDate = parseDateInput_(params && params.endDate);
  if (!startDate || !endDate) {
    throw new Error('Start date and end date are required.');
  }
  if (startDate.getTime() > endDate.getTime()) {
    throw new Error('Start date cannot be after end date.');
  }

  const propertyId = sanitizePropertyId_(params && params.propertyId ? params.propertyId : DEFAULT_PROPERTY);
  const startIso = formatDateForInput_(startDate);
  const endIso = formatDateForInput_(endDate);
  const propertyTotalsReport = getPropertyTotalsForDateRange_(propertyId, startIso, endIso);

  const stories = readStoriesInPublishedRange_(propertyId, startDate, endDate);
  if (!stories.length) {
    const emptyPropertyQuota = createPropertyQuotaSnapshot_();
    mergePropertyQuota_(emptyPropertyQuota, propertyTotalsReport.propertyQuota);
    const emptyResponse = {
      meta: {
        startDate: startIso,
        endDate: endIso,
        propertyId: propertyId,
        storyCount: 0,
        ga4RowsByPath: 0,
        ga4RowsByReferrer: 0,
        ga4ApiCalls: propertyTotalsReport.apiCalls,
        gscRowsByPage: 0,
        gscApiCalls: 0,
        truncatedGa4Rows: false,
        truncatedGscRows: false,
        gscError: '',
        propertyQuota: emptyPropertyQuota,
        generatedAt: new Date().toISOString()
      },
      kpis: { totalUsers: 0, pageViews: 0, matchedStories: 0 },
      propertyTotals: {
        totalUsers: propertyTotalsReport.totalUsers,
        pageViews: propertyTotalsReport.pageViews,
        startDate: startIso,
        endDate: endIso
      },
      topSections: [],
      topSectionFamilies: [],
      topAuthors: [],
      topTags: [],
      topTemplates: [],
      topReferrers: [],
      withinSiteLandingPages: [],
      withinSiteStorySources: [],
      withinSiteSourceDestinations: {},
      topStories: [],
      allStories: [],
      topAverageUsers: {
        section: [],
        sectionFamily: [],
        author: [],
        tag: [],
        template: []
      },
      testingAnalysis: {
        meta: {
          available: false,
          storyCount: 0,
          storyWithHourlyDeltasCount: 0,
          snapshotRowCount: 0,
          retentionDays: HOURLY_SNAPSHOT_RETENTION_DAYS,
          windowStart: '',
          windowEnd: ''
        },
        bestPublishWindows: [],
        lifecycleStories: []
      },
      universalUsage: recordAndReadUniversalUsage_({
        source: 'dashboard',
        propertyId: propertyId,
        apiCalls: propertyTotalsReport.apiCalls,
        rowsProcessed: propertyTotalsReport.rowsProcessed,
        propertyQuota: emptyPropertyQuota,
        urlPath: ''
      })
    };
    writeDashboardSnapshot_(emptyResponse);
    return emptyResponse;
  }

  const slugSet = {};
  for (let i = 0; i < stories.length; i++) {
    slugSet[stories[i].slug] = true;
  }

  const tagsBySlug = readTagsBySlug_(propertyId, slugSet);
  const sectionsBySlug = readSectionsBySlug_(propertyId, slugSet);
  const searchConsoleReport = getSearchConsolePageMetricsByPath_(propertyId, startIso, endIso, 'web');
  const searchConsoleByPath = searchConsoleReport.metricsByPath;
  const discoverConsoleReport = getSearchConsolePageMetricsByPath_(propertyId, startIso, endIso, 'discover');
  const discoverConsoleByPath = discoverConsoleReport.metricsByPath;
  const storyUrlByPath = {};
  const storyMetaByPath = {};
  for (let i = 0; i < stories.length; i++) {
    if (stories[i].slug && stories[i].url) {
      storyUrlByPath[stories[i].slug] = stories[i].url;
    }
    const sectionMeta = sectionsBySlug[stories[i].slug];
    storyMetaByPath[stories[i].slug] = {
      title: stories[i].title || '(Untitled)',
      slug: stories[i].slug,
      url: stories[i].url || '',
      section: getMostGranularSection_(sectionMeta, stories[i].section),
      author: cleanString_(stories[i].author) || '(No Author)'
    };
  }

  const metricsByPath = {};
  const slugList = Object.keys(slugSet);
  const useFilteredGa4 = slugList.length > 0 && slugList.length <= GA4_FILTER_BATCH_SIZE * GA4_MAX_FILTERED_BATCHES;
  const pathReport = createGa4ReportStats_();

  if (useFilteredGa4) {
    for (let i = 0; i < slugList.length; i += GA4_FILTER_BATCH_SIZE) {
      const batch = slugList.slice(i, i + GA4_FILTER_BATCH_SIZE);
      const batchReport = iterateGa4Rows_({
        propertyId: propertyId,
        startDate: startIso,
        endDate: endIso,
        dimensions: [GA4_PATH_DIMENSION],
        metrics: GA4_METRICS,
        dimensionFilter: buildPathInListFilter_(batch)
      }, function (row) {
        const path = normalizePath_(getDimensionValue_(row, 0));
        if (!path) {
          return;
        }
        if (!metricsByPath[path]) {
          metricsByPath[path] = { pageViews: 0, totalUsers: 0 };
        }
        metricsByPath[path].pageViews += toNumber_(getMetricValue_(row, 0));
        metricsByPath[path].totalUsers += toNumber_(getMetricValue_(row, 1));
      });
      mergeGa4ReportStats_(pathReport, batchReport);
    }
  } else {
    const batchReport = iterateGa4Rows_({
      propertyId: propertyId,
      startDate: startIso,
      endDate: endIso,
      dimensions: [GA4_PATH_DIMENSION],
      metrics: GA4_METRICS
    }, function (row) {
      const path = normalizePath_(getDimensionValue_(row, 0));
      if (!path) {
        return;
      }
      if (!metricsByPath[path]) {
        metricsByPath[path] = { pageViews: 0, totalUsers: 0 };
      }
      metricsByPath[path].pageViews += toNumber_(getMetricValue_(row, 0));
      metricsByPath[path].totalUsers += toNumber_(getMetricValue_(row, 1));
    });
    mergeGa4ReportStats_(pathReport, batchReport);
  }

  if (searchConsoleReport.truncated) {
    const searchConsoleFallbackReport = fillMissingSearchConsoleMetricsByPath_(
      propertyId,
      startIso,
      endIso,
      slugList,
      metricsByPath,
      searchConsoleByPath,
      storyUrlByPath,
      'web'
    );
    searchConsoleReport.apiCalls += searchConsoleFallbackReport.apiCalls;
    searchConsoleReport.rowsProcessed += searchConsoleFallbackReport.rowsProcessed;
    if (!searchConsoleReport.error && searchConsoleFallbackReport.error) {
      searchConsoleReport.error = searchConsoleFallbackReport.error;
    }
  }
  if (discoverConsoleReport.truncated) {
    const discoverConsoleFallbackReport = fillMissingSearchConsoleMetricsByPath_(
      propertyId,
      startIso,
      endIso,
      slugList,
      metricsByPath,
      discoverConsoleByPath,
      storyUrlByPath,
      'discover'
    );
    discoverConsoleReport.apiCalls += discoverConsoleFallbackReport.apiCalls;
    discoverConsoleReport.rowsProcessed += discoverConsoleFallbackReport.rowsProcessed;
    if (!discoverConsoleReport.error && discoverConsoleFallbackReport.error) {
      discoverConsoleReport.error = discoverConsoleFallbackReport.error;
    }
  }

  const referrerAggregates = {};
  const referrerByPath = {};
  const withinSiteLandingPageAgg = {};
  const withinSiteStorySourceAgg = {};
  const withinSiteSourceDestinationAgg = {};
  const referrerReport = createGa4ReportStats_();
  const referrerSlugList = useFilteredGa4 ? getReferrerSlugSubset_(slugList, metricsByPath) : slugList;
  const referrerFilterLimited = useFilteredGa4 && referrerSlugList.length < slugList.length;
  if (useFilteredGa4) {
    for (let i = 0; i < referrerSlugList.length; i += GA4_FILTER_BATCH_SIZE) {
      const batch = referrerSlugList.slice(i, i + GA4_FILTER_BATCH_SIZE);
      const batchReport = iterateGa4Rows_({
        propertyId: propertyId,
        startDate: startIso,
        endDate: endIso,
        dimensions: [GA4_PATH_DIMENSION, 'pageReferrer', 'sessionSourceMedium'],
        metrics: GA4_METRICS,
        dimensionFilter: buildPathInListFilter_(batch)
      }, function (row) {
        const path = normalizePath_(getDimensionValue_(row, 0));
        if (!path || !slugSet[path]) {
          return;
        }
        const referrer = normalizeReferrerBucket_(
          getDimensionValue_(row, 1),
          getDimensionValue_(row, 2),
          propertyId
        );
        if (!referrerAggregates[referrer]) {
          referrerAggregates[referrer] = {
            name: referrer,
            pageViews: 0,
            totalUsers: 0,
            storyCount: 0
          };
        }
        const rowViews = toNumber_(getMetricValue_(row, 0));
        const rowUsers = toNumber_(getMetricValue_(row, 1));
        referrerAggregates[referrer].pageViews += rowViews;
        referrerAggregates[referrer].totalUsers += rowUsers;

        if (!referrerByPath[path]) {
          referrerByPath[path] = {};
        }
        if (!referrerByPath[path][referrer]) {
          referrerByPath[path][referrer] = { pageViews: 0, totalUsers: 0 };
        }
        referrerByPath[path][referrer].pageViews += rowViews;
        referrerByPath[path][referrer].totalUsers += rowUsers;
        if (referrer === 'Within Site') {
          addWithinSiteSourceAggregate_(
            withinSiteLandingPageAgg,
            withinSiteStorySourceAgg,
            withinSiteSourceDestinationAgg,
            getDimensionValue_(row, 1),
            propertyId,
            slugSet,
            storyMetaByPath,
            path,
            rowUsers,
            rowViews
          );
        }
      });
      mergeGa4ReportStats_(referrerReport, batchReport);
    }
  } else {
    const batchReport = iterateGa4Rows_({
      propertyId: propertyId,
      startDate: startIso,
      endDate: endIso,
      dimensions: [GA4_PATH_DIMENSION, 'pageReferrer', 'sessionSourceMedium'],
      metrics: GA4_METRICS
    }, function (row) {
      const path = normalizePath_(getDimensionValue_(row, 0));
      if (!path || !slugSet[path]) {
        return;
      }
      const referrer = normalizeReferrerBucket_(
        getDimensionValue_(row, 1),
        getDimensionValue_(row, 2),
        propertyId
      );
      if (!referrerAggregates[referrer]) {
        referrerAggregates[referrer] = {
          name: referrer,
          pageViews: 0,
          totalUsers: 0,
          storyCount: 0
        };
      }
      const rowViews = toNumber_(getMetricValue_(row, 0));
      const rowUsers = toNumber_(getMetricValue_(row, 1));
      referrerAggregates[referrer].pageViews += rowViews;
      referrerAggregates[referrer].totalUsers += rowUsers;

      if (!referrerByPath[path]) {
        referrerByPath[path] = {};
      }
      if (!referrerByPath[path][referrer]) {
        referrerByPath[path][referrer] = { pageViews: 0, totalUsers: 0 };
      }
      referrerByPath[path][referrer].pageViews += rowViews;
      referrerByPath[path][referrer].totalUsers += rowUsers;
      if (referrer === 'Within Site') {
        addWithinSiteSourceAggregate_(
          withinSiteLandingPageAgg,
          withinSiteStorySourceAgg,
          withinSiteSourceDestinationAgg,
          getDimensionValue_(row, 1),
          propertyId,
          slugSet,
          storyMetaByPath,
          path,
          rowUsers,
          rowViews
        );
      }
    });
    mergeGa4ReportStats_(referrerReport, batchReport);
  }

  const sectionAgg = {};
  const sectionFamilyAgg = {};
  const authorAgg = {};
  const tagAgg = {};
  const templateAgg = {};
  const storyRows = [];

  let totalUsers = 0;
  let totalPageViews = 0;
  let matchedStories = 0;

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    const metrics = metricsByPath[story.slug] || { totalUsers: 0, pageViews: 0 };
    const hasGa4 = metrics.totalUsers > 0 || metrics.pageViews > 0;
    if (hasGa4) {
      matchedStories++;
    }
    totalUsers += metrics.totalUsers;
    totalPageViews += metrics.pageViews;

    const sectionMeta = sectionsBySlug[story.slug];
    const section = getMostGranularSection_(sectionMeta, story.section);
    const sectionKeys = getSectionKeysForAggregation_(sectionMeta, story.section);
    const sectionFamilyKeys = getSectionFamilyKeysForAggregation_(sectionMeta, story.section);
    const author = cleanString_(story.author) || '(No Author)';
    const template = cleanString_(story.template) || '(No Template)';
    const gscMetrics = searchConsoleByPath[story.slug] || createEmptySearchConsoleMetric_();
    const discoverMetrics = discoverConsoleByPath[story.slug] || createEmptySearchConsoleMetric_();
    const withinSiteMetrics = referrerByPath[story.slug] && referrerByPath[story.slug]['Within Site']
      ? referrerByPath[story.slug]['Within Site']
      : { pageViews: 0, totalUsers: 0 };

    for (let j = 0; j < sectionKeys.length; j++) {
      addAggregate_(sectionAgg, sectionKeys[j], metrics, gscMetrics, discoverMetrics);
    }
    for (let j = 0; j < sectionFamilyKeys.length; j++) {
      addAggregate_(sectionFamilyAgg, sectionFamilyKeys[j], metrics, gscMetrics, discoverMetrics);
    }
    addAggregate_(authorAgg, author, metrics, gscMetrics, discoverMetrics);
    addAggregate_(templateAgg, template, metrics, gscMetrics, discoverMetrics);

    const storyTags = tagsBySlug[story.slug] || [];
    if (storyTags.length) {
      for (let k = 0; k < storyTags.length; k++) {
        addAggregate_(tagAgg, storyTags[k], metrics, gscMetrics, discoverMetrics);
      }
    }

    storyRows.push({
      storyId: cleanString_(story.id),
      title: story.title || '(Untitled)',
      slug: story.slug,
      url: story.url || '',
      section: section,
      primarySection: section,
      parentSection: sectionFamilyKeys.length ? sectionFamilyKeys[0] : section,
      childSections: sectionKeys.filter(function (item) { return cleanString_(item) && cleanString_(item) !== cleanString_(section); }),
      allSections: sectionKeys.slice(),
      sectionFamily: sectionFamilyKeys.length ? sectionFamilyKeys[0] : section,
      sectionFamilies: sectionFamilyKeys.slice(),
      author: author,
      template: template,
      tags: storyTags.slice(),
      referrerMetrics: referrerByPath[story.slug] || {},
      searchConsole: gscMetrics,
      searchConsoleDiscover: discoverMetrics,
      gscClicks: gscMetrics.clicks,
      gscImpressions: gscMetrics.impressions,
      gscCtr: gscMetrics.ctr,
      gscPosition: gscMetrics.position,
      gscDiscoverClicks: discoverMetrics.clicks,
      gscDiscoverImpressions: discoverMetrics.impressions,
      gscDiscoverCtr: discoverMetrics.ctr,
      withinSiteUsers: withinSiteMetrics.totalUsers,
      withinSiteViews: withinSiteMetrics.pageViews,
      publishedAt: story.publishedAtIso,
      totalUsers: metrics.totalUsers,
      pageViews: metrics.pageViews
    });
  }

  const propertyQuota = createPropertyQuotaSnapshot_();
  mergePropertyQuota_(propertyQuota, propertyTotalsReport.propertyQuota);
  mergePropertyQuota_(propertyQuota, pathReport.propertyQuota);
  mergePropertyQuota_(propertyQuota, referrerReport.propertyQuota);
  const testingAnalysis = getHourlySnapshotAnalysis_(propertyId);
  const universalUsage = recordAndReadUniversalUsage_({
    source: 'dashboard',
    propertyId: propertyId,
    apiCalls: propertyTotalsReport.apiCalls + pathReport.apiCalls + referrerReport.apiCalls,
    rowsProcessed: propertyTotalsReport.rowsProcessed + pathReport.rowsProcessed + referrerReport.rowsProcessed,
    propertyQuota: propertyQuota,
    urlPath: ''
  });

  const response = {
    meta: {
      startDate: startIso,
      endDate: endIso,
      propertyId: propertyId,
      storyCount: stories.length,
      ga4RowsByPath: pathReport.rowsProcessed,
      ga4RowsByReferrer: referrerReport.rowsProcessed,
      ga4ApiCalls: propertyTotalsReport.apiCalls + pathReport.apiCalls + referrerReport.apiCalls,
      gscRowsByPage: searchConsoleReport.rowsProcessed + discoverConsoleReport.rowsProcessed,
      gscApiCalls: searchConsoleReport.apiCalls + discoverConsoleReport.apiCalls,
      gscSearchRowsByPage: searchConsoleReport.rowsProcessed,
      gscSearchApiCalls: searchConsoleReport.apiCalls,
      gscDiscoverRowsByPage: discoverConsoleReport.rowsProcessed,
      gscDiscoverApiCalls: discoverConsoleReport.apiCalls,
      truncatedGa4Rows: Boolean(pathReport.truncated || referrerReport.truncated),
      truncatedGscRows: Boolean(searchConsoleReport.truncated || discoverConsoleReport.truncated),
      gscError: combineSearchConsoleErrors_(searchConsoleReport.error, discoverConsoleReport.error),
      gscSearchError: cleanString_(searchConsoleReport.error),
      gscDiscoverError: cleanString_(discoverConsoleReport.error),
      pathFilterApplied: useFilteredGa4,
      storySlugCount: slugList.length,
      pathFilterMaxSlugs: GA4_FILTER_BATCH_SIZE * GA4_MAX_FILTERED_BATCHES,
      referrerSlugsUsed: referrerSlugList.length,
      referrerFilterLimited: referrerFilterLimited,
      propertyQuota: propertyQuota,
      generatedAt: new Date().toISOString()
    },
    kpis: {
      totalUsers: totalUsers,
      pageViews: totalPageViews,
      matchedStories: matchedStories
    },
    propertyTotals: {
      totalUsers: propertyTotalsReport.totalUsers,
      pageViews: propertyTotalsReport.pageViews,
      startDate: startIso,
      endDate: endIso
    },
    topSections: toSortedArray_(sectionAgg).slice(0, TOP_LIMIT),
    topSectionFamilies: toSortedArray_(sectionFamilyAgg).slice(0, TOP_LIMIT),
    topAuthors: toSortedArray_(authorAgg).slice(0, TOP_LIMIT),
    topTags: toSortedArray_(tagAgg).slice(0, TOP_LIMIT),
    topTemplates: toSortedArray_(templateAgg).slice(0, TOP_LIMIT),
    topReferrers: toSortedArray_(referrerAggregates).slice(0, TOP_LIMIT),
    withinSiteLandingPages: toSortedSourceArray_(withinSiteLandingPageAgg).slice(0, TOP_LIMIT),
    withinSiteStorySources: toSortedSourceArray_(withinSiteStorySourceAgg).slice(0, TOP_LIMIT),
    withinSiteSourceDestinations: toSortedSourceDestinationMap_(withinSiteSourceDestinationAgg),
    topStories: storyRows.sort(sortByTotalUsersThenViews_).slice(0, TOP_LIMIT),
    allStories: storyRows,
    topAverageUsers: {
      section: toAverageUsersArray_(sectionAgg).slice(0, TOP_LIMIT),
      sectionFamily: toAverageUsersArray_(sectionFamilyAgg).slice(0, TOP_LIMIT),
      author: toAverageUsersArray_(authorAgg).slice(0, TOP_LIMIT),
      tag: toAverageUsersArray_(tagAgg).slice(0, TOP_LIMIT),
      template: toAverageUsersArray_(templateAgg).slice(0, TOP_LIMIT)
    },
    testingAnalysis: testingAnalysis,
    universalUsage: universalUsage
  };
  writeDashboardSnapshot_(response);
  return response;
}

function getUrlTrendData(params) {
  const propertyId = sanitizePropertyId_(params && params.propertyId ? params.propertyId : DEFAULT_PROPERTY);
  const rawUrl = cleanString_(params && params.url);
  if (!rawUrl) {
    throw new Error('Enter a URL or path.');
  }

  const path = normalizePath_(rawUrl);
  if (!path) {
    throw new Error('Could not parse URL/path.');
  }

  const publishedAt = findPublishedAtForPath_(propertyId, path);
  if (!publishedAt) {
    throw new Error('URL not found in source sheet for this property. Ensure URL/slug exists in the configured stories tab.');
  }
  const windowStart = new Date(publishedAt.getTime());
  const windowEnd = new Date(publishedAt.getTime() + URL_TREND_WINDOW_HOURS * 60 * 60 * 1000 - 1);

  const startIso = formatDateForInput_(windowStart);
  const endIso = formatDateForInput_(windowEnd);
  const selectedStartIso = cleanString_(params && params.startDate);
  const selectedEndIso = cleanString_(params && params.endDate);
  const byDate = {};
  const refTotals = {};

  const hourlyReport = iterateGa4Rows_({
    propertyId: propertyId,
    startDate: startIso,
    endDate: endIso,
    dimensions: ['dateHour', 'pageReferrer', 'sessionSourceMedium'],
    metrics: GA4_METRICS,
    dimensionFilter: buildPathInListFilter_([path])
  }, function (row) {
    const rawDateHour = getDimensionValue_(row, 0);
    const hourDate = parseGa4DateHour_(rawDateHour);
    if (hourDate && (hourDate.getTime() < windowStart.getTime() || hourDate.getTime() > windowEnd.getTime())) {
      return;
    }

    const dateKey = formatGa4DateHour_(rawDateHour);
    if (!dateKey) {
      return;
    }
    const referrer = normalizeReferrerBucket_(
      getDimensionValue_(row, 1),
      getDimensionValue_(row, 2),
      propertyId
    );
    const pageViews = toNumber_(getMetricValue_(row, 0));
    const totalUsers = toNumber_(getMetricValue_(row, 1));

    if (!byDate[dateKey]) {
      byDate[dateKey] = {
        date: dateKey,
        pageViews: 0,
        totalUsers: 0,
        referrers: {}
      };
    }

    byDate[dateKey].pageViews += pageViews;
    byDate[dateKey].totalUsers += totalUsers;
    byDate[dateKey].referrers[referrer] = (byDate[dateKey].referrers[referrer] || 0) + pageViews;
    refTotals[referrer] = (refTotals[referrer] || 0) + pageViews;
  });

  const hourlyRows = Object.keys(byDate)
    .sort()
    .map(function (dateKey) { return byDate[dateKey]; });

  const topReferrers = Object.keys(refTotals)
    .map(function (name) {
      return { name: name, pageViews: refTotals[name] };
    })
    .sort(function (a, b) { return b.pageViews - a.pageViews; })
    .slice(0, URL_TREND_TOP_REFERRERS)
    .map(function (row) { return row.name; });
  const allReferrers = Object.keys(refTotals)
    .sort(function (a, b) {
      return (refTotals[b] || 0) - (refTotals[a] || 0);
    });

  const referrerSeries = {};
  for (let i = 0; i < topReferrers.length; i++) {
    referrerSeries[topReferrers[i]] = [];
  }
  referrerSeries.Other = [];
  const csvReferrerSeriesMap = {};
  for (let i = 0; i < allReferrers.length; i++) {
    csvReferrerSeriesMap[allReferrers[i]] = [];
  }

  const labels = [];
  const usersSeries = [];
  const viewsSeries = [];

  for (let i = 0; i < hourlyRows.length; i++) {
    const day = hourlyRows[i];
    labels.push(day.date);
    usersSeries.push(day.totalUsers);
    viewsSeries.push(day.pageViews);

    let otherViews = 0;
    for (let z = 0; z < allReferrers.length; z++) {
      const csvName = allReferrers[z];
      csvReferrerSeriesMap[csvName].push(day.referrers[csvName] || 0);
    }

    for (let j = 0; j < topReferrers.length; j++) {
      const refName = topReferrers[j];
      const views = day.referrers[refName] || 0;
      referrerSeries[refName].push(views);
    }

    const dayRefKeys = Object.keys(day.referrers);
    for (let k = 0; k < dayRefKeys.length; k++) {
      const key = dayRefKeys[k];
      if (topReferrers.indexOf(key) === -1) {
        otherViews += day.referrers[key];
      }
    }
    referrerSeries.Other.push(otherViews);
  }

  const stackedSeries = [];
  for (let i = 0; i < topReferrers.length; i++) {
    stackedSeries.push({
      name: topReferrers[i],
      values: referrerSeries[topReferrers[i]]
    });
  }
  if (hourlyRows.length) {
    stackedSeries.push({ name: 'Other', values: referrerSeries.Other });
  }
  const todayIso = formatDateForInput_(new Date());
  const gscStartIso = selectedStartIso || startIso;
  const gscEndIso = selectedEndIso || todayIso;
  const overallReport = getPathTotalsForDateRange_(propertyId, path, startIso, todayIso);
  const searchConsoleReport = getSearchConsoleMetricForExactPath_(propertyId, gscStartIso, gscEndIso, path, rawUrl, 'web');
  const discoverConsoleReport = getSearchConsoleMetricForExactPath_(propertyId, gscStartIso, gscEndIso, path, rawUrl, 'discover');
  const mergedQuota = createPropertyQuotaSnapshot_();
  mergePropertyQuota_(mergedQuota, hourlyReport.propertyQuota);
  mergePropertyQuota_(mergedQuota, overallReport.propertyQuota);
  const csvSeries = allReferrers.map(function (name) {
    return {
      name: name,
      values: csvReferrerSeriesMap[name]
    };
  });
  const universalUsage = recordAndReadUniversalUsage_({
    source: 'url_trend',
    propertyId: propertyId,
    apiCalls: hourlyReport.apiCalls + overallReport.apiCalls,
    rowsProcessed: hourlyReport.rowsProcessed + overallReport.rowsProcessed,
    propertyQuota: mergedQuota,
    urlPath: path
  });

  return {
    urlPath: path,
    publishedAt: publishedAt.toISOString(),
    startDate: startIso,
    endDate: endIso,
    windowHours: URL_TREND_WINDOW_HOURS,
    labels: labels,
    usersSeries: usersSeries,
    viewsSeries: viewsSeries,
    referrerSeries: stackedSeries,
    csvReferrerSeries: csvSeries,
    totals: {
      totalUsers: usersSeries.reduce(function (sum, val) { return sum + val; }, 0),
      pageViews: viewsSeries.reduce(function (sum, val) { return sum + val; }, 0)
    },
    overallTotals: {
      startDate: startIso,
      endDate: todayIso,
      totalUsers: overallReport.totalUsers,
      pageViews: overallReport.pageViews
    },
    searchConsole: {
      startDate: gscStartIso,
      endDate: gscEndIso,
      clicks: searchConsoleReport.metric ? searchConsoleReport.metric.clicks : 0,
      impressions: searchConsoleReport.metric ? searchConsoleReport.metric.impressions : 0,
      ctr: searchConsoleReport.metric ? searchConsoleReport.metric.ctr : 0,
      position: searchConsoleReport.metric ? searchConsoleReport.metric.position : 0,
      apiCalls: searchConsoleReport.apiCalls,
      rowsProcessed: searchConsoleReport.rowsProcessed,
      error: cleanString_(searchConsoleReport.error)
    },
    searchConsoleDiscover: {
      startDate: gscStartIso,
      endDate: gscEndIso,
      clicks: discoverConsoleReport.metric ? discoverConsoleReport.metric.clicks : 0,
      impressions: discoverConsoleReport.metric ? discoverConsoleReport.metric.impressions : 0,
      ctr: discoverConsoleReport.metric ? discoverConsoleReport.metric.ctr : 0,
      apiCalls: discoverConsoleReport.apiCalls,
      rowsProcessed: discoverConsoleReport.rowsProcessed,
      error: cleanString_(discoverConsoleReport.error)
    },
    ga4: {
      rowsProcessed: hourlyReport.rowsProcessed + overallReport.rowsProcessed,
      apiCalls: hourlyReport.apiCalls + overallReport.apiCalls,
      truncated: Boolean(hourlyReport.truncated || overallReport.truncated),
      propertyQuota: mergedQuota
    },
    universalUsage: universalUsage
  };
}

function getStoredUrlTrendData(params) {
  const propertyId = sanitizePropertyId_(params && params.propertyId ? params.propertyId : DEFAULT_PROPERTY);
  const rawUrl = cleanString_(params && params.url);
  if (!rawUrl) {
    throw new Error('Enter a URL or path.');
  }

  const path = normalizePath_(rawUrl);
  if (!path) {
    throw new Error('Could not parse URL/path.');
  }
  const storyIdentity = findStoryIdentityForPath_(propertyId, path);

  const spreadsheet = getDashboardStorageSpreadsheet_(propertyId);
  const sheet = spreadsheet.getSheetByName(HOURLY_SNAPSHOTS_SHEET);
  if (!sheet || sheet.getLastRow() < 2) {
    throw new Error('No hourly snapshot data available yet.');
  }

  ensureHourlySnapshotsHeader_(sheet);
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, HOURLY_SNAPSHOT_HEADERS.length).getValues();
  const points = [];
  const legacyPoints = [];
  let title = '';
  let section = '';
  let author = '';
  let publishedAt = null;
  let matchedStoryId = '';

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (normalizeSnapshotPropertyId_(row[0]) !== propertyId) {
      continue;
    }
    const rowPath = normalizePath_(row[2]);
    const rowStoryId = cleanString_(row[3]);
    const matchesStoryId = Boolean(storyIdentity.storyId && rowStoryId && rowStoryId === storyIdentity.storyId);
    const matchesPath = rowPath === path;
    if (!matchesStoryId && !matchesPath) {
      continue;
    }
    const snapshotHour = parseHourlySnapshotHour_(row[1]);
    const published = parseSheetDate_(row[7]);
    if (!snapshotHour || !published) {
      continue;
    }
    title = cleanString_(row[4]) || title;
    section = cleanString_(row[5]) || section;
    author = cleanString_(row[6]) || author;
    publishedAt = publishedAt || published;
    const point = {
      snapshotHour: snapshotHour,
      cumulativeViews: Math.max(0, toNumber_(row[8])),
      cumulativeUsers: Math.max(0, toNumber_(row[9]))
    };

    if (matchesStoryId) {
      matchedStoryId = rowStoryId;
      points.push(point);
    } else if (matchesPath && (!rowStoryId || !storyIdentity.storyId)) {
      legacyPoints.push(point);
    }
  }

  if (!points.length && legacyPoints.length) {
    Array.prototype.push.apply(points, legacyPoints);
  } else if (points.length && legacyPoints.length) {
    Array.prototype.push.apply(points, legacyPoints);
  }

  if (!points.length || !publishedAt) {
    throw new Error('No stored hourly snapshot data found for this story.');
  }

  points.sort(function (a, b) {
    return a.snapshotHour.getTime() - b.snapshotHour.getTime();
  });

  const deduped = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (deduped.length && deduped[deduped.length - 1].snapshotHour.getTime() === point.snapshotHour.getTime()) {
      deduped[deduped.length - 1] = point;
    } else {
      deduped.push(point);
    }
  }

  const labels = [];
  const usersSeries = [];
  const viewsSeries = [];

  for (let i = 0; i < deduped.length; i++) {
    const current = deduped[i];
    const previous = i > 0 ? deduped[i - 1] : null;
    const hourlyViews = previous ? Math.max(0, current.cumulativeViews - previous.cumulativeViews) : Math.max(0, current.cumulativeViews);
    const hourlyUsers = previous ? Math.max(0, current.cumulativeUsers - previous.cumulativeUsers) : Math.max(0, current.cumulativeUsers);
    labels.push(current.snapshotHour.toISOString());
    viewsSeries.push(hourlyViews);
    usersSeries.push(hourlyUsers);
  }

  const latest = deduped[deduped.length - 1];
  const trackedHours = Math.max(0, Math.round((latest.snapshotHour.getTime() - publishedAt.getTime()) / 3600000));
  const snapshotMeta = buildStoredSnapshotMeta_({
    requestedStoryId: storyIdentity.storyId,
    matchedStoryId: matchedStoryId,
    lookupMode: matchedStoryId
      ? (legacyPoints.length ? 'story_id_with_legacy_slug_fallback' : 'story_id')
      : 'slug_only',
    dedupedPoints: deduped,
    now: new Date()
  });
  return {
    urlPath: path,
    title: title,
    section: section,
    author: author,
    publishedAt: publishedAt.toISOString(),
    startDate: formatDateForInput_(deduped[0].snapshotHour),
    endDate: formatDateForInput_(latest.snapshotHour),
    windowHours: trackedHours,
    labels: labels,
    usersSeries: usersSeries,
    viewsSeries: viewsSeries,
    referrerSeries: [],
    csvReferrerSeries: [],
    totals: {
      totalUsers: latest.cumulativeUsers,
      pageViews: latest.cumulativeViews
    },
    overallTotals: {
      startDate: formatDateForInput_(publishedAt),
      endDate: formatDateForInput_(latest.snapshotHour),
      totalUsers: latest.cumulativeUsers,
      pageViews: latest.cumulativeViews
    },
    searchConsole: {
      startDate: '',
      endDate: '',
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
      apiCalls: 0,
      rowsProcessed: 0,
      error: 'Stored snapshot mode. Click Get Hourly Data for live Search Console metrics.'
    },
    searchConsoleDiscover: {
      startDate: '',
      endDate: '',
      clicks: 0,
      impressions: 0,
      ctr: 0,
      apiCalls: 0,
      rowsProcessed: 0,
      error: 'Stored snapshot mode. Click Get Hourly Data for live Discover metrics.'
    },
    ga4: {
      rowsProcessed: deduped.length,
      apiCalls: 0,
      truncated: false,
      propertyQuota: null
    },
    universalUsage: null,
    sourceMode: 'stored_snapshot',
    snapshotMeta: snapshotMeta
  };
}

function findPublishedAtForPath_(propertyId, path) {
  const source = getContentSourceConfig_(propertyId);
  const usingStoryCache = shouldUseStoryCache_(propertyId);
  const sheet = usingStoryCache ? getStoryCacheSheet_(propertyId, true) : getSourceSheet_(propertyId, 'stories', true);
  const columns = getSheetColumnsByAliases_(
    sheet,
    usingStoryCache ? source.storyCache.columns : source.columns.stories,
    true
  );
  const rowCount = columns.publishedAt.length;
  let earliest = null;

  for (let i = 0; i < rowCount; i++) {
    const slug = normalizePath_(columns.slug[i] || columns.url[i]);
    if (!slug || slug !== path) {
      continue;
    }
    const publishedAt = parseSheetDate_(columns.publishedAt[i]);
    if (!publishedAt) {
      continue;
    }
    if (!earliest || publishedAt.getTime() < earliest.getTime()) {
      earliest = publishedAt;
    }
  }

  return earliest;
}

function findStoryIdentityForPath_(propertyId, path) {
  const source = getContentSourceConfig_(propertyId);
  const usingStoryCache = shouldUseStoryCache_(propertyId);
  const sheet = usingStoryCache ? getStoryCacheSheet_(propertyId, true) : getSourceSheet_(propertyId, 'stories', true);
  const aliasMap = usingStoryCache
    ? source.storyCache.columns
    : {
        publishedAt: source.columns.stories.publishedAt,
        slug: source.columns.stories.slug,
        url: source.columns.stories.url
      };
  const columns = getSheetColumnsByAliases_(sheet, aliasMap, true);
  const rowCount = columns.publishedAt.length;
  let earliest = null;
  let storyId = '';

  for (let i = 0; i < rowCount; i++) {
    const slug = normalizePath_(columns.slug[i] || columns.url[i]);
    if (!slug || slug !== path) {
      continue;
    }
    const publishedAt = parseSheetDate_(columns.publishedAt[i]);
    if (!publishedAt) {
      continue;
    }
    if (!earliest || publishedAt.getTime() < earliest.getTime()) {
      earliest = publishedAt;
      storyId = cleanString_(columns.id && columns.id[i]);
    }
  }

  return {
    path: path,
    storyId: storyId,
    publishedAt: earliest
  };
}

function iterateGa4Rows_(config, onRow) {
  const propertyPath = sanitizePropertyId_(config.propertyId);
  let apiCalls = 0;
  let offset = 0;
  let rowCount = 0;
  let truncated = false;
  let rowsProcessed = 0;
  const startedAt = Date.now();
  const propertyQuota = createPropertyQuotaSnapshot_();

  for (let page = 0; page < GA4_MAX_PAGES; page++) {
    const request = {
      dateRanges: [{ startDate: config.startDate, endDate: config.endDate }],
      dimensions: config.dimensions.map(function (name) { return { name: name }; }),
      metrics: config.metrics.map(function (name) { return { name: name }; }),
      limit: GA4_PAGE_SIZE,
      offset: offset,
      returnPropertyQuota: true
    };
    if (config.dimensionFilter) {
      request.dimensionFilter = config.dimensionFilter;
    }

    const response = runGa4Report_(request, propertyPath);
    apiCalls++;
    mergePropertyQuota_(propertyQuota, response && response.propertyQuota ? response.propertyQuota : null);

    const rows = response && response.rows ? response.rows : [];
    rowsProcessed += rows.length;
    for (let i = 0; i < rows.length; i++) {
      onRow(rows[i]);
    }

    rowCount = response && typeof response.rowCount === 'number' ? response.rowCount : rowCount;
    offset += rows.length;

    if (!rows.length) {
      break;
    }
    if (rowCount && offset >= rowCount) {
      break;
    }
    if (rows.length < GA4_PAGE_SIZE) {
      break;
    }
    if (Date.now() - startedAt > GA4_MAX_RUNTIME_MS) {
      truncated = true;
      break;
    }
  }

  if (rowCount && rowsProcessed < rowCount) {
    truncated = true;
  }

  return {
    rowCount: rowCount || rowsProcessed,
    rowsProcessed: rowsProcessed,
    apiCalls: apiCalls,
    truncated: truncated,
    propertyQuota: propertyQuota
  };
}

function buildPathInListFilter_(paths) {
  const values = expandPathFilterValues_(paths);
  return {
    filter: {
      fieldName: GA4_PATH_DIMENSION,
      inListFilter: {
        values: values,
        caseSensitive: false
      }
    }
  };
}

function runGa4Report_(request, propertyId) {
  const propertyPath = sanitizePropertyId_(propertyId);
  const serviceAccount = getGa4ServiceAccountCredentials_();
  if (!serviceAccount) {
    return AnalyticsData.Properties.runReport(request, propertyPath);
  }

  const token = getGa4ServiceAccountAccessToken_(serviceAccount);
  const url = 'https://analyticsdata.googleapis.com/v1beta/' + propertyPath + ':runReport';
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(request),
    headers: {
      Authorization: 'Bearer ' + token
    },
    muteHttpExceptions: true
  });

  const code = response.getResponseCode();
  const body = response.getContentText();
  if (code >= 200 && code < 300) {
    return body ? JSON.parse(body) : {};
  }

  throw new Error('GA4 Data API request failed (' + code + '): ' + extractGoogleApiErrorMessage_(body));
}

function runSearchConsoleQuery_(siteUrl, request) {
  const serviceAccount = getGa4ServiceAccountCredentials_();
  const token = serviceAccount
    ? getGa4ServiceAccountAccessToken_(serviceAccount)
    : ScriptApp.getOAuthToken();
  if (!token) {
    throw new Error('No OAuth token available for Search Console.');
  }
  const url = 'https://searchconsole.googleapis.com/webmasters/v3/sites/' + encodeURIComponent(siteUrl) + '/searchAnalytics/query';
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(request),
    headers: {
      Authorization: 'Bearer ' + token
    },
    muteHttpExceptions: true
  });

  const code = response.getResponseCode();
  const body = response.getContentText();
  if (code >= 200 && code < 300) {
    return body ? JSON.parse(body) : { rows: [] };
  }

  throw new Error('Search Console API request failed (' + code + '): ' + extractGoogleApiErrorMessage_(body));
}

function getGa4ServiceAccountCredentials_() {
  const props = PropertiesService.getScriptProperties();
  const raw = cleanString_(props.getProperty(GA4_SERVICE_ACCOUNT_JSON_PROPERTY));
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.client_email || !parsed.private_key) {
      throw new Error('Missing client_email or private_key.');
    }
    parsed.private_key = String(parsed.private_key).replace(/\\n/g, '\n');
    parsed.token_uri = cleanString_(parsed.token_uri) || 'https://oauth2.googleapis.com/token';
    return parsed;
  } catch (error) {
    throw new Error('Invalid GA4 service account JSON in Script Properties: ' + error.message);
  }
}

/**
 * One-time helper: paste the contents of ga4api.json here from the Apps Script editor.
 */
function saveGa4ServiceAccountJson_(jsonText) {
  const raw = cleanString_(jsonText);
  if (!raw) {
    throw new Error('Provide the service account JSON text.');
  }
  JSON.parse(raw);
  PropertiesService.getScriptProperties().setProperty(GA4_SERVICE_ACCOUNT_JSON_PROPERTY, raw);
  CacheService.getScriptCache().remove(GA4_SERVICE_ACCOUNT_TOKEN_CACHE_KEY);
  return {
    ok: true,
    property: GA4_SERVICE_ACCOUNT_JSON_PROPERTY
  };
}

function clearGa4ServiceAccountJson_() {
  PropertiesService.getScriptProperties().deleteProperty(GA4_SERVICE_ACCOUNT_JSON_PROPERTY);
  CacheService.getScriptCache().remove(GA4_SERVICE_ACCOUNT_TOKEN_CACHE_KEY);
  return { ok: true };
}

function getGa4ServiceAccountAccessToken_(serviceAccount) {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(GA4_SERVICE_ACCOUNT_TOKEN_CACHE_KEY);
  if (cached) {
    return cached;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const tokenUri = serviceAccount.token_uri || 'https://oauth2.googleapis.com/token';
  const jwtHeader = {
    alg: 'RS256',
    typ: 'JWT'
  };
  const jwtClaimSet = {
    iss: serviceAccount.client_email,
    scope: GOOGLE_API_SCOPES.join(' '),
    aud: tokenUri,
    exp: nowSeconds + 3600,
    iat: nowSeconds
  };
  const unsignedJwt = base64UrlEncodeJson_(jwtHeader) + '.' + base64UrlEncodeJson_(jwtClaimSet);
  const signatureBytes = Utilities.computeRsaSha256Signature(unsignedJwt, serviceAccount.private_key);
  const signedJwt = unsignedJwt + '.' + Utilities.base64EncodeWebSafe(signatureBytes).replace(/=+$/g, '');

  const tokenResponse = UrlFetchApp.fetch(tokenUri, {
    method: 'post',
    payload: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: signedJwt
    },
    muteHttpExceptions: true
  });

  const code = tokenResponse.getResponseCode();
  const body = tokenResponse.getContentText();
  if (code < 200 || code >= 300) {
    throw new Error('Service account token request failed (' + code + '): ' + extractGoogleApiErrorMessage_(body));
  }

  const parsed = body ? JSON.parse(body) : {};
  const accessToken = cleanString_(parsed.access_token);
  if (!accessToken) {
    throw new Error('Service account token response did not include an access token.');
  }

  const expiresIn = Math.max(60, Number(parsed.expires_in || 3600) - 60);
  cache.put(GA4_SERVICE_ACCOUNT_TOKEN_CACHE_KEY, accessToken, expiresIn);
  return accessToken;
}

function base64UrlEncodeJson_(value) {
  return Utilities.base64EncodeWebSafe(JSON.stringify(value), Utilities.Charset.UTF_8).replace(/=+$/g, '');
}

function extractGoogleApiErrorMessage_(bodyText) {
  const raw = cleanString_(bodyText);
  if (!raw) {
    return 'Empty response';
  }
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.error) {
      if (parsed.error.message) {
        return parsed.error.message;
      }
      return JSON.stringify(parsed.error);
    }
  } catch (error) {
    // Ignore parse failures and return raw text below.
  }
  return raw;
}

function getSearchConsolePageMetricsByPath_(propertyId, startDate, endDate, searchType) {
  const source = getContentSourceConfig_(propertyId);
  const siteUrl = cleanString_(source && source.searchConsoleSiteUrl);
  const empty = {
    metricsByPath: {},
    apiCalls: 0,
    rowsProcessed: 0,
    truncated: false,
    error: ''
  };
  if (!siteUrl) {
    return empty;
  }

  const metricsByPath = {};
  let apiCalls = 0;
  let rowsProcessed = 0;
  let truncated = false;

  try {
    for (let page = 0; page < SEARCH_CONSOLE_MAX_PAGES; page++) {
      const response = runSearchConsoleQuery_(siteUrl, {
        startDate: startDate,
        endDate: endDate,
        type: cleanString_(searchType) || 'web',
        dimensions: ['page'],
        rowLimit: SEARCH_CONSOLE_PAGE_SIZE,
        startRow: page * SEARCH_CONSOLE_PAGE_SIZE
      });
      apiCalls++;
      const rows = response && response.rows ? response.rows : [];
      rowsProcessed += rows.length;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i] || {};
        const keys = Array.isArray(row.keys) ? row.keys : [];
        const path = normalizePath_(keys.length ? keys[0] : '');
        if (!path) {
          continue;
        }
        metricsByPath[path] = {
          clicks: toNumber_(row.clicks),
          impressions: toNumber_(row.impressions),
          ctr: Number(row.ctr || 0),
          position: Number(row.position || 0)
        };
      }

      if (rows.length < SEARCH_CONSOLE_PAGE_SIZE) {
        break;
      }
      if (page === SEARCH_CONSOLE_MAX_PAGES - 1) {
        truncated = true;
      }
    }
  } catch (error) {
    empty.error = String(error && error.message ? error.message : error);
    return empty;
  }

  empty.metricsByPath = metricsByPath;
  empty.apiCalls = apiCalls;
  empty.rowsProcessed = rowsProcessed;
  empty.truncated = truncated;
  return empty;
}

function fillMissingSearchConsoleMetricsByPath_(propertyId, startDate, endDate, storyPaths, metricsByPath, searchConsoleByPath, storyUrlByPath, searchType) {
  const empty = {
    apiCalls: 0,
    rowsProcessed: 0,
    error: ''
  };
  if (!storyPaths || !storyPaths.length) {
    return empty;
  }

  const missingPaths = [];
  for (let i = 0; i < storyPaths.length; i++) {
    const path = cleanString_(storyPaths[i]);
    if (!path || searchConsoleByPath[path]) {
      continue;
    }
    const ga4Metrics = metricsByPath[path] || {};
    missingPaths.push({
      path: path,
      url: cleanString_(storyUrlByPath && storyUrlByPath[path]),
      totalUsers: toNumber_(ga4Metrics.totalUsers),
      pageViews: toNumber_(ga4Metrics.pageViews)
    });
  }

  if (!missingPaths.length) {
    return empty;
  }

  missingPaths.sort(function (a, b) {
    return sortByTotalUsersThenViews_(a, b);
  });

  const limit = Math.min(SEARCH_CONSOLE_FALLBACK_MAX_STORIES, missingPaths.length);
  for (let i = 0; i < limit; i++) {
    const result = getSearchConsoleMetricForExactPath_(
      propertyId,
      startDate,
      endDate,
      missingPaths[i].path,
      missingPaths[i].url,
      searchType
    );
    empty.apiCalls += result.apiCalls;
    empty.rowsProcessed += result.rowsProcessed;
    if (!empty.error && result.error) {
      empty.error = result.error;
    }
    if (result.metric) {
      searchConsoleByPath[missingPaths[i].path] = result.metric;
    }
  }

  return empty;
}

function getSearchConsoleMetricForExactPath_(propertyId, startDate, endDate, path, preferredUrl, searchType) {
  const source = getContentSourceConfig_(propertyId);
  const siteUrl = cleanString_(source && source.searchConsoleSiteUrl);
  const normalizedPath = normalizePath_(path);
  const empty = {
    metric: null,
    apiCalls: 0,
    rowsProcessed: 0,
    error: ''
  };
  if (!siteUrl || !normalizedPath) {
    return empty;
  }

  const candidates = buildSearchConsoleCandidateUrls_(siteUrl, normalizedPath, preferredUrl);

  try {
    for (let i = 0; i < candidates.length; i++) {
      const response = runSearchConsoleQuery_(siteUrl, {
        startDate: startDate,
        endDate: endDate,
        type: cleanString_(searchType) || 'web',
        dimensions: ['page'],
        rowLimit: 1,
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'page',
            operator: 'equals',
            expression: candidates[i]
          }]
        }]
      });
      empty.apiCalls++;
      const rows = response && response.rows ? response.rows : [];
      empty.rowsProcessed += rows.length;
      if (!rows.length) {
        continue;
      }

      empty.metric = {
        clicks: toNumber_(rows[0].clicks),
        impressions: toNumber_(rows[0].impressions),
        ctr: Number(rows[0].ctr || 0),
        position: Number(rows[0].position || 0)
      };
      return empty;
    }
  } catch (error) {
    empty.error = String(error && error.message ? error.message : error);
  }

  return empty;
}

function buildSearchConsolePageUrl_(siteUrl, path) {
  const base = cleanString_(siteUrl).replace(/\/+$/, '');
  const normalizedPath = normalizePath_(path);
  if (!base || !normalizedPath) {
    return '';
  }
  return base + normalizedPath;
}

function buildSearchConsoleCandidateUrls_(siteUrl, path, preferredUrl) {
  const candidates = [];
  const seen = {};
  const normalizedPath = normalizePath_(path);
  const preferred = cleanString_(preferredUrl);

  function addCandidate(url) {
    const clean = cleanString_(url);
    if (!clean || seen[clean]) {
      return;
    }
    seen[clean] = true;
    candidates.push(clean);
  }

  if (/^https?:\/\//i.test(preferred) && normalizePath_(preferred) === normalizedPath) {
    addCandidate(preferred.split('?')[0].split('#')[0]);
  }

  const baseCandidate = buildSearchConsolePageUrl_(siteUrl, normalizedPath);
  addCandidate(baseCandidate);
  if (!preferred && normalizedPath !== '/' && baseCandidate && !/\/$/.test(baseCandidate)) {
    addCandidate(baseCandidate + '/');
  }

  return candidates;
}

function combineSearchConsoleErrors_(searchError, discoverError) {
  const parts = [];
  if (cleanString_(searchError)) {
    parts.push('Search: ' + cleanString_(searchError));
  }
  if (cleanString_(discoverError)) {
    parts.push('Discover: ' + cleanString_(discoverError));
  }
  return parts.join(' | ');
}

function createEmptySearchConsoleMetric_() {
  return {
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0
  };
}

function expandPathFilterValues_(paths) {
  const out = {};
  for (let i = 0; i < paths.length; i++) {
    const base = normalizePath_(paths[i]);
    if (!base) {
      continue;
    }
    out[base] = true;
    if (base !== '/') {
      if (base.endsWith('/')) {
        out[base.replace(/\/+$/, '')] = true;
      } else {
        out[base + '/'] = true;
      }
    }
  }
  return Object.keys(out);
}

function createGa4ReportStats_() {
  return {
    rowCount: 0,
    rowsProcessed: 0,
    apiCalls: 0,
    truncated: false,
    propertyQuota: createPropertyQuotaSnapshot_()
  };
}

function mergeGa4ReportStats_(target, source) {
  target.rowCount += source.rowCount || 0;
  target.rowsProcessed += source.rowsProcessed || 0;
  target.apiCalls += source.apiCalls || 0;
  target.truncated = Boolean(target.truncated || source.truncated);
  mergePropertyQuota_(target.propertyQuota, source.propertyQuota);
}

function createPropertyQuotaSnapshot_() {
  return {
    tokensPerDay: null,
    tokensPerHour: null,
    concurrentRequests: null,
    serverErrorsPerProjectPerHour: null,
    potentiallyThresholdedRequestsPerHour: null
  };
}

function mergePropertyQuota_(target, incoming) {
  if (!target || !incoming) {
    return;
  }
  const fields = Object.keys(target);
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    target[key] = mergeQuotaStatus_(target[key], incoming[key]);
  }
}

function mergeQuotaStatus_(current, incoming) {
  const normalized = normalizeQuotaStatus_(incoming);
  if (!normalized) {
    return current;
  }
  const result = current || { consumed: null, remaining: null };
  if (normalized.consumed !== null) {
    result.consumed = result.consumed === null ? normalized.consumed : Math.max(result.consumed, normalized.consumed);
  }
  if (normalized.remaining !== null) {
    result.remaining = result.remaining === null ? normalized.remaining : Math.min(result.remaining, normalized.remaining);
  }
  return result;
}

function normalizeQuotaStatus_(status) {
  if (!status) {
    return null;
  }
  const consumed = toNullableNumber_(status.consumed);
  const remaining = toNullableNumber_(status.remaining);
  if (consumed === null && remaining === null) {
    return null;
  }
  return {
    consumed: consumed,
    remaining: remaining
  };
}

function getReferrerSlugSubset_(slugList, metricsByPath) {
  if (!slugList || !slugList.length) {
    return [];
  }
  if (slugList.length <= GA4_REFERRER_MAX_SLUGS) {
    return slugList.slice();
  }

  const ranked = [];
  for (let i = 0; i < slugList.length; i++) {
    const slug = slugList[i];
    const metrics = metricsByPath[slug] || { totalUsers: 0, pageViews: 0 };
    if (metrics.totalUsers > 0 || metrics.pageViews > 0) {
      ranked.push({
        slug: slug,
        totalUsers: metrics.totalUsers,
        pageViews: metrics.pageViews
      });
    }
  }

  if (!ranked.length) {
    return slugList.slice(0, GA4_REFERRER_MAX_SLUGS);
  }

  ranked.sort(sortByTotalUsersThenViews_);
  return ranked.slice(0, GA4_REFERRER_MAX_SLUGS).map(function (row) {
    return row.slug;
  });
}

function readStoriesInPublishedRange_(propertyId, startDate, endDate) {
  if (shouldUseStoryCache_(propertyId)) {
    return readStoriesFromStoryCacheInPublishedRange_(propertyId, startDate, endDate);
  }
  const source = getContentSourceConfig_(propertyId);
  const sheet = getSourceSheet_(propertyId, 'stories', true);
  const columns = getSheetColumnsByAliases_(sheet, source.columns.stories, true);
  const rowCount = columns.publishedAt.length;
  if (!rowCount) {
    return [];
  }

  const dayStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0).getTime();
  const dayEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999).getTime();
  const stories = [];

  for (let i = 0; i < rowCount; i++) {
    const publishedAt = parseSheetDate_(columns.publishedAt[i]);
    if (!publishedAt) {
      continue;
    }
    const publishedMs = publishedAt.getTime();
    if (publishedMs < dayStart || publishedMs > dayEnd) {
      continue;
    }

    const slug = normalizePath_(columns.slug[i] || columns.url[i]);
    if (!slug) {
      continue;
    }

    stories.push({
      slug: slug,
      url: cleanString_(columns.url[i]),
      section: cleanString_(columns.section[i]),
      title: cleanString_(columns.title[i]),
      author: cleanString_(columns.author[i]),
      template: cleanString_(columns.template[i]),
      publishedAtIso: publishedAt.toISOString()
    });
  }

  return stories;
}

function readTagsBySlug_(propertyId, slugSet) {
  if (shouldUseStoryCache_(propertyId)) {
    return readTagsFromStoryCacheBySlug_(propertyId, slugSet);
  }
  const source = getContentSourceConfig_(propertyId);
  const sheet = getSourceSheet_(propertyId, 'tags', false);
  if (!sheet) {
    return {};
  }

  const columns = getSheetColumnsByAliases_(sheet, source.columns.tags, false);
  const rowCount = columns.storySlug.length;
  if (!rowCount) {
    return {};
  }

  const tagsBySlug = {};
  for (let i = 0; i < rowCount; i++) {
    const slug = normalizePath_(columns.storySlug[i]);
    const tagName = cleanString_(columns.tagName[i]);
    if (!slug || !tagName || (slugSet && !slugSet[slug])) {
      continue;
    }
    if (!tagsBySlug[slug]) {
      tagsBySlug[slug] = {};
    }
    tagsBySlug[slug][tagName] = true;
  }

  const output = {};
  const slugs = Object.keys(tagsBySlug);
  for (let i = 0; i < slugs.length; i++) {
    output[slugs[i]] = Object.keys(tagsBySlug[slugs[i]]);
  }
  return output;
}

function readSectionsBySlug_(propertyId, slugSet) {
  if (shouldUseStoryCache_(propertyId)) {
    return readSectionsFromStoryCacheBySlug_(propertyId, slugSet);
  }
  const source = getContentSourceConfig_(propertyId);
  const sheet = getSourceSheet_(propertyId, 'sections', false);
  if (!sheet) {
    return {};
  }

  const columns = getSheetColumnsByAliases_(sheet, source.columns.sections, false);
  const rowCount = columns.storySlug.length;
  if (!rowCount) {
    return {};
  }

  const sectionsBySlug = {};
  for (let i = 0; i < rowCount; i++) {
    const slug = normalizePath_(columns.storySlug[i]);
    if (!slug || (slugSet && !slugSet[slug])) {
      continue;
    }
    if (!sectionsBySlug[slug]) {
      const sectionName = cleanString_(columns.sectionName[i]);
      const level1 = cleanString_(columns.level1[i]);
      const level2 = cleanString_(columns.level2[i]);
      const level3 = cleanString_(columns.level3[i]);
      const family = cleanString_(level1 || sectionName);
      sectionsBySlug[slug] = {
        sectionName: sectionName,
        level1: level1,
        level2: level2,
        level3: level3,
        allSectionFamilies: family ? [family] : []
      };
    }
  }
  return sectionsBySlug;
}

function getMostGranularSection_(sectionMeta, fallbackSection) {
  const granular = cleanString_(
    sectionMeta && (sectionMeta.level3 || sectionMeta.level2 || sectionMeta.level1 || sectionMeta.sectionName)
  );
  if (granular) {
    return granular;
  }
  return cleanString_(fallbackSection) || '(No Section)';
}

function getSectionKeysForAggregation_(sectionMeta, fallbackSection) {
  const keys = [];
  const seen = {};
  const allSections = sectionMeta && Array.isArray(sectionMeta.allSections) ? sectionMeta.allSections : [];

  for (let i = 0; i < allSections.length; i++) {
    const name = cleanString_(allSections[i]);
    if (name && !seen[name]) {
      seen[name] = true;
      keys.push(name);
    }
  }

  if (!keys.length) {
    const primary = getMostGranularSection_(sectionMeta, fallbackSection);
    if (primary) {
      keys.push(primary);
    }
  }

  return keys;
}

function getSectionFamilyKeysForAggregation_(sectionMeta, fallbackSection) {
  const keys = [];
  const seen = {};
  const allSectionFamilies = sectionMeta && Array.isArray(sectionMeta.allSectionFamilies)
    ? sectionMeta.allSectionFamilies
    : [];

  for (let i = 0; i < allSectionFamilies.length; i++) {
    const name = cleanString_(allSectionFamilies[i]);
    if (name && !seen[name]) {
      seen[name] = true;
      keys.push(name);
    }
  }

  if (!keys.length) {
    const family = cleanString_(
      sectionMeta && (sectionMeta.level1 || sectionMeta.sectionName)
    ) || cleanString_(fallbackSection) || '(No Section)';
    keys.push(family);
  }

  return keys;
}

function addAggregate_(bucket, key, metrics, gscMetrics, discoverMetrics) {
  const safeKey = cleanString_(key) || '(Blank)';
  if (!bucket[safeKey]) {
    bucket[safeKey] = {
      name: safeKey,
      pageViews: 0,
      totalUsers: 0,
      storyCount: 0,
      sumSquaresUsers: 0,
      gscClicks: 0,
      gscImpressions: 0,
      gscPositionImpressionSum: 0,
      gscStoryCount: 0,
      gscDiscoverClicks: 0,
      gscDiscoverImpressions: 0,
      gscDiscoverStoryCount: 0
    };
  }
  const storyUsers = toNumber_(metrics.totalUsers);
  const clicks = toNumber_(gscMetrics && gscMetrics.clicks);
  const impressions = toNumber_(gscMetrics && gscMetrics.impressions);
  const position = Number(gscMetrics && gscMetrics.position || 0);
  const discoverClicks = toNumber_(discoverMetrics && discoverMetrics.clicks);
  const discoverImpressions = toNumber_(discoverMetrics && discoverMetrics.impressions);
  bucket[safeKey].pageViews += metrics.pageViews;
  bucket[safeKey].totalUsers += storyUsers;
  bucket[safeKey].storyCount += 1;
  bucket[safeKey].sumSquaresUsers += storyUsers * storyUsers;
  bucket[safeKey].gscClicks += clicks;
  bucket[safeKey].gscImpressions += impressions;
  bucket[safeKey].gscPositionImpressionSum += impressions * position;
  if (impressions > 0) {
    bucket[safeKey].gscStoryCount += 1;
  }
  bucket[safeKey].gscDiscoverClicks += discoverClicks;
  bucket[safeKey].gscDiscoverImpressions += discoverImpressions;
  if (discoverImpressions > 0) {
    bucket[safeKey].gscDiscoverStoryCount += 1;
  }
}

function toSortedArray_(bucket) {
  return Object.keys(bucket)
    .map(function (key) {
      var row = bucket[key];
      var impressions = toNumber_(row.gscImpressions);
      return {
        name: row.name,
        totalUsers: toNumber_(row.totalUsers),
        pageViews: toNumber_(row.pageViews),
        storyCount: toNumber_(row.storyCount),
        hhi: toNumber_(row.totalUsers) > 0 ? (toNumber_(row.sumSquaresUsers) / (toNumber_(row.totalUsers) * toNumber_(row.totalUsers))) : 0,
        gscClicks: toNumber_(row.gscClicks),
        gscImpressions: impressions,
        gscCtr: impressions > 0 ? (toNumber_(row.gscClicks) / impressions) : 0,
        gscPosition: impressions > 0 ? (toNumber_(row.gscPositionImpressionSum) / impressions) : 0,
        gscStoryCount: toNumber_(row.gscStoryCount),
        gscDiscoverClicks: toNumber_(row.gscDiscoverClicks),
        gscDiscoverImpressions: toNumber_(row.gscDiscoverImpressions),
        gscDiscoverCtr: toNumber_(row.gscDiscoverImpressions) > 0 ? (toNumber_(row.gscDiscoverClicks) / toNumber_(row.gscDiscoverImpressions)) : 0,
        gscDiscoverStoryCount: toNumber_(row.gscDiscoverStoryCount)
      };
    })
    .sort(sortByTotalUsersThenViews_);
}

function toAverageUsersArray_(bucket) {
  return Object.keys(bucket)
    .map(function (key) {
      var row = bucket[key];
      var storyCount = toNumber_(row.storyCount);
      var totalUsers = toNumber_(row.totalUsers);
      var average = storyCount > 0 ? (totalUsers / storyCount) : 0;
      var sumSquaresUsers = toNumber_(row.sumSquaresUsers);
      var hhi = totalUsers > 0 ? (sumSquaresUsers / (totalUsers * totalUsers)) : 0;
      return {
        name: row.name,
        totalUsers: totalUsers,
        pageViews: toNumber_(row.pageViews),
        storyCount: storyCount,
        averageUsersPerStory: average,
        hhi: hhi,
        gscClicks: toNumber_(row.gscClicks),
        gscImpressions: toNumber_(row.gscImpressions),
        gscCtr: toNumber_(row.gscImpressions) > 0 ? (toNumber_(row.gscClicks) / toNumber_(row.gscImpressions)) : 0,
        gscPosition: toNumber_(row.gscImpressions) > 0 ? (toNumber_(row.gscPositionImpressionSum) / toNumber_(row.gscImpressions)) : 0,
        gscStoryCount: toNumber_(row.gscStoryCount),
        gscDiscoverClicks: toNumber_(row.gscDiscoverClicks),
        gscDiscoverImpressions: toNumber_(row.gscDiscoverImpressions),
        gscDiscoverCtr: toNumber_(row.gscDiscoverImpressions) > 0 ? (toNumber_(row.gscDiscoverClicks) / toNumber_(row.gscDiscoverImpressions)) : 0,
        gscDiscoverStoryCount: toNumber_(row.gscDiscoverStoryCount)
      };
    })
    .sort(function (a, b) {
      if (b.averageUsersPerStory !== a.averageUsersPerStory) {
        return b.averageUsersPerStory - a.averageUsersPerStory;
      }
      if (b.totalUsers !== a.totalUsers) {
        return b.totalUsers - a.totalUsers;
      }
      return b.pageViews - a.pageViews;
    });
}

function sortByTotalUsersThenViews_(a, b) {
  if (b.totalUsers !== a.totalUsers) {
    return b.totalUsers - a.totalUsers;
  }
  return b.pageViews - a.pageViews;
}

function getContentSourceConfig_(propertyId) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  return CONTENT_SOURCE_CONFIG[property] || CONTENT_SOURCE_CONFIG[DEFAULT_PROPERTY];
}

function getContentSpreadsheet_(propertyId) {
  const source = getContentSourceConfig_(propertyId);
  if (!source || !source.spreadsheetId) {
    throw new Error('No content source configured for property: ' + sanitizePropertyId_(propertyId || DEFAULT_PROPERTY));
  }
  return SpreadsheetApp.openById(source.spreadsheetId);
}

function shouldUseStoryCache_(propertyId) {
  const source = getContentSourceConfig_(propertyId);
  if (!source || !source.storyCache || !cleanString_(source.storyCache.spreadsheetId)) {
    return false;
  }
  return true;
}

function getStoryCacheConfig_(propertyId) {
  const source = getContentSourceConfig_(propertyId);
  return source && source.storyCache ? source.storyCache : null;
}

function getStoryCacheSpreadsheet_(propertyId) {
  const cacheConfig = getStoryCacheConfig_(propertyId);
  if (!cacheConfig || !cacheConfig.spreadsheetId) {
    throw new Error('No story cache configured for property: ' + sanitizePropertyId_(propertyId || DEFAULT_PROPERTY));
  }
  return SpreadsheetApp.openById(cacheConfig.spreadsheetId);
}

function getStoryCacheSheet_(propertyId, required) {
  const cacheConfig = getStoryCacheConfig_(propertyId);
  const candidates = cacheConfig && cacheConfig.sheetNames ? cacheConfig.sheetNames : [];
  if (!candidates.length) {
    if (required) {
      throw new Error('No story cache sheet candidates configured for property: ' + sanitizePropertyId_(propertyId || DEFAULT_PROPERTY));
    }
    return null;
  }

  const spreadsheet = getStoryCacheSpreadsheet_(propertyId);
  for (let i = 0; i < candidates.length; i++) {
    const sheet = spreadsheet.getSheetByName(candidates[i]);
    if (sheet) {
      return sheet;
    }
  }

  if (required && candidates.length) {
    return spreadsheet.insertSheet(candidates[0]);
  }

  if (required) {
    throw new Error('Missing story cache sheet. Tried: ' + candidates.join(', '));
  }
  return null;
}

function readStoriesFromStoryCacheInPublishedRange_(propertyId, startDate, endDate) {
  const cacheConfig = getStoryCacheConfig_(propertyId);
  const sheet = getStoryCacheSheet_(propertyId, true);
  const columns = getSheetColumnsByAliases_(sheet, cacheConfig.columns, true);
  const rowCount = columns.publishedAt.length;
  if (!rowCount) {
    return [];
  }

  const dayStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0).getTime();
  const dayEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999).getTime();
  const stories = [];

  for (let i = 0; i < rowCount; i++) {
    const publishedAt = parseSheetDate_(columns.publishedAt[i]);
    if (!publishedAt) {
      continue;
    }
    const publishedMs = publishedAt.getTime();
    if (publishedMs < dayStart || publishedMs > dayEnd) {
      continue;
    }

    const slug = normalizePath_(columns.slug[i] || columns.url[i]);
    if (!slug) {
      continue;
    }

    stories.push({
      id: cleanString_(columns.id[i]),
      slug: slug,
      url: cleanString_(columns.url[i]),
      section: cleanString_(columns.section[i]),
      title: cleanString_(columns.title[i]),
      author: cleanString_(columns.author[i]),
      template: cleanString_(columns.template[i]),
      publishedAtIso: publishedAt.toISOString(),
      tagsJson: cleanString_(columns.tagsJson[i]),
      sectionsJson: cleanString_(columns.sectionsJson[i])
    });
  }

  return stories;
}

function readTagsFromStoryCacheBySlug_(propertyId, slugSet) {
  const stories = readStoryCacheRecordsForSlugSet_(propertyId, slugSet);
  const output = {};

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    const tags = parseStoryCacheJsonArray_(story.tagsJson);
    if (!tags.length) {
      continue;
    }
    const unique = {};
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];
      const name = cleanString_(tag && (tag.name || tag['display-name'] || tag.slug || tag));
      if (name) {
        unique[name] = true;
      }
    }
    output[story.slug] = Object.keys(unique);
  }

  return output;
}

function readSectionsFromStoryCacheBySlug_(propertyId, slugSet) {
  const stories = readStoryCacheRecordsForSlugSet_(propertyId, slugSet);
  const sectionTreeIndex = readSectionTreeIndex_(propertyId);
  const output = {};

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    const sections = parseStoryCacheJsonArray_(story.sectionsJson);
    const first = sections.length ? sections[0] : null;
    const allSections = [];
    const allSectionFamilies = [];
    const seen = {};
    const seenFamilies = {};
    let primaryMeta = null;
    for (let j = 0; j < sections.length; j++) {
      const sectionNode = sections[j] || {};
      const sectionName = cleanString_(
        sectionNode && (sectionNode['display-name'] || sectionNode.name || sectionNode.slug)
      );
      const sectionMeta = lookupSectionTreeMeta_(sectionNode, sectionTreeIndex);
      if (!primaryMeta && sectionMeta) {
        primaryMeta = sectionMeta;
      }
      if (sectionName && !seen[sectionName]) {
        seen[sectionName] = true;
        allSections.push(sectionName);
      }
      const familyName = cleanString_(sectionMeta && sectionMeta.rootName);
      if (familyName && !seenFamilies[familyName]) {
        seenFamilies[familyName] = true;
        allSectionFamilies.push(familyName);
      }
    }
    const fallbackFamily = cleanString_(
      primaryMeta && primaryMeta.rootName
    ) || cleanString_(
      first && (first['display-name'] || first.name || first.slug)
    ) || cleanString_(story.section);
    if (fallbackFamily && !seenFamilies[fallbackFamily]) {
      seenFamilies[fallbackFamily] = true;
      allSectionFamilies.push(fallbackFamily);
    }
    output[story.slug] = {
      sectionName: cleanString_(
        first && (first['display-name'] || first.name || first.slug)
      ) || cleanString_(story.section),
      level1: cleanString_(primaryMeta && primaryMeta.level1),
      level2: cleanString_(primaryMeta && primaryMeta.level2),
      level3: cleanString_(primaryMeta && primaryMeta.level3),
      allSections: allSections,
      allSectionFamilies: allSectionFamilies
    };
  }

  return output;
}

function lookupSectionTreeMeta_(sectionNode, sectionTreeIndex) {
  const node = sectionNode || {};
  const id = cleanString_(node.id);
  const slug = cleanString_(node.slug);
  if (id && sectionTreeIndex && sectionTreeIndex.byId && sectionTreeIndex.byId[id]) {
    return sectionTreeIndex.byId[id];
  }
  if (slug && sectionTreeIndex && sectionTreeIndex.bySlug && sectionTreeIndex.bySlug[slug]) {
    return sectionTreeIndex.bySlug[slug];
  }
  return null;
}

function readStoryCacheRecordsForSlugSet_(propertyId, slugSet) {
  const cacheConfig = getStoryCacheConfig_(propertyId);
  const sheet = getStoryCacheSheet_(propertyId, true);
  const columns = getSheetColumnsByAliases_(sheet, cacheConfig.columns, true);
  const rowCount = columns.slug.length;
  const storiesBySlug = {};

  for (let i = 0; i < rowCount; i++) {
    const slug = normalizePath_(columns.slug[i] || columns.url[i]);
    if (!slug || (slugSet && !slugSet[slug])) {
      continue;
    }
    if (!storiesBySlug[slug]) {
      storiesBySlug[slug] = {
        slug: slug,
        section: cleanString_(columns.section[i]),
        tagsJson: cleanString_(columns.tagsJson[i]),
        sectionsJson: cleanString_(columns.sectionsJson[i])
      };
    }
  }

  return Object.keys(storiesBySlug).map(function (slug) {
    return storiesBySlug[slug];
  });
}

function parseStoryCacheJsonArray_(value) {
  const raw = cleanString_(value);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function syncStoryCacheForProperty_(propertyId, now) {
  if (!shouldUseStoryCache_(propertyId)) {
    return {
      enabled: false,
      skipped: true,
      reason: 'story cache disabled'
    };
  }

  const source = getContentSourceConfig_(propertyId);
  const siteUrl = cleanString_(source && source.searchConsoleSiteUrl);
  if (!siteUrl) {
    return {
      enabled: true,
      skipped: true,
      reason: 'missing site url'
    };
  }

  const syncNow = now instanceof Date ? now : new Date();
  const sectionTreeStats = syncSectionTreeForProperty_(propertyId, syncNow);
  const syncWindow = getStoryCacheSyncWindow_(propertyId, syncNow);
  const fetchedStories = fetchQuintypeStoriesForStoryCache_(siteUrl, syncWindow.startMs, syncWindow.endMs);
  const sheet = getStoryCacheSheet_(propertyId, true);
  ensureStoryCacheHeader_(sheet);
  const upsertStats = upsertStoryCacheStories_(propertyId, sheet, fetchedStories, syncNow);
  const pruneStats = pruneStoryCacheSheet_(propertyId, sheet, syncNow);
  saveStoryCacheLastSync_(propertyId, syncNow);

  return {
    enabled: true,
    skipped: false,
    fetched: fetchedStories.length,
    inserted: upsertStats.inserted,
    updated: upsertStats.updated,
    pruned: pruneStats.deletedRows,
    sectionTreeRows: sectionTreeStats.rows,
    startIso: new Date(syncWindow.startMs).toISOString(),
    endIso: new Date(syncWindow.endMs).toISOString(),
    sheetName: sheet.getName(),
    spreadsheetId: sheet.getParent().getId()
  };
}

function describeStoryCacheSyncStats_(stats) {
  if (!stats || stats.enabled === false) {
    return 'Story cache sync skipped.';
  }
  if (stats.skipped) {
    return 'Story cache sync skipped: ' + cleanString_(stats.reason) + '.';
  }
  return 'Story cache sync fetched ' + toNumber_(stats.fetched) +
    ' stories, inserted ' + toNumber_(stats.inserted) +
    ', updated ' + toNumber_(stats.updated) +
    ', pruned ' + toNumber_(stats.pruned) +
    ', section tree rows ' + toNumber_(stats.sectionTreeRows) + '.';
}

function getStoryCacheSyncWindow_(propertyId, now) {
  const props = PropertiesService.getScriptProperties();
  const key = getStoryCacheLastSyncPropertyKey_(propertyId);
  const raw = cleanString_(props.getProperty(key));
  const endMs = now.getTime();
  let startMs = endMs - STORY_CACHE_INITIAL_LOOKBACK_HOURS * 60 * 60 * 1000;
  const parsedLastSync = raw ? new Date(raw) : null;

  if (parsedLastSync && !isNaN(parsedLastSync.getTime())) {
    startMs = parsedLastSync.getTime() - STORY_CACHE_SYNC_OVERLAP_HOURS * 60 * 60 * 1000;
  }

  return {
    startMs: Math.min(startMs, endMs),
    endMs: endMs
  };
}

function saveStoryCacheLastSync_(propertyId, now) {
  PropertiesService.getScriptProperties().setProperty(
    getStoryCacheLastSyncPropertyKey_(propertyId),
    (now instanceof Date ? now : new Date()).toISOString()
  );
}

function getStoryCacheLastSyncPropertyKey_(propertyId) {
  return [
    'story_cache_last_sync',
    safePropertyId_(propertyId).replace(/[^\d]/g, ''),
    getAppEnvironment_()
  ].join('_');
}

function fetchQuintypeStoriesForStoryCache_(siteUrl, startMs, endMs) {
  const stories = [];
  let offset = 0;
  let pages = 0;

  while (pages < STORY_CACHE_MAX_PAGES_PER_SYNC) {
    const url = buildQuintypeAdvancedSearchUrl_(siteUrl, startMs, endMs, offset);
    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      muteHttpExceptions: true,
      headers: {
        accept: 'application/json'
      }
    });
    const code = response.getResponseCode();
    if (code < 200 || code >= 300) {
      throw new Error('Quintype cache sync failed: HTTP ' + code + ' for ' + url);
    }
    const payload = JSON.parse(response.getContentText() || '{}');
    const items = Array.isArray(payload.items) ? payload.items : [];
    if (!items.length) {
      break;
    }
    for (let i = 0; i < items.length; i++) {
      stories.push(items[i]);
    }
    if (items.length < STORY_CACHE_PAGE_SIZE) {
      break;
    }
    offset += STORY_CACHE_PAGE_SIZE;
    pages++;
  }

  return stories;
}

function buildQuintypeAdvancedSearchUrl_(siteUrl, startMs, endMs, offset) {
  const base = cleanString_(siteUrl).replace(/\/+$/, '');
  return base + '/api/v1/advanced-search?' + [
    'content-types=story',
    'sort=latest-published',
    'limit=' + STORY_CACHE_PAGE_SIZE,
    'offset=' + toNumber_(offset),
    'published-after=' + Math.floor(startMs),
    'published-before=' + Math.floor(endMs)
  ].join('&');
}

function syncSectionTreeForProperty_(propertyId, now) {
  const siteUrl = cleanString_(getContentSourceConfig_(propertyId).searchConsoleSiteUrl);
  if (!siteUrl) {
    return { rows: 0, sheetName: '', spreadsheetId: '' };
  }
  const sections = fetchQuintypeSectionTree_(siteUrl);
  const syncedAtIso = (now instanceof Date ? now : new Date()).toISOString();
  const rows = buildSectionTreeRows_(sections, syncedAtIso);
  const sheet = getOrCreateSectionTreeSheet_(propertyId);
  ensureSectionTreeHeader_(sheet);
  const existingRows = Math.max(0, sheet.getLastRow() - 1);
  if (existingRows > 0) {
    sheet.getRange(2, 1, existingRows, SECTION_TREE_HEADERS.length).clearContent();
  }
  if (rows.length) {
    ensureSheetHasColumns_(sheet, SECTION_TREE_HEADERS.length);
    sheet.getRange(2, 1, rows.length, SECTION_TREE_HEADERS.length).setValues(rows);
  }
  return {
    rows: rows.length,
    sheetName: sheet.getName(),
    spreadsheetId: sheet.getParent().getId()
  };
}

function fetchQuintypeSectionTree_(siteUrl) {
  const base = cleanString_(siteUrl).replace(/\/+$/, '');
  const response = UrlFetchApp.fetch(base + '/api/v1/config', {
    method: 'get',
    muteHttpExceptions: true,
    headers: { accept: 'application/json' }
  });
  const code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error('Quintype section tree sync failed: HTTP ' + code + ' for ' + base + '/api/v1/config');
  }
  const payload = JSON.parse(response.getContentText() || '{}');
  return Array.isArray(payload.sections) ? payload.sections : [];
}

function buildSectionTreeRows_(sections, syncedAtIso) {
  const nodes = Array.isArray(sections) ? sections : [];
  const byId = {};
  for (let i = 0; i < nodes.length; i++) {
    const id = cleanString_(nodes[i] && nodes[i].id);
    if (id) {
      byId[id] = nodes[i];
    }
  }
  const rows = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i] || {};
    const sectionId = cleanString_(node.id);
    const slug = cleanString_(node.slug);
    const name = cleanString_(node.name);
    const displayName = cleanString_(node['display-name'] || node['display_name'] || node['displayName']) || name || slug;
    const parentId = cleanString_(node['parent-id'] || node.parent_id || node.parentId);
    const ancestry = buildSectionAncestry_(node, byId);
    const currentPath = ancestry.path;
    const root = ancestry.root;
    rows.push(sectionTreeRecordToArray_({
      section_id: sectionId,
      slug: slug,
      name: name,
      display_name: displayName,
      parent_id: parentId,
      root_id: cleanString_(root.id),
      root_name: cleanString_(root.name),
      level_1: cleanString_(currentPath[0]),
      level_2: cleanString_(currentPath[1]),
      level_3: cleanString_(currentPath[2]),
      depth: Math.max(0, currentPath.length - 1),
      path_json: JSON.stringify(currentPath),
      synced_at_iso: cleanString_(syncedAtIso)
    }));
  }
  return rows;
}

function buildSectionAncestry_(node, byId) {
  const visited = {};
  const pathNodes = [];
  let current = node;

  while (current) {
    const currentId = cleanString_(current.id);
    if (currentId && visited[currentId]) {
      break;
    }
    if (currentId) {
      visited[currentId] = true;
    }
    pathNodes.push(current);
    const parentId = cleanString_(current['parent-id'] || current.parent_id || current.parentId);
    current = parentId && byId[parentId] ? byId[parentId] : null;
  }

  pathNodes.reverse();
  const path = pathNodes.map(function (item) {
    return cleanString_(item && (item['display-name'] || item['display_name'] || item['displayName'] || item.name || item.slug));
  }).filter(Boolean);
  const rootNode = pathNodes.length ? pathNodes[0] : (node || {});

  return {
    path: path,
    root: {
      id: cleanString_(rootNode.id),
      name: cleanString_(rootNode['display-name'] || rootNode['display_name'] || rootNode['displayName'] || rootNode.name || rootNode.slug)
    }
  };
}

function sectionTreeRecordToArray_(row) {
  return SECTION_TREE_HEADERS.map(function (header) {
    return row && row[header] != null ? row[header] : '';
  });
}

function getOrCreateSectionTreeSheet_(propertyId) {
  const spreadsheet = getDashboardStorageSpreadsheet_(propertyId);
  let sheet = spreadsheet.getSheetByName(SECTION_TREE_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SECTION_TREE_SHEET);
  }
  ensureSectionTreeHeader_(sheet);
  return sheet;
}

function ensureSectionTreeHeader_(sheet) {
  const width = SECTION_TREE_HEADERS.length;
  const existing = sheet.getLastColumn() >= width
    ? sheet.getRange(1, 1, 1, width).getValues()[0]
    : [];
  let mismatch = existing.length !== width;
  if (!mismatch) {
    for (let i = 0; i < width; i++) {
      if (cleanString_(existing[i]) !== SECTION_TREE_HEADERS[i]) {
        mismatch = true;
        break;
      }
    }
  }
  if (mismatch) {
    ensureSheetHasColumns_(sheet, width);
    sheet.getRange(1, 1, 1, width).setValues([SECTION_TREE_HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function readSectionTreeIndex_(propertyId) {
  const spreadsheet = getDashboardStorageSpreadsheet_(propertyId);
  const sheet = spreadsheet.getSheetByName(SECTION_TREE_SHEET);
  const empty = { byId: {}, bySlug: {} };
  if (!sheet || sheet.getLastRow() < 2) {
    return empty;
  }
  ensureSectionTreeHeader_(sheet);
  const columns = getSheetColumnsByHeaders_(sheet, [
    'section_id',
    'slug',
    'display_name',
    'root_name',
    'level_1',
    'level_2',
    'level_3'
  ]);
  const rowCount = columns.section_id.length;
  const byId = {};
  const bySlug = {};
  for (let i = 0; i < rowCount; i++) {
    const record = {
      sectionId: cleanString_(columns.section_id[i]),
      slug: cleanString_(columns.slug[i]),
      displayName: cleanString_(columns.display_name[i]),
      rootName: cleanString_(columns.root_name[i]),
      level1: cleanString_(columns.level_1[i]),
      level2: cleanString_(columns.level_2[i]),
      level3: cleanString_(columns.level_3[i])
    };
    if (record.sectionId) {
      byId[record.sectionId] = record;
    }
    if (record.slug) {
      bySlug[record.slug] = record;
    }
  }
  return { byId: byId, bySlug: bySlug };
}

function ensureStoryCacheHeader_(sheet) {
  const width = STORY_CACHE_HEADERS.length;
  const existing = sheet.getLastColumn() >= width
    ? sheet.getRange(1, 1, 1, width).getValues()[0]
    : [];
  let mismatch = existing.length !== width;
  if (!mismatch) {
    for (let i = 0; i < width; i++) {
      if (cleanString_(existing[i]) !== STORY_CACHE_HEADERS[i]) {
        mismatch = true;
        break;
      }
    }
  }
  if (mismatch) {
    ensureSheetHasColumns_(sheet, width);
    sheet.getRange(1, 1, 1, width).setValues([STORY_CACHE_HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function upsertStoryCacheStories_(propertyId, sheet, stories, syncedAt) {
  const cacheConfig = getStoryCacheConfig_(propertyId);
  const columns = getSheetColumnsByAliases_(sheet, cacheConfig.columns, false);
  const rowCount = columns.id.length || columns.slug.length || 0;
  const existingRowsById = {};

  for (let i = 0; i < rowCount; i++) {
    const id = cleanString_(columns.id[i]);
    if (id) {
      existingRowsById[id] = i + 2;
    }
  }

  const syncStamp = (syncedAt instanceof Date ? syncedAt : new Date()).toISOString();
  const updates = [];
  const appends = [];

  for (let i = 0; i < stories.length; i++) {
    const row = normalizeQtStoryForCacheRow_(stories[i], syncStamp);
    if (!row.id) {
      continue;
    }
    const values = storyCacheRowToArray_(row);
    const existingRow = existingRowsById[row.id];
    if (existingRow) {
      updates.push({ row: existingRow, values: values });
    } else {
      appends.push(values);
    }
  }

  for (let i = 0; i < updates.length; i++) {
    sheet.getRange(updates[i].row, 1, 1, STORY_CACHE_HEADERS.length).setValues([updates[i].values]);
  }
  if (appends.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, appends.length, STORY_CACHE_HEADERS.length).setValues(appends);
  }

  return {
    updated: updates.length,
    inserted: appends.length
  };
}

function normalizeQtStoryForCacheRow_(story, syncedAtIso) {
  const sections = Array.isArray(story && story.sections) ? story.sections : [];
  const tags = Array.isArray(story && story.tags) ? story.tags : [];
  const firstSection = sections.length ? sections[0] : null;
  const primarySection = cleanString_(
    firstSection && (firstSection['display-name'] || firstSection.name || firstSection.slug)
  );
  return {
    id: cleanString_(story && story.id),
    headline: cleanString_(story && story.headline),
    slug: cleanString_(story && story.slug),
    url: cleanString_(story && story.url),
    author_name: cleanString_(story && story['author-name']),
    author_id: cleanString_(story && story['author-id']),
    published_at_ms: cleanString_(story && story['published-at']),
    published_at_iso: toIsoStringOrBlank_(story && story['published-at']),
    first_published_at_ms: cleanString_(story && story['first-published-at']),
    first_published_at_iso: toIsoStringOrBlank_(story && story['first-published-at']),
    last_published_at_ms: cleanString_(story && story['last-published-at']),
    last_published_at_iso: toIsoStringOrBlank_(story && story['last-published-at']),
    story_template: cleanString_(story && story['story-template']),
    primary_section: primarySection,
    sections_json: JSON.stringify(sections),
    tags_json: JSON.stringify(tags),
    subheadline: cleanString_(story && story.subheadline),
    hero_image_key: cleanString_(story && story['hero-image-s3-key']),
    metadata_json: JSON.stringify(story && story.metadata ? story.metadata : {}),
    synced_at_iso: cleanString_(syncedAtIso)
  };
}

function storyCacheRowToArray_(row) {
  return STORY_CACHE_HEADERS.map(function (header) {
    return row && row[header] != null ? row[header] : '';
  });
}

function pruneStoryCacheSheet_(propertyId, sheet, now) {
  const cacheConfig = getStoryCacheConfig_(propertyId);
  const columns = getSheetColumnsByAliases_(sheet, cacheConfig.columns, false);
  const rowCount = columns.lastPublishedAt.length || columns.publishedAt.length || 0;
  if (!rowCount) {
    return { deletedRows: 0 };
  }

  const cutoff = new Date(now.getTime());
  cutoff.setMonth(cutoff.getMonth() - STORY_CACHE_RETENTION_MONTHS);
  const rowsToDelete = [];

  for (let i = 0; i < rowCount; i++) {
    const parsed = parseSheetDate_(columns.lastPublishedAt[i] || columns.publishedAt[i]);
    if (parsed && parsed.getTime() < cutoff.getTime()) {
      rowsToDelete.push(i + 2);
    }
  }

  deleteSheetRows_(sheet, rowsToDelete);
  return {
    deletedRows: rowsToDelete.length
  };
}

function repairStoryCacheIsoColumns_(propertyId) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  const sheet = getStoryCacheSheet_(property, true);
  ensureStoryCacheHeader_(sheet);

  const requiredHeaders = [
    'published_at_ms',
    'published_at_iso',
    'first_published_at_ms',
    'first_published_at_iso',
    'last_published_at_ms',
    'last_published_at_iso'
  ];
  const columns = getSheetColumnsByHeaders_(sheet, requiredHeaders);
  const rowCount = columns.published_at_ms.length;
  const stats = {
    propertyId: property,
    spreadsheetId: sheet.getParent().getId(),
    sheetName: sheet.getName(),
    rowCount: rowCount,
    updatedRows: 0,
    publishedAtIsoFilled: 0,
    firstPublishedAtIsoFilled: 0,
    lastPublishedAtIsoFilled: 0
  };

  if (!rowCount) {
    return stats;
  }

  const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headerIndex = buildHeaderIndex_(headerRow);
  const updatedRowMap = {};
  const publishedAtIso = columns.published_at_iso.slice();
  const firstPublishedAtIso = columns.first_published_at_iso.slice();
  const lastPublishedAtIso = columns.last_published_at_iso.slice();

  for (let i = 0; i < rowCount; i++) {
    if (!cleanString_(publishedAtIso[i])) {
      const repairedPublishedAt = toIsoStringOrBlank_(columns.published_at_ms[i]);
      if (repairedPublishedAt) {
        publishedAtIso[i] = repairedPublishedAt;
        stats.publishedAtIsoFilled++;
        updatedRowMap[i] = true;
      }
    }

    if (!cleanString_(firstPublishedAtIso[i])) {
      const repairedFirstPublishedAt = toIsoStringOrBlank_(columns.first_published_at_ms[i]);
      if (repairedFirstPublishedAt) {
        firstPublishedAtIso[i] = repairedFirstPublishedAt;
        stats.firstPublishedAtIsoFilled++;
        updatedRowMap[i] = true;
      }
    }

    if (!cleanString_(lastPublishedAtIso[i])) {
      const repairedLastPublishedAt = toIsoStringOrBlank_(columns.last_published_at_ms[i]);
      if (repairedLastPublishedAt) {
        lastPublishedAtIso[i] = repairedLastPublishedAt;
        stats.lastPublishedAtIsoFilled++;
        updatedRowMap[i] = true;
      }
    }
  }

  stats.updatedRows = Object.keys(updatedRowMap).length;

  if (!stats.updatedRows) {
    return stats;
  }

  sheet.getRange(2, requireHeader_(headerIndex, 'published_at_iso', sheet.getName()) + 1, rowCount, 1)
    .setValues(publishedAtIso.map(function (value) { return [value]; }));
  sheet.getRange(2, requireHeader_(headerIndex, 'first_published_at_iso', sheet.getName()) + 1, rowCount, 1)
    .setValues(firstPublishedAtIso.map(function (value) { return [value]; }));
  sheet.getRange(2, requireHeader_(headerIndex, 'last_published_at_iso', sheet.getName()) + 1, rowCount, 1)
    .setValues(lastPublishedAtIso.map(function (value) { return [value]; }));

  return stats;
}

function getSourceSheet_(propertyId, sheetKey, required) {
  const source = getContentSourceConfig_(propertyId);
  const candidates = source && source.sheetNames && source.sheetNames[sheetKey]
    ? source.sheetNames[sheetKey]
    : [];
  if (!candidates.length) {
    if (required) {
      throw new Error('No sheet candidates configured for "' + sheetKey + '" in property source.');
    }
    return null;
  }

  const spreadsheet = getContentSpreadsheet_(propertyId);
  for (let i = 0; i < candidates.length; i++) {
    const sheet = spreadsheet.getSheetByName(candidates[i]);
    if (sheet) {
      return sheet;
    }
  }

  if (required) {
    throw new Error('Missing sheet for "' + sheetKey + '". Tried: ' + candidates.join(', '));
  }
  return null;
}

function getDashboardSpreadsheet_() {
  if (SOURCE_SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SOURCE_SPREADSHEET_ID);
  }
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    return active;
  }
  const fallback = CONTENT_SOURCE_CONFIG[DEFAULT_PROPERTY];
  if (fallback && fallback.spreadsheetId) {
    return SpreadsheetApp.openById(fallback.spreadsheetId);
  }
  throw new Error('No active spreadsheet found and no fallback spreadsheetId configured. Set SOURCE_SPREADSHEET_ID in code.gs.');
}

function getDashboardStorageSpreadsheet_(propertyId) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  if (SOURCE_SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SOURCE_SPREADSHEET_ID);
  }
  if (shouldUseStoryCache_(property)) {
    return getStoryCacheSpreadsheet_(property);
  }
  return getContentSpreadsheet_(property);
}

function getOrCreateAutoRefreshLogSheet_(propertyId) {
  const spreadsheet = getDashboardStorageSpreadsheet_(propertyId);
  let sheet = spreadsheet.getSheetByName(AUTO_REFRESH_LOG_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(AUTO_REFRESH_LOG_SHEET);
  }
  ensureAutoRefreshLogHeader_(sheet);
  return sheet;
}

function getOrCreateDashboardSnapshotSheet_(propertyId) {
  const spreadsheet = getDashboardStorageSpreadsheet_(propertyId);
  let sheet = spreadsheet.getSheetByName(DASHBOARD_SNAPSHOT_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(DASHBOARD_SNAPSHOT_SHEET);
  }
  ensureDashboardSnapshotHeader_(sheet);
  return sheet;
}

function getOrCreateHourlySnapshotsSheet_(propertyId) {
  const spreadsheet = getDashboardStorageSpreadsheet_(propertyId);
  let sheet = spreadsheet.getSheetByName(HOURLY_SNAPSHOTS_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(HOURLY_SNAPSHOTS_SHEET);
  }
  ensureHourlySnapshotsHeader_(sheet);
  return sheet;
}

function ensureDashboardSnapshotHeader_(sheet) {
  const width = DASHBOARD_SNAPSHOT_HEADERS.length;
  const existing = sheet.getLastColumn() >= width
    ? sheet.getRange(1, 1, 1, width).getValues()[0]
    : [];
  let mismatch = existing.length !== width;
  if (!mismatch) {
    for (let i = 0; i < width; i++) {
      if (cleanString_(existing[i]) !== DASHBOARD_SNAPSHOT_HEADERS[i]) {
        mismatch = true;
        break;
      }
    }
  }
  if (mismatch) {
    sheet.getRange(1, 1, 1, width).setValues([DASHBOARD_SNAPSHOT_HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function ensureHourlySnapshotsHeader_(sheet) {
  const width = HOURLY_SNAPSHOT_HEADERS.length;
  const existing = sheet.getLastColumn() >= width
    ? sheet.getRange(1, 1, 1, width).getValues()[0]
    : [];
  let mismatch = existing.length !== width;
  if (!mismatch) {
    for (let i = 0; i < width; i++) {
      if (cleanString_(existing[i]) !== HOURLY_SNAPSHOT_HEADERS[i]) {
        mismatch = true;
        break;
      }
    }
  }
  if (mismatch) {
    sheet.getRange(1, 1, 1, width).setValues([HOURLY_SNAPSHOT_HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function writeDashboardSnapshot_(data) {
  if (!data || !data.meta || !data.meta.propertyId) {
    return;
  }

  try {
    const propertyId = sanitizePropertyId_(data.meta.propertyId);
    const payload = JSON.stringify(data);
    const chunks = splitBySize_(payload, DASHBOARD_SNAPSHOT_CHUNK_SIZE);
    const sheet = getOrCreateDashboardSnapshotSheet_(propertyId);
    const row = findDashboardSnapshotRow_(sheet, propertyId);
    const targetRow = row || (sheet.getLastRow() + 1);
    ensureSheetHasColumns_(sheet, DASHBOARD_SNAPSHOT_CHUNK_COL_START - 1 + chunks.length);

    const updatedBy = cleanString_(Session.getActiveUser().getEmail()) || 'unknown';
    const metaRow = [
      propertyId,
      new Date(),
      cleanString_(data.meta.startDate),
      cleanString_(data.meta.endDate),
      chunks.length,
      updatedBy
    ];
    sheet.getRange(targetRow, 1, 1, metaRow.length).setValues([metaRow]);

    const lastCol = sheet.getLastColumn();
    if (lastCol >= DASHBOARD_SNAPSHOT_CHUNK_COL_START) {
      sheet.getRange(targetRow, DASHBOARD_SNAPSHOT_CHUNK_COL_START, 1, lastCol - DASHBOARD_SNAPSHOT_CHUNK_COL_START + 1).clearContent();
    }
    if (chunks.length) {
      sheet.getRange(targetRow, DASHBOARD_SNAPSHOT_CHUNK_COL_START, 1, chunks.length).setValues([chunks]);
    }
  } catch (error) {
    Logger.log('Failed to write dashboard snapshot: ' + error);
  }
}

function writeRollingHourlySnapshots_(propertyId, storyRows, capturedAt) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  const sheet = getOrCreateHourlySnapshotsSheet_(property);
  const snapshotHour = getHourlySnapshotHour_(capturedAt || new Date());
  const snapshotHourKey = formatHourlySnapshotHourKey_(snapshotHour);
  const cutoff = new Date(snapshotHour.getTime() - HOURLY_SNAPSHOT_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  const nextRows = buildHourlySnapshotRows_(property, snapshotHourKey, storyRows, cutoff);
  const deletedRows = pruneHourlySnapshotSheet_(sheet, property, snapshotHourKey, cutoff);

  if (nextRows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, nextRows.length, HOURLY_SNAPSHOT_HEADERS.length).setValues(nextRows);
  }

  return {
    snapshotHour: snapshotHourKey,
    retentionDays: HOURLY_SNAPSHOT_RETENTION_DAYS,
    writtenRows: nextRows.length,
    prunedRows: deletedRows
  };
}

function buildHourlySnapshotRows_(propertyId, snapshotHourKey, storyRows, cutoff) {
  const rows = [];
  const input = Array.isArray(storyRows) ? storyRows : [];
  for (let i = 0; i < input.length; i++) {
    const row = input[i] || {};
    const slug = normalizePath_(row.slug);
    const publishedAt = parseSheetDate_(row.publishedAt);
    if (!slug || !publishedAt || publishedAt.getTime() < cutoff.getTime()) {
      continue;
    }
    rows.push([
      propertyId,
      snapshotHourKey,
      slug,
      cleanString_(row.storyId),
      cleanString_(row.title),
      cleanString_(row.section),
      cleanString_(row.author),
      publishedAt.toISOString(),
      toNumber_(row.pageViews),
      toNumber_(row.totalUsers)
    ]);
  }
  return rows;
}

function pruneHourlySnapshotSheet_(sheet, propertyId, snapshotHourKey, cutoff) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0;
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  const rowNumbers = [];
  for (let i = 0; i < rows.length; i++) {
    const rowPropertyId = normalizeSnapshotPropertyId_(rows[i][0]);
    const hour = parseHourlySnapshotHour_(rows[i][1]);
    const isExpired = !hour || hour.getTime() < cutoff.getTime();
    const isCurrentPropertyHour = rowPropertyId === propertyId && formatHourlySnapshotHourKey_(hour) === snapshotHourKey;
    if (isExpired || isCurrentPropertyHour) {
      rowNumbers.push(i + 2);
    }
  }

  deleteSheetRows_(sheet, rowNumbers);
  return rowNumbers.length;
}

function deleteSheetRows_(sheet, rowNumbers) {
  if (!rowNumbers || !rowNumbers.length) {
    return;
  }
  rowNumbers.sort(function (a, b) { return a - b; });
  for (let i = rowNumbers.length - 1; i >= 0; ) {
    const end = rowNumbers[i];
    let start = end;
    i--;
    while (i >= 0 && rowNumbers[i] === start - 1) {
      start = rowNumbers[i];
      i--;
    }
    sheet.deleteRows(start, end - start + 1);
  }
}

function normalizeSnapshotPropertyId_(value) {
  const raw = cleanString_(value);
  if (!raw) {
    return '';
  }
  try {
    return sanitizePropertyId_(raw);
  } catch (error) {
    return '';
  }
}

function getHourlySnapshotAnalysis_(propertyId) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  const spreadsheet = getDashboardStorageSpreadsheet_(property);
  const sheet = spreadsheet.getSheetByName(HOURLY_SNAPSHOTS_SHEET);
  const empty = {
    meta: {
      available: false,
      storyCount: 0,
      storyWithHourlyDeltasCount: 0,
      snapshotRowCount: 0,
      retentionDays: HOURLY_SNAPSHOT_RETENTION_DAYS,
      windowStart: '',
      windowEnd: ''
    },
    bestPublishWindows: [],
    lifecycleStories: []
  };
  if (!sheet || sheet.getLastRow() < 2) {
    return empty;
  }

  ensureHourlySnapshotsHeader_(sheet);
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, HOURLY_SNAPSHOT_HEADERS.length).getValues();
  const cutoff = new Date(new Date().getTime() - HOURLY_SNAPSHOT_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  const byStoryKey = {};
  let snapshotRowCount = 0;
  let minHour = null;
  let maxHour = null;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (normalizeSnapshotPropertyId_(row[0]) !== property) {
      continue;
    }
    const snapshotHour = parseHourlySnapshotHour_(row[1]);
    const slug = normalizePath_(row[2]);
    const storyId = cleanString_(row[3]);
    const publishedAt = parseSheetDate_(row[7]);
    if (!snapshotHour || !slug || !publishedAt || snapshotHour.getTime() < cutoff.getTime()) {
      continue;
    }
    const storyKey = buildHourlySnapshotStoryKey_(storyId, slug);

    if (!byStoryKey[storyKey]) {
      byStoryKey[storyKey] = {
        storyId: storyId,
        slug: slug,
        title: cleanString_(row[4]),
        section: cleanString_(row[5]) || '(No Section)',
        author: cleanString_(row[6]) || '(No Author)',
        publishedAt: publishedAt,
        points: []
      };
    }

    byStoryKey[storyKey].points.push({
      snapshotHour: snapshotHour,
      cumulativeViews: Math.max(0, toNumber_(row[8])),
      cumulativeUsers: Math.max(0, toNumber_(row[9]))
    });
    snapshotRowCount++;
    if (!minHour || snapshotHour.getTime() < minHour.getTime()) {
      minHour = snapshotHour;
    }
    if (!maxHour || snapshotHour.getTime() > maxHour.getTime()) {
      maxHour = snapshotHour;
    }
  }

  const storyKeys = Object.keys(byStoryKey);
  if (!storyKeys.length) {
    return empty;
  }

  const publishWindowAgg = {};
  const lifecycleStories = [];
  let storyWithHourlyDeltasCount = 0;

  for (let i = 0; i < storyKeys.length; i++) {
    const storyKey = storyKeys[i];
    const analysis = analyzeHourlySnapshotStory_(byStoryKey[storyKey]);
    lifecycleStories.push(analysis);
    if (analysis.hourlyPoints > 0) {
      storyWithHourlyDeltasCount++;
    }

    const bucketKey = analysis.section + '||' + analysis.publishHourIst;
    if (!publishWindowAgg[bucketKey]) {
      publishWindowAgg[bucketKey] = {
        section: analysis.section,
        publishHourIst: analysis.publishHourIst,
        storyCount: 0,
        first24hViews: 0,
        first24hUsers: 0,
        peakHourlyViews: 0
      };
    }
    publishWindowAgg[bucketKey].storyCount += 1;
    publishWindowAgg[bucketKey].first24hViews += analysis.first24hViews;
    publishWindowAgg[bucketKey].first24hUsers += analysis.first24hUsers;
    publishWindowAgg[bucketKey].peakHourlyViews += analysis.peakHourlyViews;
  }

  const bestPublishWindows = Object.keys(publishWindowAgg)
    .map(function (key) {
      const row = publishWindowAgg[key];
      const count = Math.max(1, row.storyCount);
      return {
        section: row.section,
        publishHourIst: row.publishHourIst,
        storyCount: row.storyCount,
        avgFirst24hViews: row.first24hViews / count,
        avgFirst24hUsers: row.first24hUsers / count,
        avgPeakHourlyViews: row.peakHourlyViews / count
      };
    })
    .sort(function (a, b) {
      if (b.avgFirst24hViews !== a.avgFirst24hViews) {
        return b.avgFirst24hViews - a.avgFirst24hViews;
      }
      if (b.storyCount !== a.storyCount) {
        return b.storyCount - a.storyCount;
      }
      return a.section.localeCompare(b.section);
    });

  lifecycleStories.sort(function (a, b) {
    if (b.first24hViews !== a.first24hViews) {
      return b.first24hViews - a.first24hViews;
    }
    if (b.peakHourlyViews !== a.peakHourlyViews) {
      return b.peakHourlyViews - a.peakHourlyViews;
    }
    return a.title.localeCompare(b.title);
  });

  return {
    meta: {
      available: true,
      storyCount: lifecycleStories.length,
      storyWithHourlyDeltasCount: storyWithHourlyDeltasCount,
      snapshotRowCount: snapshotRowCount,
      retentionDays: HOURLY_SNAPSHOT_RETENTION_DAYS,
      windowStart: minHour ? minHour.toISOString() : '',
      windowEnd: maxHour ? maxHour.toISOString() : ''
    },
    bestPublishWindows: bestPublishWindows,
    lifecycleStories: lifecycleStories
  };
}

function analyzeHourlySnapshotStory_(story) {
  const points = Array.isArray(story && story.points) ? story.points.slice() : [];
  points.sort(function (a, b) {
    return a.snapshotHour.getTime() - b.snapshotHour.getTime();
  });

  const deduped = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (deduped.length && deduped[deduped.length - 1].snapshotHour.getTime() === point.snapshotHour.getTime()) {
      deduped[deduped.length - 1] = point;
    } else {
      deduped.push(point);
    }
  }

  const deltas = [];
  let first24hViews = 0;
  let first24hUsers = 0;
  let peakHourlyViews = 0;
  let peakHourlyUsers = 0;
  let hoursToPeak = null;

  for (let i = 0; i < deduped.length; i++) {
    const current = deduped[i];
    const hoursSincePublish = (current.snapshotHour.getTime() - story.publishedAt.getTime()) / 3600000;
    if (hoursSincePublish >= 0 && hoursSincePublish <= 24) {
      first24hViews = Math.max(first24hViews, current.cumulativeViews);
      first24hUsers = Math.max(first24hUsers, current.cumulativeUsers);
    }
    if (i === 0) {
      continue;
    }
    const previous = deduped[i - 1];
    const deltaViews = Math.max(0, current.cumulativeViews - previous.cumulativeViews);
    const deltaUsers = Math.max(0, current.cumulativeUsers - previous.cumulativeUsers);
    const currentHoursSincePublish = (current.snapshotHour.getTime() - story.publishedAt.getTime()) / 3600000;
    deltas.push({
      snapshotHour: current.snapshotHour,
      hoursSincePublish: currentHoursSincePublish,
      views: deltaViews,
      users: deltaUsers
    });
    if (deltaViews > peakHourlyViews) {
      peakHourlyViews = deltaViews;
      peakHourlyUsers = deltaUsers;
      hoursToPeak = currentHoursSincePublish;
    }
  }

  let halfLifeHours = null;
  if (peakHourlyViews > 0 && hoursToPeak !== null) {
    const threshold = peakHourlyViews / 2;
    for (let i = 0; i < deltas.length; i++) {
      const delta = deltas[i];
      if (delta.hoursSincePublish > hoursToPeak && delta.views <= threshold) {
        halfLifeHours = delta.hoursSincePublish;
        break;
      }
    }
  }

  const latestPoint = deduped.length ? deduped[deduped.length - 1] : null;
  const latestViews = latestPoint ? latestPoint.cumulativeViews : 0;
  const publishHourIst = Utilities.formatDate(story.publishedAt, AUTO_REFRESH_TIMEZONE, 'HH:00');
  const latestDelta = deltas.length ? deltas[deltas.length - 1] : null;
  const previousDelta = deltas.length > 1 ? deltas[deltas.length - 2] : null;
  const latestHourlyViews = latestDelta ? latestDelta.views : 0;
  const previousHourlyViews = previousDelta ? previousDelta.views : 0;
  let peakStatus = 'Flat';
  if (peakHourlyViews > 0 && latestHourlyViews > 0) {
    const nearPeakThreshold = peakHourlyViews * 0.85;
    const pastPeakThreshold = peakHourlyViews * 0.6;
    const isNearPeak = latestHourlyViews >= nearPeakThreshold;
    const isGrowing = !previousDelta || latestHourlyViews >= previousHourlyViews * 1.1;
    if (isNearPeak && latestHourlyViews >= previousHourlyViews * 0.9) {
      peakStatus = 'Peaking now';
    } else if (isGrowing || (!previousDelta && latestHourlyViews > 0)) {
      peakStatus = 'Rising';
    } else if (latestHourlyViews <= pastPeakThreshold) {
      peakStatus = 'Past peak';
    } else {
      peakStatus = 'Past peak';
    }
  }

  return {
    storyId: cleanString_(story.storyId),
    slug: story.slug,
    title: cleanString_(story.title) || story.slug,
    section: cleanString_(story.section) || '(No Section)',
    author: cleanString_(story.author) || '(No Author)',
    publishedAt: story.publishedAt.toISOString(),
    publishHourIst: publishHourIst,
    snapshotCount: deduped.length,
    hourlyPoints: deltas.length,
    trackedHours: latestPoint ? Math.max(0, (latestPoint.snapshotHour.getTime() - story.publishedAt.getTime()) / 3600000) : 0,
    latestCumulativeViews: latestViews,
    latestCumulativeUsers: latestPoint ? latestPoint.cumulativeUsers : 0,
    first24hViews: first24hViews,
    first24hUsers: first24hUsers,
    peakHourlyViews: peakHourlyViews,
    peakHourlyUsers: peakHourlyUsers,
    latestHourlyViews: latestHourlyViews,
    hoursToPeak: hoursToPeak,
    halfLifeHours: halfLifeHours,
    peakStatus: peakStatus
  };
}

function buildHourlySnapshotStoryKey_(storyId, slug) {
  const cleanId = cleanString_(storyId);
  if (cleanId) {
    return 'id:' + cleanId;
  }
  return 'slug:' + normalizePath_(slug);
}

function buildStoredSnapshotMeta_(params) {
  const points = Array.isArray(params && params.dedupedPoints) ? params.dedupedPoints : [];
  const latest = points.length ? points[points.length - 1].snapshotHour : null;
  const now = params && params.now instanceof Date ? params.now : new Date();
  const lagHours = latest ? Math.max(0, Math.round((now.getTime() - latest.getTime()) / 3600000)) : null;
  const isSparse = points.length < 2;
  const isStale = lagHours !== null ? lagHours > 2 : true;
  return {
    requestedStoryId: cleanString_(params && params.requestedStoryId),
    matchedStoryId: cleanString_(params && params.matchedStoryId),
    lookupMode: cleanString_(params && params.lookupMode) || 'slug_only',
    matchedRows: points.length,
    latestSnapshotHour: latest ? latest.toISOString() : '',
    lagHours: lagHours,
    isSparse: isSparse,
    isStale: isStale,
    looksIncomplete: Boolean(isSparse || isStale)
  };
}

function readDashboardSnapshot_(propertyId) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  const spreadsheet = getDashboardStorageSpreadsheet_(property);
  const sheet = spreadsheet.getSheetByName(DASHBOARD_SNAPSHOT_SHEET);
  if (!sheet || sheet.getLastRow() < 2) {
    return { available: false, propertyId: property };
  }

  ensureDashboardSnapshotHeader_(sheet);
  const row = findDashboardSnapshotRow_(sheet, property);
  if (!row) {
    return { available: false, propertyId: property };
  }

  const rowValues = sheet.getRange(row, 1, 1, Math.max(sheet.getLastColumn(), DASHBOARD_SNAPSHOT_CHUNK_COL_START)).getValues()[0];
  const chunkCount = toNumber_(rowValues[4]);
  if (!chunkCount) {
    return { available: false, propertyId: property };
  }

  const startIndex = DASHBOARD_SNAPSHOT_CHUNK_COL_START - 1;
  const payload = rowValues.slice(startIndex, startIndex + chunkCount).join('');
  if (!payload) {
    return { available: false, propertyId: property };
  }

  try {
    const parsed = JSON.parse(payload);
    if (!parsed.meta) {
      parsed.meta = {};
    }
    parsed.meta.fromSnapshot = true;
    parsed.meta.snapshotStoredAt = toIsoDateTime_(rowValues[1]);
    return {
      available: true,
      propertyId: property,
      generatedAt: parsed.meta.generatedAt || parsed.meta.snapshotStoredAt || '',
      data: parsed
    };
  } catch (error) {
    return {
      available: false,
      propertyId: property,
      error: 'Snapshot parse failed: ' + error
    };
  }
}

function getDashboardSnapshotPayload_(propertyId) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  const spreadsheet = getDashboardStorageSpreadsheet_(property);
  const sheet = spreadsheet.getSheetByName(DASHBOARD_SNAPSHOT_SHEET);
  if (!sheet || sheet.getLastRow() < 2) {
    throw new Error('No dashboard snapshot sheet or rows available.');
  }

  ensureDashboardSnapshotHeader_(sheet);
  const row = findDashboardSnapshotRow_(sheet, property);
  if (!row) {
    throw new Error('No snapshot row found for ' + property);
  }

  const rowValues = sheet.getRange(row, 1, 1, Math.max(sheet.getLastColumn(), DASHBOARD_SNAPSHOT_CHUNK_COL_START)).getValues()[0];
  const chunkCount = toNumber_(rowValues[4]);
  if (!chunkCount) {
    throw new Error('Snapshot row has no chunk_count for ' + property);
  }

  const startIndex = DASHBOARD_SNAPSHOT_CHUNK_COL_START - 1;
  const payload = rowValues
    .slice(startIndex, startIndex + chunkCount)
    .map(function (value) { return value == null ? '' : String(value); })
    .join('');

  if (!payload) {
    throw new Error('Snapshot payload is empty for ' + property);
  }

  JSON.parse(payload);

  return {
    propertyId: property,
    row: row,
    chunkCount: chunkCount,
    generatedAt: rowValues[1],
    startDate: cleanString_(rowValues[2]),
    endDate: cleanString_(rowValues[3]),
    payload: payload
  };
}

function findDashboardSnapshotRow_(sheet, propertyId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0;
  }
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = values.length - 1; i >= 0; i--) {
    if (!cleanString_(values[i][0])) {
      continue;
    }
    const rowProperty = safePropertyId_(values[i][0]);
    if (rowProperty === propertyId) {
      return i + 2;
    }
  }
  return 0;
}

function ensureSheetHasColumns_(sheet, minCols) {
  const existing = sheet.getMaxColumns();
  if (existing < minCols) {
    sheet.insertColumnsAfter(existing, minCols - existing);
  }
}

function getOrCreateSnapshotExportLogSheet_(propertyId) {
  const spreadsheet = getDashboardStorageSpreadsheet_(propertyId);
  let sheet = spreadsheet.getSheetByName(SNAPSHOT_EXPORT_LOG_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SNAPSHOT_EXPORT_LOG_SHEET);
  }
  ensureSnapshotExportLogHeader_(sheet);
  return sheet;
}

function ensureSnapshotExportLogHeader_(sheet) {
  const width = SNAPSHOT_EXPORT_LOG_HEADERS.length;
  const existing = sheet.getLastColumn() >= width
    ? sheet.getRange(1, 1, 1, width).getValues()[0]
    : [];
  let mismatch = existing.length !== width;
  if (!mismatch) {
    for (let i = 0; i < width; i++) {
      if (cleanString_(existing[i]) !== SNAPSHOT_EXPORT_LOG_HEADERS[i]) {
        mismatch = true;
        break;
      }
    }
  }
  if (mismatch) {
    sheet.getRange(1, 1, 1, width).setValues([SNAPSHOT_EXPORT_LOG_HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function createSnapshotExportFile_(spreadsheet, fileName, payload) {
  const spreadsheetFile = DriveApp.getFileById(spreadsheet.getId());
  const parents = spreadsheetFile.getParents();
  const mimeType = MimeType.PLAIN_TEXT;
  if (parents.hasNext()) {
    return parents.next().createFile(fileName, payload, mimeType);
  }
  return DriveApp.createFile(fileName, payload, mimeType);
}

function splitBySize_(value, size) {
  const text = cleanString_(value);
  if (!text) {
    return [];
  }
  const out = [];
  for (let i = 0; i < text.length; i += size) {
    out.push(text.slice(i, i + size));
  }
  return out;
}

function ensureAutoRefreshLogHeader_(sheet) {
  const width = AUTO_REFRESH_LOG_HEADERS.length;
  const existing = sheet.getLastColumn() >= width
    ? sheet.getRange(1, 1, 1, width).getValues()[0]
    : [];
  let mismatch = existing.length !== width;
  if (!mismatch) {
    for (let i = 0; i < width; i++) {
      if (cleanString_(existing[i]) !== AUTO_REFRESH_LOG_HEADERS[i]) {
        mismatch = true;
        break;
      }
    }
  }
  if (mismatch) {
    sheet.getRange(1, 1, 1, width).setValues([AUTO_REFRESH_LOG_HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function appendAutoRefreshLog_(entry) {
  try {
    const targetPropertyIds = getAutoRefreshLogTargetPropertyIds_(entry && entry.propertyId);
    const row = [
      new Date(),
      cleanString_(entry && entry.status),
      cleanString_(entry && entry.message),
      cleanString_(entry && entry.propertyId),
      cleanString_(entry && entry.startDate),
      cleanString_(entry && entry.endDate),
      toNumber_(entry && entry.ga4ApiCalls),
      toNumber_(entry && entry.ga4RowsByPath),
      toNumber_(entry && entry.ga4RowsByReferrer),
      toNumber_(entry && entry.storyCount)
    ];
    for (let i = 0; i < targetPropertyIds.length; i++) {
      const sheet = getOrCreateAutoRefreshLogSheet_(targetPropertyIds[i]);
      sheet.appendRow(row);
    }
  } catch (error) {
    Logger.log('Failed to write auto refresh log: ' + error);
  }
}

function getAutoRefreshLogTargetPropertyIds_(propertyId) {
  const raw = cleanString_(propertyId);
  if (!raw || raw.toLowerCase() === 'all') {
    return PROPERTY_OPTIONS.map(function (item) {
      return sanitizePropertyId_(item.value);
    });
  }
  return [sanitizePropertyId_(raw)];
}

function getOrCreateUsageLogSheet_(propertyId) {
  const spreadsheet = getDashboardStorageSpreadsheet_(propertyId);
  let sheet = spreadsheet.getSheetByName(USAGE_LOG_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(USAGE_LOG_SHEET);
  }
  ensureUsageLogHeader_(sheet);
  return sheet;
}

function ensureUsageLogHeader_(sheet) {
  const width = USAGE_LOG_HEADERS.length;
  const existing = sheet.getLastColumn() >= width
    ? sheet.getRange(1, 1, 1, width).getValues()[0]
    : [];
  let mismatch = existing.length !== width;
  if (!mismatch) {
    for (let i = 0; i < width; i++) {
      if (cleanString_(existing[i]) !== USAGE_LOG_HEADERS[i]) {
        mismatch = true;
        break;
      }
    }
  }
  if (mismatch) {
    sheet.getRange(1, 1, 1, width).setValues([USAGE_LOG_HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function recordAndReadUniversalUsage_(entry) {
  recordUniversalUsage_(entry);
  return readUniversalUsageSummary_(entry && entry.propertyId ? entry.propertyId : DEFAULT_PROPERTY);
}

function recordUniversalUsage_(entry) {
  if (!entry || !entry.propertyQuota) {
    return;
  }

  try {
    const propertyId = sanitizePropertyId_(entry.propertyId || DEFAULT_PROPERTY);
    const sheet = getOrCreateUsageLogSheet_(propertyId);
    const userEmail = cleanString_(Session.getActiveUser().getEmail()) || 'unknown';
    const quota = entry.propertyQuota || {};
    const row = [
      new Date(),
      userEmail,
      cleanString_(entry.source) || 'unknown',
      propertyId,
      toNumber_(entry.apiCalls),
      toNumber_(entry.rowsProcessed),
      quotaValue_(quota, 'tokensPerHour', 'remaining'),
      quotaValue_(quota, 'tokensPerHour', 'consumed'),
      quotaValue_(quota, 'tokensPerDay', 'remaining'),
      quotaValue_(quota, 'tokensPerDay', 'consumed'),
      quotaValue_(quota, 'concurrentRequests', 'remaining'),
      quotaValue_(quota, 'concurrentRequests', 'consumed'),
      cleanString_(entry.urlPath)
    ];
    sheet.appendRow(row);
  } catch (error) {
    Logger.log('Failed to write usage log: ' + error);
  }
}

function readUniversalUsageSummary_(propertyId) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  const spreadsheet = getDashboardStorageSpreadsheet_(property);
  const sheet = spreadsheet.getSheetByName(USAGE_LOG_SHEET);
  const empty = {
    propertyId: property,
    hasData: false,
    latest: null,
    recent: []
  };
  if (!sheet || sheet.getLastRow() < 2) {
    return empty;
  }

  ensureUsageLogHeader_(sheet);
  const lastRow = sheet.getLastRow();
  const startRow = Math.max(2, lastRow - USAGE_LOG_MAX_READ_ROWS + 1);
  const numRows = lastRow - startRow + 1;
  if (numRows < 1) {
    return empty;
  }

  const values = sheet.getRange(startRow, 1, numRows, USAGE_LOG_HEADERS.length).getValues();
  const recent = [];
  let latest = null;

  for (let i = values.length - 1; i >= 0; i--) {
    const row = values[i];
    const rowProperty = safePropertyId_(row[3] || DEFAULT_PROPERTY);
    if (rowProperty !== property) {
      continue;
    }
    const stamp = toIsoDateTime_(row[0]);
    if (!stamp) {
      continue;
    }

    const point = {
      timestamp: stamp,
      source: cleanString_(row[2]),
      userEmail: cleanString_(row[1]),
      apiCalls: toNumber_(row[4]),
      rowsProcessed: toNumber_(row[5]),
      quota: {
        tokensPerHour: {
          remaining: toNullableNumber_(row[6]),
          consumed: toNullableNumber_(row[7])
        },
        tokensPerDay: {
          remaining: toNullableNumber_(row[8]),
          consumed: toNullableNumber_(row[9])
        },
        concurrentRequests: {
          remaining: toNullableNumber_(row[10]),
          consumed: toNullableNumber_(row[11])
        }
      }
    };

    if (!latest) {
      latest = point;
    }
    if (recent.length < USAGE_SERIES_POINTS) {
      recent.push(point);
    }
    if (latest && recent.length >= USAGE_SERIES_POINTS) {
      break;
    }
  }

  if (!latest) {
    return empty;
  }

  recent.reverse();
  return {
    propertyId: property,
    hasData: true,
    latest: latest,
    recent: recent
  };
}

function quotaValue_(quota, bucket, field) {
  if (!quota || !quota[bucket]) {
    return '';
  }
  const value = quota[bucket][field];
  return value === null || value === undefined ? '' : Number(value);
}

function toIsoDateTime_(value) {
  const parsed = parseSheetDate_(value);
  if (!parsed) {
    return '';
  }
  return parsed.toISOString();
}

function toIsoStringOrBlank_(value) {
  const parsed = parseSheetDate_(value);
  return parsed ? parsed.toISOString() : '';
}

function safePropertyId_(propertyId) {
  try {
    return sanitizePropertyId_(propertyId);
  } catch (error) {
    return sanitizePropertyId_(DEFAULT_PROPERTY);
  }
}

function getSheetColumnsByAliases_(sheet, aliasMap, strict) {
  const fields = Object.keys(aliasMap || {});
  const output = {};
  for (let i = 0; i < fields.length; i++) {
    output[fields[i]] = [];
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 1) {
    return output;
  }

  const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const headerIndex = buildHeaderIndex_(headerRow);
  const dataRows = lastRow - 1;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const aliases = Array.isArray(aliasMap[field]) ? aliasMap[field] : [field];
    const colIndex = findHeaderIndexByAliases_(headerIndex, aliases);
    if (colIndex < 0) {
      if (strict) {
        throw new Error('Missing header for "' + field + '" in sheet "' + sheet.getName() + '". Tried: ' + aliases.join(', '));
      }
      continue;
    }
    const values = sheet.getRange(2, colIndex + 1, dataRows, 1).getValues();
    const flat = new Array(values.length);
    for (let r = 0; r < values.length; r++) {
      flat[r] = values[r][0];
    }
    output[field] = flat;
  }

  return output;
}

function findHeaderIndexByAliases_(headerIndex, aliases) {
  for (let i = 0; i < aliases.length; i++) {
    const key = normalizeHeader_(aliases[i]);
    if (typeof headerIndex[key] === 'number') {
      return headerIndex[key];
    }
  }
  return -1;
}

function getSheetColumnsByHeaders_(sheet, requiredHeaders) {
  const normalizedHeaders = requiredHeaders.map(function (name) {
    return normalizeHeader_(name);
  });

  const output = {};
  for (let i = 0; i < normalizedHeaders.length; i++) {
    output[normalizedHeaders[i]] = [];
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 1) {
    return output;
  }

  const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const headerIndex = buildHeaderIndex_(headerRow);
  const dataRows = lastRow - 1;

  for (let i = 0; i < normalizedHeaders.length; i++) {
    const headerName = normalizedHeaders[i];
    const colIndex = requireHeader_(headerIndex, headerName, sheet.getName());
    const values = sheet.getRange(2, colIndex + 1, dataRows, 1).getValues();
    const flat = new Array(values.length);
    for (let r = 0; r < values.length; r++) {
      flat[r] = values[r][0];
    }
    output[headerName] = flat;
  }

  return output;
}

function buildHeaderIndex_(headerRow) {
  const index = {};
  for (let i = 0; i < headerRow.length; i++) {
    const key = normalizeHeader_(headerRow[i]);
    if (key) {
      index[key] = i;
    }
  }
  return index;
}

function getPathTotalsForDateRange_(propertyId, path, startDate, endDate) {
  const response = runGa4Report_({
    dateRanges: [{ startDate: startDate, endDate: endDate }],
    metrics: GA4_METRICS.map(function (name) { return { name: name }; }),
    dimensionFilter: buildPathInListFilter_([path]),
    returnPropertyQuota: true
  }, sanitizePropertyId_(propertyId));

  const row = response && response.rows && response.rows.length ? response.rows[0] : null;
  return {
    totalUsers: toNumber_(row ? getMetricValue_(row, 1) : 0),
    pageViews: toNumber_(row ? getMetricValue_(row, 0) : 0),
    apiCalls: 1,
    rowsProcessed: response && response.rows ? response.rows.length : 0,
    truncated: false,
    propertyQuota: response && response.propertyQuota ? response.propertyQuota : createPropertyQuotaSnapshot_()
  };
}

function getPropertyTotalsForDateRange_(propertyId, startDate, endDate) {
  const response = runGa4Report_({
    dateRanges: [{ startDate: startDate, endDate: endDate }],
    metrics: GA4_METRICS.map(function (name) { return { name: name }; }),
    returnPropertyQuota: true
  }, sanitizePropertyId_(propertyId));

  const row = response && response.rows && response.rows.length ? response.rows[0] : null;
  return {
    totalUsers: toNumber_(row ? getMetricValue_(row, 1) : 0),
    pageViews: toNumber_(row ? getMetricValue_(row, 0) : 0),
    apiCalls: 1,
    rowsProcessed: response && response.rows ? response.rows.length : 0,
    truncated: false,
    propertyQuota: response && response.propertyQuota ? response.propertyQuota : createPropertyQuotaSnapshot_()
  };
}

function requireHeader_(headers, headerName, sheetName) {
  const key = normalizeHeader_(headerName);
  if (typeof headers[key] !== 'number') {
    throw new Error('Missing header "' + headerName + '" in sheet "' + sheetName + '".');
  }
  return headers[key];
}

function normalizeHeader_(value) {
  return cleanString_(value).toLowerCase();
}

function parseDateInput_(value) {
  if (!value) {
    return null;
  }
  const str = String(value).trim();
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function formatGa4Date_(value) {
  const str = cleanString_(value);
  if (!str) {
    return '';
  }
  const compact = str.replace(/\D/g, '');
  if (/^\d{8}$/.test(compact)) {
    return compact.slice(0, 4) + '-' + compact.slice(4, 6) + '-' + compact.slice(6, 8);
  }
  return str;
}

function formatGa4DateHour_(value) {
  const str = cleanString_(value);
  if (!str) {
    return '';
  }
  const compact = str.replace(/\D/g, '');
  if (/^\d{10}$/.test(compact)) {
    return compact.slice(0, 4) + '-' + compact.slice(4, 6) + '-' + compact.slice(6, 8) + ' ' + compact.slice(8, 10) + ':00';
  }
  return str;
}

function parseGa4DateHour_(value) {
  const str = cleanString_(value).replace(/\D/g, '');
  if (!/^\d{10}$/.test(str)) {
    return null;
  }
  return new Date(
    Number(str.slice(0, 4)),
    Number(str.slice(4, 6)) - 1,
    Number(str.slice(6, 8)),
    Number(str.slice(8, 10)),
    0,
    0,
    0
  );
}

function parseSheetDate_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value;
  }
  if (typeof value === 'number') {
    if (value > 100000000000) {
      const epochMsDate = new Date(Math.round(value));
      return isNaN(epochMsDate.getTime()) ? null : epochMsDate;
    }
    if (value > 1000000000) {
      const epochSecondsDate = new Date(Math.round(value * 1000));
      return isNaN(epochSecondsDate.getTime()) ? null : epochSecondsDate;
    }
    const excelMs = Math.round((value - 25569) * 86400 * 1000);
    const excelDate = new Date(excelMs);
    return isNaN(excelDate.getTime()) ? null : excelDate;
  }
  const str = cleanString_(value);
  if (!str) {
    return null;
  }
  if (/^\d{13}$/.test(str)) {
    const epochMs = new Date(Number(str));
    return isNaN(epochMs.getTime()) ? null : epochMs;
  }
  if (/^\d{10}$/.test(str)) {
    const epochSeconds = new Date(Number(str) * 1000);
    return isNaN(epochSeconds.getTime()) ? null : epochSeconds;
  }
  const normalized = str.replace(/\u00a0/g, ' ').trim();
  const dayFirstMatch = normalized.match(
    /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
  );
  if (dayFirstMatch) {
    const first = Number(dayFirstMatch[1]);
    const second = Number(dayFirstMatch[2]);
    const year = Number(dayFirstMatch[3]);
    const hour = Number(dayFirstMatch[4] || 0);
    const minute = Number(dayFirstMatch[5] || 0);
    const secondValue = Number(dayFirstMatch[6] || 0);
    let day = first;
    let month = second;

    if (first <= 12 && second > 12) {
      month = first;
      day = second;
    } else if (first > 12 && second <= 12) {
      day = first;
      month = second;
    }

    const parsedManual = new Date(year, month - 1, day, hour, minute, secondValue, 0);
    if (!isNaN(parsedManual.getTime())
        && parsedManual.getFullYear() === year
        && parsedManual.getMonth() === month - 1
        && parsedManual.getDate() === day) {
      return parsedManual;
    }
  }
  const directDate = new Date(str);
  if (!isNaN(directDate.getTime())) {
    return directDate;
  }
  const match = str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/);
  if (!match) {
    return null;
  }
  return new Date(
    Number(match[3]),
    Number(match[1]) - 1,
    Number(match[2]),
    Number(match[4]),
    Number(match[5]),
    Number(match[6])
  );
}

function getHourlySnapshotHour_(value) {
  const date = parseSheetDate_(value) || new Date();
  const stamp = Utilities.formatDate(date, AUTO_REFRESH_TIMEZONE, 'yyyy-MM-dd HH:00:00');
  return parseHourlySnapshotHour_(stamp) || new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0);
}

function formatHourlySnapshotHourKey_(value) {
  const date = parseHourlySnapshotHour_(value);
  return date ? Utilities.formatDate(date, AUTO_REFRESH_TIMEZONE, 'yyyy-MM-dd HH:00:00') : '';
}

function parseHourlySnapshotHour_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), 0, 0, 0);
  }
  const str = cleanString_(value);
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) {
    return null;
  }
  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
    Number(match[6] || 0),
    0
  );
}

function formatDateForInput_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function normalizePath_(value) {
  const raw = cleanString_(value);
  if (!raw) {
    return '';
  }

  let path = raw;
  if (/^https?:\/\//i.test(raw)) {
    const noProtocol = raw.replace(/^https?:\/\//i, '');
    const firstSlash = noProtocol.indexOf('/');
    path = firstSlash === -1 ? '/' : noProtocol.slice(firstSlash);
  }

  path = path.split('?')[0].split('#')[0];
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (path.length > 1) {
    path = path.replace(/\/+$/, '');
  }
  return path.toLowerCase();
}

function sanitizePropertyId_(propertyId) {
  const clean = cleanString_(propertyId).replace(/^properties\//i, '');
  if (!/^\d+$/.test(clean)) {
    throw new Error('Invalid GA4 property id: ' + propertyId);
  }
  return 'properties/' + clean;
}

function cleanReferrer_(value) {
  const ref = cleanString_(value);
  if (!ref || ref === '(not set)' || ref === '(not set) / (not set)') {
    return '(direct/none)';
  }
  return ref;
}

function normalizeReferrerBucket_(value, sessionSourceMedium, propertyId) {
  const ref = cleanReferrer_(value);
  const sourceMedium = normalizeSourceMedium_(sessionSourceMedium);
  const source = sourceMedium.source;
  const medium = sourceMedium.medium;
  const sourceMediumText = sourceMedium.text;
  const lower = ref.toLowerCase();
  const host = extractHostFromReferrer_(ref);
  const hasTaboola = lower.indexOf('utm_referrer=taboola') !== -1
    || lower.indexOf('taboola') !== -1
    || sourceMediumText.indexOf('taboola') !== -1;

  const directRef = lower === '(direct/none)' || lower === '(none)' || lower === 'direct' || lower === 'direct/none';
  const directMedium = source === '(direct)' && (medium === '(none)' || !medium);
  if (directRef || directMedium || sourceMediumText === '(not set)' || sourceMediumText === '(not set) / (not set)') {
    return 'Direct';
  }

  if (isInternalHostForProperty_(host, propertyId)) {
    return hasTaboola ? 'Within Site Taboola' : 'Within Site';
  }

  if (host && (host === 'wa.me' || host === 'whatsapp.com' || host.endsWith('.whatsapp.com'))) {
    return 'WhatsApp';
  }
  if (source.indexOf('whatsapp') !== -1 || medium.indexOf('whatsapp') !== -1 || sourceMediumText.indexOf('wa.me') !== -1) {
    return 'WhatsApp';
  }

  const isDiscover = lower.indexOf('google discover') !== -1
    || sourceMediumText.indexOf('googlequicksearchbox / discover') !== -1
    || sourceMediumText.indexOf('newsshowcase / discover') !== -1;
  if (isDiscover) {
    return 'Google Discover';
  }

  const isGoogleNews = (host === 'news.google.com')
    || sourceMediumText.indexOf('news.google.com / referral') !== -1
    || sourceMediumText.indexOf('newsshowcase / gnews') !== -1;
  if (isGoogleNews) {
    return 'Google News';
  }

  const isGoogleSearch = (host === 'google.com' || (host && host.endsWith('.google.com')))
    || sourceMediumText.indexOf('google / organic') !== -1
    || sourceMediumText.indexOf('googlequicksearchbox / (not set)') !== -1;
  if (isGoogleSearch) {
    return 'Google Search';
  }

  if (sourceMediumText.indexOf('push-notification') !== -1 || source.indexOf('izooto') !== -1) {
    return 'Push Notification';
  }

  const socialBucket = classifySocialBucket_(host, source, medium, sourceMediumText);
  if (socialBucket) {
    return socialBucket;
  }

  if (isAiSource_(host, source, sourceMediumText)) {
    return 'AI';
  }

  if (isCampaignSource_(source, medium, sourceMediumText)) {
    return 'Other Campaign';
  }

  if (host) {
    return host;
  }
  if (sourceMediumText && sourceMediumText !== '(not set)') {
    return sourceMediumText;
  }
  return ref;
}

function normalizeSourceMedium_(value) {
  const raw = cleanString_(value).toLowerCase();
  if (!raw) {
    return { source: '', medium: '', text: '' };
  }
  const parts = raw.split('/').map(function (part) { return cleanString_(part); });
  if (parts.length >= 2) {
    return {
      source: parts[0],
      medium: parts[1],
      text: raw
    };
  }
  return {
    source: raw,
    medium: '',
    text: raw
  };
}

function classifySocialBucket_(host, source, medium, sourceMediumText) {
  const text = (sourceMediumText || '') + ' ' + (host || '') + ' ' + (source || '');
  const hasSocialMedium = medium === 'social' || (sourceMediumText || '').indexOf(' / social') !== -1;
  const hasReferralLike = hasSocialMedium || (sourceMediumText || '').indexOf(' / referral') !== -1;

  if (hostMatches_(host, ['facebook.com', 'm.facebook.com', 'lm.facebook.com']) || text.indexOf('facebook') !== -1 || text.indexOf(' meta') !== -1) {
    return 'Facebook';
  }
  if (hostMatches_(host, ['instagram.com', 'l.instagram.com']) || text.indexOf('instagram') !== -1 || text.indexOf(' ig ') !== -1) {
    return 'Instagram';
  }
  if (hostMatches_(host, ['l.threads.com', 'threads.net']) || text.indexOf('threads') !== -1) {
    return 'Threads';
  }
  if (hostMatches_(host, ['t.co', 'twitter.com', 'x.com']) || text.indexOf('twitter') !== -1 || text.indexOf('x.com') !== -1) {
    return 'X/Twitter';
  }
  if (hostMatches_(host, ['linkedin.com']) || text.indexOf('linkedin') !== -1) {
    return 'LinkedIn';
  }
  if (hostMatches_(host, ['reddit.com', 'out.reddit.com']) || text.indexOf('reddit') !== -1) {
    return 'Reddit';
  }
  if (hostMatches_(host, ['youtube.com', 'youtu.be']) || text.indexOf('youtube') !== -1) {
    return 'YouTube';
  }

  if (hasReferralLike) {
    return 'Social Other';
  }
  return '';
}

function hostMatches_(host, domains) {
  if (!host) {
    return false;
  }
  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i];
    if (host === domain || host.endsWith('.' + domain)) {
      return true;
    }
  }
  return false;
}

function isAiSource_(host, source, sourceMediumText) {
  if (host && (host.indexOf('chatgpt.com') !== -1 || host.indexOf('perplexity.ai') !== -1)) {
    return true;
  }
  if (source.indexOf('chatgpt') !== -1 || source.indexOf('perplexity') !== -1) {
    return true;
  }
  return sourceMediumText.indexOf('chatgpt') !== -1 || sourceMediumText.indexOf('perplexity') !== -1;
}

function isCampaignSource_(source, medium, sourceMediumText) {
  if (source === 'google-play' && medium === 'organic') {
    return false;
  }
  if (!source) {
    return false;
  }
  if (medium === 'referral' || medium === 'organic' || medium === 'social' || medium === 'gnews' || medium === 'discover' || medium === '(none)' || medium === '(not set)') {
    // still allow campaign-like custom values in source
  }
  if (source.indexOf('taboola_recirculation') !== -1) {
    return true;
  }
  const looksCustom = /^[a-z0-9]+(?:_[a-z0-9]+)+$/i.test(source);
  if (looksCustom && source !== 'news.google.com' && source !== 'googlequicksearchbox') {
    return true;
  }
  return sourceMediumText.indexOf(' / ') === -1 && looksCustom;
}

function isInternalHostForProperty_(host, propertyId) {
  const property = sanitizePropertyId_(propertyId || DEFAULT_PROPERTY);
  const internalDomains = property === 'properties/YOUR_GA4_PROPERTY_ID_PV'
    ? ['prajavani.net']
    : ['deccanherald.com'];
  for (let i = 0; i < internalDomains.length; i++) {
    const domain = internalDomains[i];
    if (host === domain || host.endsWith('.' + domain)) {
      return true;
    }
  }
  return false;
}

function extractHostFromReferrer_(referrer) {
  const raw = cleanString_(referrer);
  if (!raw) {
    return '';
  }

  let hostPart = '';
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) {
    hostPart = raw.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '').split('/')[0];
  } else {
    hostPart = raw.split('/')[0];
  }

  hostPart = hostPart.split('?')[0].split('#')[0].split(':')[0].trim();
  if (!hostPart) {
    return '';
  }
  hostPart = hostPart.replace(/^www\./i, '').toLowerCase();

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(hostPart)) {
    return '';
  }
  return hostPart;
}

function extractInternalPathFromReferrer_(referrer, propertyId) {
  const raw = cleanString_(referrer);
  if (!raw) {
    return '';
  }
  if (/^https?:\/\//i.test(raw)) {
    const host = extractHostFromReferrer_(raw);
    if (!isInternalHostForProperty_(host, propertyId)) {
      return '';
    }
    return normalizePath_(raw);
  }
  if (raw.startsWith('/')) {
    return normalizePath_(raw);
  }
  return '';
}

function addWithinSiteSourceAggregate_(landingPageBucket, storyBucket, destinationBucketBySource, rawReferrer, propertyId, storySlugSet, storyMetaByPath, destinationPath, rowUsers, rowViews) {
  const sourcePath = extractInternalPathFromReferrer_(rawReferrer, propertyId);
  if (!sourcePath || sourcePath === destinationPath) {
    return;
  }
  if (storySlugSet && storySlugSet[sourcePath]) {
    const storyMeta = storyMetaByPath && storyMetaByPath[sourcePath] ? storyMetaByPath[sourcePath] : {};
    addSourceAggregate_(storyBucket, sourcePath, rowUsers, rowViews, {
      title: cleanString_(storyMeta.title) || sourcePath,
      slug: sourcePath,
      url: cleanString_(storyMeta.url),
      section: cleanString_(storyMeta.section),
      author: cleanString_(storyMeta.author)
    });
    if (!destinationBucketBySource[sourcePath]) {
      destinationBucketBySource[sourcePath] = {};
    }
    const destinationMeta = storyMetaByPath && storyMetaByPath[destinationPath] ? storyMetaByPath[destinationPath] : {};
    addSourceAggregate_(destinationBucketBySource[sourcePath], destinationPath, rowUsers, rowViews, {
      title: cleanString_(destinationMeta.title) || destinationPath,
      slug: destinationPath,
      url: cleanString_(destinationMeta.url),
      section: cleanString_(destinationMeta.section),
      author: cleanString_(destinationMeta.author)
    });
    return;
  }
  addSourceAggregate_(landingPageBucket, sourcePath, rowUsers, rowViews, {
    title: sourcePath,
    slug: sourcePath,
    url: '',
    section: '',
    author: ''
  });
}

function addSourceAggregate_(bucket, key, users, views, meta) {
  const safeKey = cleanString_(key);
  if (!safeKey) {
    return;
  }
  if (!bucket[safeKey]) {
    bucket[safeKey] = {
      name: cleanString_(meta && meta.title) || safeKey,
      slug: safeKey,
      url: cleanString_(meta && meta.url),
      section: cleanString_(meta && meta.section),
      author: cleanString_(meta && meta.author),
      totalUsers: 0,
      pageViews: 0
    };
  }
  bucket[safeKey].totalUsers += toNumber_(users);
  bucket[safeKey].pageViews += toNumber_(views);
}

function toSortedSourceArray_(bucket) {
  return Object.keys(bucket)
    .map(function (key) {
      const row = bucket[key];
      return {
        name: row.name,
        slug: row.slug,
        url: row.url,
        section: row.section,
        author: row.author,
        totalUsers: toNumber_(row.totalUsers),
        pageViews: toNumber_(row.pageViews)
      };
    })
    .sort(sortByTotalUsersThenViews_);
}

function toSortedSourceDestinationMap_(bucketBySource) {
  const out = {};
  const keys = Object.keys(bucketBySource || {});
  for (let i = 0; i < keys.length; i++) {
    const sourcePath = keys[i];
    out[sourcePath] = toSortedSourceArray_(bucketBySource[sourcePath] || {});
  }
  return out;
}

function cleanString_(value) {
  return String(value == null ? '' : value).trim();
}

function toNumber_(value) {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

function toNullableNumber_(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const num = Number(value);
  return isNaN(num) ? null : num;
}

function getDimensionValue_(row, index) {
  if (!row || !row.dimensionValues || !row.dimensionValues[index]) {
    return '';
  }
  return row.dimensionValues[index].value;
}

function getMetricValue_(row, index) {
  if (!row || !row.metricValues || !row.metricValues[index]) {
    return 0;
  }
  return row.metricValues[index].value;
}
