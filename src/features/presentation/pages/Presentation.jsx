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

/**
 * Colonne : Cible (eyebrow) → Accroche (title) → Paragraphes → Puces → CTA (collés en bas)
 * Alignement inter-colonnes :
 *  - headBlock = eyebrow + title + séparateur (+ spacer) avec minHeight commun (md+)
 *  - introBlock = paragraphes avec minHeight commun (md+)
 */
function PhotoColumn({
  id,
  eyebrow,
  title,
  paragraphs = [],       // [{ id, content: <JSX/> }]
  bulletPoints = [],     // strings uniques
  cta = [],              // <Button/> avec keys stables
  bgImage,
  bgPosMobile = "center",
  addRightDivider = false,
  overlay = "always",
}) {
  const overlayDisplay =
    overlay === "always" ? { xs: "block", md: "block" } : { xs: "block", md: "none" };
  const CONTENT_MAX = 720;

  // Hauteurs minimales communes (md+). Ajustées pour réduire le vide sous le titre.
  const HEAD_MIN_H  = { xs: "auto", md: 240 }; // eyebrow + title + trait
  const INTRO_MIN_H = { xs: "auto", md: 220 }; // paragraphes avant les puces

  // Espaces
  const SPACE_AFTER_SEPARATOR = { xs: 8, md: 12 };   // ⬅️ réduit sous le trait
  const GAP_BEFORE_CTA_MIN    = { xs: 12, md: 22 };  // ⬅️ vide au-dessus des CTA

  return (
    <Box
      component="section"
      aria-labelledby={id}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: { xs: bgPosMobile, md: "center" },
        borderRight: addRightDivider ? { md: "1px solid rgba(255,255,255,0.12)" } : "none",
        p: { xs: "16px 14px 18px 14px", md: 5 },
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
      <Stack sx={{ position: "relative", zIndex: 1, maxWidth: { md: CONTENT_MAX } }}>
        {/* ====== HEAD BLOCK (eyebrow + title + trait) — hauteur commune ====== */}
        <Box sx={{ minHeight: HEAD_MIN_H }}>
          {/* EYEBROW = cible */}
          {eyebrow && (
            <Typography
              component="p"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "clamp(15px, 3.8vw, 18px)", md: 20 },
                letterSpacing: 0.2,
                color: "rgba(255,255,255,0.96)",
              }}
            >
              {eyebrow}
            </Typography>
          )}

          {/* TITLE = accroche */}
          <Typography
            id={id}
            component="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.08,
              fontSize: { xs: "clamp(19px, 4.6vw, 26px)", md: "clamp(26px, 2.2vw, 34px)" },
              color: "#fff",
              textShadow: "0 2px 6px rgba(0,0,0,0.7)",
            }}
          >
            {title}
          </Typography>

          {/* Séparateur */}
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
          {/* Spacer sous le trait — réduit */}
          <Box aria-hidden sx={{ height: SPACE_AFTER_SEPARATOR }} />
        </Box>

        {/* ====== INTRO BLOCK (paragraphes) — hauteur commune ====== */}
        {paragraphs.length > 0 && (
          <Box sx={{ minHeight: INTRO_MIN_H }}>
            <Stack spacing={{ xs: 0.85, md: 1 }}>
              {paragraphs.map(({ id: pid, content }) => (
                <Typography
                  key={pid}
                  sx={{
                    color: "#f1f3f5",
                    textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                    fontSize: { xs: "clamp(13px, 3.2vw, 16px)", md: 16 },
                  }}
                >
                  {content}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        {/* ====== BULLETS ====== */}
        {bulletPoints.length > 0 && (
          <Stack
            component="ul"
            spacing={{ xs: 0.8, md: 1 }}
            sx={{ pl: 0, m: 0, listStyle: "none" }}
          >
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
                  }}
                >
                  {t}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {/* Espace avant CTA (crée le vide souhaité) */}
      <Box aria-hidden sx={{ height: GAP_BEFORE_CTA_MIN, flexShrink: 0 }} />

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

export default function Presentation() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const go = (to, eventName) => { try { window?.plausible?.(eventName); } finally { navigate(to); } };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "calc(100dvh - var(--header-h, 64px))",
        overflow: "hidden",
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
                alignés sur vos référentiels. Pédagogie <strong>engageante</strong>, supports clairs,
                retours d’ <strong>expérience terrain</strong>.
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
          <Button key="f_primary" variant="contained" onClick={() => go("/contact", "CTA_Contact_Formation_Primary")}>
            Renforcer mon équipe pédagogique
          </Button>,
          <Button key="f_secondary" variant="outlined" color="secondary" onClick={() => go("/formations", "CTA_Formation_Modules")}>
            Voir les modules de formation
          </Button>,
        ]}
      />

      {/* CONSEIL — contenu validé */}
      <PhotoColumn
        id="col-conseil"
        eyebrow="Consulting TPE-PME"
        title="Analyse des processus et pilotage terrain au service de votre rentabilité."
        paragraphs={[
          {
            id: "cons-p1",
            content: (
              <>
                Audit des{" "}<strong>processus d’exploitation</strong> de bout en bout, identification des{" "}
                <strong>frictions</strong> et des <strong>doublons</strong>, lecture objective de la{" "}
                <strong>rentabilité</strong>.
              </>
            ),
          },
          {
            id: "cons-p2",
            content: (
              <>
                L’accompagnement s’appuie sur les <strong>méthodes</strong>, les{" "}
                <strong>outils</strong> et le <strong>rythme</strong> de travail de l’entreprise —
                sans modèle plaqué — afin de clarifier les <strong>responsabilités</strong> et
                d’installer un <strong>pilotage terrain</strong> pragmatique. Restitution courte :
                vision d’ensemble partagée et <strong>plan d’actions 30/60/90 jours</strong> ; des{" "}
                <strong>outils informatiques adaptés</strong> peuvent accompagner le déploiement si
                nécessaire, sans complexifier.
              </>
            ),
          },
        ]}
        bulletPoints={[
          "Analyse des processus & responsabilités (flux lisibles, sans doublons)",
          "Lecture économique pragmatique : coût de revient, prix, cash",
          "Plan d’actions priorisé 30/60/90 jours, exécution accompagnée",
        ]}
        bgImage="/presentation/conseil-color-clean.webp?v=20250822-2"
        bgPosMobile="center 25%"
        addRightDivider
        overlay="always"
        cta={[
          <Button key="c1" variant="contained" onClick={() => go("/conseil", "CTA_Conseil")}>
            Découvrir le conseil
          </Button>,
          <Button key="c2" variant="outlined" color="secondary" onClick={() => go("/contact", "CTA_Devis")}>
            Demander un devis
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
                Pilotage de l’exploitation, du parc et des RH conducteurs via une interface claire, à la{" "}
                <strong>logique métier</strong>.
              </>
            ),
          },
          {
            id: "tms-p2",
            content: (
              <>
                Objectif : <strong>gagner du temps</strong>, <strong>fiabiliser</strong> et disposer d’une{" "}
                <strong>vision marge</strong> sans complexité technique.
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
          <Button key="t2" variant="outlined" href="/pdf/tms-brochure.pdf" target="_blank" rel="noopener noreferrer">
            Brochure PDF
          </Button>,
          <Button key="t3" variant="outlined" color="secondary" onClick={() => go("/contact", "CTA_Devis")}>
            Demander un devis
          </Button>,
        ]}
      />
    </Box>
  );
}
