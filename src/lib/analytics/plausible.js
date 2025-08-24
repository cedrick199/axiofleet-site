// src/lib/analytics/plausible.js
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN || '';
const PLAUSIBLE_API = import.meta.env.VITE_PLAUSIBLE_API || 'https://plausible.io/api/event';

export function track(name, { props } = {}) {
  // pas de config -> no-op
  if (!PLAUSIBLE_DOMAIN) return;

  // 1) si le script plausible est présent
  try {
    if (typeof window?.plausible === 'function') {
      window.plausible(name, { props });
      return;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[plausible] inline fail', e);
  }

  // 2) sinon: API event (sendBeacon d’abord, fetch sinon)
  const payload = {
    name,
    url: window?.location?.href || '',
    domain: PLAUSIBLE_DOMAIN,
    referrer: document?.referrer || '',
    props: props || {},
  };
  try {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    if (navigator?.sendBeacon && navigator.sendBeacon(PLAUSIBLE_API, blob)) return;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[plausible] beacon fail', e);
  }
  try {
    fetch(PLAUSIBLE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[plausible] fetch fail', e);
  }
}
