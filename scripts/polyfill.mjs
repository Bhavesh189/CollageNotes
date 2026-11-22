// Node-version safety net for the build-time render scripts.
//
// The vendored pdf.js 6.5.438 uses `Promise.withResolvers` (ES2024,
// Node 22+). If these scripts ever run on an older Node (Vercel's default
// was pre-22 — every one of the 168 notes failed on the first live deploy
// with "Promise.withResolvers is not a function"), this polyfill supplies
// it so the render degrades instead of erroring every document. It is a
// no-op on Node 22+, where the real API exists. The primary fix is the
// `"engines": {"node": ">=22"}` pin in package.json; this file is the
// belt-and-braces for any environment that ignores the pin.
if (typeof Promise.withResolvers !== 'function') {
  Promise.withResolvers = function withResolvers() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}
