import * as React from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const QA = [
  ["Nous avons déjà un TMS.", "Très bien. Nous travaillons avec votre TMS/MDM : processus, règles, usages."],
  ["Risque social RSE/CCN ?", "Les règles restent la base. Nos recommandations les intègrent."],
  ["Le ROI est-il certain ?", "Non. Les fourchettes sont observées. On mesure, on ajuste."],
  ["Combien de temps pour vos interventions ?", "Rituels courts. Interventions terrain ciblées. Zéro réunionnite."],
  ["Et si la donnée est incomplète ?", "On démarre par le terrain et on fiabilise progressivement."],
  ["Formez-vous l’équipe ?", "Oui, modules courts (exploitation, quai, relation client)."],
];

export default function Faq() {
  return (
    <Box
      sx={{
        height: { xs: "auto", md: "calc(100dvh - var(--footer-h, 0px))" },
        overflowY: { xs: "visible", md: "auto" },
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        pb: { xs: 6, md: 2 },
      }}
    >
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            FAQ
          </Typography>
          {QA.map(([q, a]) => (
            <Accordion key={q} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 700 }}>{q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </Box>
  );
}
