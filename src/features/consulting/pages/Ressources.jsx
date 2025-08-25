import * as React from "react";
import { Box, Container, Typography, Stack, Button, Paper } from "@mui/material";

export default function Ressources() {
  return (
    <Box
      sx={{
        height: { xs: "auto", md: "calc(100dvh - var(--footer-h, 0px))" },
        overflowY: { xs: "visible", md: "auto" },
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        pb: { xs: 6, md: 2 },
      }}
    >
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Ressources
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
            Guides pratiques, checklists, modèles. Téléchargements avec opt-in RGPD explicite.
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Présentation Consulting
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              PDF de présentation (8–10 pages) : proposition de valeur, résultats, parcours, spécialités, expertises, cas courts.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="contained" href="/consulting/Axiofleet_Consulting_Presentation.pdf">
                Télécharger la présentation
              </Button>
              <Button variant="text" href="/consulting/contact?modal=1">
                Nous contacter
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ display: "block", mt: 2, opacity: 0.8 }}>
              En téléchargeant, vous acceptez de recevoir nos ressources par email (opt-in explicite, révocable à tout moment).
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
