// src/features/formations/pages/Formations.jsx
import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Checkbox,
  Chip,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import Seo from '../../../lib/seo/Seo.jsx';
import {
  CATALOG_ENSEIGNEMENTS,
  CATALOG_CONDUCTEURS,
  PROGRAMS_ENSEIGNEMENTS,
  PROGRAMS_CONDUCTEURS,
} from '../data/formations.catalog.js';

/** slugify (clés stables UI) */
function slugify(input) {
  return String(input)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Analytics → navigate (toujours event puis navigation) */
function useGo() {
  const navigate = useNavigate();
  return React.useCallback((to, eventName, props = {}) => {
    try { window?.plausible?.(eventName, { props }); } finally { navigate(to); }
  }, [navigate]);
}

/** Hauteur visible = viewport − header − footer (pas de scroll)  */
function useAvailableHeight() {
  const getWithMargins = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    const mt = parseFloat(cs.marginTop) || 0;
    const mb = parseFloat(cs.marginBottom) || 0;
    return Math.ceil(rect.height + mt + mb);
  };
  const compute = () => {
    const vh = Math.ceil(window.visualViewport?.height || window.innerHeight || 0);
    const headerH = getWithMargins(document.querySelector('header'));
    const footerH = getWithMargins(document.querySelector('footer'));
    return Math.max(520, vh - headerH - footerH - 1);
  };
  const [h, setH] = React.useState(compute);
  React.useLayoutEffect(() => {
    const onResize = () => setH(compute());
    onResize();
    window.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
    };
  }, []);
  return h;
}

/** Résout un programme (formation) en liste de modules depuis un catalogue (par ref) */
function useResolveProgram(programs, catalog) {
  const byRef = React.useMemo(() => {
    const map = new Map();
    catalog.forEach((m) => { if (m.ref) map.set(m.ref, m); });
    return map;
  }, [catalog]);

  const resolve = React.useCallback((p) => {
    const items = (p.moduleRefs || []).map((r) => byRef.get(r)).filter(Boolean);
    return { ...p, modules: items };
  }, [byRef]);

  const all = React.useMemo(() => programs.map(resolve), [programs, resolve]);
  return all;
}

/** ———————————————————————————————————————————————————————————
 *  Modale "Card Stack" : formation → cartes modules → récap
 *  ——————————————————————————————————————————————————————————— */
