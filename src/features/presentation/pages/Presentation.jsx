// src/features/presentation/pages/Presentation.jsx
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Seo from "../../../lib/seo/Seo.jsx";

/** Colonne visuelle générique */
function PhotoColumn({
  id,
  eyebrow,
  title,
  paragraphs = [],
  bulletPoints = [],
  cta = [],
  bgImage,
  bgPosMobile = "center",
  addRightDivider = false,
  overlay = "always",
}) {
  const overlayDisplay =
    overlay === "always" ? { xs: "block", md: "block" } : { xs: "block", md: "none" };
  const CONTENT_MAX = 720;
  const HEADER_MIN_MD = 190;

  return (
    <Box
      component="section"
      aria-labelledby={id}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: { xs: bgPosMobile, md: "center" },
        borderRight: addRightDivider ? { md: "1px solid rgba(255,255,255,0.12)" } : "none",
        px: { xs: 2, md: 5 },
        py: { xs: 3, md: 6 },
        boxSizing: "border-box",
        minHeight: "100%",
      }}
    >
      {/* Overlay sombre */}
      <Box
        aria-hidden
        sx={{
          display: overlayDisplay,
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          pointerEvents: "none",
        }}
      />

      {/* Contenu */}
      <Stack
        sx={{ position: "relative", zIndex: 1, maxWidth: { md: CONTENT_MAX } }}
        spacing={{ xs: 1, md: 1.15 }}
      >
        {/* En-tête : eyebrow + titre + séparateur */}
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "auto auto auto",
            rowGap: { xs: 1, md: 1.25 },
            minHeight: { xs: "auto", md: HEADER_MIN_MD },
            alignContent: "start",
          }}
        >
          {eyebrow && (
            <Typography
              component="p"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "clamp(15px, 3.8vw, 18px)", md: 20 },
                letterSpacing: "0.02em",
                color: "rgba(255,255,255,0.96)",
                m: 0,
              }}
            >
              {eyebrow}
            </Typography>
          )}

          <Typography
            id={id}
            component="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.08,
              fontSize: { xs: "clamp(19px, 4.6vw, 26px)", md: "clamp(26px, 2.2vw, 34px)" },
              color: "#fff",
              textShadow: "0 2px 6px rgba(0,0,0,0.7)",
              m: 0,
            }}
          >
            {title}
          </Typography>

          <Box
            aria-hidden
            sx={{
              width: { xs: 56, md: 72 },
              height: 2,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 100%)",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Paragraphes */}
        {paragraphs.length > 0 && (
          <Stack spacing={{ xs: 0.85, md: 1 }}>
            {paragraphs.map(({ id: pid, content }) => (
              <Typography
                key={pid}
                sx={{
                  color: "#f1f3f5",
                  textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                  fontSize: { xs: "clamp(13px, 3.2vw, 16px)", md: 16 },
                  m: 0,
                }}
              >
                {content}
              </Typography>
            ))}
          </Stack>
        )}

        {/* Puces */}
        {bulletPoints.length > 0 && (
          <Stack component="ul" spacing={{ xs: 0.8, md: 1 }} sx={{ pl: 0, m: 0, listStyle: "none" }}>
            {bulletPoints.map((t) => (
              <Stack key={t} direction="row" spacing={1} alignItems="flex-start" component="li">
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
                    textShadow: "0 1px 2px rgba(0,0,0,0.65)",
                    fontSize: { xs: 13, md: 14 },
                    m: 0,
                  }}
                >
                  {t}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {/* CTA collés en bas */}
      {cta.length > 0 && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.1}
          sx={{
            position: "relative",
            zIndex: 1,
            mt: "auto",
            maxWidth: { md: CONTENT_MAX },
          }}
        >
          {cta.map((btn) =>
            React.cloneElement(btn, {
              sx: {
                width: { xs: "100%", sm: "auto" },
                borderRadius: "999px",
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.1 },
                fontWeight: 600,
                ...(btn.props.sx || {}),
              },
            })
          )}
        </Stack>
      )}
    </Box>
  );
}

/* ✅ Validation des props + valeurs par défaut */
PhotoColumn.propTypes = {
  id: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  paragraphs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ),
  bulletPoints: PropTypes.arrayOf(PropTypes.string),
  cta: PropTypes.arrayOf(PropTypes.element),
  bgImage: PropTypes.string.isRequired,
  bgPosMobile: PropTypes.string,
  addRightDivider: PropTypes.bool,
  overlay: PropTypes.oneOf(["always", "mobile"]),
};

