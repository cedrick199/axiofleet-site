import * as React from 'react';
import { useEffect } from 'react';
import { Box, Container, Stack, Typography, Button, Card, CardContent, Grid, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import Seo from '@/lib/seo/Seo.jsx';

export default function Tarifs() {
  useEffect(() => {
    document.body.classList.add('axio-consulting');
    return () => { document.body.classList.remove('axio-consulting'); };
  }, []);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Seo
        title="Tarifs & modalités — Consulting transport sur-mesure"
        description="Pas de prix catalogue. Tarification sur-mesure selon périmètre, objectifs, livrables. Missions 2–10 semaines, ROI visé en 8–12 semaines."
        canonical="/consulting/tarifs"
      />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          overflowY: 'auto',
          pt: { xs: 3, md: 5 },
          pb: { xs: 12, md: 16 }, // marge pour que le CTA bas reste visible
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h3" component="h1">Tarifs & modalités</Typography>
          <Button
            component={Link}
            to="/consulting/contact"
            variant="contained"
            data-event="pricing_cta_call_click"
          >
            Appel 30 min
          </Button>
        </Stack>

        <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
          Pas de prix catalogue. Chaque mission est chiffrée selon le périmètre, les objectifs et les livrables attendus. Fourchettes de gains observées (non contractuelles) : marge +2–4 pts, POD &lt; 24 h à 94–97 %, rotations chantier +8–12 %, T_cycle –8–12 %.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="overline">Audit ciblé</Typography>
                <Typography variant="h6">1–2 semaines</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Diagnostic opérationnel, priorisation, plan d’actions court terme. Livrables : synthèse, feuille de route 30/60/90 jours.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="overline">Mise en place</Typography>
                <Typography variant="h6">3–8 semaines</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Déploiement des standards : plan J-1, POD, MDM, rôles & responsabilités, pilotage affrètement/pricing, rituels 20 min.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="overline">Suivi & ancrage</Typography>
                <Typography variant="h6">4–12 semaines</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Coaching terrain, contrôle RSE/CCN, revue KPI, amélioration continue, cadrage « make/buy » et indexation gazole.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" sx={{ mb: 1 }}>Comment est construit le devis ?</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          1) Périmètre (messagerie J+1, TP/BTP, mix affrètement) • 2) Objectifs (service, marge, sécurité) • 3) Contrainte sociale (RSE/CCN) • 4) Livrables (standards, formation, coaching) • 5) Disponibilités équipes & saisonnalité.
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            component={Link}
            to="/consulting/contact"
            variant="contained"
            data-event="pricing_cta_call_click_bottom"
          >
            Appel 30 min
          </Button>
          <Button component={Link} to="/consulting/expertises" variant="outlined">
            Voir nos expertises
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
