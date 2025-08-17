import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ASSETS_VERSION = '20250822';
const BG_WEBP   = `/hero/hero-bg-renault-v1.webp?v=${ASSETS_VERSION}`;
const LOGO_WEBP = `/axio-logo.webp?v=${ASSETS_VERSION}`;
const LOGO_PNG  = `/axio-logo.png?v=${ASSETS_VERSION}`;

export default function Hero() {
  const onPrimary = () => {
    window?.plausible?.('CTA_Devis', { props: { location: 'Hero' } });
    window.location.href = '/presentation';
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'hidden',
        bgcolor: 'black',
      }}
    >
      {/* Fond plein écran */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${BG_WEBP}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right 12%',
          filter: 'brightness(1.05) contrast(0.98) saturate(1.06)',
        }}
      />

      {/* Overlay léger pour lisibilité */}
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
        {/* LOGO uniquement (pas de titre redondant) */}
        <Box
          component="img"
          src={LOGO_WEBP}
          alt="Axiofleet"
          sx={{
            height: { xs: 154, md: 192 },
            mt: { xs: -6, md: -6 },
            mb: { xs: 3.5, md: 4 },
            opacity: 0.98,
            filter: 'drop-shadow(0 4px 22px rgba(0,0,0,.30))',
          }}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = LOGO_PNG; }}
        />

        {/* H1 SEO unique */}
        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: 0.2,
            textShadow: '0 1px 10px rgba(0,0,0,.35)',
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: { xs: 1.15, md: 1.2 },
          }}
        >
          Formations & Conseil transport (TRM) • Solutions informatiques
        </Typography>

        {/* Tagline */}
        <Typography
          component="p"
          sx={{
            mt: 1.5,
            color: 'rgba(255,255,255,0.96)',
            fontSize: { xs: '18px', md: '22px' },
            lineHeight: { xs: 1.35, md: 1.35 },
          }}
        >
          L’expertise transport qui accélère votre performance.
        </Typography>

        {/* CTA principal */}
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Button
            size="large"
            variant="contained"
            onClick={onPrimary}
            sx={{ px: 4, py: 1.25, borderRadius: '9999px', fontWeight: 700 }}
          >
            Demander un devis
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
