import { useState, useEffect } from 'react';

// useDebouncedValue — returns `value` after it has been stable for `delay`
// ms. The input itself stays instant (typing never lags); only the
// EXPENSIVE work that consumes the value (search scoring, result rendering)
// waits for the pause. PERF (2026-11-24): every keystroke used to re-run
// the full search + re-render the results view, which felt laggy on phones.
export function useDebouncedValue(value, delay = 150) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
