import React from 'react';
import Box from '@mui/material/Box';
import Hero from './components/Hero.jsx';

/**
 * Home = 1 écran (no scroll).
 * Aucune section en dessous du Hero.
 */
export default function Home() {
  return (
    <Box sx={{ minHeight: '100svh', overflow: 'clip' }}>
      <Hero />
    </Box>
  );
}

