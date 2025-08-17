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
