import * as React from "react";
import Section from "../../components/common/Section.jsx";
import { Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Section>
      <Stack spacing={2} sx={{ textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>Page introuvable</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Le contenu recherché n’existe plus ou l’URL est incorrecte.
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button component={Link} to="/" variant="contained">Retour à l’accueil</Button>
          <Button component={Link} to="/contact" color="inherit" variant="outlined">Nous contacter</Button>
        </Stack>
      </Stack>
    </Section>
  );
}
