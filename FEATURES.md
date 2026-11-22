# Bhavesh Notes — Features Inventory

Every feature on the site, counted honestly. A feature is listed only if it
is **real and working** — no dead buttons, no placeholders. Counted
2026-11-23 (INFINITY mission, overnight build).

**Grand total: 148 features**

| Batch | What | Count |
|-------|------|-------|
| F1 | My Study hub (`bbbc8af`) | 30 |
| F2 | Viewer reading tools | 17 |
| F3 | Search & discovery | 14 |
| F3 | Notes lists (NotesHub) | 25 |
| F3 | Collections, flashcards & quiz | 23 |
| F4 | App shell, navigation & sharing | 32 |
| — | Chatbot depth upgrade | 5 |
| — | Handwritten notes | 2 |
| **Total** | | **148** |

Deliberately **not** built: a "New this week" badge — it conflicts with the
owner's order to remove the Recently Added section (2026-11-22).

---

## F1 — My Study hub (30) · `src/pages/MyStudy.jsx`, `src/lib/study.js`

1. Streak counter (current + best) — `getStreak()`
2. Streak freeze (1 per week, keeps a missed day from breaking the streak)
3. Daily goal setter (minutes/day)
4. Today summary card (minutes, pages, notes today)
5. Level / XP (XP from pages read, level thresholds)
6. Pomodoro timer (25/5, in-hub)
7. Continue reading / resume page (last note + page)
8. Per-note progress bar (pages read vs total)
9. Mark note done
10. Revision due queue (1 / 3 / 7-day spaced repetition)
11. On-this-day (what you read a year ago)
12. Stats dashboard (notes done, pages, minutes, all-time)
13. Weekly bars (this week vs last week, per-day minutes)
14. Per-subject progress bars
15. Achievements / badges (first note, 7-day streak, 100 pages…)
16. Exam countdown (days left, editable date)
17. Exam plan generator (splits remaining syllabus across days left)
18. Syllabus tracker (tick units done per semester)
19. Font-size setting (S / M / L)
20. Reduce motion toggle
21. High contrast toggle
22. Haptics toggle
23. Low-data mode toggle
24. Default viewer fit setting (width / page)
25. Export all data (JSON download)
26. Import data (JSON restore)
27. Reset everything (with confirm)
28. Grounded chatbot (answers quoted from the notes — see also §Chatbot)
29. Viewer resume page + zoom memory (reopens where you left off)
30. `/` search shortcut + `Esc` to leave search

## F2 — Viewer reading tools (17) · `src/components/ImageViewer.jsx`, `src/lib/pageMarks.js`

