// Client-side ZIP download of a subject's notes (JSZip, generated in-browser).
import JSZip from 'jszip';

function baseName(file) {
  try {
    return decodeURIComponent(String(file).split('/').pop() || 'file');
  } catch {
    return String(file).split('/').pop() || 'file';
  }
}

// files: [{ title, file, isExternal }] — external links and placeholders skipped.
// onProgress(done, total) is called after each successful fetch.
// Returns the number of files added to the zip.
export async function downloadSubjectZip(subjectName, files, onProgress) {
  const zip = new JSZip();
  const used = new Set();
  const queue = (files || []).filter((f) => f && f.file && !f.isExternal);
  let added = 0;

  for (const f of queue) {
    try {
      const res = await fetch(f.file);
      if (!res.ok) continue;
      const blob = await res.blob();
      let name = baseName(f.file) || 'file';
      if (used.has(name)) {
        const dot = name.lastIndexOf('.');
        const stem = dot > 0 ? name.slice(0, dot) : name;
        const ext = dot > 0 ? name.slice(dot) : '';
        let i = 2;
        while (used.has(`${stem}-${i}${ext}`)) i++;
        name = `${stem}-${i}${ext}`;
      }
      used.add(name);
      zip.file(name, blob);
      added++;
    } catch {
      // one bad file must not break the whole zip — skip it
    }
    if (onProgress) onProgress(added, queue.length);
  }

  if (added === 0) return 0;
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${String(subjectName || 'subject').replace(/[^\w\-]+/g, '-')}-notes.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return added;
}
