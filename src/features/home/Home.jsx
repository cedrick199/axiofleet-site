import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Section from '@/components/common/Section.jsx';
import SectionTitle from '@/components/common/SectionTitle.jsx';

// Hero visuel plein-écran
import Hero from './components/Hero.jsx';

// Lazy des blocs pour charger vite l'above-the-fold
const ModuleGrid = React.lazy(() => import('./components/ModuleGrid.jsx'));
const ClientLogos = React.lazy(() => import('./components/ClientLogos.jsx'));
const Testimonials = React.lazy(() => import('./components/Testimonials.jsx'));

export default function Home() {
  const goDevis = () => {
    window?.plausible?.('CTA_Devis', { props: { location: 'Why' } });
    window.location.href = '/contact';
  };
  const goFormation = () => {
    window?.plausible?.('CTA_Formation', { props: { location: 'Why' } });
    window.location.href = '/formations';
  };

  return (
    <Box>
      <Hero />

      {/* POURQUOI visible juste sous le hero */}
      <Section id="pourquoi" sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Pourquoi Axiofleet ?"
            subtitle="Gain de temps · Conformité · Efficacité opérationnelle"
          />
          <Typography color="text.secondary" sx={{ maxWidth: 900 }}>
            Expertise terrain, résultats mesurables, approche premium et pragmatique.
          </Typography>

          {/* CTA visibles et trackés → utilise goDevis (supprime l'avertissement Sonar) */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" size="large" onClick={goDevis}>
              Demander un devis
            </Button>
            <Button variant="outlined" size="large" onClick={goFormation}>
              Réserver une formation
            </Button>
          </Stack>
        </Container>
      </Section>

      {/* Modules + social proof en lazy */}
      <Suspense fallback={null}>
        <ModuleGrid />
        <ClientLogos />
        <Testimonials />
      </Suspense>
    </Box>
  );
}
