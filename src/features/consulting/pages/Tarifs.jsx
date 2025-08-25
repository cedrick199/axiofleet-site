import * as React from "react";
import { Box, Container, Typography, Paper, Stack, Button } from "@mui/material";

export default function Tarifs() {
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
            Tarifs — principes & facteurs
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
            Les montants dépendent du périmètre, du maillage, des volumes et des contraintes sites. Pas de packs forcés.
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Facteurs de variation</Typography>
            <ul>
              <li><Typography variant="body2">Secteur (Messagerie / TP-BTP) et objectifs (POD, rotations, marge)</Typography></li>
              <li><Typography variant="body2">Sites & fenêtres (quai/chantier), ZFE, distances</Typography></li>
              <li><Typography variant="body2">Qualité de données & intégrations TMS/MDM</Typography></li>
            </ul>
            <Typography variant="caption" sx={{ display: "block", opacity: 0.8 }}>
              Fourchettes indicatives, variables selon contexte. Aucune promesse absolue.
            </Typography>
          </Paper>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button variant="contained" size="large" href="/consulting/contact?modal=1">Appel de cadrage 30 min</Button>
            <Button variant="outlined" size="large" href="/consulting/Axiofleet_Consulting_Presentation.pdf">Présentation PDF</Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
