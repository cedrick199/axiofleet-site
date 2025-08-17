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
      {/* Fond plus clair */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/hero/hero-bg.webp'), url('/hero/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right 10%',
          filter: 'brightness(0.9) contrast(1.02) saturate(1.08)',
          transform: 'scale(1.005)',
        }}
      />
      {/* Overlay léger */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.30) 100%),
            radial-gradient(62% 58% at 52% 40%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0.36) 100%)
          `,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
        {/* LOGO : remonté + plus d'espace sous le logo */}
        <Box
          component="img"
          src="/axio-logo.webp"
          alt="Axiofleet"
          sx={{
            height: { xs: 154, md: 192 },
            mt: { xs: -6, md: -6 },             // ← remonte le logo
            mb: { xs: 3, md: 3.5 },              // ← plus d'espace avec le slogan
            opacity: 0.98,
            filter: 'drop-shadow(0 4px 22px rgba(0,0,0,.35))',
          }}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/axio-logo.png'; }}
        />

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