1. Zoom presets (50 / 75 / 100 / 150 / 200%)
2. Zoom slider (continuous)
3. Page thumbnails filmstrip (bottom; lazy thumbs, flag dots, page-bookmark icons)
4. Two-page spread toggle (desktop)
5. Rotate page 90° (cycles)
6. Reading ruler / focus line (follows the pointer)
7. Focus mode (hides all chrome; floating "Show controls")
8. Per-page annotations (sticky notes, listed in the tools panel)
9. Highlight regions (drag a rectangle; click in highlight mode to delete)
10. Page flags — Confusing / Important / Revise (colour dots on the filmstrip)
11. "Jump to syllabus topic" chip (opens the subject's syllabus)
12. Slideshow auto-advance (3 / 5 / 8 s; stops at the last page)
13. Night-reading brightness slider (50–100%)
14. Quality toggle — Fast (preload next page) / Sharp (preload 3 ahead)
15. Double-tap / double-click to zoom (1.0× ↔ 2.0×)
16. "Up next" button on the last page (next unread note in the subject)
17. Swipe left/right to change page; swipe down to close (touch)

## F3 — Search & discovery (14) · `src/lib/searchIndex.js`, `src/components/SearchBar.jsx`, `src/pages/SearchResults.jsx`

1. Search operators — `sem:`, `sub:`, `type:pyq|note`, `year:` (hard filters)
2. Did-you-mean on zero results (Levenshtein, distance ≤ 2)
3. Result snippets with matched terms **bolded** + subject/semester/session meta
4. Live suggestions (top 6 matches as you type)
5. Recent searches (tap to re-run, × to delete one)
6. Voice search (Web Speech API, `en-IN`, listening state)
7. Operator hint chips (`sem:3 dbms`, `type:pyq year:2024`, …)
8. PYQ facets (year dropdown + midterm/endterm select)
9. Copy search link (`#search?q=…`, clipboard with prompt fallback)
10. Trending searches row (when idle; from local per-term counts)
11. No-results card (did-you-mean button, PYQ-papers shortcut, Request button)
12. "Request this note" (stored locally, shown in My Study)
13. Search history recording + per-term counts (`bn-search-counts`)
14. Trending-searches computation (`getTrendingSearches`)

## F3 — Notes lists (25) · `src/pages/NotesHub.jsx`, `src/lib/noteMeta.js`

1. Unit filter chips (Unit 1…N parsed from titles)
2. Type filter (diagrams / formula / summary / typed / handwritten)
3. Sort — name / pages / least-read
4. Status filter (fresh / in progress / done) + unread-only toggle
5. Compact density toggle
6. Grid / list view toggle
7. "Search in {subject} only" (scoped search via `bn-search-set`)
8. Bulk "Add Unit X to collection" (when a unit is filtered)
9. Progress ring per subject card (SVG, % done)
10. Last-opened line on subject cards
11. Next-unread line on subject cards
12. Pages meta on every row
13. Reading-time estimate (~N min, pages × 1.5)
14. Typed / Handwritten badge (from manifest `textPages/pages`)
15. Resume p.N (last page read)
16. Status label (✓ Done / In progress)
17. Share note link (Web Share API, clipboard fallback; records share count)
18. Add to collection per row
19. Quote of the day (rotates by date)
20. Welcome-back card (last-read note + Continue)
21. Recently-viewed rail ("Pick up where you left off")
22. Most-shared strip (top 3 by local share counts)
23. Semester share button (copies a `#semN` deep link)
24. "Surprise me" — random unread note
25. Smart empty states (no notes at all vs no notes match filters, with clear-filters)

## F3 — Collections, flashcards & quiz (23) · `src/pages/Bookmarks.jsx`, `src/lib/study.js`

1. Collections manager — create
2. Rename inline
3. Recolour (color input)
4. Delete (with confirm)
5. Archive / restore
6. Duplicate
7. Collection cover (first note's page-001 thumbnail)
8. Collection progress bar + counts (notes / pages / ~mins / done %)
9. Share collection as a link (`#col=` base64-JSON; importable on any device)
10. Print checklist (titles + checkboxes, print-only area + Print button)
11. Collection detail — drag-to-reorder (HTML5 drag)
12. Up / down reorder buttons
13. Read-later queue (Queue button opens the first note; viewer advances through it)
14. Saved-pages list (opens at the exact saved page)
15. Confusing-pages list (opens at the exact flagged page)
16. Flashcards due list (flip to reveal)
17. Flashcard grading — Again / Hard / Easy (SM-2-lite: 1 / 2 / 4 / 7 / 14 / 30 days)
18. Make-flashcard form (note picker from bookmarks)
19. Make-quiz form (question + answer, reveal-answer, delete)
20. Flashcard CRUD (add / delete)
21. Quiz CRUD (add / delete)
22. Import shared collection (`bn-import-collection` event from a `#col=` link)
23. Collection picker dialog (existing collections + create-new inline)

## F4 — App shell, navigation & sharing (32) · `src/App.jsx`, `src/components/CommandPalette.jsx`, `src/pages/TopicsAZ.jsx`, `public/manifest.webmanifest`, `public/sw.js`

1. Command palette (Ctrl/⌘+K) — fuzzy jump to notes, subjects, PYQ, actions; arrow keys + Enter
2. SearchBar `onNavigate` wiring (search results jump to views)
3. Scoped search listener (`bn-search-set` event from NotesHub)
4. Shared-collection link import (`#col=` hash → import → Bookmarks)
5. Header streak chip (🔥 current streak; opens My Study)
6. "What's new" changelog panel (header sparkles button)
7. Shortcuts cheat-sheet modal (`?` key)
8. `Esc` closes every overlay (palette, cheat-sheet, what's new, viewer, search)
9. Mobile bottom navigation (Home / Search / Saved / Study; badge count)
10. Topics A–Z page (every note title, A–Z, filterable, tap to open)
11. Guided path per semester ("Start here" — first unread note in order)
12. Copy citation per note (`"{title}, {semester}, Bhavesh Notes"`)
13. `F` key fullscreen in the viewer
14. "Frequently read together" (co-view counts from local history; opens from the viewer)
15. "Handwritten" badge in the viewer (marks re-set pages)
16. OG / Twitter meta tags + `og-cover.png` (social sharing cards)
17. PWA manifest (`manifest.webmanifest`, installable)
18. Service worker (caches app shell + opened note pages; offline reads)
19. Offline fallback page (`offline.html`)
20. App shortcuts in the manifest (Search, My Study, Bookmarks, PYQ)
21. Dyslexia-friendly font toggle (Lexend)
22. Line-height slider (1.3–2.0)
23. Letter-spacing slider (0–0.08em)
24. Weekly report card in My Study (this week vs last week, notes, pages)
25. Personal records in My Study (most-pages day, longest session, earliest/latest study time)
26. Share my progress (text summary: notes done, pages, minutes, streak)
27. Share my revision plan (due list as text)
28. Invite a friend (copies the site link)
29. Send to myself (WhatsApp link)
30. Requested-notes list in My Study (from "Request this note")
31. Accessibility pass (aria-labels on icon buttons, dialog roles, landmarks)
32. Safe-area / notch support (bottom nav + footer respect `env(safe-area-inset-*)`)

## Chatbot depth upgrade (5) · `src/lib/notesRag.js`, `src/components/AiChat.jsx`

1. Longer excerpts (~700 chars, was ~360) around the matched terms
2. "Show more from these pages" — a second excerpt from a later part of the same page
3. One-line synthesis ("In short: …") leading every grounded answer
4. Follow-up question suggestions ("Tell me more about …") as tap-to-ask chips
5. Up to 4 quoted hits per answer (was 3)

Groundedness is unchanged and non-negotiable: answers quote the notes'
own text with title + page; if the notes do not contain it, the bot says
so honestly. "Who created you?" is answered correctly (Bhavesh Sharma)
but is never advertised — no suggestion chip; the credit lives only in the
small footer "Made by Bhavesh Sharma".

## Handwritten notes (2) · `scripts/handwrite.mjs`, `scripts/handwrite-notes.mjs`, `scripts/render-notes.mjs`

1. Build-time handwriting conversion — typed Sem 2–3 notes re-set in Kalam
   (handwriting font) on ruled notebook paper, blue ball-pen ink, red
   headings, per-line rotation + jitter, hand-drawn bullet dots, preserved
   lists and headings. Integrated into the prebuild so it survives deploys
   (idempotent via `hwSha`). **528 of 884 pages converted (60%)** across
   25 typed Sem 2–3 docs; the rest keep their original image (see below).
2. Viewer serves handwritten pages — manifest `hwPages` per doc; the viewer
   loads `/generated/<dir>/hw/page-NNN.jpg` for converted pages and the
   original otherwise, with a "Handwritten" badge.

**Not converted, by design (fidelity first):** pages that do not fit 1:1 at
a readable size (dense 2,000–3,000-char pages), equation-heavy pages
(Engineering Mathematics — vector-path equations), code pages (OOP / Linux
shell listings), table pages, diagram/figure pages, and scan pages. A page
that cannot be converted faithfully keeps its original — count never beats
quality. Sem 1 has no note files (48 catalog entries point to missing
files); Sem 4+ is out of scope per the owner's order; PYQ is excluded.

---

## Standing rules (never change)

- Notes = page images only, **no download**. PYQ / syllabus = PDF + download allowed.
- GA4 (`G-NT7F2EBRZV`) stays. "See Result" stays removed. "Recently Added" stays removed.
- Text is never baked into images. Portfolio (`thebhavesh.online`) untouched.
