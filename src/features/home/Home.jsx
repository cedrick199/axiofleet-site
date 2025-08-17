import * as React from "react";
import { Stack, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Section from "../../components/common/Section.jsx";
import SectionTitle from "../../components/common/SectionTitle.jsx";
import StickyCTA from "../../components/common/StickyCTA.jsx";
import { track } from "../../lib/analytics/plausible";

export default function Home() {
  return (
    <>
      <Section sx={{ textAlign: "center" }}>
        <Box component="h1" sx={{ m: 0, fontSize: { xs: 44, sm: 56 }, fontWeight: 900, letterSpacing: 1 }}>
          axiofleet
        </Box>

        <Typography sx={{ color: "text.secondary", mb: 3 }}>
          Formations & Conseil TRM — passez de la contrainte à la performance.
        </Typography>

        <Stack direction="row" gap={2} justifyContent="center">
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            size="large"
            onClick={() => track("CTA_Devis", { source: "home_hero" })}
          >
            Demander un devis
          </Button>
          <Button
            component={Link}
            to="/formations"
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => track("CTA_Formation", { source: "home_hero" })}
          >
            RÉSERVER UNE FORMATION
          </Button>
        </Stack>
      </Section>

      <Section>
        <SectionTitle
          title="Pourquoi Axiofleet ?"
          subtitle="Gain de temps · Conformité · Efficacité opérationnelle"
        />
        <Typography sx={{ color: "rgba(255,255,255,.7)" }}>
          Expertise terrain, résultats mesurables, approche premium et pragmatique.
        </Typography>
      </Section>

      <StickyCTA />
    </>
  );
}
