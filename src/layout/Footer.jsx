import * as React from 'react'
import { Container, Stack, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
export default function Footer(){
  return (
    <Container maxWidth="lg" sx={{py:6}}>
      <Stack direction={{xs:"column",sm:"row"}} justifyContent="space-between" gap={2}>
        <Typography variant="body2" sx={{color:"text.secondary"}}>
          © {new Date().getFullYear()} Axiofleet — Formation & Conseil
        </Typography>
        <Stack direction="row" gap={2}>
          <Button component={Link} to="/contact" size="small" variant="contained">Demander un devis</Button>
          <Button component={Link} to="/formations" size="small" variant="outlined" color="inherit">RÉSERVER UNE FORMATION</Button>
        </Stack>
      </Stack>
    </Container>
  )
}
