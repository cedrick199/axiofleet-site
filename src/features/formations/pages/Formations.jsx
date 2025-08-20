// src/features/formations/pages/Formations.jsx
import React, { useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import Seo from "../../../lib/seo/Seo.jsx";

/**
 * Helpers
 */
function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Page /formations
 * - Hero, catalogue, modalités, FAQ
 * - SEO via <Seo />, JSON-LD Courses + FAQ
 * - Plausible events réutilisés, navigate() ensuite
 */
export default function FormationsPage() {
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

  const courses = useMemo(
    () => [
      {
        key: "conducteurs",
        title: "Conducteurs : sécurité, conformité & efficacité",
        audience: "Conducteurs PL/SL, nouveaux entrants et confirmés",
        duration: "Formats 1/2 journée à 2 jours",
        level: "Tous niveaux",
        bullets: [
          "Sécurité & gestes pro (arrimages, manœuvres, risques)",
          "Réglementation sociale européenne (bases & réflexes)",
          "Éco-conduite & consommation carburant",
          "Procédures entreprise & documents (checklists prêtes à l’emploi)",
          "Axiofleet côté conducteur : missions, remontées, traçabilité",
        ],
        primaryCta: {
          text: "Réserver une session",
          to: "/contact",
          event: "CTA_Contact_Formation_Primary",
        },
        secondaryCta: {
          text: "Demander les programmes",
          to: "/contact",
          event: "CTA_Formation_Modules",
        },
      },
      {
        key: "exploitation",
        title: "Exploitation : planning robuste & rentabilité terrain",
        audience: "Exploitants, planificateurs, ADV",
        duration: "1 à 2 jours (intra PME)",
        level: "Intermédiaire",
        bullets: [
          "Planning semaine/jour, affectations & contraintes RSE",
          "Vue charge/capacité, lissage & quick wins opérationnels",
          "Suivi absences, aléas, atelier (dispos parc) et alertes",
          "Coûts clés & marges : bases pour arbitrer vite",
          "Axiofleet côté exploitation : process & bonnes pratiques",
        ],
        primaryCta: {
          text: "Parler à un formateur",
          to: "/contact",
          event: "CTA_Contact_Formation_Primary",
        },
        secondaryCta: {
          text: "Obtenir un devis",
          to: "/contact",
          event: "CTA_Formation_Modules",
        },
      },
      {
        key: "direction",
        title: "Dirigeants PME : pilotage simple & conformité",
        audience: "Direction, responsables d’exploitation",
        duration: "Journée atelier + plan 30 jours",
        level: "Avancé",
        bullets: [
          "Conformité réglementaire & preuves (traçabilité simple)",
          "Indicateurs lisibles : service, coûts, marge, risques",
          "Rituels d’équipe & routines hebdo (standard d’exploitation)",
          "Digitalisation pragmatique : par où commencer ?",
          "Teaser TMS Axiofleet : gains rapides sans complexité",
        ],
        primaryCta: {
          text: "Planifier un échange",
          to: "/contact",
          event: "CTA_Contact_Formation_Primary",
        },
        secondaryCta: {
          text: "Recevoir une proposition",
          to: "/contact",
          event: "CTA_Formation_Modules",
        },
      },
    ],
    []
  );

  // JSON-LD SEO (Courses + FAQ)
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          name: "Catalogue de formations Axiofleet",
          itemListElement: courses.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Course",
              name: c.title,
              description: `${c.audience} • ${c.duration} • ${c.level}`,
              provider: {
                "@type": "Organization",
                name: "Axiofleet Formation & Conseil",
                url: "https://www.axiofleet.com",
              },
            },
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name:
                "Proposez-vous des formations intra-entreprise et inter-entreprises ?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Oui. La plupart de nos modules existent en intra (chez vous) et inter (sessions partagées). Contactez-nous pour caler le format le plus pertinent selon vos effectifs et vos contraintes.",
              },
            },
            {
              "@type": "Question",
              name:
                "Peut-on adapter le contenu à nos procédures et à nos outils ?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Oui. Nous personnalisons les cas pratiques avec vos documents et vos process. L’objectif est que vos équipes repartent avec des réflexes et des supports immédiatement actionnables.",
              },
            },
            {
              "@type": "Question",
              name:
                "Proposez-vous des supports PDF et une évaluation des acquis ?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Chaque session inclut des supports PDF et, selon le module, des quiz/évaluations pour tracer les acquis. Un récapitulatif formateur est transmis à l’issue.",
              },
            },
          ],
        },
      ],
    }),
    [courses]
  );

  return (
    <>
      <Seo
        title="Formations transport & logistique (TRM) — Axiofleet"
        description="Formations opérationnelles pour conducteurs, exploitants et dirigeants de PME du TRM : sécurité, RSE, planning, performance. Supports PDF, cas concrets, plan d’actions."
        canonical="https://www.axiofleet.com/formations"
      />

      {/* JSON-LD inline for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Box component="main" sx={{ minHeight: "100vh", color: "common.white" }}>
        {/* HERO */}
        <Box
          sx={{
            background:
              "radial-gradient(1200px 600px at 20% -10%, rgba(255,255,255,0.08), transparent 50%), linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.65))",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
            <Stack spacing={2} sx={{ maxWidth: 920 }}>
              <Typography
                component="h1"
                variant="h3"
                sx={{ fontWeight: 800, lineHeight: 1.15 }}
              >
                Formations TRM,{" "}
                <Box component="span" sx={{ opacity: 0.9 }}>
                  concrètes et immédiatement utiles
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.95 }}>
                Axiofleet forme{" "}
                <strong>conducteurs, exploitants et dirigeants</strong> avec des
                modules pragmatiques : sécurité, conformité, planning, pilotage.
                Supports PDF, cas réels et plan d’actions à 30 jours.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => go("/contact", "CTA_Contact_Formation_Primary")}
                  sx={{ fontWeight: 700, textTransform: "none" }}
                >
                  Réserver une session
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => go("/contact", "CTA_Formation_Modules")}
                  sx={{ textTransform: "none" }}
                >
                  Demander les programmes PDF
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* CATALOGUE */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography component="h2" variant="h4" sx={{ fontWeight: 800 }}>
            Catalogue des formations
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 1, mb: 3 }}>
            Choisissez votre focus : terrain conducteur, excellence
            d’exploitation, pilotage dirigeant.
          </Typography>

          <Grid container spacing={3}>
            {courses.map((c) => (
              <Grid item xs={12} md={4} key={c.key}>
                <ModuleCard
                  title={c.title}
                  audience={c.audience}
                  duration={c.duration}
                  level={c.level}
                  bullets={c.bullets}
                  onPrimary={() => go(c.primaryCta.to, c.primaryCta.event)}
                  onSecondary={() => go(c.secondaryCta.to, c.secondaryCta.event)}
                  primaryLabel={c.primaryCta.text}
                  secondaryLabel={c.secondaryCta.text}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* MODALITÉS */}
        <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 10 } }}>
          <Box
            sx={{
              p: { xs: 2.5, md: 3 },
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 3,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ xs: "flex-start", md: "center" }}
              justifyContent="space-between"
            >
              <Box sx={{ maxWidth: 720 }}>
                <Typography component="h2" variant="h5" sx={{ fontWeight: 800 }}>
                  Modalités & financement
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.75 }}>
                  Sessions <strong>intra-entreprise</strong> (sur site ou visio) et{" "}
                  <strong>inter-entreprises</strong> selon la demande. Adaptation
                  possible aux procédures et documents de votre PME.
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {[
                  "Intra-entreprise",
                  "Inter-entreprises",
                  "Présentiel",
                  "Distanciel",
                  "Supports PDF",
                  "Évaluation des acquis",
                ].map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.24)",
                      color: "common.white",
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.08)" }} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ "& .MuiButton-root": { textTransform: "none" } }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => go("/contact", "CTA_Contact_Formation_Primary")}
                sx={{ fontWeight: 700 }}
              >
                Discuter de vos besoins
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => go("/contact", "CTA_Formation_Modules")}
              >
                Recevoir une proposition personnalisée
              </Button>
            </Stack>
          </Box>
        </Container>

        {/* FAQ */}
        <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
          <Typography component="h2" variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            FAQ
          </Typography>

          <FaqItem
            question="Peut-on mélanger plusieurs thèmes dans la même journée ?"
            answer="Oui, c’est même recommandé pour maximiser l’impact : par exemple 1/2 journée réglementation sociale + 1/2 journée planning d’exploitation."
          />
          <FaqItem
            question="Fournissez-vous des supports et un récapitulatif ?"
            answer="Tous les modules incluent des supports PDF. Un récapitulatif formateur peut être transmis (objectifs, points clés, axes d’amélioration)."
          />
          <FaqItem
            question="Peut-on réaliser une session courte de diagnostic avant de former ?"
            answer="Oui. Un diagnostic flash permet d’identifier des quick wins et d’adapter finement la formation à vos contraintes réelles."
          />
        </Container>
      </Box>
    </>
  );
}

