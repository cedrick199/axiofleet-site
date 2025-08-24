// src/components/common/Section.jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, Box } from '@mui/material';

export default function Section({ children, sx, maxWidth = 'lg' }) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={sx}>{children}</Box>
    </Container>
  );
}

Section.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
