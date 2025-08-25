import * as React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
const DEFAULT = [
  { title: "Exploitation & planning", desc: "J-1/J-0, RSE/CCN, OT→POD" },
  { title: "TP/BTP",                  desc: "Fenêtres, pesées, T_cycle" },
  { title: "Messagerie",              desc: "Quai/scans/stops/heure, POD<24 h" },
  { title: "Parc & atelier",          desc: "Dispo J+7, préventif, immobilisations" },
  { title: "Rentabilité & SIG + Pricing", desc: "Anti-fuites, indexation gazole" },
  { title: "Données & systèmes",      desc: "Exhaustivité / latence / MDM" },
];
export default function AuditGrid({ items = DEFAULT }) {
  return (
    <Grid container spacing={2}>
      {items.map((it,idx)=>(
        <Grid key={idx} item xs={12} md={4}>
          <Card variant="outlined" sx={{ height:"100%", backgroundColor:"background.paper" }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontSize:18, fontWeight:700 }}>{it.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt:0.5 }}>{it.desc}</Typography>
              <Typography variant="body2" sx={{ mt:1 }}>
                • Diagnostic terrain<br/>• Quick wins 10–15 j<br/>• KPIs & feuille de route
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
