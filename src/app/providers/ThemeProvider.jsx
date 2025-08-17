import * as React from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
const theme = createTheme({
  palette:{ mode:'dark', background:{ default:'#0b0e13', paper:'#10141b' }, primary:{ main:'#68b4ff' } },
  shape:{ borderRadius:16 },
  typography:{ fontFamily:`Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial` }
})
export default function ThemeProviderAX({children}){ return (<ThemeProvider theme={theme}><CssBaseline/>{children}</ThemeProvider>) }
