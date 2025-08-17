import * as React from "react";
import { Button, Slide, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { track } from "../../lib/analytics/plausible";

export default function StickyCTA() {
  const { pathname } = useLocation();
  const show = pathname !== "/contact";
  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Paper
        elevation={6}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          p: 1,
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          bgcolor: "background.paper",
          borderTop: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <Button
          component={Link}
          to="/contact"
          size="large"
          variant="contained"
          onClick={() => track("CTA_Devis", { source: "sticky_mobile" })}
        >
          Demander un devis
        </Button>
      </Paper>
    </Slide>
  );
}
