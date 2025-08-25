import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function FaqAccordion({ items = [] }){
  const data = items.length ? items : [
    { q:"Combien de temps avant les premiers résultats ?", a:"Généralement sous 30 jours : quick wins issus de l’Audit 72 h puis sprint focalisé."},
    { q:"Pouvez-vous travailler sans changer la flotte ?", a:"Oui. Optimisation exploitation, RSE/CCN, quai, SIG/Pricing d’abord."},
    { q:"Comment gérez-vous la RSE/CCN et les ZFE ?",     a:"Contrôles intégrés au planning, alternatives conformes."},
    { q:"Qu’implique l’Audit Flash 72 h ?",               a:"Terrain (J0–J1), analyse (J2), restitution (J3) + plan 15 jours."},
  ];
  return (
    <>
      {data.map((it,i)=>(
        <Accordion key={i} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight:700 }}>{it.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">{it.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
