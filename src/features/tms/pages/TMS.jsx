import * as React from "react";
import Section from "../../../components/common/Section.jsx";
import SectionTitle from "../../../components/common/SectionTitle.jsx";
import { Grid, Card, CardContent, CardActions, Button, Typography, Chip, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { track } from "../../../lib/analytics/plausible";

const modules = [
  {
    key: "planning",
    title: "Planning & Exploitation",
    points: ["Tournées, affrètement", "Contraintes légales (temps)", "Retards & aléas en temps réel"],
  },
  {
    key: "parc",
    title: "Parc & Atelier",
    points: ["Suivi entretiens", "Consommations & pneus", "Immobilisations & alertes"],
  },
  {
    key: "rh",
    title: "RH Conducteurs",
    points: ["Titres & visites à jour", "Notes de frais", "Astreintes & primes"],
  },
  {
    key: "rentab",
    title: "Rentabilité & Facturation",
    points: ["Coûts par mission", "Pré-facturation sans erreurs", "KPIs opérationnels"],
  },
];

export default function TMS() {
  return (
    <Section>
      <SectionTitle
        title="TMS Axiofleet"
        subtitle="Planning · Parc/Atelier · Conducteurs/RH · Rentabilité"
      />

      <Typography sx={{ color: "text.secondary", mb: 3 }}>
        Un TMS pensé pour les PME TRM : simple à déployer, puissant au quotidien, focalisé
        sur la conformité et la performance opérationnelle.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {modules.map((m) => (
          <Grid item xs={12} md={6} key={m.key}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label="PME" size="small" />
                  <Chip label="Conformité" size="small" />
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {m.title}
                </Typography>
                <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "rgba(255,255,255,.75)" }}>
                  {m.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  component={Link}
                  to="/contact?sujet=Demande%20de%20d%C3%A9mo%20TMS"
                  variant="contained"
                  onClick={() => track("CTA_Demo_TMS", { source: "tms_card", module: m.key })}
                >
                  Demander une démo
                </Button>
                <Button href="/pdf/tms-brochure.pdf" target="_blank" rel="noopener">
                  Télécharger la brochure
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          component={Link}
          to="/contact?sujet=Audit%20process%20avant%20TMS"
          color="inherit"
          variant="outlined"
          onClick={() => track("CTA_Audit_TMS", { source: "tms_footer" })}
        >
          Audit rapide gratuit (30 min)
        </Button>
        <Button
          component={Link}
          to="/contact?sujet=Tarifs%20licences%20TMS"
          variant="contained"
          onClick={() => track("CTA_Tarifs_TMS", { source: "tms_footer" })}
        >
          Obtenir les tarifs
        </Button>
      </Stack>
    </Section>
  );
}
