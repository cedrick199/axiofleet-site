import * as React from "react";
import Section from "../../../components/common/Section.jsx";
import SectionTitle from "../../../components/common/SectionTitle.jsx";
import { Grid } from "@mui/material";
import FormationCard from "../components/FormationCard.jsx";
import { formations } from "../data/formations.catalog.js";
import Seo from '../../../lib/seo/Seo.jsx';

export default function Formations() {
  return (
  <Seo
  title="Formations TRM — Axiofleet"
  description="Modules théoriques & pratiques avec intervenant extérieur. Conformité et efficacité pédagogique."
  canonical="https://www.axiofleet.com/formations"
/>
  
    <Section>
      <SectionTitle title="Formations" subtitle="Exploitation, conformité, efficacité opérationnelle" />
      <Grid container spacing={2}>
        {formations.map(f => (
          <Grid item xs={12} md={6} key={f.slug}>
            <FormationCard f={f} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