function CatalogueProgramsModal({ title, open, onClose, programs, catalog, kind }) {
  const smDown = useMediaQuery('(max-width:900px)');
  const resolved = useResolveProgram(programs, catalog);

  // formation sélectionnée
  const [currentId, setCurrentId] = React.useState(resolved[0]?.id || null);

  // modules sélectionnés (id -> { module, start, end, role })
  const [selected, setSelected] = React.useState({});

  React.useEffect(() => {
    if (open) {
      window?.plausible?.('CTA_Formation_Modules', { props: { kind } });
      setCurrentId(resolved[0]?.id || null);
      setSelected({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const current = React.useMemo(
    () => resolved.find((p) => p.id === currentId) || resolved[0] || null,
    [resolved, currentId]
  );

  const toggle = (m) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[m.id]) delete next[m.id];
      else next[m.id] = { module: m, start: '', end: '', role: 'formateur' };
      return next;
    });
    try { window.plausible?.('CATALOGUE_Module_Selected', { props: { kind, module_id: m.id, ref: m.ref } }); } catch {}
  };

  const setDate = (id, field, value) => {
    setSelected((prev) => {
      const entry = prev[id];
      if (!entry) return prev;
      return { ...prev, [id]: { ...entry, [field]: value } };
    });
    try { window.plausible?.('CATALOGUE_Dates_Set', { props: { kind, module_id: id, field} }); } catch {}
  };

  const setRole = (id, role) => {
    setSelected((prev) => {
      const entry = prev[id];
      if (!entry) return prev;
      return { ...prev, [id]: { ...entry, role } };
    });
    try { window.plausible?.('CATALOGUE_Role_Changed', { props: { kind, module_id: id, role } }); } catch {}
  };

  const selectedList = Object.values(selected);
  const selectedCount = selectedList.length;

  const selectAll = () => {
    if (!current) return;
    const next = { ...selected };
    current.modules.forEach((m) => { next[m.id] = next[m.id] || { module: m, start: '', end: '', role: 'formateur' }; });
    setSelected(next);
  };
  const deselectAll = () => {
    if (!current) return;
    const ids = new Set(current.modules.map((m) => m.id));
    const next = {};
    Object.entries(selected).forEach(([id, v]) => { if (!ids.has(id)) next[id] = v; });
    setSelected(next);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!selectedCount) return;
    // modules → querystring "ref|title|start|end|role;..."
    const items = selectedList
      .map(({ module, start, end, role }) =>
        [module.ref || module.id || '', module.title || '', start || '', end || '', role || 'formateur']
          .map((x) => String(x).replaceAll('|', '/'))
          .join('|')
      )
      .join(';');

    try { window.plausible?.('CATALOGUE_Request_Submitted', { props: { kind, count: selectedCount } }); } catch {}
    try { window.plausible?.('CTA_Contact_Formation_Primary', { props: { from: '/formations', kind, count: selectedCount } }); } catch {}
    navigate(`/contact?source=%2Fformations&subject=Demande%20catalogue%20${encodeURIComponent(kind)}&modules=${encodeURIComponent(items)}`);
  };

  // ——— Styles Card Stack (sx only) ———
  const sxCard = (active) => ({
    borderRadius: 2,
    border: '1px solid',
    borderColor: active ? 'primary.main' : 'rgba(255,255,255,0.12)',
    background:
      active
        ? 'linear-gradient(180deg, rgba(34,93,201,0.16) 0%, rgba(34,93,201,0.08) 100%)'
        : 'rgba(255,255,255,0.04)',
    transition: 'border-color 120ms ease, background 120ms ease, transform 120ms ease',
    p: 1.25,
    '&:hover': { transform: 'translateY(-1px)', borderColor: 'primary.light' },
  });

  const chip = (variant = 'default') => ({
    height: 26,
    borderRadius: '999px',
    ...(variant === 'ok' && { bgcolor: 'success.main', color: 'common.white' }),
    ...(variant === 'warn' && { bgcolor: 'warning.main', color: 'common.black' }),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      aria-labelledby={`catalogue-title-${kind}`}
      aria-describedby={`catalogue-desc-${kind}`}
      keepMounted
      scroll="paper"
      slotProps={{ paper: { sx: { bgcolor: 'background.default' } } }}
    >
      <DialogTitle id={`catalogue-title-${kind}`} sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: 1 }}>
        <Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Chip label={`${selectedCount} sélection(s)`} size="small" sx={{ borderRadius: '999px' }} />
        <IconButton onClick={onClose} aria-label="Fermer le catalogue">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers id={`catalogue-desc-${kind}`} sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: smDown ? '1fr' : '0.9fr 1.6fr 1.1fr',
            minHeight: 'calc(100dvh - 136px)',
          }}
        >
          {/* Colonne 1 : liste des formations */}
          <Box sx={{ borderRight: { sm: '1px solid' }, borderColor: 'divider', p: 2 }}>
            {smDown ? (
              <Select
                fullWidth
                size="small"
                value={current?.id || ''}
                onChange={(e) => setCurrentId(e.target.value)}
                aria-label="Choisir une formation"
              >
                {resolved.map((p) => (
                  <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>
                ))}
              </Select>
            ) : (
              <List dense sx={{ pt: 0 }}>
                {resolved.map((p) => (
                  <ListItemButton
                    key={p.id}
                    selected={p.id === current?.id}
                    onClick={() => setCurrentId(p.id)}
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: p.id === current?.id ? 'primary.main' : 'rgba(255,255,255,0.10)',
                      backgroundColor: p.id === current?.id ? 'rgba(25,118,210,0.10)' : 'transparent',
                    }}
                  >
                    <ListItemText
                      primary={p.title}
                      secondary={p.provider || null}
                      slotProps={{
                        primary: { variant: 'body2', sx: { fontWeight: 700 } },
                        secondary: { variant: 'caption', sx: { opacity: 0.75 } },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Box>

          {/* Colonne 2 : cartes modules */}
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                {current?.title || 'Formation'}
              </Typography>
              <Button size="small" onClick={selectAll}>Tout sélectionner</Button>
              <Button size="small" onClick={deselectAll}>Tout désélectionner</Button>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              {(current?.modules || []).map((m) => {
                const checked = !!selected[m.id];
                const sel = selected[m.id];
                const juryAllowed = m.eligibleJury !== false;
                return (
                  <Box key={m.id} sx={sxCard(checked)}>
                    {/* Header carte */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Checkbox
                      checked={checked}
                       onChange={() => toggle(m)}
                        slotProps={{ input: { 'aria-label': `${checked ? 'Désélectionner' : 'Sélectionner'} ${m.title}` } }}
                         sx={{ p: 0.5 }}
                       />
                      <Typography variant="body1" sx={{ fontWeight: 700, flexGrow: 1 }}>
                        {m.ref ? `${m.ref} — ` : ''}{m.title}
                      </Typography>
                    </Stack>

                    {/* Résumé */}
                    {m.summary && (
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, pl: 4 }}>
                        {m.summary}
                      </Typography>
                    )}

                    {/* Footer inline form (dates + rôle) */}
                    {checked && (
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        sx={{ mt: 1, pl: 4 }}
                      >
                        <TextField
                          label="Début"
                          type="date"
                          size="small"
                          value={sel?.start || ''}
                          onChange={(e) => setDate(m.id, 'start', e.target.value)}
                          slotProps={{ inputLabel: { shrink: true } }}
                          sx={{ maxWidth: 220 }}
                        />
                        <TextField
                          label="Fin"
                          type="date"
                          size="small"
                          value={sel?.end || ''}
                          onChange={(e) => setDate(m.id, 'end', e.target.value)}
                          slotProps={{ inputLabel: { shrink: true } }}
                          sx={{ maxWidth: 220 }}
                        />
                        <Select
                          size="small"
                          value={sel?.role || 'formateur'}
                          onChange={(e) => setRole(m.id, e.target.value)}
                          sx={{ minWidth: 160 }}
                          displayEmpty
                          aria-label="Rôle sur le module"
                        >
                          <MenuItem value="formateur">Formateur</MenuItem>
                          <MenuItem value="jury" disabled={!juryAllowed}>Jury</MenuItem>
                        </Select>
                      </Stack>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>

          {/* Colonne 3 : récap global */}
          <Box sx={{ borderLeft: { sm: '1px solid' }, borderColor: 'divider', p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Votre sélection
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }} aria-live="polite">
              {selectedCount ? `${selectedCount} module(s) sélectionné(s).` : 'Aucun module sélectionné.'}
            </Typography>

            <Stack spacing={1.25} sx={{ maxHeight: '55vh', overflow: 'auto' }}>
              {selectedList.map(({ module, start, end, role }) => (
                <Box
                  key={`recap-${module.id}`}
                  sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: 2, p: 1 }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {module.ref ? `【${module.ref}】 ` : ''}{module.title}
                    </Typography>
                    <Button size="small" onClick={() => setSelected((p) => {
                      const n = { ...p }; delete n[module.id]; return n;
                    })}>Retirer</Button>
                  </Stack>
                  {module.group && (
                    <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
                      {module.group}
                    </Typography>
                  )}

                  <Stack direction="row" spacing={1} sx={{ mt: 0.75, flexWrap: 'wrap' }}>
                    <Chip label={`Début: ${start || '—'}`} size="small" sx={chip(start ? 'ok' : 'warn')} />
                    <Chip label={`Fin: ${end || '—'}`} size="small" sx={chip(end ? 'ok' : 'warn')} />
                    <Chip label={role === 'jury' ? 'Jury' : 'Formateur'} size="small" sx={{ height: 26 }} />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, position: 'sticky', bottom: 0, bgcolor: 'background.default', borderTop: '1px solid', borderColor: 'divider' }}>
        <Button onClick={onClose} variant="outlined">Annuler</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!selectedCount}>
          Envoyer la demande
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Formations() {
  const go = useGo();
  const H = useAvailableHeight();

  const [openEns, setOpenEns] = React.useState(false);
  const [openCond, setOpenCond] = React.useState(false);

  /** Garder l’event Plausible et utiliser ces fonctions dans les boutons */
  const openEnsModal = () => { window?.plausible?.('CTA_Formation_Modules'); setOpenEns(true); };
  const openCondModal = () => { window?.plausible?.('CTA_Formation_Modules'); setOpenCond(true); };

  // JSON-LD concis (keys stables)
  const jsonLD = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'Course', position: 1, name: 'Enseignements & certifications TRM (hors conduite)', description: 'DREAL, BTS/BUT/LP/Masters, Titres Pro — intervenant externe.' },
        { '@type': 'Course', position: 2, name: 'Formations Conducteurs & réglementaires', description: 'CFP porteur/SPL, FIMO/FCO/ADR, Permis C/CE — en centres agréés.' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Intervenez-vous directement en entreprise ?',
          acceptedAnswer: { '@type': 'Answer', text: 'Non. Les interventions se font exclusivement via des centres de formation agréés et des écoles post-bac partenaires.' },
        },
        {
          '@type': 'Question',
          name: 'Peut-on vous confier seulement certains modules ?',
          acceptedAnswer: { '@type': 'Answer', text: 'Oui. Les centres confient chaque module au meilleur spécialiste ; je prends ceux listés dans les catalogues.' },
        },
      ],
    },
  ];

  // Styles communs
  const copyBoxSx = { maxWidth: 760 };
  const titleSx = { fontWeight: 900, letterSpacing: 0.2, lineHeight: 1.2, mb: 1.25 };
  const incitationSx = { mt: 1.8, fontStyle: 'italic', opacity: 0.95 }; // ⬅️ utilisé ci-dessous

  return (
    <>
      <Seo
        title="Formations transport & logistique (TRM) — Axiofleet"
        description="Deux colonnes premium : Enseignements & certifications TRM pour centres/écoles et Formations Conducteurs (PL/SPL, FIMO/FCO/ADR). Catalogues en modale avec sélection rapide par formation."
        canonical="https://www.axiofleet.com/formations"
      />
      {jsonLD.map((obj) => (
        <script
          key={`jsonld-${obj['@type'] || 'schema'}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      {/* H1 SEO masqué visuellement (un seul H1) */}
      <Typography
        component="h1"
        sx={{
          position: 'absolute',
          width: 1, height: 1, overflow: 'hidden',
          clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0, p: 0, m: -1,
        }}
      >
        Formations transport & logistique (TRM) — Axiofleet
      </Typography>

      <main>
        {/* PLEIN ÉCRAN : 2 COLONNES sans scroll */}
        <Box
          component="section"
          aria-labelledby="formations-aria"
          sx={{
            position: 'relative',
            height: `${H}px`,
            overflow: 'clip',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            boxSizing: 'border-box',
          }}
        >
          <Box id="formations-aria" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            Formations Axiofleet — deux colonnes
          </Box>

          {/* Séparateur vertical subtil */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.10) 70%, rgba(255,255,255,0) 100%)',
              zIndex: 1,
            }}
          />

          {/* ——— Colonne GAUCHE ——— */}
          <Box
            component="section"
            aria-labelledby="ens-eyebrow"
            sx={{
              position: 'relative',
              height: '100%',
              minHeight: 0,
              color: 'common.white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              px: { xs: 2, md: 5 },
              py: { xs: 3, md: 4 },
              backgroundImage:
                'linear-gradient( to bottom, rgba(0,0,0,0.74), rgba(0,0,0,0.74) ), url(/presentation/formations-classroom-clean.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Box sx={copyBoxSx}>
              <Typography id="ens-eyebrow" component="p" variant="h4" sx={titleSx}>
                Un renfort qui sécurise vos référentiels et valorise votre organisme.
              </Typography>

              <Typography variant="body1" sx={{ opacity: 0.98 }}>
                Issu de l’exploitation TRM, j’interviens en externe avec le réflexe terrain&nbsp;: des séquences construites pour être
                actionnables dès le lendemain en entreprise, un langage partagé avec vos équipes et des supports propres prêts pour jury.
                Mes cours se basent sur vos référentiels et les adaptes en situations concrètes, structurées et exigeantes — pour des
                promotions qui progressent vite et bien.
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.98, mt: 1 }}>
                Le périmètre couvre l’intégralité du continuum académique <strong>du CAP au MASTER</strong>, en intégrant les{' '}
                <strong>équivalences et titres professionnels</strong>. Chaque intervention est calée sur vos maquettes (RNCP/DREAL),
                vos amplitudes et vos jalons d’évaluation afin d’assurer la continuité de planning, la conformité documentaire et l’image
                premium de votre organisme. <strong>Je peux également intervenir en jury d’examen sur l’ensemble des modules du catalogue</strong>,
                pour sécuriser vos soutenances et vos contrôles.
              </Typography>

              <Box component="ul" sx={{ mt: 1.5, mb: 0, pl: 3 }}>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Capacités & cadre juridique&nbsp;: accès à la profession/marché, social, assurances.</Typography></li>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Exploitation & économie&nbsp;: plan de transport, affrètement, coût de revient & marge.</Typography></li>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Conformité & contrats&nbsp;: CMR/national, litiges, pénalités, archivage probatoire.</Typography></li>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>SI & data&nbsp;: TMS/WMS/ERP, traçabilité, KPI, Excel/Power BI — bases.</Typography></li>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Qualité & RSE&nbsp;: QHSE, sécurité site, audits, Lean/5S — bases.</Typography></li>
              </Box>

              <Typography variant="body2" sx={incitationSx}>
                Parcourez le catalogue, sélectionnez vos modules et réservez vos créneaux.
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button variant="contained" onClick={openEnsModal}>Voir & réserver dans le catalogue</Button>
              <Button
                variant="outlined"
                onClick={() => go('/contact?subject=Intervenant%20externe%20TRM%20(Axiofleet)', 'CTA_Contact_Formation_Primary')}
              >
                Renforcer mon équipe
              </Button>
            </Stack>
          </Box>

          {/* ——— Colonne DROITE ——— */}
          <Box
            component="section"
            aria-labelledby="cond-eyebrow"
            sx={{
              position: 'relative',
              height: '100%',
              minHeight: 0,
              color: 'common.white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              px: { xs: 2, md: 5 },
              py: { xs: 3, md: 4 },
              backgroundImage:
                'linear-gradient( to bottom, rgba(0,0,0,0.74), rgba(0,0,0,0.74) ), url(/presentation/conducteur-cabine.webp), url(/hero/hero-bg-renault-v1.webp)',
              backgroundSize: 'cover, cover, cover',
              backgroundPosition: 'center, center, center',
            }}
          >
            <Box sx={copyBoxSx}>
              <Typography id="cond-eyebrow" component="p" variant="h4" sx={titleSx}>
                Un formateur terrain pour des conducteurs opérationnels.
              </Typography>

              <Typography variant="body1" sx={{ opacity: 0.98 }}>
                Intervention en centres agréés pour assurer vos modules réglementaires et la conduite pratique avec une exigence constante
                de sécurité et de professionnalisme. Organisation fluide des séquences plateau & circulation, pédagogie progressive, retours
                d’expérience et débriefs structurés&nbsp;: l’apprenant gagne en maîtrise, votre organisme gagne en fiabilité et en réputation.
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.98, mt: 1 }}>
                Aligné à vos référentiels et à vos contraintes d’atelier/parc véhicules, j’accompagne des groupes hétérogènes en adaptant
                le rythme, les démonstrations et les mises en situation. De la vérification journalière au cas d’incident, tout est scénarisé
                pour ancrer les bons réflexes&nbsp;: sécurité, réglementation, service au client.
              </Typography>

              <Box component="ul" sx={{ mt: 1.5, mb: 0, pl: 3 }}>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Réglementaires&nbsp;: FIMO • FCO • ADR (base/colis/citerne), sécurité & urgences.</Typography></li>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Conduite PL & SPL&nbsp;: plateau, circulation, manœuvres, attelage/dételage.</Typography></li>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Tachy & RSE&nbsp;: temps, amplitudes, téléchargement & archivage conformes.</Typography></li>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Chargement & arrimage&nbsp;: répartition, équipements, protocoles de site.</Typography></li>
                <li><Typography variant="body2" sx={{ display: 'inline' }}>Écoconduite&nbsp;: anticipation, instrumentation, optimisation carburant.</Typography></li>
              </Box>

              <Typography variant="body2" sx={incitationSx}>
                Parcourez le catalogue, choisissez vos modules et réservez vos dates.
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button variant="contained" onClick={openCondModal}>Voir & réserver dans le catalogue</Button>
              <Button
                variant="outlined"
                onClick={() => go('/contact?subject=Formateur%20conducteurs%20PL/SPL%20(Axiofleet)', 'CTA_Contact_Formation_Primary')}
              >
                Réserver un formateur
              </Button>
            </Stack>
          </Box>
        </Box>
      </main>

      {/* Modales — Card Stack */}
      <CatalogueProgramsModal
        title="Catalogue — Enseignements & certifications TRM"
        open={openEns}
        onClose={() => setOpenEns(false)}
        programs={PROGRAMS_ENSEIGNEMENTS}
        catalog={CATALOG_ENSEIGNEMENTS}
        kind="ENSEIGNEMENTS"
      />
      <CatalogueProgramsModal
        title="Catalogue — Formations Conducteurs & réglementaires"
        open={openCond}
        onClose={() => setOpenCond(false)}
        programs={PROGRAMS_CONDUCTEURS}
        catalog={CATALOG_CONDUCTEURS}
        kind="CONDUCTEURS"
      />
    </>
  );
}
