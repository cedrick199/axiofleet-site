// src/features/home/Home.jsx
import React from "react";
import Box from "@mui/material/Box";
import Hero from "./components/Hero.jsx";
import Seo from "../../lib/seo/Seo.jsx";

export default function Home() {
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <>
      <Seo
        title="Axiofleet — Formations, Conseil & TMS"
        description="Formations transport/logistique, consulting TPE-PME TRM (TP/Bennes) et TMS simple pour piloter exploitation, parc et RH."
        canonical="https://www.axiofleet.com/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Axiofleet",
          "url": "https://www.axiofleet.com/",
          "logo": "https://www.axiofleet.com/logo192.png",
          "email": "c.dubois@axiofleet.com",
          "sameAs": [
            "https://www.linkedin.com/company/axiofleet",
            "https://github.com/axiofleet",
            "https://www.youtube.com/@axiofleet"
          ],
          "contactPoint": [{
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "c.dubois@axiofleet.com",
            "areaServed": "FR",
            "availableLanguage": ["fr"]
          }]
        }}
      />

      <Box
        sx={{
          width: "100vw",
          height: "100dvh",
          overflow: "hidden",
          position: "relative",
          display: "flex",
        }}
      >
        <Hero />
      </Box>
    </>
  );
}
