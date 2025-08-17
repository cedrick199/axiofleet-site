import React from 'react';
import { Container, Grid, Card, CardContent, Avatar, Typography, Rating, Stack, Button } from '@mui/material';
import Section from '@/components/common/Section.jsx';
import SectionTitle from '@/components/common/SectionTitle.jsx';
import { testimonials } from '../data/testimonials.data.js';

export default function Testimonials() {
  const goDevis = () => {
    window?.plausible?.('CTA_Devis', { props: { location: 'Testimonials' } });
    window.location.href = '/contact';
  };

  return (
    <Section id="temoignages">
      <Container maxWidth="lg">
        <SectionTitle title="Résultats prouvés" subtitle="Témoignages de clients" />
        <Grid container spacing={3}>
          {testimonials.map(t => (
            <Grid key={t.id} item xs={12} md={4}>
              <Card variant="outlined" sx={{ bgcolor: 'background.default', borderRadius: 3, height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar src={t.avatar} alt={t.author} />
                    <div>
                      <Typography fontWeight={700}>{t.author}</Typography>
                      <Typography variant="body2" color="text.secondary">{t.role}</Typography>
                    </div>
                  </Stack>
                  <Rating value={t.rating} readOnly size="small" sx={{ mb: 1 }} />
                  <Typography>« {t.content} »</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack alignItems="center" mt={4}>
          <Button size="large" variant="contained" onClick={goDevis}>
            Demander un devis
          </Button>
        </Stack>
      </Container>
    </Section>
  );
}
