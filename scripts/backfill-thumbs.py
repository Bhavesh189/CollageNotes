#!/usr/bin/env python3
"""Backfill performance assets for the 2026-11-24 phone-lag fix.

1. Filmstrip thumbnails: for every public/generated/<dir>/page-NNN.jpg
   (and hw/page-NNN.jpg) generate thumb-NNN.jpg — 128px wide (2x the 64px
   filmstrip display), JPEG q60, ~8-12 KB. Reading pages are untouched.
2. Small subject covers: for every public/subjects/*.jpg (except the
   wood-frame texture, which is a stretched CSS background) generate
   <name>-sm.jpg — 500px wide (2x the ~250px card display), JPEG q75.

Idempotent: skips a thumb/cover that already exists and is newer than its
source. Safe to re-run. The render pipeline (scripts/render-notes.mjs +
scripts/handwrite.mjs) generates thumbs for NEW pages automatically, so
this script is only needed once for pages rendered before the fix — and
for local preview verification (CI renders everything fresh).

Usage: python3 scripts/backfill-thumbs.py [--thumbs-only | --covers-only]
"""
import os
import sys
from concurrent.futures import ProcessPoolExecutor
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GENERATED = os.path.join(ROOT, "public", "generated")
SUBJECTS = os.path.join(ROOT, "public", "subjects")
THUMB_W = 128
THUMB_Q = 60
COVER_W = 500
COVER_Q = 75
SKIP_COVERS = {"wood-frame.jpg"}


def _make(src, dst, width, quality):
    """Downscale src to width px (same aspect), save as JPEG. Returns bytes or None."""
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return None
    try:
        with Image.open(src) as im:
            im = im.convert("RGB")
            if im.width <= width:
                return None  # already small enough — nothing to gain
            h = max(1, round(width * im.height / im.width))
            im = im.resize((width, h), Image.LANCZOS)
            im.save(dst, "JPEG", quality=quality, optimize=True)
        return os.path.getsize(dst)
    except Exception as e:
        print(f"  !! {src}: {e}", file=sys.stderr)
        return None


def _thumb_job(args):
    src, dst = args
    return _make(src, dst, THUMB_W, THUMB_Q)


def _cover_job(args):
    src, dst = args
    return _make(src, dst, COVER_W, COVER_Q)


def collect_thumbs():
    jobs = []
    for dirpath, _dirs, files in os.walk(GENERATED):
        for f in files:
            if f.startswith("page-") and f.endswith(".jpg"):
                src = os.path.join(dirpath, f)
                dst = os.path.join(dirpath, "thumb-" + f[5:])
                jobs.append((src, dst))
    return jobs


def collect_covers():
    jobs = []
    for f in sorted(os.listdir(SUBJECTS)):
        if not f.endswith(".jpg") or f in SKIP_COVERS or f.endswith("-sm.jpg"):
            continue
        src = os.path.join(SUBJECTS, f)
        dst = os.path.join(SUBJECTS, f[:-4] + "-sm.jpg")
        jobs.append((src, dst))
    return jobs


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "--all"
    total_bytes = 0
    made = 0
    skipped = 0
    if mode in ("--all", "--thumbs-only"):
        jobs = collect_thumbs()
        print(f"thumbs: {len(jobs)} source pages")
        with ProcessPoolExecutor(max_workers=4) as ex:
            for size in ex.map(_thumb_job, jobs, chunksize=32):
                if size is None:
                    skipped += 1
                else:
                    made += 1
                    total_bytes += size
        print(f"thumbs: made {made}, skipped (up-to-date/small) {skipped}, {total_bytes / 1048576:.1f} MB total")
    if mode in ("--all", "--covers-only"):
        jobs = collect_covers()
        print(f"covers: {len(jobs)} source images")
        with ProcessPoolExecutor(max_workers=4) as ex:
            for size in ex.map(_cover_job, jobs, chunksize=4):
                if size is None:
                    skipped += 1
                else:
                    made += 1
                    total_bytes += size
        print(f"covers: made {made}, skipped {skipped}, {total_bytes / 1048576:.1f} MB total")


if __name__ == "__main__":
    main()
