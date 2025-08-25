// src/features/contact/pages/contact.jsx (ou ton chemin exact)
import * as React from 'react';
import { useMemo, useEffect, useState } from 'react';
import { Box, Container, Stack, Typography, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useLocation } from 'react-router-dom';
import Seo from '@/lib/seo/Seo.jsx';
import { track } from '@/lib/analytics/plausible.js';
import ContactForm from '../components/ContactForm.jsx';

const AXIO_MAIL = import.meta.env.VITE_AXIO_EMAIL || 'c.dubois@axiofleet.com';
const AXIO_TEL_E164 = import.meta.env.VITE_AXIO_TEL_E164 || '+33600000000';
const AXIO_TEL_HUMAN = import.meta.env.VITE_AXIO_TEL_HUMAN || '06 00 00 00 00';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
function parseModulesParam(raw) {
  if (!raw) return { list: [], raw: '' };
  const decoded = decodeURIComponent(raw);
  const list = decoded.split(';').map(s => s.trim()).filter(Boolean).map((item) => {
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
      track('Contact_Viewed_With_Modules', { props: { count: parsed.modules.length, source: parsed.source || undefined } });
    }
  }, [parsed.modules, parsed.source]);

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

  const [footerH, setFooterH] = useState(56);
  useEffect(() => {
    const measure = () => {
      const f = document.querySelector('footer');
      setFooterH(Math.max(40, f?.offsetHeight || 56));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const srOnly = { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 };
  const lockedSubject = chooseLockedSubject(parsed.subject);

  // Menu "Autres options"
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Seo
        title="Contact — Catalogue Formations | Axiofleet"
        description="Envoyez votre sélection (dates, volumes, référentiels) et recevez une proposition structurée. Réponse rapide — Axiofleet."
        canonical="https://www.axiofleet.com/contact"
      />

      <Box
        sx={{
          height: 'calc(100dvh - var(--header-h, 56px))',
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
          maxWidth: '100vw',
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

          <Stack spacing={0.25} sx={{ flex: '0 0 auto', minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: 800, overflowWrap: 'anywhere' }}>
                Catalogue Formations
              </Typography>
              {/* Bouton discret : Autres options */}
              <IconButton
                size="small"
                aria-label="Autres options"
                aria-controls={open ? 'contact-options' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => { setAnchorEl(e.currentTarget); window?.plausible?.('contact_menu_open'); }}
              >
                <MoreHorizRoundedIcon fontSize="small" />
              </IconButton>
              <Menu
                id="contact-options"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{ dense: true }}
              >
                <MenuItem component="a" href={`mailto:${AXIO_MAIL}`} onClick={() => window?.plausible?.('contact_menu_email_click')}>
                  <ListItemIcon><MailOutlineRoundedIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary={AXIO_MAIL} />
                </MenuItem>
                <MenuItem component="a" href={`tel:${AXIO_TEL_E164}`} onClick={() => window?.plausible?.('contact_menu_tel_click')}>
                  <ListItemIcon><CallRoundedIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary={AXIO_TEL_HUMAN} />
                </MenuItem>
                <MenuItem component="a" href="/axiofleet.vcf" download onClick={() => window?.plausible?.('contact_menu_vcf_download')}>
                  <ListItemIcon><DownloadRoundedIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Ajouter à vos contacts (.vcf)" />
                </MenuItem>
              </Menu>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 740 }}>
              Envoyez votre sélection et vos contraintes (dates, volumes, référentiels). Réponse rapide.
            </Typography>
          </Stack>

          {/* Zone scrollable interne */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              pb: `calc(${footerH}px + 16px + env(safe-area-inset-bottom))`,
              pr: 0.5,
            }}
          >
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
