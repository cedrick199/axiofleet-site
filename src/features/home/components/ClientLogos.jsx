import React from 'react';
import { Box, Container } from '@mui/material';
import Section from '@/components/common/Section.jsx';
import SectionTitle from '@/components/common/SectionTitle.jsx';
import { clientLogos } from '../data/testimonials.data.js';

export default function ClientLogos() {
  return (
    <Section id="clients" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <SectionTitle title="Ils nous font confiance" subtitle="Exemples de clients (placeholders)" />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', sm: 'repeat(3,1fr)', md: 'repeat(5,1fr)' },
            gap: 3,
            alignItems: 'center',
            opacity: 0.9
          }}
        >
          {clientLogos.map((c) => (
            <Box key={c.id} component="img" src={c.src} alt={c.name} sx={{ maxHeight: 44, mx: 'auto', filter: 'grayscale(100%)', opacity: 0.8 }} />
          ))}
        </Box>
      </Container>
    </Section>
  );
}

