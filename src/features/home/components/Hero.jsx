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
      {/* Fond : WEBP si présent, fallback JPG ; cadrage et luminosité corrigés */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/hero/hero-bg.webp'), url('/hero/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right 12%',   // place le tracteur derrière le titre
          filter: 'brightness(0.7) contrast(1.05) saturate(1.05)', // + clair que 0.55
          transform: 'scale(1.01)',
        }}
      />

      {/* Overlay doux pour lisibilité (moins agressif que précédemment) */}
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
        {/* Logo : plus grand ; si ton PNG a un carré, on tente un blend pour l’atténuer */}
        <Box
          component="img"
          src="/axio-logo.png"         // ton fichier exact
          alt="Axiofleet"
          sx={{
            height: 108,
            mb: 2,
            opacity: 0.98,
            filter: 'drop-shadow(0 4px 24px rgba(0,0,0,.45))',
            mixBlendMode: 'screen'     // atténue un fond sombre éventuel du PNG
          }}
        />

        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: 'clamp(56px, 10vw, 120px)',   // plus massif
            letterSpacing: '-0.6px',
            lineHeight: 1.04,
          }}
        >
          axiofleet
        </Typography>

        <Typography variant="h4" sx={{ mt: 1, opacity: 0.98 }}>
          Formation. Conseil. TMS
        </Typography>

        <Typography variant="h6" sx={{ mt: 1.5, color: 'rgba(255,255,255,0.95)' }}>
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
