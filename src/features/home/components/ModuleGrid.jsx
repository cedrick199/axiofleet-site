import React from 'react';
import { Card, CardContent, CardActions, Button, Grid, Typography, Chip, Stack } from '@mui/material';
import Section from '@/components/common/Section.jsx';
import SectionTitle from '@/components/common/SectionTitle.jsx';

const tiles = [
  {
    id: 'mod-formations',
    title: 'Formations TRM',
    desc: 'Programmes opÃ©rationnels : planification, conformitÃ© RSE, RH conducteurs, efficacitÃ© exploitation.',
    href: '/formations',
    cta: 'Voir les formations',
    plausible: 'CTA_Formation',
    badge: 'PrÃ©sentiel / intra'
  },
  {
    id: 'mod-conseil',
    title: 'Conseil & Audit',
    desc: 'Audit flash 360, cartographie des flux, quick wins et feuille de route 90 jours, KPI & REX.',
    href: '/conseil',
    cta: 'DÃ©couvrir le conseil',
    plausible: 'CTA_Devis',
    badge: 'Audit 100% terrain'
  },
  {
    id: 'mod-tms',
    title: 'TMS Axiofleet',
    desc: 'Planning & Exploitation, Parc & Atelier, RH Conducteurs, RentabilitÃ© & Facturation.',
    href: '/tms',
    cta: 'Demander une dÃ©mo',
    plausible: 'CTA_Demo_TMS',
    badge: 'Teaser'
  }
];

export default function ModuleGrid() {
  const go = (href, goal) => () => {
    window?.plausible?.(goal, { props: { location: 'ModuleGrid' } });
    window.location.href = href;
  };

  return (
    <Section id="modules">
      <SectionTitle title="Ce que nous faisons" subtitle="Formations, Conseil, et notre TMS Axiofleet" />
      <Grid container spacing={3}>
        {tiles.map(t => (
          <Grid key={t.id} item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Typography variant="h5" fontWeight={800}>{t.title}</Typography>
                  {t.badge && <Chip size="small" label={t.badge} />}
                </Stack>
                <Typography color="text.secondary">{t.desc}</Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button variant="contained" onClick={go(t.href, t.plausible)}>
                  {t.cta}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

