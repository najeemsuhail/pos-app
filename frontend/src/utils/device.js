export function isMobileBrowser() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
}
