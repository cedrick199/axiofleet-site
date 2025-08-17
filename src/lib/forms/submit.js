import { FORMS } from "../../config/forms.config";

export async function submitForm(endpointKey, payload) {
  const url = FORMS.endpoints[endpointKey];
  if (!url) throw new Error("Form endpoint missing");

  // Honeypot anti-spam (champ caché)
  if (payload[FORMS.spam.honeypot]) return { ok: true, skipped: true };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}
