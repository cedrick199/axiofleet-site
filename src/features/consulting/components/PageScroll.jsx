import * as React from "react";
import Box from "@mui/material/Box";

/**
 * Zone de scroll interne pour les pages Consulting uniquement.
 * En desktop (≥900px), on scrolle dans ce conteneur, sans toucher au global.
 */
export default function PageScroll({ children, sx }) {
  return (
    <Box
      sx={{
        // hauteur = viewport - hauteur du header
        height: { md: "calc(100dvh - var(--header-h, 64px))" },
        overflowY: { md: "auto" },
        overflowX: "hidden",
        scrollBehavior: "smooth",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
