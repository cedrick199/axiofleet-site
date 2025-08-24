// src/features/formations/components/FormationCard.jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

/** Petit helper pour tracer sans crasher si window/plausible est absent */
function track(event, id, extraProps) {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(event, { props: { id: id ?? 'unknown', ...(extraProps || {}) } });
  }
}

/**
 * Props attendues :
 * - formation: {
 *     id: string, title: string, level?: string, duration?: string,
 *     objectives?: string[], pdf?: string
 *   }
 * - onDevis?: (formation) => void
 */
export default function FormationCard({ formation = {}, onDevis }) {
  const {
    id,
    title = 'Formation',
    level,
    duration,
    objectives = [],
    pdf
  } = formation;

  const openPdf = () => {
    if (!pdf) return;
    track('Formation_PDF', id);
    window.open(pdf, '_blank', 'noopener,noreferrer');
  };

  const askDevis = () => {
    track('Formation_Devis', id);
    if (typeof onDevis === 'function') return onDevis(formation);
    window.location.href = '/contact';
  };

  // Clé de liste stable et unique même si id absent ou objectifs dupliqués
  const keyForObj = (obj, i) => `${id ?? 'formation'}-${i}-${String(obj).slice(0, 24)}`;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardContent sx={{ flex: 1, minHeight: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={0.5} flexWrap="wrap">
          <Typography variant="h6" fontWeight={800} sx={{ mr: 0.5 }}>
            {title}
          </Typography>
          {level && <Chip size="small" label={level} />}
          {duration && <Chip size="small" label={duration} />}
        </Stack>

        {Array.isArray(objectives) && objectives.length > 0 && (
          <ul style={{ marginTop: 8, paddingLeft: '1.2rem', marginBottom: 0 }}>
            {objectives.map((obj, i) => (
              <li key={keyForObj(obj, i)}>
                <Typography variant="body2">{String(obj)}</Typography>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 0,
          gap: 1,
          flexWrap: { xs: 'wrap', sm: 'nowrap' }
        }}
      >
        {pdf && (
          <Button
            variant="text"
            onClick={openPdf}
            sx={{ flexGrow: { xs: 1, sm: 0 } }}
          >
            Programme (PDF)
          </Button>
        )}
        <Button
          variant="contained"
          onClick={askDevis}
          sx={{ flexGrow: { xs: 1, sm: 0 } }}
        >
          Demander un devis
        </Button>
      </CardActions>
    </Card>
  );
}

FormationCard.propTypes = {
  formation: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    level: PropTypes.string,
    duration: PropTypes.string,
    objectives: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    pdf: PropTypes.string
  }),
  onDevis: PropTypes.func
};

