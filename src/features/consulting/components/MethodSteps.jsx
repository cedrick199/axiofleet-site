import * as React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
export default function MethodSteps(){
  const steps = [
    { title: "72 h Flash",             desc: "Diagnostic express & quick wins, plan 15 jours" },
    { title: "Sprint 4–6 semaines",    desc: "Chantiers ciblés : planning/RSE, quai, T_cycle BTP, SIG/Pricing" },
    { title: "Run mensuel",            desc: "Pilotage, rituels, CAPA, cockpit KPI — engagement flexible" },
  ];
  return (
    <Grid container spacing={2}>
      {steps.map((s,i)=>(
        <Grid item xs={12} md={4} key={i}>
          <Card variant="outlined" sx={{ height:"100%", backgroundColor:"background.paper" }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontSize:18, fontWeight:700 }}>{s.title}</Typography>
              <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
