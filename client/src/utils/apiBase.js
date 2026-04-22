export const API_ORIGIN = window.location.hostname === 'eventzee.in'
  ? 'https://www.eventzee.in'
  : window.location.origin;

export function apiUrl(path) {
  return `${API_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
}