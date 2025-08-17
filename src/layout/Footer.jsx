import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const year = new Date().getFullYear();

  const goDevis = () => {
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible('CTA_Devis', { props: { location: 'Footer' } });
    }
    window.location.href = '/contact';
  };

  const goFormation = () => {
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible('CTA_Formation', { props: { location: 'Footer' } });
    }
    window.location.href = '/formations';
  };

  return (
    <Box
      component="footer"
      aria-label="Pied de page"
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (t) => t.zIndex.appBar,
        bgcolor: 'rgba(12,12,14,0.45)',               // translucide
        backdropFilter: 'saturate(160%) blur(10px)',   // effet verre
        borderTop: '1px solid rgba(255,255,255,0.06)',
        py: 1,
        pb: 'calc(8px + env(safe-area-inset-bottom))', // safe area iOS
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © {year} Axiofleet — Formation & Conseil
        </Typography>

        <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-end', sm: 'unset' } }}>
          <Button size={isSm ? 'small' : 'medium'} variant="outlined" onClick={goFormation}>
            Réserver une formation
          </Button>
          <Button size={isSm ? 'small' : 'medium'} variant="contained" onClick={goDevis}>
            Demander un devis
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
