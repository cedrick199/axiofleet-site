// src/features/presentation/pages/Presentation.jsx
import React, { useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/** SEO helper minimal (sans react-helmet-async) */
function Seo({ title, description, canonical }) {
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

/** Colonne photo sans overlay, 33.33% largeur en desktop */
function PhotoColumn({
  id,
  title,
  subtitle,
  bulletPoints = [],
  cta = [],
  bgImage,
  addRightDivider = false,
}) {
  return (
    <Box
      role="region"
      aria-labelledby={id}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 3, md: 5 },
        // ✅ Fond photo couleur, sans overlay ni filtre
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Séparation nette facultative (pas d’ombre baveuse, pas de chevauchement)
        borderRight: addRightDivider ? "1px solid rgba(255,255,255,0.10)" : "none",
        // Garantit la même hauteur que les autres colonnes
        minHeight: "100%",
      }}
    >
      <Box>
        <Typography
          id={id}
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 1,
            lineHeight: 1.1,
            color: "#fff",
            textShadow: "0 3px 6px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body1"
            sx={{ color: "#f5f5f5", textShadow: "0 2px 4px rgba(0,0,0,0.45)" }}
          >
            {subtitle}
          </Typography>
        )}

        <Stack spacing={1.25} sx={{ mt: 3 }}>
          {bulletPoints.map((t) => (
            <Stack key={t} direction="row" spacing={1.25} alignItems="flex-start">
              <Box
                sx={{
                  mt: "6px",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  boxShadow: "0 0 0 2px rgba(0,0,0,0.25)",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
              >
                {t}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 4 }}>
        {cta}
      </Stack>
    </Box>
  );
}

export default function Presentation() {
  const navigate = useNavigate();
  useEffect(() => void window.scrollTo(0, 0), []);

  const go = (to, eventName) => {
    try {
      window?.plausible?.(eventName);
    } finally {
      navigate(to);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        // ✅ 3 colonnes exactement égales en desktop, pile en mobile
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        alignItems: "stretch",
      }}
    >
      <Seo
        title="Axiofleet — Formations & Conseil transport (TRM) • Solutions informatiques"
        description="Axiofleet présente ses offres : formations TRM, conseil en organisation transport et solutions informatiques (TMS). Conformité, efficacité et résultats mesurables."
        canonical="https://www.axiofleet.com/presentation"
      />

      {/* Colonne 1 — Formations (photo classe) */}
      <PhotoColumn
        id="col-formations"
        title="Formations TRM"
        subtitle="Montez en compétences avec des programmes concrets et opérationnels."
        bgImage="/presentation/formations-classroom-clean.webp"
        addRightDivider
        bulletPoints={[
          "Conformité réglementaire sans faille",
          "Planification conducteurs optimisée",
          "Efficacité exploitation & service client",
        ]}
        cta={[
          <Button
            key="f1"
            variant="contained"
            onClick={() => go("/formations", "CTA_Formation")}
          >
            Voir les formations
          </Button>,
          <Button
            key="f2"
            variant="outlined"
            color="secondary"
            onClick={() => go("/contact", "CTA_Devis")}
          >
            Demander un devis
          </Button>,
        ]}
      />

      {/* Colonne 2 — Conseil */}
      <PhotoColumn
        id="col-conseil"
        title="Conseil & Audit"
        subtitle="Un regard expert sur vos flux et une feuille de route en 90 jours."
        bgImage="/presentation/conseil-color-clean.webp"
        addRightDivider
        bulletPoints={[
          "Audit flash 360°",
          "Cartographie des flux",
          "Quick wins mesurables",
          "KPI & coaching opérationnel",
        ]}
        cta={[
          <Button
            key="c1"
            variant="contained"
            onClick={() => go("/conseil", "CTA_Conseil")}
          >
            Découvrir le conseil
          </Button>,
          <Button
            key="c2"
            variant="outlined"
            color="secondary"
            onClick={() => go("/contact", "CTA_Devis")}
          >
            Demander un devis
          </Button>,
        ]}
      />

      {/* Colonne 3 — TMS */}
      <PhotoColumn
        id="col-tms"
        title="Solutions informatiques (TMS)"
        subtitle="Pilotez exploitation, parc, RH et rentabilité avec un outil unique."
        bgImage="/presentation/tms-color-clean.webp"
        bulletPoints={[
          "Planning & exploitation (drag & drop, RSE)",
          "Parc & atelier (alertes, interventions)",
          "RH conducteurs (contrats, absences)",
          "Rentabilité & facturation intégrée",
        ]}
        cta={[
          <Button
            key="t1"
            variant="contained"
            onClick={() => go("/tms", "CTA_Demo_TMS")}
          >
            Découvrir le TMS
          </Button>,
          <Button
            key="t2"
            variant="outlined"
            href="/pdf/tms-brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brochure PDF
          </Button>,
          <Button
            key="t3"
            variant="outlined"
            color="secondary"
            onClick={() => go("/contact", "CTA_Devis")}
          >
            Demander un devis
          </Button>,
        ]}
      />
    </Box>
  );
}
