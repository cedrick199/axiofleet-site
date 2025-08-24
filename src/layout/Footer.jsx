import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const { pathname } = useLocation();
  const ref = useRef(null);
  const hidden = pathname === '/' || pathname === '/accueil';

  // Expose la hauteur réelle du footer (incluant safe-area) dans une variable CSS
  useEffect(() => {
    // Si le footer est caché, forcer la var à 0 et ne rien écouter
    if (hidden) {
      document.documentElement.style.setProperty('--footer-h', '0px');
      return;
    }
    const apply = () => {
      const h = ref.current?.getBoundingClientRect().height ?? 48;
      document.documentElement.style.setProperty('--footer-h', `${h}px`);
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [hidden]);

  if (hidden) return null;

  const year = new Date().getFullYear();

  return (
    <Box
      ref={ref}
      component="footer"
      sx={{
        position: 'fixed', left: 0, right: 0, bottom: 0,
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
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          © {year} Axiofleet — Formation & Conseil
        </Typography>
        <span />
      </Container>
    </Box>
  );
}
