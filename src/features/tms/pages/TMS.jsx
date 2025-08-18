import React from 'react';

// Imports MUI "profonds" → poids analysé finement et meilleur code-splitting
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';

import Section from '@/components/common/Section.jsx';
import SectionTitle from '@/components/common/SectionTitle.jsx';
import Seo from '../../../lib/seo/Seo.jsx';

const MODULES = [
  {
    id: 'planning',
    title: 'Planning & Exploitation',
    badge: 'Drag & Drop',
    desc: 'Vue semaine/jour, affectations conducteurs, contrôles RSE, alertes conflits, suggestions.',
    bullets: [
      'Glisser-déposer tournées',
      'Contrôles RSE en temps réel',
      'Conflits & indispos détectés',
      'Suggestions IA (teaser)'
    ]
  },
  {
    id: 'parc-atelier',
    title: 'Parc & Atelier',
    badge: 'Alertes',
    desc: 'Véhicules, documents, immobilisations, opérations atelier, pièces et validations.',
    bullets: [
      'Documents & validités',
      'Immobilisations visibles au planning',
      'Historique interventions',
      'Exports (PDF/CSV)'
    ]
  },
  {
    id: 'rh',
    title: 'RH Conducteurs',
    badge: 'Conformité',
    desc: 'FIMO/FCO/ADR, visites médicales, habilitations, dossiers conducteur.',
    bullets: [
      'Alertes échéances',
      'Pièces jointes',
      'Absences & règles',
      'Suivi heures (teaser)'
    ]
  },
  {
    id: 'rentabilite',
    title: 'Rentabilité & Facturation',
    badge: 'KPI',
    desc: 'Indicateurs, pré-factu, analyse par tournée/client, export compta.',
    bullets: [
      'KPI exploitation',
      'Pré-facturation',
      'Exports',
      'Rapports personnalisés'
    ]
  }
];

export default function TMS() {
  const onDemo = () => {
    window?.plausible?.('CTA_Demo_TMS', { props: { location: 'TMS_Hero' } });
    window.location.href = '/contact';
  };
  const onTarifs = () => {
    window?.plausible?.('CTA_Tarifs_TMS', { props: { location: 'TMS_Hero' } });
    window.location.href = '/contact';
  };
  const onBrochure = () => {
    window?.plausible?.('CTA_Brochure_TMS', { props: { location: 'TMS_Hero' } });
  };

  return (<>
  <Seo
  title="TMS Axiofleet — Simple, métier, rentable"
  description="Planifier l’exploitation, suivre le parc et les RH conducteurs, facturer et piloter la marge dans un seul outil."
  canonical="https://www.axiofleet.com/tms"
/>
  
    <Box>
      {/* HERO */}
      <Section id="tms-hero" sx={{ pt: { xs: 8, md: 12 }, pb: 6 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography component="h1" variant="h3" fontWeight={900} sx={{ mb: 1, letterSpacing: -0.5 }}>
            TMS Axiofleet (teaser)
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Planning & Exploitation · Parc & Atelier · RH Conducteurs · Rentabilité & Facturation
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button size="large" variant="contained" onClick={onDemo}>Demander une démo</Button>
            <Button size="large" variant="outlined" onClick={onTarifs}>Voir les tarifs</Button>
            <Button size="large" variant="text" component="a" href="/pdf/tms-brochure.pdf" target="_blank" rel="noopener" onClick={onBrochure}>
              Télécharger la brochure
            </Button>
          </Stack>
        </Container>
      </Section>

      {/* MODULES */}
      <Section id="tms-modules">
        <Container maxWidth="lg">
          <SectionTitle title="Modules" subtitle="Clairs, opérationnels, orientés performance" />
          <Grid container spacing={3}>
            {MODULES.map((mod) => (
              <Grid key={mod.id} item xs={12} md={6}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Typography variant="h5" fontWeight={800}>{mod.title}</Typography>
                      {mod.badge && <Chip size="small" label={mod.badge} />}
                    </Stack>
                    <Typography color="text.secondary" sx={{ mb: 1.5 }}>{mod.desc}</Typography>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                      {mod.bullets.map((b) => (
                        <li key={`${mod.id}-${b}`}>
                          <Typography variant="body2">{b}</Typography>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button onClick={onDemo}>Demander une démo</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA final */}
      <Section id="tms-cta" sx={{ py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <SectionTitle title="Vous voulez le voir en action ?" subtitle="Planifions une démonstration et un audit flash de vos besoins" />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button size="large" variant="contained" onClick={onDemo}>Demander une démo</Button>
            <Button size="large" variant="outlined" onClick={onTarifs}>Voir les tarifs</Button>
          </Stack>
        </Container>
      </Section>
    </Box>
  </>);
}


