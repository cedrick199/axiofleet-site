import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography, Button, Grid, Card, CardContent, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import Seo from '@/lib/seo/Seo.jsx';

const CASES = [
  {
    id: 'messagerie-j1',
    secteur: 'Messagerie J+1',
    titre: 'Stabiliser le J+1 et réduire les re-livraisons',
    taille: 'PME – 38 conducteurs / 42 véhicules',
    periode: 'T2–T3 2025 (8 semaines)',
    contexte: [
      "POD (Proof of Delivery) sous 24 h irrégulier (88–90 %)",
      "Pics de re-livraisons J+2/J+3",
      "RSE/CCN : alertes horaires et coupures mal gérées",
    ],
    actions: [
      "Plan J-1 verrouillé + buffers sites sensibles ; règle d’exception J-0 cadrée",
      "Standard POD < 24 h : check-in quai, scan systématique, alerte pro-active",
      "MDM adresses clients & fenêtres ; matrice re-livraisons (causes → correctifs)",
    ],
    resultats: [
      "POD < 24 h : 94–97 %",
      "Re-livraisons : –18 à –25 %",
      "Marge opérationnelle : +2–4 pts (mix productivité + affrètement maîtrisé)",
    ],
    duree: "8 semaines (S1 audit, S2–S7 déploiement, S8 ancrage)",
    tags: ['J+1', 'POD', 'RSE/CCN', 'MDM'],
  },
  {
    id: 'tp-btp',
    secteur: 'TP / BTP – Bennes',
    titre: 'Augmenter les rotations chantier et fiabiliser le T_cycle',
    taille: 'PME – 24 bennes / 28 conducteurs',
    periode: 'T1 2025 (6 semaines)',
    contexte: [
      "T_cycle (chargement → déchargement) peu prévisible",
      "Sous-utilisation créneaux matin (7–9h)",
      "Planning véhicule/chauffeur peu « site-aware »",
    ],
    actions: [
      "Fenêtrage chantier + créneaux dédiés ; priorisation départs tôt",
      "Tableau T_cycle par chantier + alerte dérive (quai/matériaux/attentes)",
      "Règles d’affectation site/compétence ; indispo atelier intégrée",
    ],
    resultats: [
      "Rotations/jour : +8–12 %",
      "T_cycle : –10–14 %",
      "Consommables (ralentis/attentes) : –6–9 %",
    ],
    duree: "6 semaines (flash + mise en place + coaching terrain)",
    tags: ['Chantier', 'T_cycle', 'Rotations', 'Atelier'],
  },
  {
    id: 'mix-affretement',
    secteur: 'Mix affrètement / propre',
    titre: 'Optimiser le make/buy sans dégrader le service',
    taille: 'Multi-activité – 60 conducteurs / 65 véhicules',
    periode: 'T4 2024 (5 semaines)',
    contexte: [
      "Affrètement en pic hebdo > 22 %",
      "Données coût de revient incomplètes",
      "Volatilité prix gazole",
    ],
    actions: [
      "Pricing instantané : barème maison + indexation gazole",
      "Tableau marge course et seuils prix plancher",
      "Règles make/buy (seuil remplissage, distance, fenêtre serrée)",
    ],
    resultats: [
      "Taux affrètement : –3–6 pts (à volumes constants)",
      "Marge/course : +1,5–3 pts",
      "Pérennisation via rituels hebdo (20 min) et MDM tarifs",
    ],
    duree: "5 semaines (audit ciblé → déploiement outillé)",
    tags: ['Affrètement', 'Pricing', 'Indexation gazole', 'Marge'],
  },
];

