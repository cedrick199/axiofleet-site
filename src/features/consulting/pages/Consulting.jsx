// src/features/consulting/pages/Consulting.jsx
import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import "../consulting-bg.css";

/* Utils ------------------------------------------------------------------- */
const slug = (s = "") =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* --- Carte Étape Méthode (compactée) ------------------------------------- */
const StepCard = ({ index, title, bullets = [], deliverables = [] }) => (
  <Box
    sx={{
      position: "relative",
      p: { xs: 1.75, md: 2 },
      borderRadius: 3,
      bgcolor: "rgba(18,20,24,0.7)",
      border: "1px solid",
      borderColor: "divider",
      height: "100%",
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 12,
        left: 12,
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "2px solid",
        borderColor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        color: "primary.main",
        zIndex: 1,
        fontSize: 14,
      }}
    >
      {index}
    </Box>
    <Box
      sx={{
        position: "absolute",
        top: 30,
        left: 48,
        right: 12,
        height: 2,
        bgcolor: "action.disabled",
        opacity: 0.35,
      }}
    />
    <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, pl: 6 }}>
      {title}
    </Typography>

    {!!bullets.length && (
      <Stack
        component="ul"
        sx={{ pl: 3, mb: 0.75, "& li": { marginBottom: 0.25 } }}
      >
        {bullets.map((b) => (
          <li key={`b-${slug(title)}-${slug(b)}`}>
            <Typography variant="body2">{b}</Typography>
          </li>
        ))}
      </Stack>
    )}

    {!!deliverables.length && (
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 0.25 }}>
        {deliverables.map((d) => (
          <Chip
            key={`d-${slug(title)}-${slug(d)}`}
            label={d}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Stack>
    )}
  </Box>
);
StepCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.string),
  deliverables: PropTypes.arrayOf(PropTypes.string),
};

/* --- Page ----------------------------------------------------------------- */
export default function Consulting() {
  // ✅ Hook placé DANS le composant (et pas au niveau fichier)
  React.useEffect(() => {
    document.body.classList.add("axio-consulting");
    document.documentElement.classList.add("axio-noise");
    return () => {
      document.body.classList.remove("axio-consulting");
      document.documentElement.classList.remove("axio-noise");
    };
  }, []);

  // MÉTHODE — Audit → Mise en place → Suivi
  const method = [
    {
      title: "Audit (diagnostic)",
      bullets: [
        "Terrain + données utiles.",
        "Entretiens courts par rôle ; cartographie des règles J-1/J0 et des points de friction.",
        "Baseline par KPI et cibles prudentes ; 3 quick wins.",
      ],
      deliverables: [
        "Synthèse 1 page",
        "Baseline KPI",
        "Plan d’action 6 semaines",
        "Périmètre pilote",
      ],
    },
    {
      title: "Mise en place",
      bullets: [
        "Prix instantané + prix plancher.",
        "Rituels sobres (J-1 15 min, J0 10 min), ownership par rôle, point hebdo résultats.",
        "Intégration légère TMS/MDM (usages avant outillage).",
      ],
      deliverables: [
        "Grilles tarifaires paramétrées",
        "Règles & checklists",
        "Tableaux de marche & cut-offs",
        "Journal hebdo des résultats",
      ],
    },
    {
      title: "Suivi & ancrage",
      bullets: [
        "Tableau de bord (3–6 KPI) + alertes ; ROI mesuré vs baseline ; correctifs de règles.",
        "Standards & modes opératoires tenus à jour ; formation courte par poste.",
        "Passage de relais et feuille de route 90 jours.",
      ],
      deliverables: [
        "Tableau de bord opérationnel",
        "Charte KPI & alertes",
        "MOP signés",
        "Plan 90 jours",
      ],
    },
  ].map((s) => ({ ...s, id: slug(s.title) }));

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "calc(100dvh - var(--footer-h, 0px))" },
        overflowY: { xs: "visible", md: "auto" },
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        pb: { xs: 5, md: 3 },
      }}
    >
      <Box sx={{ py: { xs: 3, md: 5 } }}>
        {/* Titre + sous-titre (compactés) */}
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1.25,
              fontSize: { xs: 30, md: 42, lg: 46 },
              lineHeight: 1.08,
            }}
          >
            Consulting transport routier sur-mesure
            <br />
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Du terrain aux KPI. Diagnostic, plan d’exécution et pilotage
          </Typography>
        </Container>

        {/* Méthode */}
        <Container maxWidth="lg" sx={{ mt: { xs: 2.5, md: 3.5 } }} id="methode">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.75 }}>
            Méthode simple
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, mb: 1.25 }}>
            Trois étapes. Intervention <strong>à la carte</strong>{" "}
            ou <strong>plan complet</strong> selon votre contexte. L’objectif :
            des gains mesurés, visibles sur vos KPI.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: { xs: 1.25, md: 1.5 },
            }}
          >
            {method.map((s, i) => (
              <StepCard
                key={`step-${s.id}`}
                index={i + 1}
                title={s.title}
                bullets={s.bullets}
                deliverables={s.deliverables}
              />
            ))}
          </Box>
        </Container>

        {/* CTA principal vers Expertises */}
        <Container maxWidth="lg" sx={{ mt: { xs: 3.5, md: 4.5 } }} id="contact">
          <Divider sx={{ mb: 1.25 }} />
          <Stack direction={{ xs: "column" }} spacing={1.25}>
            <Button
              variant="contained"
              size="large"
              href="/consulting/expertises"
              data-event="consulting_cta_expertises"
            >
              Voir les expertises
            </Button>
          </Stack>
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 0.75, opacity: 0.7 }}
          >
            Étapes suivantes (optionnel) : Diagnostic initial · Plan d’exécution
            · Pilotage mensuel
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
