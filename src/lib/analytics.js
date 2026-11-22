// Tiny Google Analytics 4 wrapper.
//
// Every call here is a no-op until the gtag snippet in index.html loads.
// That snippet only loads when VITE_GA_MEASUREMENT_ID is set (Vercel env
// var) — so with no Measurement ID configured, analytics is fully off
// and nothing throws, nothing is fetched, nothing is logged.
//
// Events used by the app:
//   page_view  { page_path }                       — SPA navigation (App.jsx)
//   view_pdf   { file_title, semester, source }    — DocViewer opens

export function trackEvent(name, params) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  const clean = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') clean[key] = value;
    }
  }
  try {
    window.gtag('event', name, clean);
  } catch {
    // Analytics must never break the app.
  }
}

export function trackPageView(pagePath) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', 'page_view', {
      page_path: pagePath || window.location.pathname + window.location.hash,
    });
  } catch {
    // Analytics must never break the app.
  }
}
