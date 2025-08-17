import * as React from "react";
import { Card, CardContent, CardActions, Button, Typography, Chip, Stack } from "@mui/material";
import { track } from "../../../lib/analytics/plausible";

export default function FormationCard({ f }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip label={f.duree} size="small" />
          <Chip label={f.niveau} size="small" />
        </Stack>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{f.titre}</Typography>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "rgba(255,255,255,.75)" }}>
          {f.objectifs?.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button href={f.pdf} target="_blank" rel="noopener" onClick={() => track("Formation_PDF", { slug: f.slug })}>
          Programme (PDF)
        </Button>
        <Button
          href={`/contact?sujet=Devis%20formation%20-%20${encodeURIComponent(f.titre)}`}
          variant="contained"
          onClick={() => track("Formation_Devis", { slug: f.slug })}
        >
          Demander un devis
        </Button>
      </CardActions>
    </Card>
  );
}
