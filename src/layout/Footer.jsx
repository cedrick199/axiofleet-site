import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const { pathname } = useLocation();
  // On masque totalement le footer sur la home pour garantir 0 scroll
  if (pathname === '/' || pathname === '/accueil') return null;

  const year = new Date().getFullYear();
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
        bgcolor: 'rgba(12,12,14,0.38)',
        backdropFilter: 'blur(8px) saturate(140%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        py: 0.75,
        pb: 'calc(6px + env(safe-area-inset-bottom))',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
      >
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          © {year} Axiofleet — Formation & Conseil
        </Typography>
        <span />
      </Container>
    </Box>
  );
}
