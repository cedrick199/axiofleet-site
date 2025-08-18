// src/features/presentation/pages/Presentation.jsx
import React, { useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/** SEO minimal */
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

/** Colonne photo : aucun overlay global.
 *  Ajout MINIMAL pour mobile :
 *   - scrim discret derrière le bloc texte (xs uniquement)
 *   - tailles/paddings adaptés xs
 *   - CTA fullWidth en xs
 */
function PhotoColumn({
  id,
  title,
  subtitle,
  bulletPoints = [],
  cta = [],
  bgImage,
  bgPosMobile = "center",
  addRightDivider = false,
}) {
  return (
    <Box
      component="section"                 // ✅ section sémantique
      aria-labelledby={id}                // ✅ accessibilité
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: { xs: "min(92vh, 840px)", md: "100%" },
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: { xs: bgPosMobile, md: "center" },
        borderRight: addRightDivider ? { md: "1px solid rgba(255,255,255,0.12)" } : "none",
        p: { xs: "20px 16px 20px 16px", md: 5 },
      }}
    >
      {/* scrim discret sous le texte — XS uniquement */}
      <Box
        aria-hidden
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          inset: "0 0 auto 0",
          height: "44%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* contenu */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          id={id}
          component="h2"
          sx={{
            fontWeight: 900,
            lineHeight: 1.05,
            fontSize: { xs: "clamp(26px, 6.4vw, 34px)", md: "clamp(32px, 2.6vw, 40px)" },
            color: "#fff",
            textShadow: "0 2px 6px rgba(0,0,0,0.45)",
            mb: { xs: 1, md: 1.5 },
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            sx={{
              color: "#f1f3f5",
              textShadow: "0 2px 4px rgba(0,0,0,0.4)",
              fontSize: { xs: "clamp(14px, 3.6vw, 16px)", md: 16 },
              maxWidth: { md: 640 },
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Stack spacing={{ xs: 1, md: 1.25 }} sx={{ mt: { xs: 1.25, md: 3 } }}>
          {bulletPoints.map((t) => (
            <Stack key={t} direction="row" spacing={1} alignItems="flex-start">
              <Box
                sx={{
                  mt: { xs: "6px", md: "8px" },
                  width: { xs: 8, md: 10 },
                  height: { xs: 8, md: 10 },
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  boxShadow: "0 0 0 2px rgba(0,0,0,0.28)",
                  flex: "0 0 auto",
                }}
              />
              <Typography
                sx={{
                  color: "#fff",
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  fontSize: { xs: "clamp(13px, 3.4vw, 15px)", md: 14 },
                }}
              >
                {t}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* CTA : fullWidth en XS uniquement */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.25}
        sx={{ position: "relative", zIndex: 1, mt: { xs: 2, md: 4 } }}
      >
        {cta.map((btn) =>
          React.cloneElement(btn, {
            fullWidth: true,
            sx: {
              ...btn.props.sx,
              borderRadius: "999px",
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 1.1 },
              fontWeight: 600,
            },
          })
        )}
      </Stack>
    </Box>
  );
}

export default function Presentation() {
  const navigate = useNavigate();

  // ✅ suppression du "void" operator
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {/* Formations */}
      <PhotoColumn
        id="col-formations"
        title="Formations TRM"
        subtitle="Montez en compétences avec des programmes concrets et opérationnels."
        bgImage="/presentation/formations-classroom-clean.webp?v=20250822-2"
        bgPosMobile="center top"
        addRightDivider
        bulletPoints={[
          "Conformité réglementaire sans faille",
          "Planification conducteurs optimisée",
          "Efficacité exploitation & service client",
        ]}
        cta={[
          <Button key="f1" variant="contained" onClick={() => go("/formations", "CTA_Formation")}>
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

      {/* Conseil */}
      <PhotoColumn
        id="col-conseil"
        title="Conseil & Audit"
        subtitle="Un regard expert sur vos flux et une feuille de route en 90 jours."
        bgImage="/presentation/conseil-color-clean.webp?v=20250822-2"
        bgPosMobile="center 25%"
        addRightDivider
        bulletPoints={[
          "Audit flash 360°",
          "Cartographie des flux",
          "Quick wins mesurables",
          "KPI & coaching opérationnel",
        ]}
        cta={[
          <Button key="c1" variant="contained" onClick={() => go("/conseil", "CTA_Conseil")}>
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

      {/* TMS */}
      <PhotoColumn
        id="col-tms"
        title="Solutions informatiques (TMS)"
        subtitle="Pilotez exploitation, parc, RH et rentabilité avec un outil unique."
        bgImage="/presentation/tms-color-clean.webp?v=20250822-2"
        bgPosMobile="center"
        bulletPoints={[
          "Planning & exploitation (drag & drop, RSE)",
          "Parc & atelier (alertes, interventions)",
          "RH conducteurs (contrats, absences)",
          "Rentabilité & facturation intégrée",
        ]}
        cta={[
          <Button key="t1" variant="contained" onClick={() => go("/tms", "CTA_Demo_TMS")}>
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
