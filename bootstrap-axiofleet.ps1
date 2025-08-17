$ErrorActionPreference = "Stop"

Write-Host "Bootstrap Axiofleet (in place)..."

# Vérifs
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Write-Error "Node.js n'est pas installé. Installe Node LTS puis relance." }
if (-not (Get-Command npm  -ErrorAction SilentlyContinue)) { Write-Error "npm n'est pas disponible. Vérifie l'installation Node." }

# Init Vite React DANS CE DOSSIER
$hasSrc = Test-Path "src"
if (-not $hasSrc) {
  Write-Host "Creation du projet Vite React dans ce dossier..."
  cmd /c "npm create vite@latest . -- --template react"
} else {
  Write-Host "src/ existe deja, on continue."
}

# Deps
Write-Host "Installation des dependances..."
cmd /c "npm i @mui/material @emotion/react @emotion/styled @mui/icons-material framer-motion react-router-dom dayjs lucide-react clsx react-helmet-async"
cmd /c "npm i -D @vitejs/plugin-react"

# Dossiers
$dirs = @(
  "public/icons","public/og",
  "src/app","src/app/theme","src/app/routes","src/app/providers",
  "src/layout",
  "src/components/common","src/components/marketing","src/components/ui",
  "src/features/home/sections",
  "src/features/formations/components","src/features/formations/data","src/features/formations/pages",
  "src/features/conseil/data","src/features/conseil/pages",
  "src/features/tms/pages",
  "src/features/blog/components","src/features/blog/pages",
  "src/features/contact/components","src/features/contact/pages",
  "src/config",
  "src/lib/analytics","src/lib/seo","src/lib/forms","src/lib/utils","src/lib/validators",
  "src/content/blog","src/content/legal",
  "src/assets/logo","src/assets/images","src/assets/pdf","src/assets/icons",
  "src/hooks","src/styles","src/tests"
)
$dirs | ForEach-Object { New-Item -ItemType Directory -Force -Path $_ | Out-Null }

# Public
"/* /index.html 200" | Set-Content -NoNewline public/_redirects -Encoding utf8

@'
User-agent: *
Allow: /
Sitemap: https://axiofleet.com/sitemap.xml
'@ | Set-Content public/robots.txt -Encoding utf8

@'
{ "name":"Axiofleet","short_name":"Axiofleet","start_url":"/","display":"standalone","background_color":"#0b0e13","theme_color":"#0b0e13","icons":[] }
'@ | Set-Content public/site.webmanifest -Encoding utf8

