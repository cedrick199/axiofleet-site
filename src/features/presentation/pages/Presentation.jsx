// src/features/presentation/pages/Presentation.jsx
import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import { useLocation } from "react-router-dom";

// Helper SEO minimal (sans react-helmet-async, compatible React 19)
function SEO({ title, description, canonical }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, description, canonical]);
  return null;
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`presentation-tabpanel-${index}`}
      aria-labelledby={`presentation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Presentation() {
  const [tab, setTab] = useState(0);
  const location = useLocation();

  const handleChange = (_, newValue) => {
    setTab(newValue);
    const tabName = ["formations", "conseil", "tms"][newValue];
    window?.plausible?.("Presentation_Tab", { props: { tab: tabName } });
  };

  useEffect(() => {
    // reset scroll + focus top
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 6 }}>
      <SEO
        title="Axiofleet — Formations & Conseil transport (TRM) • Solutions informatiques"
        description="Axiofleet présente ses offres : formations TRM, conseil en organisation transport et solutions informatiques (TMS). Conformité, efficacité et résultats mesurables."
        canonical="https://www.axiofleet.com/presentation"
      />

      {/* H1 SEO principal */}
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Formations & Conseil transport (TRM) • Solutions informatiques
      </Typography>

      {/* Onglets */}
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Onglets présentation Axiofleet"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ mt: 4, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Formations TRM" id="presentation-tab-0" />
        <Tab label="Conseil & Audit" id="presentation-tab-1" />
        <Tab label="Solutions informatiques (TMS)" id="presentation-tab-2" />
      </Tabs>

      {/* Panels */}
      <TabPanel value={tab} index={0}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {[
              {
                title: "Conformité réglementaire TRM",
                desc: "Maîtrisez les obligations légales et sécurisez vos opérations.",
              },
              {
                title: "Planification conducteurs",
                desc: "Optimisez vos plannings tout en respectant la réglementation sociale.",
              },
              {
                title: "Efficacité exploitation",
                desc: "Améliorez vos marges et gagnez en performance opérationnelle.",
              },
            ].map((tile, idx) => (
              <Card key={idx} sx={{ flex: 1, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {tile.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tile.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                window?.plausible?.("CTA_Formation") ||
                (window.location.href = "/formations")
              }
            >
              Voir les formations
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() =>
                window?.plausible?.("CTA_Devis") ||
                (window.location.href = "/contact")
              }
            >
              Demander un devis
            </Button>
          </Stack>
        </Stack>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {[
              "Audit flash 360°",
              "Cartographie des flux",
              "Quick wins",
              "Feuille de route 90 jours",
              "KPI & retours d’expérience",
            ].map((item, idx) => (
              <Card key={idx} sx={{ flex: 1, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{item}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                window?.plausible?.("CTA_Conseil") ||
                (window.location.href = "/conseil")
              }
            >
              Découvrir le conseil
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() =>
                window?.plausible?.("CTA_Devis") ||
                (window.location.href = "/contact")
              }
            >
              Demander un devis
            </Button>
          </Stack>
        </Stack>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {[
              {
                title: "Planning & Exploitation",
                desc: "Un planning conducteur visuel, connecté et optimisé.",
              },
              {
                title: "Parc & Atelier",
                desc: "Suivi complet des véhicules, interventions et disponibilités.",
              },
              {
                title: "RH Conducteurs",
                desc: "Dossier conducteur digitalisé : contrats, habilitations, absences.",
              },
              {
                title: "Rentabilité & Facturation",
                desc: "KPI temps réel et suivi des marges, facturation intégrée.",
              },
            ].map((tile, idx) => (
              <Card key={idx} sx={{ flex: 1, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {tile.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tile.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                window?.plausible?.("CTA_Demo_TMS") ||
                (window.location.href = "/tms")
              }
            >
              Découvrir le TMS
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href="/pdf/tms-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Brochure PDF
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() =>
                window?.plausible?.("CTA_Devis") ||
                (window.location.href = "/contact")
              }
            >
              Demander un devis
            </Button>
          </Stack>
        </Stack>
      </TabPanel>
    </Box>
  );
}
