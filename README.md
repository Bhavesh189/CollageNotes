# Bhavesh Notes — Infinite Portal

A React web app where college students can browse and download semester-wise study notes (PDFs, docs, and images), hosted right in the repo.

## What it does

- **Notes dashboard** — pick a semester tab (Semester 1 / Semester 2), browse subjects as visual cards, and open or download the linked notes.
- **Some subjects are access-gated** — a login modal prompts before opening secured subjects (login state kept in the browser's localStorage).
- **Add Notes form** — drag-and-drop a file, enter a topic and subject, and submit it; submissions are forwarded through a Telegram bot (API placeholders are injected from repository secrets during the deploy workflow).
- **Extras on the page** — a notifications ticker, a floating "Document Analyzer AI" widget, a "See Result" link, a scroll-progress bar, and a glowing glassmorphism UI.
- **Large static library** — dozens of PDFs/DOCs/images (Chemistry units, Maths, Physics, PYQs, important-question sets, practical files) live in `public/` and are served as-is.

## Tech stack

- React 18 + Vite 5 (dev server on port 5173)
- Plain CSS (`src/styles/App.css`, `variables.css`)
- Lucide icons (`lucide-react`), FontAwesome via CDN, Google Fonts (Outfit + Poppins)
- GitHub Actions deploy to GitHub Pages on every push to `main`

## Project structure

```
├── index.html                  # title "Bhavesh Notes - Infinite Portal", font/icon CDNs
├── public/                     # the whole notes library: PDFs, docs, images, videos
├── src/
│   ├── App.jsx                 # header nav, semester tabs, ticker, view switching
│   ├── main.jsx                # React entry point
│   ├── components/
│   │   ├── FloatingBot.jsx     # floating Document Analyzer widget
│   │   ├── LoginModal.jsx      # gate for secured subjects
│   │   ├── AdsBanner.jsx
│   │   ├── GlowBg.jsx
│   │   └── TabSelector.jsx     # semester tabs
│   ├── pages/
│   │   ├── NotesHub.jsx        # subject grid + per-subject note lists
│   │   └── AddNotesForm.jsx    # drag-drop upload form → Telegram bot
│   ├── data/notesData.js        # semester/subject/note catalogue
│   └── styles/                 # App.css, variables.css
├── .github/workflows/         # deploy.yml + main.yml: GitHub Pages deploys
├── package.json
└── vite.config.js
```

## Run it locally

```bash
npm install
npm run dev      # opens the app at http://localhost:5173
npm run build    # production build
npm run preview  # preview the production build
```

## Notes

- Deploying works out of the box: pushing to `main` triggers the Pages workflow. The Add Notes form needs the `TG_API` and `TG_ID` repository secrets to send files; without them the form's bot placeholders stay unsubstituted.
- `package.json` is marked `private` — this is a personal project, not published to npm.
