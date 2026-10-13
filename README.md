# 📚 Bhavesh Notes — Infinite Portal

A fast, mobile-friendly academic repository for B.Tech students — semester-wise notes, previous-year papers, and syllabus, all searchable in one click.

**Live:** https://notes.thebhavesh.online

## ✨ What's inside

- **📖 Notes Dashboard** — Semesters 1–8, subject cards with note counts, file sizes on every download
- **🔍 Universal Search** — one search box across *everything*: notes, PYQ papers, subjects. Filters by semester, subject, and type (Notes / PYQ). Sort by relevance, A–Z, or newest. Press `/` anywhere to jump to search
- **📝 PYQ Papers** — 44 BTU previous-year papers (2026 → 2019) with year/session filters
- **🕘 Recently Added** — newest papers surfaced on the dashboard
- **➕ Add Notes** — drag-and-drop uploads forwarded via Telegram bot
- **📱 Fully responsive** — phones, tablets, desktops; icon-only nav on small screens, 44px touch targets
- **🔔 Extras** — notifications ticker, Document Analyzer widget, login-gated secured subjects, back-to-top, breadcrumbs

## 📂 Library at a glance

| Semester | Subjects | Contents |
|----------|----------|----------|
| Sem 1–2 | Chemistry, Physics, Maths, EME, MEFA… | Unit notes, important questions, PYQs |
| Sem 3 | AEM, Digital Electronics, DSA, OOP, Software Engg, Linux | Unit notes + 44 PYQ papers |
| Sem 4 | Discrete Maths, Microprocessor, TOC, DBMS, Python, Java | Unit notes |
| Sem 5 | OS, COA, Networks, Cloud & DevOps, ML, DMW, Distributed Systems | Unit notes |
| Sem 6 | Compiler Design, DAA, Info Security, DIP, IoT, NLP | Unit notes |
| Sem 7–8 | Deep Learning, Disaster Mgmt, Generative AI, FHI | Unit notes |

300+ files and growing. Everything lives in `public/` and is served as-is.

## 🛠 Tech stack

React 18 + Vite 5 · Plain CSS (glassmorphism dark UI) · Lucide + FontAwesome icons · GitHub Actions → GitHub Pages

## 📁 Project structure

```
├── index.html                  # title, fonts, icon CDNs
├── CNAME                       # notes.thebhavesh.online
├── public/
│   ├── notes/sem<N>/<subject>/ # unit notes (Sem 2–8)
│   ├── pyq/sem3/               # previous-year papers
│   └── …                       # Sem 1–2 legacy library
├── src/
│   ├── App.jsx                 # header, nav, search, view router
│   ├── data/notesData.js       # semesters → subjects → notes
│   ├── data/pyqData.js         # hardcoded PYQ index
│   ├── data/fileSizes.js       # auto-generated file-size manifest
│   ├── lib/searchIndex.js      # universal search engine
│   ├── components/             # SearchBar, BackToTop, RecentlyAdded…
│   ├── pages/                  # NotesHub, PyqFinder, SearchResults, AddNotesForm
│   └── styles/App.css          # responsive design system
└── .github/workflows/          # deploy to Pages on push to main
```

## 🚀 Deploy

Push to `main` — the workflow builds and deploys to GitHub Pages automatically. Custom domain is set via `CNAME` + the Pages API; DNS CNAME `notes` → `Bhavesh189.github.io` in the domain's DNS panel.

---

Built with ❤️ by [Bhavesh Sharma](https://github.com/Bhavesh189) for every student cramming at 2 AM.
