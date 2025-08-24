import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Shell({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: '1 1 auto',
          minHeight: 0,
          // Desktop : pas de scroll ; Mobile/Tablet : scroll OK
          overflowY: { xs: 'auto', md: 'hidden' },
          // Évite que le footer fixed recouvre le bas de page
          pb: 'var(--footer-h, 0px)',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

Shell.propTypes = {
  children: PropTypes.node,
};
