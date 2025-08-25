// src/app/routes/ConsultingRoutes.jsx
import React, { lazy } from "react";

// Pages Consulting (lazy — App.jsx a déjà un <Suspense> parent)
const Consulting   = lazy(() => import("../../features/consulting/pages/Consulting.jsx"));
const Expertises   = lazy(() => import("../../features/consulting/pages/Expertises.jsx"));
const CasClients   = lazy(() => import("../../features/consulting/pages/CasClients.jsx"));
const Ressources   = lazy(() => import("../../features/consulting/pages/Ressources.jsx"));
const Faq          = lazy(() => import("../../features/consulting/pages/Faq.jsx"));
const Tarifs       = lazy(() => import("../../features/consulting/pages/Tarifs.jsx"));
// Offres (ne pas pousser en hero ; seulement citées dans l’encadré final)
const Audit72h     = lazy(() => import("../../features/consulting/pages/offres/Audit72h.jsx"));
const RunMensuel   = lazy(() => import("../../features/consulting/pages/offres/RunMensuel.jsx"));
const Sprint       = lazy(() => import("../../features/consulting/pages/offres/Sprint.jsx"));

// Export NOMMÉ attendu par App.jsx (tableau { path, element })
export const consultingRoutes = [
  { path: "/consulting", element: <Consulting /> },
  { path: "/consulting/expertises", element: <Expertises /> },
  { path: "/consulting/cas-clients", element: <CasClients /> },
  { path: "/consulting/ressources", element: <Ressources /> },
  { path: "/consulting/faq", element: <Faq /> },
  { path: "/consulting/tarifs", element: <Tarifs /> },
  { path: "/consulting/offres/audit-72h", element: <Audit72h /> },
  { path: "/consulting/offres/run-mensuel", element: <RunMensuel /> },
  { path: "/consulting/offres/sprint-4-6-semaines", element: <Sprint /> },
];

// Exports alternatifs (si jamais)
export const getConsultingRoutes = () => consultingRoutes;
export default consultingRoutes;
