import React from 'react';
import Box from '@mui/material/Box';
import Hero from './components/Hero.jsx';

/**
 * Home = plein écran strict, aucune barre de scroll.
 * - width: 100vw  / height: 100dvh
 * - overflow hidden
 */
export default function Home() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Hero />
    </Box>
  );
}
