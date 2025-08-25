import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Container, Stack, Typography, Button, Grid, Card, CardContent, TextField, Checkbox, FormControlLabel, Alert, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Seo from '@/lib/seo/Seo.jsx';

const RESOURCES = [
  { id: 'checklist-ccn-rse', titre: 'Checklist conformité CCN & RSE', type: 'PDF', details: 'Points clés conducteurs, amplitudes, repos, docs à jour (4 pages).' },
  { id: 'guide-pod-24h', titre: 'Guide POD < 24 h', type: 'PDF', details: 'Standard opérationnel, scan, alerte pro-active, relances simples (5 pages).' },
  { id: 'modele-indexation-gazole', titre: 'Modèle d’indexation gazole', type: 'XLSX', details: 'Formule, base de référence, clauses type, exemple de courrier.' },
  { id: 'kpi-rotations-tcycle', titre: 'KPI Rotations & T_cycle', type: 'PDF', details: 'Définitions, seuils d’alerte, lecture terrain, rituels 20 min.' },
];

export default function Ressources() {
  const navigate = useNavigate();
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.classList.add('axio-consulting');
    return () => { document.body.classList.remove('axio-consulting'); };
  }, []);

  const endpoint = (import.meta.env.VITE_FORMS_RESOURCES_ENDPOINT || import.meta.env.VITE_FORMS_ENDPOINT || '/consulting/contact');

  function handleLocalSubmit(e) {
    e.preventDefault();
    const search = new URLSearchParams({
      subject: 'Ressources',
      prenom: prenom || '',
      email: email || '',
      entreprise: entreprise || '',
    }).toString();
    navigate(`/consulting/contact?${search}`);
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Seo
        title="Ressources — Consulting transport (guides & modèles)"
        description="Guides, checklists et modèles pour le transport : POD < 24 h, CCN/RSE, T_cycle, indexation gazole. Opt-in explicite. Envoi sur demande."
        canonical="/consulting/ressources"
      />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          overflowY: 'auto',
          pt: { xs: 3, md: 5 },
          pb: { xs: 12, md: 16 }, // réserve anti-recouvrement footer
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h3" component="h1">Ressources (guides & modèles)</Typography>
          <Button onClick={() => navigate('/consulting/contact')} variant="outlined">
            Nous contacter
          </Button>
        </Stack>

        <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
          Exemples non exhaustifs. Sélection envoyée après opt-in. Sigles : POD = Proof of Delivery, RSE/CCN = obligations sociales, T_cycle = temps complet d’une rotation.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {RESOURCES.map(r => (
            <Grid key={r.id} item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Stack spacing={0.5}>
                    <Typography variant="overline">{r.type}</Typography>
                    <Typography variant="h6">{r.titre}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>{r.details}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h5" sx={{ mb: 1 }}>Recevoir les ressources</Typography>
        <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
          Opt-in explicite requis. Vos données ne sont utilisées que pour l’envoi des contenus choisis.
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Merci ! Votre demande a été envoyée.
          </Alert>
        )}

        {String(endpoint || '').startsWith('http')
          ? (
            <Box
              component="form"
              action={endpoint}
              method="POST"
              onSubmit={() => setSubmitted(true)}
              noValidate
            >
              <input type="hidden" name="form_name" value="resources_optin" />
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Prénom"
                    name="prenom"
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    type="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Entreprise"
                    name="entreprise"
                    value={entreprise}
                    onChange={e => setEntreprise(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={consent} onChange={e => setConsent(e.target.checked)} name="consent" required />}
                    label="J’accepte de recevoir ces ressources par email (opt-in explicite)."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!consent || !email || !prenom}
                    data-event="resources_optin_submit"
                  >
                    Recevoir les ressources
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleLocalSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Prénom"
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    type="email"
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Entreprise"
                    value={entreprise}
                    onChange={e => setEntreprise(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={consent} onChange={e => setConsent(e.target.checked)} required />}
                    label="J’accepte de recevoir ces ressources par email (opt-in explicite)."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!consent || !email || !prenom}
                    data-event="resources_optin_submit"
                  >
                    Recevoir les ressources
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )
        }
      </Container>
    </Box>
  );
}
