// Node-version safety net for the build-time render scripts.
//
// The vendored pdf.js 6.5.438 uses ES2024/ES2025 APIs that only exist on
// Node 22+:
//   - `Promise.withResolvers` (ES2024) — used all over pdf.js.
//   - `Set.prototype.intersection` / `.difference` (ES2025) — called
//     during rendering (`baseSet.difference(...)`, named-destination
//     `.intersection(...)`); on older Node these throw TypeError.
//   - `Promise.try` (ES2025) — referenced by pdf.js; polyfilled for safety.
// If these scripts ever run on an older Node (Vercel's default for this
// project was pre-22 — the first live deploy rendered 0 of 5,894 pages
// with "Promise.withResolvers is not a function"), these polyfills supply
// them so the render degrades instead of erroring every document. They
// are no-ops on Node 22+, where the real APIs exist. The primary fix is
// the `"engines": {"node": ">=22"}` pin in package.json; this file is the
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

if (typeof Promise.try !== 'function') {
  // Promise.try(fn, ...args): call fn synchronously; a throw becomes a
  // rejection, a return value becomes a fulfillment (thenables adopted).
  Promise.try = function tryFn(fn, ...args) {
    return new Promise((resolve) => resolve(fn(...args)));
  };
}

// ES2025 Set methods (union / intersection / difference /
// symmetricDifference / isSubsetOf / isSupersetOf / isDisjointFrom).
// Each validates the argument is a Set-like (has .size + .has + keys)
// the way the spec does, then implements the operation.
function setLike(other, method) {
  if (other === null || (typeof other !== 'object' && typeof other !== 'function')) {
    throw new TypeError(`Set.prototype.${method} requires a Set-like argument`);
  }
  if (typeof other.has !== 'function' || typeof other.keys !== 'function' || typeof other.size !== 'number') {
    throw new TypeError(`Set.prototype.${method} requires a Set-like argument`);
  }
  return other;
}

if (typeof Set.prototype.union !== 'function') {
  Set.prototype.union = function union(other) {
    const o = setLike(other, 'union');
    const out = new Set(this);
    for (const v of o.keys()) out.add(v);
    return out;
  };
}
if (typeof Set.prototype.intersection !== 'function') {
  Set.prototype.intersection = function intersection(other) {
    const o = setLike(other, 'intersection');
    const out = new Set();
    for (const v of this) if (o.has(v)) out.add(v);
    return out;
  };
}
if (typeof Set.prototype.difference !== 'function') {
  Set.prototype.difference = function difference(other) {
    const o = setLike(other, 'difference');
    const out = new Set();
    for (const v of this) if (!o.has(v)) out.add(v);
    return out;
  };
}
if (typeof Set.prototype.symmetricDifference !== 'function') {
  Set.prototype.symmetricDifference = function symmetricDifference(other) {
    const o = setLike(other, 'symmetricDifference');
    const out = new Set();
    for (const v of this) if (!o.has(v)) out.add(v);
    for (const v of o.keys()) if (!this.has(v)) out.add(v);
    return out;
  };
}
if (typeof Set.prototype.isSubsetOf !== 'function') {
  Set.prototype.isSubsetOf = function isSubsetOf(other) {
    const o = setLike(other, 'isSubsetOf');
    for (const v of this) if (!o.has(v)) return false;
    return true;
  };
}
if (typeof Set.prototype.isSupersetOf !== 'function') {
  Set.prototype.isSupersetOf = function isSupersetOf(other) {
    const o = setLike(other, 'isSupersetOf');
    for (const v of o.keys()) if (!this.has(v)) return false;
    return true;
  };
}
if (typeof Set.prototype.isDisjointFrom !== 'function') {
  Set.prototype.isDisjointFrom = function isDisjointFrom(other) {
    const o = setLike(other, 'isDisjointFrom');
    for (const v of this) if (o.has(v)) return false;
    return true;
  };
}
