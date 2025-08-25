import * as React from "react";
import { Box, Container, Grid, Typography, Paper, Stack, Button } from "@mui/material";

const CASES = [
  {
    title: "Messagerie — réseau régional J+1",
    context: "1 000–1 400 colis/j, IDF + Ouest, 24 véhicules",
    points: [
      "Actions : redesign tournées, cut-offs, preuve photo/signature",
      "Résultats : POD 95,6 %, re-livraisons −22 %, litiges −19 %",
      "Délai : 10 semaines, 3 rituels/sem",
    ],
  },
  {
    title: "TP/BTP — semi-bennes granulats",
    context: "26–32 ensembles, A/R moyen 35–55 km",
    points: [
      "Actions : fenêtres sites, alignement chargeurs/transport",
      "Résultats : rotations +10 %, T_cycle −8 %, attentes −15 %",
      "Délai : 8 semaines, rituels J-1 / J0",
    ],
  },
];

export default function CasClients() {
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
        <Container maxWidth="lg">
          <Typography component="h1" variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Cas clients (exemples)
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
            Chiffres anonymisés, formats courts, preuves simples.
          </Typography>

          <Grid container spacing={2}>
            {CASES.map((c) => (
              <Grid key={c.title} item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, height: "100%" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {c.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                    {c.context}
                  </Typography>
                  <Stack component="ul" sx={{ pl: 2, m: 0 }}>
                    {c.points.map((p) => (
                      <li key={`${c.title}-${p}`}>
                        <Typography variant="body2">{p}</Typography>
                      </li>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
            <Button variant="contained" size="large" href="/consulting/contact?modal=1">
              Nous contacter
            </Button>
            <Button variant="outlined" size="large" href="/consulting/Axiofleet_Consulting_Presentation.pdf">
              Présentation PDF
            </Button>
            <Button variant="text" size="large" href="/consulting">
              Retour au hub
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}





