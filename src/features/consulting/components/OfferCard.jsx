import * as React from "react";
import { Card, CardContent, CardActions, Typography, Button, Stack, Divider } from "@mui/material";
import { track } from "@/lib/analytics/plausible.js";
export default function OfferCard({ title, excerpt, bullets = [], href = "#", ctaId = "cta_offre_detail", price = null }) {
  return (
    <Card variant="outlined" sx={{ height:"100%", backgroundColor:"background.paper" }}>
      <CardContent>
        <Typography variant="h3" sx={{ fontSize:22, fontWeight:700 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt:1 }}>{excerpt}</Typography>
        <Stack component="ul" sx={{ mt:2, pl:2, gap:0.5 }}>
          {bullets.map((b,i)=>(<Typography component="li" key={i} variant="body2">{b}</Typography>))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ px:2, pb:2, pt:1, justifyContent:"space-between", alignItems:"center" }}>
        <Button href={href} variant="contained" onClick={() => track("cta_click", { props: { id: ctaId, page: "/consulting" } })}>
          Voir le détail
        </Button>
        {price ? <Typography variant="caption" color="text.secondary">{price}</Typography> : null}
      </CardActions>
    </Card>
  );
}
