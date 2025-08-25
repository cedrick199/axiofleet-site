import React, { useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const barRef = useRef(null);

  // Expose la hauteur réelle du header dans une variable CSS
  useEffect(() => {
    const setHeaderVar = () => {
      const h = barRef.current?.offsetHeight ?? 64; // ~64 desktop, ~56 mobile MUI
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };
    setHeaderVar();
    window.addEventListener('resize', setHeaderVar);
    return () => window.removeEventListener('resize', setHeaderVar);
  }, []);

  if (pathname === '/' || pathname === '/accueil') return null; // pas de header sur Home

  return (
    <AppBar
      ref={barRef}
      color="transparent"
      elevation={0}
      position="sticky"
      sx={{
        top: 0, left: 0, right: 0,
        backdropFilter: 'blur(8px) saturate(140%)',
        background: 'rgba(10,10,12,0.55)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 800 }}>axiofleet</Button>
          <span style={{ flex: 1 }} />
          <Button component={Link} to="/formations" color="inherit">Formations</Button>
          <Button component={Link} to="/consulting" color="inherit">Conseil</Button>
          <Button component={Link} to="/tms" color="inherit">TMS</Button>
          <Button component={Link} to="/blog" color="inherit">Blog</Button>
          <Button component={Link} to="/contact" color="inherit">Contact</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

