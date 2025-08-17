import * as React from 'react'
import { AppBar, Toolbar, Box, Button, Container } from '@mui/material'
import { NavLink } from 'react-router-dom'
import nav from '../config/navigation.js'
export default function Header(){
  return (
    <AppBar elevation={0} color="transparent" position="sticky" sx={{backdropFilter:'blur(8px)'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{gap:2, py:1}}>
          <Box sx={{fontWeight:800, letterSpacing:1}}>axiofleet</Box>
          <Box sx={{flex:1}}/>
          {nav.map(i=>(
            <Button key={i.to} component={NavLink} to={i.to} color="inherit" sx={{textTransform:'none'}}>
              {i.label}
            </Button>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
