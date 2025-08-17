// src/routes/NotFound.jsx
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NotFound() {
  const goHome = () => (window.location.href = '/');

  return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Page introuvable
      </Typography>
      <Typography sx={{ mb: 4, color: 'text.secondary' }}>
        La page demandée n’existe pas ou a été déplacée.
      </Typography>
      <Button variant="contained" onClick={goHome}>Revenir à l’accueil</Button>
    </Container>
  );
}
