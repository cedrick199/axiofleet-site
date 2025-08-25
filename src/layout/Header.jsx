// src/layout/Header.jsx
import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const AXIO_MAIL = import.meta.env.VITE_AXIO_EMAIL || 'c.dubois@axiofleet.com';
const AXIO_TEL_E164 = import.meta.env.VITE_AXIO_TEL_E164 || '+33670103998';
const AXIO_TEL_HUMAN = import.meta.env.VITE_AXIO_TEL_HUMAN || '06 70 10 39 98';

export default function Header() {
  const { pathname } = useLocation();
  const barRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Expose la hauteur du header dans une variable CSS
  useEffect(() => {
    const setHeaderVar = () => {
      const h = barRef.current?.offsetHeight ?? 64;
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };
    setHeaderVar();
    window.addEventListener('resize', setHeaderVar);
    return () => window.removeEventListener('resize', setHeaderVar);
  }, []);

  if (pathname === '/' || pathname === '/accueil') return null;

  return (
    <AppBar
      ref={barRef}
      color="transparent"
      elevation={0}
      position="sticky"
      sx={{
        top: 0, left: 0, right: 0,
        backdropFilter: 'blur(8px) saturate(140%)',
        background: 'rgba(10,10,12,0.55)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Button component={RouterLink} to="/" color="inherit" sx={{ fontWeight: 800 }}>
            axiofleet
          </Button>
          <span style={{ flex: 1 }} />
          <Button component={RouterLink} to="/formations" color="inherit">Formations</Button>
          <Button component={RouterLink} to="/consulting" color="inherit">Conseil</Button>
          <Button component={RouterLink} to="/tms" color="inherit">TMS</Button>
          <Button component={RouterLink} to="/blog" color="inherit">Blog</Button>

          {/* Contact + menu discret */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button component={RouterLink} to="/contact" color="inherit">Contact</Button>
            <IconButton
              aria-label="Options de contact"
              aria-controls={open ? 'contact-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => { setAnchorEl(e.currentTarget); window?.plausible?.('header_contact_menu_open'); }}
              sx={{ ml: 0.5, display: { xs: 'none', md: 'inline-flex' } }}
            >
              <ExpandMoreRoundedIcon />
            </IconButton>

            <Menu
              id="contact-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              // ✅ remplace MenuListProps déprécié
              slotProps={{
                paper: { sx: { minWidth: 260 } },
                list: { dense: true },
              }}
            >
              <MenuItem
                component="a"
                href={`mailto:${AXIO_MAIL}`}
                onClick={() => window?.plausible?.('header_contact_email_click')}
              >
                <ListItemIcon><MailOutlineRoundedIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary={AXIO_MAIL} />
              </MenuItem>
              <MenuItem
                component="a"
                href={`tel:${AXIO_TEL_E164}`}
                onClick={() => window?.plausible?.('header_contact_tel_click')}
              >
                <ListItemIcon><CallRoundedIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary={AXIO_TEL_HUMAN} />
              </MenuItem>
              <MenuItem
                component="a"
                href="/axiofleet.vcf"
                download
                onClick={() => window?.plausible?.('header_contact_vcf_download')}
              >
                <ListItemIcon><DownloadRoundedIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Ajouter à vos contacts (.vcf)" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
