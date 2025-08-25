import * as React from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";
export default function MiniCase({ titre="PME — 45 véhicules", contexte="Contexte bref…", actions=["Action 1","Action 2"], resultats=["-18% attente","POD < 20h"] }){
  return (
    <Card variant="outlined" sx={{ height:"100%", backgroundColor:"background.paper" }}>
      <CardContent>
        <Typography variant="h4" sx={{ fontSize:18, fontWeight:700 }}>{titre}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt:0.5 }}>{contexte}</Typography>
        <Stack sx={{ mt:1 }}>
          <Typography variant="body2"><strong>Actions :</strong> {actions.join(" • ")}</Typography>
          <Typography variant="body2"><strong>Résultats :</strong> {resultats.join(" • ")}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
