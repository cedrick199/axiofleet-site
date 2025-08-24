import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { track } from '@/lib/analytics/plausible.js';
import { submitForm } from '@/lib/forms/submit.js';
import { validateRequired } from '@/lib/validators/forms.js';

/* ================== Constantes & utils ================== */
const SUBJECT_OPTIONS = [
  { value: 'catalog_ens', label: 'Catalogue — Enseignements (Bachelor/Master/Écoles)' },
  { value: 'catalog_cond', label: 'Catalogue — Formations Conducteurs (TRM/RSE)' },
  { value: 'intervenant_trm', label: 'Intervenant TRM / Jury / Conférence' },
  { value: 'formateur_cond', label: 'Formateur Conducteurs (FIMO/FCO/ADR…)' },
  { value: 'autre', label: 'Autre (préciser)' },
];
const SUBJECT_VALUES = new Set(SUBJECT_OPTIONS.map(o => o.value));
const LS_KEY = 'contactFormDraft_v1';
const MESSAGE_MAX = 1500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_RE = /^(\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/i;
const SUBJECT_HINT = {
  catalog_ens: "Demandez le catalogue Enseignements (programmes Bachelor/Master, volumes, dispositifs).",
  catalog_cond: "Demandez le catalogue Formations Conducteurs (TRM/RSE, FIMO/FCO/ADR).",
  intervenant_trm: "Proposez un thème d’intervention/jury/conférence avec votre calendrier.",
  formateur_cond: "Indiquez votre besoin en formateur conducteurs (périodes, modules, public).",
  autre: "Précisez clairement l’objet de votre demande.",
};

function inferSubject(source) {
  const s = (source || '').toUpperCase();
  if (s.includes('ENSEIGNEMENTS')) return 'catalog_ens';
  if (s.includes('CONDUCTEURS') || s.includes('CATALOGUE')) return 'catalog_cond';
  return '';
}
function safeLocalStorage(op, ...args) {
  try {
    const ls = window?.localStorage;
    const fn = ls?.[op];
    if (typeof fn === 'function') return fn.apply(ls, args);
  } catch {}
  return null;
}
function computeInitialSubject(subjectFromQuery, source, locked) {
  if (locked && SUBJECT_VALUES.has(locked)) return { subject: locked, other: '' };
  const res = { subject: '', other: '' };
  const s = subjectFromQuery || '';
  if (SUBJECT_VALUES.has(s)) { res.subject = s; return res; }
  if (s) { res.subject = 'autre'; res.other = s; return res; }
  res.subject = inferSubject(source) || '';
  return res;
}

/* a11y live region */
function LiveRegion({ children }) {
  return <Box component="output" aria-live="polite" sx={{ display: 'block' }}>{children}</Box>;
}
LiveRegion.propTypes = { children: PropTypes.node };

/* Récap modules */
function ModulesRecap({ modules = [], onClear, source }) {
  if (!modules.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        Aucun module présélectionné. Ajoutez des éléments depuis le catalogue puis revenez ici.
      </Typography>
    );
  }
  return (
    <Stack spacing={1}>
      {modules.map((m, idx) => (
        <Paper
          key={`${m?.ref || idx}-${idx}`}
          variant="outlined"
          sx={{
            p: 1,
            borderRadius: 2,
            borderColor: 'rgba(0,229,255,0.35)',
            bgcolor: 'rgba(3,16,30,0.35)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2, overflowWrap: 'anywhere' }}>
            {m?.ref ? `【${m.ref}】 ` : ''}{m?.title || 'Module'}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            Rôle : {m?.role || '—'} • Début : {m?.start || '—'} • Fin : {m?.end || '—'}
          </Typography>
        </Paper>
      ))}
      <Divider sx={{ borderColor: 'rgba(0,229,255,0.25)' }} />
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {modules.length} élément{modules.length > 1 ? 's' : ''} sélectionné{modules.length > 1 ? 's' : ''}.
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {source ? <MuiLink href={source} underline="hover" color="primary">Modifier (retour au catalogue)</MuiLink> : null}
        <MuiLink component="button" type="button" onClick={onClear} underline="hover" color="inherit">Vider l’aperçu</MuiLink>
      </Stack>
    </Stack>
  );
}
ModulesRecap.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    ref: PropTypes.string, title: PropTypes.string, start: PropTypes.string, end: PropTypes.string, role: PropTypes.string,
  })), onClear: PropTypes.func, source: PropTypes.string,
};

