# Google Analytics 4 setup — CollageNotes

Branch: `feature/pdf-viewer-analytics` (NOT merged, NOT deployed — preview only
until Bhavesh approves).

## Status: WIRED — ID installed 2026-11-22

- **Measurement ID: `G-NT7F2EBRZV`** — wired directly into the `gtag.js`
  snippet in `index.html` (a GA Measurement ID is public by design — it
  appears in page source; no env var needed).
- Stream: **"Notes Website"**, URL https://notes.thebhavesh.online/,
  Stream ID 16392637323.
- Dashboard showed "No data received in past 48 hours" before this change
  — expected, the tag was never installed.
- **Verification:** the tag firing is checked by network requests
  (`gtag/js` + `collect`) in headless Chrome — NOT by the GA dashboard.
  GA data can take up to 48h to appear in reports.

## What was added

- **GA4 loader** in `index.html` — loads `gtag.js` with the ID above.
- **SPA pageviews** in `src/App.jsx` — the app is hash-routed (`#sem1`…`#sem8`)
  with views notes / pyq / search / add-notes / bookmarks, so GA would
  otherwise count only the first load. `gtag('config', …, { send_page_view:
  false })` turns off the automatic page_view and the app sends one on every
  view/semester change instead, with `page_path` like `/#sem3`.
- **`view_pdf` event** in `src/components/DocViewer.jsx` (helper in
  `src/lib/analytics.js`) — fires once per document open with
  `file_title`, `semester`, `source` (notes / pyq / search / bookmark) and
  `file_type`. This is the metric that matters most: which notes get read.
- **PDF viewer upgrades** (same branch) — page jump, in-PDF search
  (page-level, no word highlight — the text layer is off for copy
  protection), arrow-key navigation, fit-width / 100% toggle, fullscreen
  button, download button removed, copy blocked, watermark
  "thebhavesh.online" on every page. See `src/components/DocViewer.jsx`.

## To verify after deploy (Bhavesh)

GA4 → Reports → Realtime — open the site, switch semesters, open a PDF;
activity shows within ~30 seconds. Events → `view_pdf` shows which files
were opened. Full reports can lag up to 48h.

> **GTM is not GA4:** Bhavesh also sent a Google Tag Manager container
> snippet (`GTM-NXPQFM9D`). That is a Tag Manager container ID, NOT a GA4
> Measurement ID, and the pasted snippet was an incomplete mix (async
> `gtm.js` load + a `gtag` stub) that tracks nothing on its own. It is
> deliberately NOT wired in. GTM is a separate, later decision: if Tag
> Manager is ever wanted, it needs its own full snippet + a GA4 tag
> configured inside the GTM container.

## Before AdSense (later, not now)

AdSense approval wants a **privacy policy page** that discloses Google
Analytics + advertising cookies, plus a cookie-consent banner for EU
visitors. That page is NOT built in this branch — it is a separate job to do
before applying for AdSense. Traffic first, ads later.

## What GA4 shows (once live)

- Realtime / Pages and screens: views per page (`/#sem1` … `/#sem8`,
  `/` for the dashboard), so you know which semester gets the traffic.
- Events → `view_pdf`: open count per `file_title` (+ `semester` breakdown)
  — which notes are actually read.
- If views grow: Acquisition tells you where traffic comes from, which is
  what AdSense cares about.
