import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Hero() {
  const onDiscover = () => {
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible('CTA_Discover_Hero', { props: { location: 'Hero' } });
    }
    // Pas de scroll interne : on sort vers la page Formations
    window.location.href = '/formations';
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100svh', // occupe exactement la hauteur d'écran
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'hidden',
        bgcolor: 'black',
      }}
    >
      {/* Fond clair (camion) */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/hero/hero-bg.webp'), url('/hero/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right 10%',
          filter: 'brightness(1.05) contrast(0.98) saturate(1.06)',
          transform: 'scale(1.003)',
        }}
      />

      {/* Overlay très léger pour lisibilité */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.20) 100%),
            radial-gradient(62% 58% at 52% 40%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.12) 58%, rgba(0,0,0,0.18) 100%)
          `,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
        {/* Logo (transparent) — agrandi & remonté */}
        <Box
          component="img"
          src="/axio-logo.webp"
          alt="Axiofleet"
          sx={{
            height: { xs: 154, md: 192 },
            mt: { xs: -6, md: -6 },
            mb: { xs: 3, md: 3.5 },
            opacity: 0.98,
            filter: 'drop-shadow(0 4px 22px rgba(0,0,0,.30))',
          }}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/axio-logo.png'; }}
        />

        {/* Titre supprimé — on garde uniquement le slogan + punchline */}
        <Typography variant="h4" sx={{ mt: 0.5, opacity: 0.98 }}>
          Formation. Conseil. TMS
        </Typography>

        <Typography variant="h6" sx={{ mt: 1.25, color: 'rgba(255,255,255,0.96)' }}>
          L’expertise transport qui accélère votre performance.
        </Typography>

        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Button
            size="large"
            variant="contained"
            onClick={onDiscover}
            sx={{ px: 4, py: 1.25, borderRadius: '9999px', fontWeight: 700 }}
          >
            Découvrir
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
