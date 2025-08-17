import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <AppBar
      color="transparent"
      elevation={0}
      // En overlay sur la Home pour ne pas ajouter de hauteur à la page
      position={isHome ? 'absolute' : 'sticky'}
      sx={{
        top: 0, left: 0, right: 0,
        backdropFilter: 'blur(8px) saturate(140%)',
        background: isHome ? 'rgba(10,10,12,0.28)' : 'rgba(10,10,12,0.55)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 800 }}>axiofleet</Button>
          <span style={{ flex: 1 }} />
          <Button component={Link} to="/" color="inherit">Accueil</Button>
          <Button component={Link} to="/formations" color="inherit">Formations</Button>
          <Button component={Link} to="/conseil" color="inherit">Conseil</Button>
          <Button component={Link} to="/tms" color="inherit">TMS</Button>
          <Button component={Link} to="/blog" color="inherit">Blog</Button>
          <Button component={Link} to="/contact" color="inherit">Contact</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