# Styles
if (-not (Test-Path "src/index.css")) {
@'
:root{--bg:#0b0e13;--fg:#e6e9ef;--muted:#9aa3b2;--primary:#68b4ff}
html,body,#root{height:100%}
body{margin:0;background:radial-gradient(1200px 800px at 70% -10%,#10141b 0%,#0b0e13 40%,#080a0f 100%);color:var(--fg);font-synthesis-weight:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
a{color:inherit;text-decoration:none}
'@ | Set-Content src/index.css -Encoding utf8
}

# App & Providers
@'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App/></React.StrictMode>
)
'@ | Set-Content src/app/main.jsx -Encoding utf8

@'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeProviderAX from './providers/ThemeProvider.jsx'
import Shell from '../layout/Shell.jsx'
import Home from '../features/home/Home.jsx'
import Formations from '../features/formations/pages/Formations.jsx'
import Conseil from '../features/conseil/pages/Conseil.jsx'
import TMS from '../features/tms/pages/TMS.jsx'
import Blog from '../features/blog/pages/Blog.jsx'
import Article from '../features/blog/pages/Article.jsx'
import Contact from '../features/contact/pages/Contact.jsx'
export default function App(){
  return (
    <ThemeProviderAX>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/formations" element={<Formations/>} />
            <Route path="/conseil" element={<Conseil/>} />
            <Route path="/tms" element={<TMS/>} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/blog/:slug" element={<Article/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </ThemeProviderAX>
  )
}
'@ | Set-Content src/app/App.jsx -Encoding utf8

@'
import * as React from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
const theme = createTheme({
  palette:{ mode:'dark', background:{ default:'#0b0e13', paper:'#10141b' }, primary:{ main:'#68b4ff' } },
  shape:{ borderRadius:16 },
  typography:{ fontFamily:`Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial` }
})
export default function ThemeProviderAX({children}){ return (<ThemeProvider theme={theme}><CssBaseline/>{children}</ThemeProvider>) }
'@ | Set-Content src/app/providers/ThemeProvider.jsx -Encoding utf8

# Layout
@'
import * as React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
export default function Shell({children}){ return (<><Header/>{children}<Footer/></>) }
'@ | Set-Content src/layout/Shell.jsx -Encoding utf8

@'
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
'@ | Set-Content src/layout/Header.jsx -Encoding utf8

@'
import * as React from 'react'
import { Container, Stack, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
export default function Footer(){
  return (
    <Container maxWidth="lg" sx={{py:6}}>
      <Stack direction={{xs:"column",sm:"row"}} justifyContent="space-between" gap={2}>
        <Typography variant="body2" sx={{color:"text.secondary"}}>© {new Date().getFullYear()} Axiofleet — Formation & Conseil</Typography>
        <Stack direction="row" gap={2}>
          <Button component={Link} to="/contact" size="small" variant="contained">Demander un devis</Button>
          <Button component={Link} to="/formations" size="small" variant="outlined" color="inherit">Réserver une formation</Button>
        </Stack>
      </Stack>
    </Container>
  )
}
'@ | Set-Content src/layout/Footer.jsx -Encoding utf8

# Config & libs
@'
export default [
  { label:"Accueil", to:"/" },
  { label:"Formations", to:"/formations" },
  { label:"Conseil", to:"/conseil" },
  { label:"TMS", to:"/tms" },
  { label:"Blog", to:"/blog" },
  { label:"Contact", to:"/contact" },
]
'@ | Set-Content src/config/navigation.js -Encoding utf8

@'
export const SITE = {
  name: "Axiofleet — Formation & Conseil",
  domain: "https://axiofleet.com",
  email: "c.dubois@axiofleet.com",
  phone: "+33 6 00 00 00 00",
  address: "Occitanie, France",
}
'@ | Set-Content src/config/site.config.js -Encoding utf8

@'
export const FORMS = {
  provider: "formspree",
  endpoints: {
    contact: import.meta.env.VITE_FORMS_CONTACT_ENDPOINT || "",
    devis: import.meta.env.VITE_FORMS_DEVIS_ENDPOINT || "",
    demo: import.meta.env.VITE_FORMS_DEMO_ENDPOINT || "",
  },
  spam: { honeypot: "company_website", useHCaptcha: false },
  required: ["nom","societe","email","message"],
}
'@ | Set-Content src/config/forms.config.js -Encoding utf8

@'
export function track(event, props={}){ try{ if(window.plausible){ window.plausible(event,{props}) } }catch{} }
'@ | Set-Content src/lib/analytics/plausible.js -Encoding utf8

@'
export const orgJsonLd = ({ name, url, logo }) => ({ "@context":"https://schema.org","@type":"Organization", name, url, logo })
'@ | Set-Content src/lib/seo/jsonld.js -Encoding utf8

@'
import { FORMS } from "../../config/forms.config"
export async function submitForm(endpointKey, payload){
  const url = FORMS.endpoints[endpointKey]; if(!url) throw new Error("Form endpoint missing")
  if (payload[FORMS.spam.honeypot]) { return { ok: true, skipped: true } }
  const res = await fetch(url,{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) })
  return { ok: res.ok }
}
'@ | Set-Content src/lib/forms/submit.js -Encoding utf8

@'
export const isEmail = (s)=>/^\S+@\S+\.\S+$/.test(s||"")
'@ | Set-Content src/lib/utils/format.js -Encoding utf8

@'
import { FORMS } from "../../config/forms.config"
export function validateRequired(data){
  const missing = FORMS.required.filter(k=>!String(data[k]||"").trim())
  return { valid: missing.length===0, missing }
}
'@ | Set-Content src/lib/validators/forms.js -Encoding utf8

# Pages
@'
import * as React from "react"
import { Stack, Button, Typography, Box } from "@mui/material"
import Section from "../../components/common/Section.jsx"
import SectionTitle from "../../components/common/SectionTitle.jsx"
import { Link } from "react-router-dom"
export default function Home(){
  return (
    <>
      <Section sx={{textAlign:"center"}}>
        <Box sx={{fontSize:56, fontWeight:900, letterSpacing:1, mb:2}}>axiofleet</Box>
        <Typography sx={{color:"text.secondary", mb:3}}>
          Formations & Conseil TRM — passez de la contrainte à la performance.
        </Typography>
        <Stack direction="row" gap={2} justifyContent="center">
          <Button component={Link} to="/contact" variant="contained" size="large">Demander un devis</Button>
          <Button component={Link} to="/formations" variant="outlined" color="inherit" size="large">Réserver une formation</Button>
        </Stack>
      </Section>
      <Section>
        <SectionTitle title="Pourquoi Axiofleet ?" subtitle="Gain de temps · Conformité · Efficacité opérationnelle" />
        <div style={{color:"rgba(255,255,255,.7)"}}>Expertise terrain, résultats mesurables, approche premium et pragmatique.</div>
      </Section>
    </>
  )
}
'@ | Set-Content src/features/home/Home.jsx -Encoding utf8

@'
import * as React from "react"
import Section from "../../../components/common/Section.jsx"
import SectionTitle from "../../../components/common/SectionTitle.jsx"
export default function Formations(){
  return (<Section><SectionTitle title="Formations" subtitle="Exploitation, RSE, réglementation, rentabilité"/>Catalogue à venir (cartes + PDF).</Section>)
}
'@ | Set-Content src/features/formations/pages/Formations.jsx -Encoding utf8

@'
import * as React from "react"
import Section from "../../../components/common/Section.jsx"
import SectionTitle from "../../../components/common/SectionTitle.jsx"
export default function Conseil(){
  return (<Section><SectionTitle title="Conseil TRM" subtitle="Diagnostics, audit conformité, mise en place planning, coaching"/>Offres packagées.</Section>)
}
'@ | Set-Content src/features/conseil/pages/Conseil.jsx -Encoding utf8

@'
import * as React from "react"
import Section from "../../../components/common/Section.jsx"
import SectionTitle from "../../../components/common/SectionTitle.jsx"
export default function TMS(){
  return (<Section><SectionTitle title="TMS Axiofleet (teaser)" subtitle="Planning · Parc/Atelier · Conducteurs/RH · Rentabilité"/>Demandez une démo.</Section>)
}
'@ | Set-Content src/features/tms/pages/TMS.jsx -Encoding utf8

@'
import * as React from "react"
import Section from "../../../components/common/Section.jsx"
import SectionTitle from "../../../components/common/SectionTitle.jsx"
export default function Blog(){
  return (<Section><SectionTitle title="Actualités & Blog"/>Deux articles à publier pour le SEO initial.</Section>)
}
'@ | Set-Content src/features/blog/pages/Blog.jsx -Encoding utf8

@'
import * as React from "react"
import Section from "../../../components/common/Section.jsx"
export default function Article(){ return <Section>Article…</Section> }
'@ | Set-Content src/features/blog/pages/Article.jsx -Encoding utf8

@'
import * as React from "react"
import { TextField, Stack, Button, Alert } from "@mui/material"
import { submitForm } from "../../../lib/forms/submit"
import { validateRequired } from "../../../lib/validators/forms"
export default function ContactForm(){
  const [data,setData]=React.useState({nom:"",societe:"",email:"",telephone:"",sujet:"",message:"",company_website:""})
  const [state,setState]=React.useState({ok:false,error:"",submitting:false})
  const onChange = e=>setData(p=>({...p,[e.target.name]:e.target.value}))
  async function onSubmit(e){
    e.preventDefault()
    const v = validateRequired(data); if(!v.valid){ setState(s=>({...s,error:`Champs manquants: ${v.missing.join(", ")}`})); return }
    setState({ok:false,error:"",submitting:true})
    try{ const res = await submitForm("contact", data); setState({ok:res.ok,error:res.ok?"":"Erreur envoi",submitting:false}) }
    catch(err){ setState({ok:false,error:String(err?.message||"Erreur"),submitting:false}) }
  }
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        {state.ok && <Alert severity="success">Merci, nous vous recontactons sous 24–48h.</Alert>}
        {state.error && <Alert severity="error">{state.error}</Alert>}
        <input type="text" name="company_website" value={data.company_website} onChange={onChange} style={{display:"none"}}/>
        <TextField label="Nom" name="nom" value={data.nom} onChange={onChange} required />
        <TextField label="Société" name="societe" value={data.societe} onChange={onChange} required />
        <TextField label="Email" name="email" value={data.email} onChange={onChange} required />
        <TextField label="Téléphone" name="telephone" value={data.telephone} onChange={onChange}/>
        <TextField label="Sujet" name="sujet" value={data.sujet} onChange={onChange}/>
        <TextField label="Message" name="message" value={data.message} onChange={onChange} required multiline minRows={4}/>
        <Button type="submit" variant="contained" disabled={state.submitting}>Envoyer</Button>
      </Stack>
    </form>
  )
}
'@ | Set-Content src/features/contact/components/ContactForm.jsx -Encoding utf8

@'
import * as React from "react"
import Section from "../../../components/common/Section.jsx"
import SectionTitle from "../../../components/common/SectionTitle.jsx"
import ContactForm from "../components/ContactForm.jsx"
export default function Contact(){ return (<Section><SectionTitle title="Contact" subtitle="Réponse sous 24–48h"/><ContactForm/></Section>) }
'@ | Set-Content src/features/contact/pages/Contact.jsx -Encoding utf8

# .env example & vite config
@'
VITE_FORMS_CONTACT_ENDPOINT=
VITE_FORMS_DEVIS_ENDPOINT=
VITE_FORMS_DEMO_ENDPOINT=
'@ | Set-Content .env.example -Encoding utf8

@'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
export default defineConfig({ plugins:[react()] })
'@ | Set-Content vite.config.js -Encoding utf8

# Build test
Write-Host "Build de verification..."
cmd /c "npm run build" | Out-Null

Write-Host "OK. Ensuite :
- copy .env.example .env
- npm run dev
"



