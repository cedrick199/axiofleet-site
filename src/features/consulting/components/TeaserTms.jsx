import * as React from "react";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { track } from "@/lib/analytics/plausible.js";
export default function TeaserTms(){
  return (
    <Card variant="outlined" sx={{ backgroundColor:"background.paper" }}>
      <CardContent>
        <Stack direction={{ xs:"column", md:"row" }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="subtitle1"><strong>Axiofleet (teaser)</strong> : planning conducteur IA-ready, contrôle RSE, cockpit marge.</Typography>
          <Button href="/tms" variant="outlined" color="secondary"
            onClick={() => track("cta_click", { props: { id:"cta_teaser_tms", page:"/consulting" } })}>
            Découvrir le TMS (teaser)
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
