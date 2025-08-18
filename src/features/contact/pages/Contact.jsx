import * as React from "react"
import Section from "../../../components/common/Section.jsx"
import SectionTitle from "../../../components/common/SectionTitle.jsx"
import ContactForm from "../components/ContactForm.jsx"
import Seo from '../../../lib/seo/Seo.jsx';
export default function Contact(){ return (<>
  <Seo
  title="Contact — Axiofleet"
  description="Parler de votre besoin : formations, consulting, TMS. Réponse rapide."
  canonical="https://www.axiofleet.com/contact"
/>
  <Section><SectionTitle title="Contact" subtitle="RÃ©ponse sous 24â€“48h"/><ContactForm/></Section>) }



