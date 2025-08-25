// src/features/consulting/pages/Expertises.jsx
import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Chip,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";
import "../consulting-bg.css";
import { EXPERTISES_THEMES, EXPERTISES_FILTERS } from "../data/expertises.data.js";

export default function Expertises() {
  // Active l’arrière-plan “Blueprint Aurora” sur cette page uniquement
  React.useEffect(() => {
    document.body.classList.add("axio-expertises");
    document.documentElement.classList.add("axio-noise");
    return () => {
      document.body.classList.remove("axio-expertises");
      document.documentElement.classList.remove("axio-noise");
    };
  }, []);

  const [filter, setFilter] = React.useState("Tout");
  const [expanded, setExpanded] = React.useState(() => new Set()); // tous fermés par défaut


  const handleExpand = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const matchesFilter = (module) =>
    filter === "Tout" ? true : (module.tags || []).includes(filter);

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "calc(100dvh - var(--footer-h, 0px))" },
        overflowY: { xs: "visible", md: "auto" },
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        pb: { xs: 6, md: 2 },
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ md: "center" }}
          sx={{ mb: 2 }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography component="h1" variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
              Expertises — Consulting transport
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Du module isolé au plan d’exécution, selon vos priorités.
            </Typography>
            {/* Micro-mention explicative */}
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.85 }}>
              Les modules présentés ci-dessous sont des <strong>exemples</strong>. La liste n’est <strong>pas exhaustive</strong> : nous couvrons d’autres besoins du transport (messagerie, TP/BTP, affrètement, capacité, data, TMS/MDM) et <strong>adaptons le périmètre</strong> à votre contexte — du module ciblé au <strong>plan d’exécution complet</strong>.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/consulting/contact?modal=1"
              data-event="expertises_cta_call_click"
            >
              Appel 30 min
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/consulting/cas-clients"
              data-event="expertises_cta_cases_click"
            >
              Voir nos cas
            </Button>
            {/* Bouton "Présentation PDF" supprimé */}
          </Stack>
        </Stack>

        {/* Filtres */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          {EXPERTISES_FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              color={filter === f ? "primary" : "default"}
              variant={filter === f ? "filled" : "outlined"}
              onClick={() => setFilter(f)}
              sx={{ borderRadius: 2 }}
              data-event={`expertises_filter_click:${f}`}
            />
          ))}
        </Stack>

        <Divider sx={{ mb: 2, opacity: 0.3 }} />

        {/* Thèmes en accordéons */}
        <Stack spacing={2}>
          {EXPERTISES_THEMES.map((theme) => {
            const visibleModules = (theme.modules || []).filter(matchesFilter);
            if (visibleModules.length === 0) return null;

            const isOpen = expanded.has(theme.id);

            return (
              <Accordion
                key={theme.id}
                expanded={isOpen}
                onChange={() => handleExpand(theme.id)}
                disableGutters
                square={false}
                sx={{
                  backgroundColor: "rgba(18,20,24,0.6)",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {theme.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                      {theme.goal}
                    </Typography>
                  </Box>
                  {theme.microKpi?.length ? (
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                      {theme.microKpi.map((k) => (
                        <Chip key={k} label={k} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  ) : null}
                </AccordionSummary>

                <AccordionDetails sx={{ px: 2, pb: 2 }}>
                  <Grid container spacing={2}>
                    {visibleModules.map((m) => (
                      <Grid item xs={12} md={6} key={m.id}>
                        <Box
                          sx={{
                            p: 2,
                            height: "100%",
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            {m.title}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Objectif. </strong>
                            {m.objective}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            <strong>On fait. </strong>
                            {m.doing}
                          </Typography>
                          {m.deliverables?.length ? (
                            <Stack component="ul" sx={{ pl: 2, m: 0 }}>
                              {m.deliverables.map((d, i) => (
                                <li key={`${m.id}-d${i}`}>
                                  <Typography variant="body2">{d}</Typography>
                                </li>
                              ))}
                            </Stack>
                          ) : null}

                          {/* Zone actions/tags — "En savoir plus" supprimé */}
                          {m.tags?.length ? (
                            <Stack direction="row" spacing={0.5} sx={{ mt: "auto", flexWrap: "wrap" }}>
                              {m.tags.map((t) => (
                                <Chip key={`${m.id}-${t}`} label={t} size="small" variant="outlined" />
                              ))}
                            </Stack>
                          ) : null}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>

        {/* CTA final */}
        <Container disableGutters sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2, opacity: 0.3 }} />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/consulting/contact?modal=1"
              data-event="expertises_cta_call_click_bottom"
            >
              Appel 30 min
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/consulting/cas-clients"
              data-event="expertises_cta_cases_click_bottom"
            >
              Voir nos cas clients
            </Button>
            {/* Bouton "Présentation PDF" supprimé */}
          </Stack>
        </Container>
      </Container>
    </Box>
  );
}
