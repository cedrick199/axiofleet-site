import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Hero() {
  const onDiscover = () => {
    window?.plausible?.('CTA_Discover_Hero', { props: { location: 'Hero' } });
    // ancre vers la grille modules (ou change pour /formations)
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: { xs: '72vh', md: '78vh' }, // au-dessus de la ligne de flottaison
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'black',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Photo de fond */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/hero/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.55) saturate(0.9)',
          transform: 'scale(1.02)',
        }}
      />
      {/* Overlay dégradé subtil pour lisibilité */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Contenu */}
      <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
        <Box
          component="img"
          src="/axio-logo-mark.svg"
          alt="Logo Axiofleet"
          sx={{ height: 72, mb: 2, opacity: 0.95 }}
        />
        <Typography component="h1" variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.5px' }}>
          axiofleet
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, opacity: 0.95 }}>
          Formation. Conseil. TMS
        </Typography>
        <Typography variant="h6" sx={{ mt: 1.5, color: 'rgba(255,255,255,0.9)' }}>
          L’expertise transport qui accélère votre performance.
        </Typography>

        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Button size="large" variant="contained" onClick={onDiscover}>
            Découvrir
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
