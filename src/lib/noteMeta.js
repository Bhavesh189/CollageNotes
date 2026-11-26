// noteMeta — per-note facts from the build-time manifest
// (/generated/manifest.json): page counts, typed-vs-scan, reading time.
// The manifest is fetched once and cached; components use the
// useNoteMeta() hook. A note is "typed" when most of its pages yielded
// extractable text (textPages / pages > 0.5); scans have ~0.
import { useEffect, useState } from 'react';

let manifestPromise = null;

export function loadManifestMeta() {
  if (!manifestPromise) {
    manifestPromise = fetch('/generated/manifest.json')
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return manifestPromise;
}

export function metaFor(manifest, file) {
  const e = manifest && manifest.docs && manifest.docs[file];
  if (!e || !e.pages) return { pages: null, typed: null };
  // Handwritten AI notes render at scale 1.25 / quality 70 (see
  // render-notes.mjs); typed notes at 1.5 / 80. Text yield alone cannot
  // tell them apart (handwritten PDFs are vector text), and a scanned
  // typed note yields ~no text — so: handwritten by render settings,
  // typed by text yield, scanned (no label) otherwise.
  if (e.scale === 1.25 && e.quality === 70) return { pages: e.pages, typed: false };
  const ratio = (e.textPages || 0) / e.pages;
  return { pages: e.pages, typed: ratio > 0.5 ? true : null };
}

export function readingMins(pages) {
  if (!pages) return null;
  return Math.max(1, Math.round(pages * 1.5));
}

export function dirFor(manifest, file) {
  const e = manifest && manifest.docs && manifest.docs[file];
  return e ? e.dir : null;
}

export function useNoteMeta() {
  const [manifest, setManifest] = useState(null);
  useEffect(() => {
    let live = true;
    loadManifestMeta().then((m) => {
      if (live) setManifest(m);
    });
    return () => {
      live = false;
    };
  }, []);
  return manifest;
}