/* ================== Composant principal ================== */
export default function ContactForm({
  modules, modulesRaw, source, subjectFromQuery, lockedSubjectValue = 'catalog_cond',
}) {
  const init = computeInitialSubject(subjectFromQuery, source, lockedSubjectValue);
  const [data, setData] = React.useState({
    prenom: '', nom: '', societe: '', email: '', telephone: '',
    subject: init.subject, otherSubject: init.other, message: '', consent: false, company_website: '',
  });
  const [status, setStatus] = React.useState({ type: 'idle', msg: '' });
  const [errors, setErrors] = React.useState({});
  const [preview, setPreview] = React.useState(modules || []);

  /* autosave */
  React.useEffect(() => {
    const raw = safeLocalStorage('getItem', LS_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        setData((d) => ({ ...d, ...saved, company_website: '', prenom: saved?.prenom || '' }));
      } catch {}
    }
  }, []);
  React.useEffect(() => {
    const t = setTimeout(() => {
      const { company_website, ...safe } = data;
      safeLocalStorage('setItem', LS_KEY, JSON.stringify(safe));
    }, 250);
    return () => clearTimeout(t);
  }, [data]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((d) => ({ ...d, [name]: type === 'checkbox' ? checked : value }));
  };
  React.useEffect(() => {
    if (data.subject) track('Contact_Subject_Selected', { props: { value: data.subject } });
  }, [data.subject]);

  /* validation */
  function validate() {
    const baseRequired = {
      prenom: data.prenom?.trim(),
      nom: data.nom?.trim(),
      email: data.email?.trim(),
      subject: data.subject?.trim(),
      consent: data.consent === true,
    };
    const baseErrors = validateRequired(baseRequired);
    if (data.subject === 'autre' && !data.otherSubject?.trim()) baseErrors.otherSubject = 'Veuillez préciser le sujet.';
    const emailTrim = data.email?.trim() || '';
    if (emailTrim && !EMAIL_RE.test(emailTrim)) baseErrors.email = 'Email invalide.';
    const telTrim = data.telephone?.trim() || '';
    if (telTrim && !TEL_RE.test(telTrim)) baseErrors.telephone = 'Téléphone invalide (FR).';
    if ((data.message?.length || 0) > MESSAGE_MAX) baseErrors.message = `Message trop long (max ${MESSAGE_MAX} caractères).`;
    if (data.company_website?.trim()?.length) baseErrors.company_website = 'Spam détecté';
    setErrors(baseErrors);
    return baseErrors;
  }
  function focusFirstInvalid(errs) {
    const order = ['prenom', 'nom', 'email', 'subject', 'otherSubject', 'message', 'telephone', 'consent'];
    const first = order.find((k) => !!errs[k]);
    const el = document?.querySelector?.(`[name="${first}"]`);
    el?.focus?.();
  }

  /* submit */
  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { focusFirstInvalid(errs); return; }
    setStatus({ type: 'submitting', msg: '' });
    track('Contact_Send', { props: { page: 'contact_catalogue_formations' } });
    const payload = {
      prenom: data.prenom, nom: data.nom, societe: data.societe, email: data.email, telephone: data.telephone,
      sujet: data.subject === 'autre' ? data.otherSubject : data.subject, message: data.message,
      modules_raw: modulesRaw || '', source: source || '', consent: data.consent ? 'yes' : 'no', company_website: data.company_website,
    };
    try {
      const res = await submitForm('contact', payload);
      if (res && (res.ok || res.success)) {
        setStatus({ type: 'success', msg: 'Votre demande a bien été envoyée.' });
        safeLocalStorage('removeItem', LS_KEY);
      } else { throw new Error(res?.message || 'Échec de l’envoi.'); }
    } catch (err) { setStatus({ type: 'error', msg: err.message || 'Une erreur est survenue.' }); }
  }
  function onResetDraft() {
    safeLocalStorage('removeItem', LS_KEY);
    const again = computeInitialSubject(undefined, source, lockedSubjectValue);
    setData({
      prenom: '', nom: '', societe: '', email: '', telephone: '',
      subject: again.subject, otherSubject: again.other, message: '', consent: false, company_website: '',
    });
    setErrors({}); setStatus({ type: 'idle', msg: '' });
    track('Contact_Reset', { props: { page: 'contact_catalogue_formations' } });
  }
  const submitDisabled =
    status.type === 'submitting' ||
    !data.prenom?.trim() || !data.nom?.trim() || !data.email?.trim() || !data.subject?.trim() ||
    (data.subject === 'autre' && !data.otherSubject?.trim()) || !data.consent;

  /* styles */
  const tfSx = {
    '& .MuiOutlinedInput-root': {
      background: 'transparent',
      borderRadius: 2,
      '& fieldset': { borderColor: 'rgba(0,229,255,0.35)' },
      '&:hover fieldset': { borderColor: 'rgba(0,229,255,0.55)' },
      '&.Mui-focused fieldset': {
        borderColor: '#00E5FF',
        boxShadow: '0 0 0 1px rgba(0,229,255,0.40), 0 0 24px rgba(0,229,255,0.12)',
      },
    },
    '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.72)' },
  };
  const panelCellSx = { height: '100%', minHeight: 0, maxWidth: '100%' };

  const subjectLabel = lockedSubjectValue === 'catalog_ens'
    ? 'Catalogue — Enseignements (Bachelor/Master/Écoles)'
    : 'Catalogue — Formations Conducteurs (TRM/RSE)';
  const subjectHint = lockedSubjectValue
    ? 'Catalogue Formations.'
    : SUBJECT_HINT[data.subject || 'autre'];

  /* render */
  return (
    <Box component="form" onSubmit={onSubmit}
      sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative', maxWidth: '100%' }}
      noValidate
    >
      <Stack spacing={1} sx={{ flex: 1, minHeight: 0 }}>
        {/* feedback */}
        <LiveRegion>
          {status.type === 'success' && <Alert severity="success">{status.msg}</Alert>}
          {status.type === 'error' && <Alert severity="error">{status.msg}</Alert>}
        </LiveRegion>

        {/* hidden */}
        <input type="hidden" name="modules_raw" value={modulesRaw || ''} />
        <input type="hidden" name="sujet" value={data.subject === 'autre' ? data.otherSubject : data.subject} />
        {/* honeypot */}
        <TextField label="Votre site web (ne pas remplir)" name="company_website" value={data.company_website}
          onChange={onChange} autoComplete="off" tabIndex={-1} aria-hidden="true"
          sx={{ position: 'absolute', left: -99999, width: 1, height: 1, p: 0, m: 0 }}
        />

        {/* zone haute */}
        <Grid container spacing={1} sx={{ minWidth: 0 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField required label="Prénom" name="prenom" value={data.prenom} onChange={onChange}
              fullWidth error={!!errors.prenom} helperText={errors.prenom ? 'Champ requis' : ' '} sx={tfSx}
              slotProps={{ input: { 'aria-required': 'true' } }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField required label="Nom" name="nom" value={data.nom} onChange={onChange}
              fullWidth error={!!errors.nom} helperText={errors.nom ? 'Champ requis' : ' '} sx={tfSx}
              slotProps={{ input: { 'aria-required': 'true' } }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField required type="email" label="Email" name="email" value={data.email} onChange={onChange}
              fullWidth error={!!errors.email} helperText={errors.email || ' '} sx={tfSx}
              slotProps={{ input: { inputMode: 'email', 'aria-required': 'true' } }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="Téléphone" name="telephone" value={data.telephone} onChange={onChange}
              fullWidth error={!!errors.telephone} helperText={errors.telephone || ' '} sx={tfSx}
              placeholder="06 12 34 56 78" slotProps={{ input: { inputMode: 'tel' } }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Société" name="societe" value={data.societe} onChange={onChange}
              fullWidth helperText=" " sx={tfSx} />
          </Grid>

          {lockedSubjectValue ? (
            <Grid item xs={12} md={6}>
              <Paper
                component="output" aria-live="polite" aria-atomic="true"
                aria-label={`Sujet sélectionné : ${subjectLabel}`}
                variant="outlined"
                sx={{
                  p: 1, borderRadius: 2,
                  borderColor: 'rgba(0,229,255,0.35)', bgcolor: 'rgba(3,16,30,0.35)',
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  flexWrap: 'wrap', minWidth: 0, // <-- wrap & pas de débordement
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, overflowWrap: 'anywhere' }}>
                  Sujet : {subjectLabel}
                </Typography>
                <Typography variant="caption" color="text.secondary">{subjectHint}</Typography>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <TextField
                select required label="Sujet" name="subject" value={data.subject} onChange={onChange}
                fullWidth error={!!errors.subject} sx={tfSx}
                helperText={errors.subject ? 'Veuillez sélectionner un sujet' : SUBJECT_HINT[data.subject || 'autre']}
                slotProps={{ input: { 'aria-required': 'true' } }}
              >
                {SUBJECT_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>

        {/* PANNEAUX : scroll interne en md+, layout fluide en mobile */}
        <Box
          sx={{
            flex: '1 1 0',
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 1.5,
            maxWidth: '100%',
          }}
        >
          {/* Message */}
          <Box sx={panelCellSx}>
            <TextField
              label="Message"
              name="message"
              value={data.message}
              onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
              multiline
              fullWidth
              error={!!errors.message}
              helperText={errors.message ? errors.message : `${data.message?.length || 0}/${MESSAGE_MAX}`}
              placeholder="Décrivez votre besoin (dates, référentiel, volume, contraintes, etc.)"
              sx={{
                ...tfSx,
                height: { xs: 'auto', md: '80%' },         // <-- pas de pourcentage rigide en mobile
                '& .MuiOutlinedInput-root': { height: { xs: 'auto', md: '100%' }, alignItems: 'stretch' },
                '& textarea': { height: { xs: 'auto', md: '100% !important' }, resize: 'none', overflow: 'auto' },
              }}
              slotProps={{ input: { maxLength: MESSAGE_MAX + 100 } }}
            />
          </Box>

          {/* Récap */}
          <Box sx={panelCellSx}>
            <Paper
              elevation={0}
              sx={{
                height: { xs: 'auto', md: '75%' },         // <-- fluide en mobile
                p: 1.25,
                display: 'flex', flexDirection: 'column',
                borderRadius: 2,
                border: '1px solid rgba(0,229,255,0.35)',
                bgcolor: 'rgba(3,16,30,0.35)',
                backdropFilter: 'blur(2px)',
                overflow: 'hidden',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, flex: '0 0 auto' }}>
                Récapitulatif du panier {preview?.length ? `(${preview.length})` : ''}
              </Typography>
              <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', pr: 0.5 }}>
                <ModulesRecap modules={preview} source={source} onClear={() => setPreview([])} />
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* RGPD + CTA (dans le flux, toujours visibles) */}
        <Box sx={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', pt: 0.5 }}>
          <FormControlLabel
            control={<Checkbox name="consent" checked={data.consent} onChange={onChange} color="primary" />}
            label="J’accepte que mes informations soient utilisées pour être recontacté dans le cadre de ma demande (RGPD)."
          />
          {errors.consent && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
              Consentement requis.
            </Typography>
          )}
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button type="submit" variant="contained" size="large" disabled={submitDisabled} sx={{ borderRadius: 2 }}>
              {status.type === 'submitting' ? 'Envoi en cours…' : 'Recevoir ma proposition'}
            </Button>
            <Button variant="text" size="large" onClick={onResetDraft} disabled={status.type === 'submitting'} sx={{ borderRadius: 2 }}>
              Effacer mon brouillon
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

ContactForm.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    ref: PropTypes.string, title: PropTypes.string, start: PropTypes.string, end: PropTypes.string, role: PropTypes.string,
  })),
  modulesRaw: PropTypes.string,
  source: PropTypes.string,
  subjectFromQuery: PropTypes.string,
  lockedSubjectValue: PropTypes.string,
};
