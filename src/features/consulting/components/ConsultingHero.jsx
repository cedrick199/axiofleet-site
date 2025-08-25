import * as React from "react";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { track } from "@/lib/analytics/plausible.js";

export default function ConsultingHero({
  title = "Consulting TRM — TP/BTP & Messagerie",
  subtitle = "Boostez marge & fiabilité en 30 jours. Audit 72 h • Sprint 4–6 sem. • Run mensuel",
  imageUrl = "/consulting/consulting_hub_hero.jpg",
  primaryCta = { label: "Diag 15 min", href: "/contact?subject=Diag%2015%20min&context=Consulting", id: "cta_diag_15min_top" },
  secondaryCta = { label: "Réserver l’Audit 72 h", href: "/consulting/offres/audit-72h", id: "cta_audit72_top" },
  note = "Prestations sur-mesure : notre accompagnement s’adapte à vos priorités.",
}) {
  return (
    <Box sx={{
      position:"relative",
      backgroundColor:"background.default",
      backgroundImage:`url(${imageUrl})`,
      backgroundSize:"cover",
      backgroundPosition:"left center",
      minHeight:{ xs:560, md:"88vh" },
      display:"flex",
      alignItems:"center",
      "&:before":{ content:'""', position:"absolute", inset:0,
        background:"linear-gradient(90deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.85) 46%, rgba(15,23,42,0.25) 100%)" }
    }} role="img" aria-label="Illustration héro consulting Axiofleet">
      <Container maxWidth="lg" sx={{ position:"relative", zIndex:1 }}>
        <Stack spacing={2} maxWidth={840}>
          <Typography variant="h1" sx={{ fontSize:{ xs:36, md:48 }, fontWeight:800, lineHeight:1.1 }}>{title}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize:{ xs:16, md:18 } }}>{subtitle}</Typography>
          <Stack direction="row" spacing={2} sx={{ pt:1, flexWrap:"wrap" }}>
            <Button size="large" variant="contained" href={primaryCta.href}
              onClick={() => track("cta_click", { props: { id: primaryCta.id, page: "/consulting" } })}>
              {primaryCta.label}
            </Button>
            <Button size="large" variant="outlined" color="secondary" href={secondaryCta.href}
              onClick={() => track("cta_click", { props: { id: secondaryCta.id, page: "/consulting" } })}>
              {secondaryCta.label}
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ pt:1 }}>{note}</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
