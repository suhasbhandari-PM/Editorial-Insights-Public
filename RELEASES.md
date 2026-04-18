# Release Notes

High-level feature history for the Editorial Insights analytics dashboard.

---

## Phase 1 — GA4 Dashboard Foundation

- GA4 + Google Search Console content analytics dashboard built on Google Apps Script
- Story-level metrics: page views, total users, referrer breakdown per URL
- Section, author, tag, and template aggregate tables
- Date-range filtering with Yesterday / Last 7 / Last 30 presets
- Property-level total users and page views KPI cards
- Landing page and pagePath metric modes
- Usage logging for GA4 API quota tracking

---

## Phase 2 — Drilldown and Referrer Views

- Drilldown navigation from group tables into story lists
- Referrer drilldown panel per story and per group
- HHI (Herfindahl–Hirschman Index) as virality/concentration metric
- Paginated full-table views with see-more actions
- Referrer interaction wiring across group and URL views

---

## Phase 3 — URL Trend and Hourly Snapshots

- URL trend view: hourly referrer time series per story
- Hourly snapshot table and scheduled refresh pipeline
- Dashboard snapshots stored per property spreadsheet
- Story cache sync and hourly lookup integration
- IST date presets and DD-MM-YYYY date format

---

## Phase 4 — Search Console Split and Section Tree

- Search Console metrics split into Search and Discover tabs
- Section tree synced from Quintype CMS per property
- Section family rollup and average row in group tables
- Multi-source sheet support with webapp-safe spreadsheet fallback
- Column sorting on drilldown stories table

---

## Phase 5 — UX and Drilldown Polish

- Drilldown: referrer donut charts per story and group
- Within-site source drilldown panels
- Stored URL trend view from dashboard snapshot (no live GA4 call)
- Search filter on drilldown stories table
- Environment-aware branding (staging vs production)

---

## Phase 6 — Static Demo Mode

- Standalone `dashboard.html` for GitHub Pages — no Apps Script dependency
- Loads pre-built snapshot JSON directly via `fetch()`
- All rendering, drilldowns, sorting, and filtering work offline
- Live GA4 fetch and URL trend disabled; snapshot data pre-loaded on page load

