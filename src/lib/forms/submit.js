// src/lib/forms/submit.js

// Optionnel: mets VITE_FORMS_MODE=debug pour simuler un succès sans réseau
const MODE = import.meta.env.VITE_FORMS_MODE || 'live';

const ENDPOINTS = {
  contact: import.meta.env.VITE_FORMS_CONTACT_ENDPOINT || import.meta.env.VITE_FORMS_ENDPOINT || '',
  devis:   import.meta.env.VITE_FORMS_DEVIS_ENDPOINT   || import.meta.env.VITE_FORMS_ENDPOINT || '',
  demo:    import.meta.env.VITE_FORMS_DEMO_ENDPOINT    || import.meta.env.VITE_FORMS_ENDPOINT || '',
};

function withTimeout(promise, ms = 12000) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error('Délai dépassé')), ms)),
  ]);
}

export async function submitForm(formName = 'contact', payload = {}) {
  // Honeypot: si rempli, on "avale" en succès silencieux
  if (payload?.company_website && String(payload.company_website).trim().length > 0) {
    return { ok: true, success: true };
  }

  if (MODE === 'debug') {
    // eslint-disable-next-line no-console
    console.log('[submitForm:debug]', formName, payload);
    await new Promise(r => setTimeout(r, 400));
    return { ok: true, success: true };
  }

  const endpoint = ENDPOINTS[formName] || '';
  if (!endpoint) {
    throw new Error(
      `Endpoint manquant pour "${formName}". Ajoute VITE_FORMS_${formName.toUpperCase()}_ENDPOINT dans .env`
    );
  }

  const body = JSON.stringify({ form: formName, ...payload, _ts: Date.now() });

  const res = await withTimeout(fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // IMPORTANT pour avoir { ok:true } chez Formspree
    },
    body,
  }), 12000);

  // Formspree renvoie typiquement 200 + JSON { ok: true }
  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new Error(data?.message || `Erreur serveur (${res.status})`);
  }

  return data || { ok: true, success: true };
}

export default submitForm;
