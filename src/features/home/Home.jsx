import React from 'react';
import Box from '@mui/material/Box';
import Hero from './components/Hero.jsx';
import Seo from '../../lib/seo/Seo.jsx';

/**
 * Home = 1 écran strict. On bloque aussi le scroll du <body> pendant le montage.
 */
export default function Home() {
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
  <Seo
  title="Axiofleet — Formations, Conseil TRM & TMS"
  description="Formations transport/logistique, consulting TPE-PME TRM (TP/Bennes) et TMS simple pour piloter exploitation, parc et RH."
  canonical="https://www.axiofleet.com/"
/>
  
    <Box
      sx={{
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Hero />
    </Box>
  </>);
}




