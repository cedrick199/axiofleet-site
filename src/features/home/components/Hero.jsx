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
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'hidden',
        bgcolor: 'black'
      }}
    >
      {/* Fond (WEBP puis JPG) avec cadrage plus lisible */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/hero/hero-bg.webp'), url('/hero/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right 12%',
          filter: 'brightness(0.7) contrast(1.05) saturate(1.05)',
          transform: 'scale(1.01)',
        }}
      />

      {/* Overlay doux pour le contraste */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(65% 60% at 52% 40%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 58%, rgba(0,0,0,0.68) 100%)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
        {/* LOGO (fond transparent) */}
        <Box
          component="img"
          src="/axio-logo.webp"
          alt="Axiofleet"
          sx={{
            height: { xs: 96, md: 120 },       // tailles “propres”
            mb: 1.5,
            opacity: 0.98,
            filter: 'drop-shadow(0 4px 22px rgba(0,0,0,.45))',
          }}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/axio-logo.png'; }}
        />

        {/* >>> Plus de mot “axiofleet” ici <<< */}

        <Typography variant="h4" sx={{ mt: 0.5, opacity: 0.98 }}>
          Formation. Conseil. TMS
        </Typography>

        <Typography variant="h6" sx={{ mt: 1.25, color: 'rgba(255,255,255,0.95)' }}>
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