function CaseDialog({ open, onClose, cas }) {
  if (!cas) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{cas.secteur} — {cas.titre}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {cas.taille} • {cas.periode} • Durée : {cas.duree}
          </Typography>

          <Box>
            <Typography variant="overline">Contexte</Typography>
            <Stack component="ul" sx={{ pl: 3, mt: 1 }} spacing={0.5}>
              {cas.contexte.map((c, i) => <li key={i}><Typography variant="body2">{c}</Typography></li>)}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="overline">Actions menées</Typography>
            <Stack component="ul" sx={{ pl: 3, mt: 1 }} spacing={0.5}>
              {cas.actions.map((a, i) => <li key={i}><Typography variant="body2">{a}</Typography></li>)}
            </Stack>
          </Box>

          <Box>
            <Typography variant="overline">Résultats (fourchettes)</Typography>
            <Stack component="ul" sx={{ pl: 3, mt: 1 }} spacing={0.5}>
              {cas.resultats.map((r, i) => <li key={i}><Typography variant="body2">{r}</Typography></li>)}
            </Stack>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
              Résultats indicatifs selon contexte et périmètre. Aucun engagement de résultat.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {cas.tags.map(t => <Chip key={t} label={t} size="small" />)}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button component={Link} to="/consulting/contact" variant="contained" data-event="cases_cta_call_click">
          Appel 30 min
        </Button>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CasClients() {
  const [openId, setOpenId] = useState(null);
  const current = useMemo(() => CASES.find(c => c.id === openId), [openId]);

  useEffect(() => {
    document.body.classList.add('axio-consulting');
    return () => { document.body.classList.remove('axio-consulting'); };
  }, []);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Seo
        title="Cas clients — Consulting transport (Messagerie J+1 & TP/BTP)"
        description="3 cas concrets : contexte, actions, résultats. POD < 24 h, rotations chantier, T_cycle, marge +2–4 pts. Exemples non exhaustifs, sur-mesure."
        canonical="/consulting/cas-clients"
      />
      {/* Spacer bas ajouté via pb pour ne pas passer sous le footer */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          overflowY: 'auto',
          pt: { xs: 3, md: 5 },
          pb: { xs: 12, md: 16 }, // ~96–128px de marge pour le footer
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h3" component="h1">Cas clients (Messagerie J+1 & TP/BTP)</Typography>
          <Button
            component={Link}
            to="/consulting/contact"
            variant="contained"
            data-event="cases_cta_call_click"
          >
            Appel 30 min
          </Button>
        </Stack>

        <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
          Exemples non exhaustifs. Les résultats dépendent du contexte, du périmètre et des objectifs. Sigles : POD = Proof of Delivery, RSE/CCN = obligations sociales, T_cycle = temps complet d’une rotation.
        </Typography>

        <Grid container spacing={2}>
          {CASES.map(c => (
            <Grid key={c.id} item xs={12} md={4}>
              <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="overline">{c.secteur}</Typography>
                    <Typography variant="h6">{c.titre}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>{c.taille}</Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="subtitle2">Actions clés</Typography>
                    <Stack component="ul" sx={{ pl: 3 }} spacing={0.5}>
                      {c.actions.slice(0, 3).map((a, i) => <li key={i}><Typography variant="body2">{a}</Typography></li>)}
                    </Stack>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>Résultats</Typography>
                    <Stack component="ul" sx={{ pl: 3 }} spacing={0.5}>
                      {c.resultats.slice(0, 2).map((r, i) => <li key={i}><Typography variant="body2">{r}</Typography></li>)}
                    </Stack>
                  </Stack>
                </CardContent>
                <Divider />
                <Stack direction="row" spacing={1} sx={{ p: 1.5 }} justifyContent="space-between">
                  <Button size="small" onClick={() => setOpenId(c.id)}>
                    Voir le détail
                  </Button>
                  <Button
                    size="small"
                    component={Link}
                    to="/consulting/contact"
                    variant="contained"
                    data-event="cases_cta_call_click_bottom"
                  >
                    Appel 30 min
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <CaseDialog open={Boolean(openId)} onClose={() => setOpenId(null)} cas={current} />
    </Box>
  );
}