/* ---------- Sous-composants ---------- */

function ModuleCard({
  title,
  audience,
  duration,
  level,
  bullets = [],
  primaryLabel = "Réserver",
  secondaryLabel = "Demander le programme",
  onPrimary,
  onSecondary,
}) {
  const headingId = useMemo(() => `module-${slugify(title)}-title`, [title]);
  const sectionId = useMemo(() => `module-${slugify(title)}-section`, [title]);

  return (
    <Box
      id={sectionId}
      component="section"
      aria-labelledby={headingId}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 3,
        p: 2.5,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
      }}
    >
      <Typography
        id={headingId}
        component="h3"
        variant="h6"
        sx={{ fontWeight: 800 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
        {audience}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 1.25, flexWrap: "wrap" }}>
        <Chip
          label={duration}
          size="small"
          variant="outlined"
          sx={{ borderColor: "rgba(255,255,255,0.24)", color: "common.white" }}
        />
        <Chip
          label={level}
          size="small"
          variant="outlined"
          sx={{ borderColor: "rgba(255,255,255,0.24)", color: "common.white" }}
        />
      </Stack>

      <Box component="ul" sx={{ pl: 2.5, mt: 1.5, mb: 2, flexGrow: 1 }}>
        {bullets.map((b) => {
          const key = `bp-${slugify(title)}-${slugify(b)}`;
          return (
            <Typography
              key={key}
              component="li"
              variant="body2"
              sx={{ mb: 0.6, opacity: 0.95 }}
            >
              {b}
            </Typography>
          );
        })}
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
        <Button
          fullWidth
          variant="contained"
          onClick={onPrimary}
          sx={{ fontWeight: 700, textTransform: "none" }}
        >
          {primaryLabel}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={onSecondary}
          sx={{ textTransform: "none" }}
        >
          {secondaryLabel}
        </Button>
      </Stack>
    </Box>
  );
}

function FaqItem({ question, answer }) {
  const qId = `faq-${slugify(question)}`;
  return (
    <Accordion
      disableGutters
      sx={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 2,
        mb: 1.5,
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={qId}>
        <Typography id={`${qId}-label`} variant="subtitle1" sx={{ fontWeight: 700 }}>
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id={qId} aria-labelledby={`${qId}-label`}>
        <Typography variant="body2" sx={{ opacity: 0.95 }}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
