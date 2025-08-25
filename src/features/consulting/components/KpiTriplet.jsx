import * as React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
export default function KpiTriplet({ items = [] }) {
  const data = items.length ? items : [
    { title: "-18 % attente quai", foot: "médiane (cas clients)" },
    { title: "POD < 24 h",       foot: "objectif cible" },
    { title: "+2,7 pts marge",   foot: "sur 4–6 semaines" },
  ];
  return (
    <Grid container spacing={2}>
      {data.map((k,i)=>(
        <Grid item xs={12} md={4} key={i}>
          <Card variant="outlined" sx={{ height:"100%", backgroundColor:"background.paper" }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontSize:24, fontWeight:800 }}>{k.title}</Typography>
              <Typography variant="body2" color="text.secondary">{k.foot}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
