import React from 'react';
import Box from '@mui/material/Box';
import Hero from './components/Hero.jsx';

/**
 * Home = 1 écran strict, aucun scroll.
 * - height: 100dvh (gère les barres d’URL mobiles)
 * - overflow: hidden (coupe tout débordement)
 */
export default function Home() {
  return (
    <Box
      sx={{
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Hero />
    </Box>
  );
}

