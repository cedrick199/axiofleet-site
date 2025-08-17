import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Panel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Presentation() {
  const [tab, setTab] = React.useState(0);

  const go = (href, eventName) => () => {
    window?.plausible?.(eventName, { props: { location: 'Presentation' } });
    window.location.href = href;
  };

  const demanderDevis = () => {
    window?.plausible?.('CTA_Devis', { props: { location: 'Presentation' } });
    window.location.href = '/contact';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography component="h1" variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Présentation de nos offres
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3 }}>
        Formations & Conseil transport (TRM), et solutions informatiques pour gagner en conformité et en performance opérationnelle.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" allowScrollButtonsMobile>
          <Tab label="Formations" />
          <Tab label="Conseil" />
          <Tab label="Solutions informatiques (TMS)" />
        </Tabs>
      </Box>

      <Panel value={tab} index={0}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Formations TRM</Typography>
        <Typography sx={{ mb: 2 }}>
          Programmes opérationnels : conformité, planification conducteurs, RSE, RH conducteurs, efficacité exploitation.
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={go('/formations', 'CTA_Formation')}>Voir les formations</Button>
          <Button variant="outlined" onClick={demanderDevis}>Demander un devis</Button>
        </Stack>
      </Panel>

      <Panel value={tab} index={1}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Conseil & Audit</Typography>
        <Typography sx={{ mb: 2 }}>
          Audit flash 360, cartographie des flux, quick wins et feuille de route 90 jours, KPI & REX.
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={go('/conseil', 'CTA_Conseil')}>Découvrir le conseil</Button>
          <Button variant="outlined" onClick={demanderDevis}>Demander un devis</Button>
        </Stack>
      </Panel>

      <Panel value={tab} index={2}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Solutions informatiques (TMS Axiofleet)</Typography>
        <Typography sx={{ mb: 2 }}>
          Planning & Exploitation, Parc & Atelier, RH Conducteurs, Rentabilité & Facturation. Démo sur demande.
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={go('/tms', 'CTA_Demo_TMS')}>Découvrir le TMS</Button>
          <Button variant="outlined" onClick={demanderDevis}>Demander un devis</Button>
        </Stack>
      </Panel>
    </Container>
  );
}
