import * as React from "react";
import { TextField, Stack, Button, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { submitForm } from "../../../lib/forms/submit";
import { validateRequired } from "../../../lib/validators/forms";
import { track } from "../../../lib/analytics/plausible";

export default function ContactForm() {
  const [data, setData] = React.useState({
    nom: "", societe: "", email: "", telephone: "", sujet: "", message: "",
    consent: false, company_website: "" // honeypot
  });
  const [state, setState] = React.useState({ ok: false, error: "", submitting: false });

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;
    setData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const v = validateRequired(data);
    if (!v.valid) { setState((s) => ({ ...s, error: `Champs manquants: ${v.missing.join(", ")}` })); return; }
    if (!data.consent) { setState((s) => ({ ...s, error: "Veuillez accepter d'être recontacté." })); return; }

    setState({ ok: false, error: "", submitting: true });
    try {
      const res = await submitForm("contact", data);
      if (res.ok) {
        track("Contact_Send", { page: "contact" });
        setState({ ok: true, error: "", submitting: false });
        setData((p) => ({ ...p, message: "" }));
      } else {
        setState({ ok: false, error: "Erreur d’envoi. Réessayez.", submitting: false });
      }
    } catch (err) {
      setState({ ok: false, error: String(err?.message || "Erreur"), submitting: false });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack spacing={2}>
        {state.ok && <Alert severity="success">Merci, nous vous recontactons sous 24–48h.</Alert>}
        {state.error && <Alert severity="error">{state.error}</Alert>}

        {/* Honeypot */}
        <input type="text" name="company_website" value={data.company_website} onChange={onChange} style={{ display: "none" }} />

        <TextField label="Nom" name="nom" value={data.nom} onChange={onChange} required />
        <TextField label="Société" name="societe" value={data.societe} onChange={onChange} required />
        <TextField label="Email" name="email" value={data.email} onChange={onChange} required />
        <TextField label="Téléphone" name="telephone" value={data.telephone} onChange={onChange} />
        <TextField label="Sujet" name="sujet" value={data.sujet} onChange={onChange} />
        <TextField label="Message" name="message" value={data.message} onChange={onChange} required multiline minRows={4} />

        <FormControlLabel
          control={<Checkbox name="consent" checked={data.consent} onChange={onChange} />}
          label="J’accepte d’être recontacté(e) par Axiofleet pour ma demande (RGPD)."
        />

        <Button type="submit" variant="contained" disabled={state.submitting}>Envoyer</Button>
      </Stack>
    </form>
  );
}

