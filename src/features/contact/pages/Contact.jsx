// src/features/contact/pages/Contact.jsx
import * as React from 'react';
import { useMemo, useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Seo from '@/lib/seo/Seo.jsx';
import { track } from '@/lib/analytics/plausible.js';
import ContactForm from '../components/ContactForm.jsx';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function parseModulesParam(raw) {
  if (!raw) return { list: [], raw: '' };
  const decoded = decodeURIComponent(raw);
  const list = decoded
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map((item) => {
      const [ref = '', title = '', start = '', end = '', role = ''] = item.split('|');
      return { ref, title, start, end, role };
    });
  return { list, raw: decoded };
}

function chooseLockedSubject(subjectFromQuery) {
  const s = (subjectFromQuery || '').toUpperCase();
  if (s.includes('ENSEIGNEMENT')) return 'catalog_ens';
  return 'catalog_cond';
}

export default function Contact() {
  const q = useQuery();

  const parsed = useMemo(() => {
    const source = q.get('source') || '';
    const subject = q.get('subject') || '';
    const { list: modules, raw: modules_raw } = parseModulesParam(q.get('modules') || '');
    return { source, subject, modules, modules_raw };
  }, [q]);

  useEffect(() => {
    if (parsed.modules.length > 0) {
      track('Contact_Viewed_With_Modules', {
        props: { count: parsed.modules.length, source: parsed.source || undefined },
      });
    }
  }, [parsed.modules, parsed.source]);

  // Empêche le scroll global tant que cette page est montée
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflowY;
    const prevBody = document.body.style.overflowY;
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
    return () => {
      document.documentElement.style.overflowY = prevHtml;
      document.body.style.overflowY = prevBody;
    };
  }, []);

  const srOnly = {
    position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
    overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
  };

  const lockedSubject = chooseLockedSubject(parsed.subject);

  return (
    <>
      <Seo
        title="Contact — Catalogue Formations | Axiofleet"
        description="Envoyez votre sélection (dates, volumes, référentiels) et recevez une proposition structurée. Réponse rapide — Axiofleet."
        canonical="https://www.axiofleet.com/contact"
      />

      {/* Section blueprint plein écran */}
      <Box
        sx={{
          height: '100dvh',
          overflow: 'hidden',
          position: 'relative',
          background:
            'radial-gradient(1200px 600px at 20% -10%, rgba(0,229,255,0.20), transparent 60%),' +
            'radial-gradient(800px 400px at 90% 10%, rgba(0,229,255,0.12), transparent 60%),' +
            'linear-gradient(180deg, #071321 0%, #0B1624 60%, #0B1119 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,229,255,0.08), rgba(0,229,255,0.08) 1px, transparent 1px, transparent 24px),' +
              'repeating-linear-gradient(90deg, rgba(0,229,255,0.08), rgba(0,229,255,0.08) 1px, transparent 1px, transparent 24px)',
            pointerEvents: 'none',
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            pt: { xs: 3, md: 5 },
            pb: { xs: 3, md: 4 },
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography component="h1" variant="h3" sx={srOnly}>
            Contact — Catalogue Formations
          </Typography>

          <Stack spacing={0.25} sx={{ flex: '0 0 auto' }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Catalogue Formations
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 740 }}>
              Envoyez votre sélection et vos contraintes (dates, volumes, référentiels). Réponse rapide.
            </Typography>
          </Stack>

          <Box sx={{ flex: 1, minHeight: 0 }}>
            <ContactForm
              modules={parsed.modules}
              modulesRaw={parsed.modules_raw}
              source={parsed.source}
              subjectFromQuery={parsed.subject}
              lockedSubjectValue={lockedSubject}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