PhotoColumn.defaultProps = {
  eyebrow: undefined,
  paragraphs: [],
  bulletPoints: [],
  cta: [],
  bgPosMobile: "center",
  addRightDivider: false,
  overlay: "always",
};

export default function Presentation() {
  const navigate = useNavigate();

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
    <>
      <Seo
        title="Axiofleet — Formations & Conseil transport (TRM) • Solutions informatiques"
        description="Axiofleet présente ses offres : formations TRM, conseil en organisation transport et solutions informatiques (TMS)."
        canonical="https://www.axiofleet.com/presentation"
      />

      <Box
        sx={{
          width: "100vw",
          minHeight: "calc(100vh - var(--header-h, 64px))",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        {/* FORMATIONS */}
        <PhotoColumn
          id="col-formations"
          eyebrow="Centres de formation"
          title="Intervenant extérieur pour assurer vos sessions transport & logistique."
          paragraphs={[
            {
              id: "form-p1",
              content: (
                <>
                  Animation de modules <strong>théoriques</strong> et <strong>pratiques</strong>{" "}
                  alignés sur vos référentiels. Pédagogie <strong>engageante</strong>, supports
                  clairs, retours d’<strong>expérience terrain</strong>.
                </>
              ),
            },
            {
              id: "form-p2",
              content: (
                <>
                  Objectif : <strong>continuité des sessions</strong>, respect des{" "}
                  <strong>délais de planning</strong> et <strong>qualité d’animation</strong> qui
                  valorise votre organisme.
                </>
              ),
            },
          ]}
          bulletPoints={[
            "Théorie post-bac : exploitation, organisation TRM, réglementation sociale",
            "Pratique terrain : conduite PL & SPL, sécurité, FIMO/FCO",
            "Examens : jurys, évaluations, suivi des compétences",
          ]}
          bgImage="/presentation/formations-classroom-clean.webp?v=20250822-2"
          bgPosMobile="center top"
          addRightDivider
          overlay="always"
          cta={[
            <Button
              key="f_primary"
              variant="contained"
              onClick={() => go("/formations", "CTA_Formation_Modules")}
              sx={{ alignSelf: "center", width: "auto" }}
            >
              Je cherche un formateur
            </Button>,
          ]}
        />

        {/* CONSEIL */}
        <PhotoColumn
          id="col-conseil"
          eyebrow="Consulting TPE-PME"
          title="Conseil TRM & performance globale"
          paragraphs={[
            {
              id: "cons-p1",
              content: (
                <>
                  Audit des <strong>processus d’exploitation</strong> de bout en bout,
                  identification des <strong>frictions</strong>,
                  lecture objective de la <strong>rentabilité</strong>.
                </>
              ),
            },
            {
              id: "cons-p2",
              content: (
                <>
                  Nous apportons un regard externe pour reprendre la main sur l’exploitation
                  et redonner de la marge. Diagnostic terrain rapide, priorités claires, décisions tenables. 
                  Plan 30/60/90 orienté résultats : fiabilité accrue, charge lissée, prix maîtrisés.
                </>
              ),
            },
          ]}
          bulletPoints={[
            "Analyse des processus & responsabilités (flux lisibles, sans doublons)",
            "Lecture économique pragmatique : coût de revient, prix, cash",
          ]}
          bgImage="/presentation/conseil-color-clean.webp?v=20250822-2"
          bgPosMobile="center 25%"
          addRightDivider
          overlay="always"
          cta={[
            <Button key="c1" variant="contained" onClick={() => go("/conseil", "CTA_Conseil")}>
              Voir le hub Consulting
            </Button>,
          ]}
        />

        {/* TMS */}
        <PhotoColumn
          id="col-tms"
          eyebrow="Exploitants & directions TRM"
          title="Un TMS simple pour planifier, suivre et rentabiliser vos opérations."
          paragraphs={[
            {
              id: "tms-p1",
              content: (
                <>
                  Pilotage de l’exploitation, du parc et des RH conducteurs via une interface
                  claire, à la <strong>logique métier</strong>.
                </>
              ),
            },
            {
              id: "tms-p2",
              content: (
                <>
                  Objectif : <strong>gagner du temps</strong>, <strong>fiabiliser</strong> et
                  disposer d’une <strong>vision marge</strong> sans complexité technique.
                </>
              ),
            },
          ]}
          bulletPoints={[
            "Planning & exploitation (drag & drop, RSE)",
            "Parc & atelier (alertes, interventions)",
            "RH conducteurs (contrats, absences)",
            "Rentabilité & facturation intégrée",
          ]}
          bgImage="/presentation/tms-color-clean.webp?v=20250822-2"
          bgPosMobile="center"
          overlay="always"
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
    </>
  );
}
