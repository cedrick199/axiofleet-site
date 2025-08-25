import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Sprint() {
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
            Plan d’exécution
          </Typography>
          <Typography variant="body2">
            Actions ciblées, responsables, délais, intégration aux usages. Libellé neutre (pas mis en avant en hero).
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
