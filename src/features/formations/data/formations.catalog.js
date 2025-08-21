// src/features/formations/data/formations.catalog.js
// Encodage: UTF-8 (LF)

const slug = (input) =>
  String(input)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/**
 * Colonne GAUCHE :
 * Enseignements & certifications TRM (hors conduite)
 * (nettoyé selon tes consignes)
 */
export const CATALOG_ENSEIGNEMENTS = [
  // ─────────────────────────────────────────────────────────
  // 1) ATTESTATION CAPACITÉ TRANSPORT DE MARCHANDISES — DREAL
  // ─────────────────────────────────────────────────────────

  // A. > 3,5 t  (⚠️ groupe renommé / M04 supprimé)
  {
    id: `ens-${slug('M01 Droit & contrats (CMR/national)')}`,
    ref: 'M01',
    title: 'Droit & contrats (CMR/national)',
    summary: 'Responsabilité, assurances, litiges',
    group: 'Attestation capacité transport de marchandises (> 3,5 t)',
    tags: ['TRM', 'DREAL'],
  },
  {
    id: `ens-${slug('M02 Accès à la profession & au marché')}`,
    ref: 'M02',
    title: 'Accès à la profession & au marché',
    summary: 'Registre, licence UE, capacité financière, cabotage, détachement, location',
    group: 'Attestation capacité transport de marchandises (> 3,5 t)',
    tags: ['TRM', 'DREAL'],
  },
  {
    id: `ens-${slug('M03 Social & RSE')}`,
    ref: 'M03',
    title: 'Social & RSE',
    summary: 'Temps de conduite/repos, amplitudes, tachygraphe, contrôles/sanctions',
    group: 'Attestation capacité transport de marchandises (> 3,5 t)',
    tags: ['TRM', 'DREAL', 'RSE'],
  },
  // M04 (Gestion & fiscalité) → supprimé selon consigne
  {
    id: `ens-${slug('M05 Technique & normes')}`,
    ref: 'M05',
    title: 'Technique & normes',
    summary: 'Masses/dimensions, arrimage, équipements, visites / contrôle technique / chronotachy',
    group: 'Attestation capacité transport de marchandises (> 3,5 t)',
    tags: ['TRM', 'Technique'],
  },
  {
    id: `ens-${slug('M06 Exploitation & sous-traitance')}`,
    ref: 'M06',
    title: 'Exploitation & sous-traitance',
    summary: 'Plan de transport, affectations, affrètement, SLA/pénalités',
    group: 'Attestation capacité transport de marchandises (> 3,5 t)',
    tags: ['TRM', 'Exploitation'],
  },
  {
    id: `ens-${slug('M07 Sécurité routière & prévention')}`,
    ref: 'M07',
    title: 'Sécurité routière & prévention',
    summary: 'Conduite préventive, procédures d’urgence',
    group: 'Attestation capacité transport de marchandises (> 3,5 t)',
    tags: ['TRM', 'Sécurité'],
  },
  {
    id: `ens-${slug('M08 Documents & traçabilité')}`,
    ref: 'M08',
    title: 'Documents & traçabilité',
    summary: 'Lettre de voiture, e-CMR, documents à bord, archivage',
    group: 'Attestation capacité transport de marchandises (> 3,5 t)',
    tags: ['TRM', 'Documents'],
  },

  // B. ≤ 3,5 t (VUL)  (⚠️ groupe renommé)
  {
    id: `ens-${slug('L01 Accès & exercice VUL')}`,
    ref: 'L01',
    title: 'Accès & exercice VUL',
    summary: 'Registre, licences adaptées, plateformes/sous-traitance',
    group: 'Attestation capacité transport de marchandises (≤ 3,5 t — VUL)',
    tags: ['VUL', 'DREAL'],
  },
  {
    id: `ens-${slug('L02 Social VUL')}`,
    ref: 'L02',
    title: 'Social VUL',
    summary: 'Temps de travail/pauses, tachy si équipé, contrôles',
    group: 'Attestation capacité transport de marchandises (≤ 3,5 t — VUL)',
    tags: ['VUL', 'RSE'],
  },
  {
    id: `ens-${slug('L03 Gestion & tarification express')}`,
    ref: 'L03',
    title: 'Gestion & tarification « express »',
    summary: 'Coûts, devis, tournées urbaines',
    group: 'Attestation capacité transport de marchandises (≤ 3,5 t — VUL)',
    tags: ['VUL', 'Gestion'],
  },
  {
    id: `ens-${slug('L04 Technique & sécurité VUL')}`,
    ref: 'L04',
    title: 'Technique & sécurité VUL',
    summary: 'Masses, arrimage, ergonomie, EPI',
    group: 'Attestation capacité transport de marchandises (≤ 3,5 t — VUL)',
    tags: ['VUL', 'Technique'],
  },
  {
    id: `ens-${slug('L05 Urbain & ZFE')}`,
    ref: 'L05',
    title: 'Urbain & ZFE',
    summary: 'Fenêtres horaires, restrictions, organisation',
    group: 'Attestation capacité transport de marchandises (≤ 3,5 t — VUL)',
    tags: ['VUL', 'Urbain'],
  },
  {
    id: `ens-${slug('L06 Traçabilité & POD')}`,
    ref: 'L06',
    title: 'Traçabilité & POD',
    summary: 'Preuve de livraison, e-CMR, gestion litiges',
    group: 'Attestation capacité transport de marchandises (≤ 3,5 t — VUL)',
    tags: ['VUL', 'Documents'],
  },

  // ─────────────────────────────────────────────────────────
  // 3) POST-BAC & SUP — TRANSPORT (et logistique si souhaitée)
  // ─────────────────────────────────────────────────────────

  // F. BTS GTLA — Transport
  { id: `ens-${slug('F01 B1 Organisation chaîne transport')}`, ref: 'F01', title: 'BTS GTLA — B1 Organisation chaîne transport', summary: 'Modes/combiné, plan de transport, affrètement, Incoterms – bases, douane – bases, RSE – bases', group: 'BTS GTLA (Transport)', tags: ['BTS', 'Transport'] },
  { id: `ens-${slug('F02 B2 Relation clients (transport)')}`, ref: 'F02', title: 'BTS GTLA — B2 Relation clients (transport)', summary: 'Service client, litiges, contrats/pénalités, communication pro', group: 'BTS GTLA (Transport)', tags: ['BTS', 'Transport'] },
  { id: `ens-${slug('F03 B3 Pilotage opérations (transport)')}`, ref: 'F03', title: 'BTS GTLA — B3 Pilotage opérations (transport)', summary: 'Ordonnancement J/J+1, traçabilité/e-CMR, sécurité/sûreté, KPI', group: 'BTS GTLA (Transport)', tags: ['BTS', 'Transport'] },
  { id: `ens-${slug('F04 B4 Projet pro (transport)')}`, ref: 'F04', title: 'BTS GTLA — B4 Projet pro (transport)', summary: 'Analyse process, amélioration continue, soutenance', group: 'BTS GTLA (Transport)', tags: ['BTS', 'Transport'] },

  // F. BTS GTLA — Logistique
  { id: `ens-${slug('F05 Réception/stockage/préparation/expédition')}`, ref: 'F05', title: 'BTS GTLA — Réception/stockage/préparation/expédition', summary: 'Processus, qualité de stock', group: 'BTS GTLA (Logistique)', tags: ['BTS', 'Logistique'] },
  { id: `ens-${slug('F06 WMS & traçabilité')}`, ref: 'F06', title: 'BTS GTLA — WMS & traçabilité', summary: 'Inventaires, indicateurs logistiques', group: 'BTS GTLA (Logistique)', tags: ['BTS', 'Logistique'] },
  { id: `ens-${slug('F07 QHSE / ergonomie / 5S-Lean (bases)')}`, ref: 'F07', title: 'BTS GTLA — QHSE / ergonomie / 5S-Lean (bases)', summary: 'Prévention & amélioration continue', group: 'BTS GTLA (Logistique)', tags: ['BTS', 'Logistique'] },

  // F08/F09/F10 (Unités générales) → supprimés

  // G. BUT MLT
  { id: `ens-${slug('G01 BC01 Piloter des opérations de transport')}`, ref: 'G01', title: 'BUT MLT — BC01 Piloter des opérations de transport', summary: 'Plan, affrètement, TRM/RSE, coûts & qualité', group: 'BUT MLT', tags: ['BUT', 'Transport'] },
  { id: `ens-${slug('G02 BC02 Manager une équipe logistique')}`, ref: 'G02', title: 'BUT MLT — BC02 Manager une équipe logistique', summary: 'RH, organisation, QHSE', group: 'BUT MLT', tags: ['BUT', 'Logistique'] },
  { id: `ens-${slug('G03 BC03 Optimiser flux & systèmes')}`, ref: 'G03', title: 'BUT MLT — BC03 Optimiser flux & systèmes', summary: 'Lean/5S, GPA, TMS/WMS, data & KPI', group: 'BUT MLT', tags: ['BUT', 'Logistique'] },
  { id: `ens-${slug('G04 BC04 Qualité & développement durable')}`, ref: 'G04', title: 'BUT MLT — BC04 Qualité & développement durable', summary: 'Conformité, traçabilité, audits', group: 'BUT MLT', tags: ['BUT', 'Qualité'] },

  // H. Licences Pro (H02/H03/H04 supprimés)
  { id: `ens-${slug('H01 Exploitation & affrètement TRM')}`, ref: 'H01', title: 'LP — Exploitation & affrètement TRM', summary: 'Plan, achats de fret, contrats/assurances, KPI', group: 'Licences Pro', tags: ['LP', 'Transport'] },
  { id: `ens-${slug('H05 Data/KPI & outils')}`, ref: 'H05', title: 'LP — Data/KPI & outils', summary: 'Excel avancé, Power BI (bases), tableaux de bord', group: 'Licences Pro', tags: ['LP', 'Data'] },

  // K. Masters (K03 supprimé)
  { id: `ens-${slug('K02 Design réseau & optimisation')}`, ref: 'K02', title: 'Master — Design réseau & optimisation', summary: 'Localisation, OR/heuristiques, simulation', group: 'Masters', tags: ['Master', 'Optimisation'] },
  { id: `ens-${slug('K05 SI & data (ERP/TMS/WMS)')}`, ref: 'K05', title: 'Master — SI & data (ERP/TMS/WMS)', summary: 'Gouvernance, BI', group: 'Masters', tags: ['Master', 'SI'] },

  // ─────────────────────────────────────────────────────────
  // 4) TITRES PRO (MANAGEMENT / EXPLOITATION)
  // ─────────────────────────────────────────────────────────
  // GOTRM — CCP1/2/3
  { id: `ens-${slug('T1-11 Étude de faisabilité, cotation, tarification')}`, ref: 'T1-11', title: 'GOTRM — CCP1', summary: 'Étude de faisabilité, cotation, tarification', group: 'GOTRM — CCP1 (Offre TRM)', tags: ['TitrePro', 'GOTRM'] },
  { id: `ens-${slug('T1-12 Plan de transport / affrètement / contrats & responsabilités')}`, ref: 'T1-12', title: 'GOTRM — CCP1', summary: 'Plan de transport (national/international), affrètement/sous-traitance, contrats & responsabilités (CMR/national), assurances', group: 'GOTRM — CCP1 (Offre TRM)', tags: ['TitrePro', 'GOTRM'] },
  { id: `ens-${slug('T1-13 Documents & traçabilité (lettre de voiture, e-CMR)')}`, ref: 'T1-13', title: 'GOTRM — CCP1', summary: 'Documents & traçabilité (lettre de voiture, e-CMR, docs à bord)', group: 'GOTRM — CCP1 (Offre TRM)', tags: ['TitrePro', 'GOTRM'] },
  { id: `ens-${slug('T1-14 RSE & tachy (exploitation)')}`, ref: 'T1-14', title: 'GOTRM — CCP1', summary: 'RSE & tachy (volet exploitation)', group: 'GOTRM — CCP1 (Offre TRM)', tags: ['TitrePro', 'GOTRM'] },

  { id: `ens-${slug('T1-21 Planification/ordonnancement')}`, ref: 'T1-21', title: 'GOTRM — CCP2', summary: 'Planification/ordonnancement (tournées, fréquences, créneaux)', group: 'GOTRM — CCP2 (Trafics réguliers)', tags: ['TitrePro', 'GOTRM'] },
  { id: `ens-${slug('T1-22 Relation affrétés')}`, ref: 'T1-22', title: 'GOTRM — CCP2', summary: 'Relation affrétés : allocation, non-conformités, SAV transport, pénalités', group: 'GOTRM — CCP2 (Trafics réguliers)', tags: ['TitrePro', 'GOTRM'] },
  { id: `ens-${slug('T1-23 KPI service (OTD/OTIF, TR)')}`, ref: 'T1-23', title: 'GOTRM — CCP2', summary: 'KPI service (OTD/OTIF, TR), cross-dock/quais (si logistique)', group: 'GOTRM — CCP2 (Trafics réguliers)', tags: ['TitrePro', 'GOTRM'] },

  { id: `ens-${slug('T1-31 Dimensionnement flotte & conducteurs')}`, ref: 'T1-31', title: 'GOTRM — CCP3', summary: 'Dimensionnement flotte & conducteurs, compatibilités véhicule/mission', group: 'GOTRM — CCP3 (Optimisation des moyens)', tags: ['TitrePro', 'GOTRM'] },
  { id: `ens-${slug('T1-32 Coûts/performance, plans d’action')}`, ref: 'T1-32', title: 'GOTRM — CCP3', summary: 'Coûts/performance (coût/km, coût/h, marge), plans d’action', group: 'GOTRM — CCP3 (Optimisation des moyens)', tags: ['TitrePro', 'GOTRM'] },
  { id: `ens-${slug('T1-33 Disponibilités & contraintes (atelier, RSE, sites)')}`, ref: 'T1-33', title: 'GOTRM — CCP3', summary: 'Disponibilités & contraintes (atelier/immobilisations, RSE, sites)', group: 'GOTRM — CCP3 (Optimisation des moyens)', tags: ['TitrePro', 'GOTRM'] },
  { id: `ens-${slug('T1-34 SI Transport (TMS), tableaux de bord, amélioration continue')}`, ref: 'T1-34', title: 'GOTRM — CCP3', summary: 'SI Transport (TMS), tableaux de bord, amélioration continue (Lean – bases)', group: 'GOTRM — CCP3 (Optimisation des moyens)', tags: ['TitrePro', 'GOTRM'] },

  // ETRM
  { id: `ens-${slug('T2-01 Concevoir & organiser une prestation')}`, ref: 'T2-01', title: 'ETRM (Niv. 4)', summary: 'Concevoir & organiser une prestation (plan, tarification simple, documents)', group: 'ETRM (Niv. 4)', tags: ['TitrePro', 'ETRM'] },
  { id: `ens-${slug('T2-02 Mettre en œuvre & piloter jusqu’à la clôture')}`, ref: 'T2-02', title: 'ETRM (Niv. 4)', summary: 'Mettre en œuvre & piloter jusqu’à la clôture (suivi J/J+1, aléas, service client, KPI)', group: 'ETRM (Niv. 4)', tags: ['TitrePro', 'ETRM'] },

  // RETM / EMTR
  { id: `ens-${slug('T3-01 Exploitation & ordonnancement')}`, ref: 'T3-01', title: 'RETM / EMTR (Niv. 5)', summary: 'Exploitation & ordonnancement (fenêtres, créneaux, ressources)', group: 'RETM / EMTR (Niv. 5)', tags: ['TitrePro', 'RETM'] },
  { id: `ens-${slug('T3-02 Relation clients/affrétés')}`, ref: 'T3-02', title: 'RETM / EMTR (Niv. 5)', summary: 'Relation clients/affrétés (contrats, performance, litiges)', group: 'RETM / EMTR (Niv. 5)', tags: ['TitrePro', 'RETM'] },
  { id: `ens-${slug('T3-03 Tarification & marge')}`, ref: 'T3-03', title: 'RETM / EMTR (Niv. 5)', summary: 'Tarification & marge (contrôle de gestion de base)', group: 'RETM / EMTR (Niv. 5)', tags: ['TitrePro', 'RETM'] },
  { id: `ens-${slug('T3-04 Management d’équipe d’exploitation')}`, ref: 'T3-04', title: 'RETM / EMTR (Niv. 5)', summary: 'Management d’équipe d’exploitation, routines, QHSE', group: 'RETM / EMTR (Niv. 5)', tags: ['TitrePro', 'RETM'] },

  // RPTL
  { id: `ens-${slug('T4-01 Pilotage d’activité transport')}`, ref: 'T4-01', title: 'RPTL', summary: 'Pilotage d’activité transport (plan de transport, SLA)', group: 'RPTL', tags: ['TitrePro', 'RPTL'] },
  { id: `ens-${slug('T4-02 Management exploitation & performance')}`, ref: 'T4-02', title: 'RPTL', summary: 'Management exploitation & performance (KPI, amélioration continue)', group: 'RPTL', tags: ['TitrePro', 'RPTL'] },
  { id: `ens-${slug('T4-03 Qualité/RSE & sécurité')}`, ref: 'T4-03', title: 'RPTL', summary: 'Qualité/RSE & sécurité (procédures, audits)', group: 'RPTL', tags: ['TitrePro', 'RPTL'] },
  { id: `ens-${slug('T4-04 Interfaces TMS/WMS & gouvernance des données')}`, ref: 'T4-04', title: 'RPTL', summary: 'Interfaces TMS/WMS & gouvernance des données', group: 'RPTL', tags: ['TitrePro', 'RPTL'] },

  // RUTL — BC1→BC4
  { id: `ens-${slug('T5-11 Étude de marché & plan commercial')}`, ref: 'T5-11', title: 'RUTL — BC1', summary: 'Analyse marché TRM/Log, offre & politique tarifaire, plan d’actions commerciales', group: 'RUTL — BC1', tags: ['TitrePro', 'RUTL'] },
  { id: `ens-${slug('T5-21 Structure juridique & financière')}`, ref: 'T5-21', title: 'RUTL — BC2', summary: 'Accès à la profession, gestion & finances (coûts/seuil), TVA/TICPE, assurances', group: 'RUTL — BC2', tags: ['TitrePro', 'RUTL'] },
  { id: `ens-${slug('T5-31 Planifier & piloter l’unité')}`, ref: 'T5-31', title: 'RUTL — BC3', summary: 'Plan de transport, RH/matériels, contrats, QHSSE, process & SI (TMS/WMS)', group: 'RUTL — BC3', tags: ['TitrePro', 'RUTL'] },
  { id: `ens-${slug('T5-41 Mesurer & optimiser la performance')}`, ref: 'T5-41', title: 'RUTL — BC4', summary: 'KPI, SIG/marges, amélioration continue, risques & litiges', group: 'RUTL — BC4', tags: ['TitrePro', 'RUTL'] },
];

/**
 * Colonne DROITE :
 * Formations Conducteurs & réglementaires
 */
export const CATALOG_CONDUCTEURS = [
  // Titres/CFP Conducteur routier
  { id: `cond-${slug('D01 Conduite & manœuvres porteur')}`, ref: 'D01', title: 'Conduite & manœuvres porteur (ex-M128)', group: 'Titres/CFP Conducteur routier', tags: ['Conducteur', 'Porteur'] },
  { id: `cond-${slug('D02 Conduite & manœuvres SPL')}`, ref: 'D02', title: 'Conduite & manœuvres SPL (attelage/dételage, gabarits, freinage) — ex-M148', group: 'Titres/CFP Conducteur routier', tags: ['Conducteur', 'SPL'] },
  { id: `cond-${slug('D03 Sécurité véhicule & vérifications')}`, ref: 'D03', title: 'Sécurité véhicule & vérifications réglementaires', group: 'Titres/CFP Conducteur routier', tags: ['Conducteur', 'Sécurité'] },
  { id: `cond-${slug('D04 Chargement/arrimage & gestes/postures')}`, ref: 'D04', title: 'Chargement/arrimage & gestes/postures', group: 'Titres/CFP Conducteur routier', tags: ['Conducteur'] },
  { id: `cond-${slug('D05 RSE & tachy')}`, ref: 'D05', title: 'RSE & tachy (règles conducteur)', group: 'Titres/CFP Conducteur routier', tags: ['Conducteur', 'RSE'] },
  { id: `cond-${slug('D06 Écoconduite')}`, ref: 'D06', title: 'Écoconduite (bases + mise en situation)', group: 'Titres/CFP Conducteur routier', tags: ['Conducteur'] },
  { id: `cond-${slug('D07 Documents de transport (CMR, consignes)')}`, ref: 'D07', title: 'Documents de transport (CMR, consignes de sécurité, protocole)', group: 'Titres/CFP Conducteur routier', tags: ['Conducteur', 'Documents'] },
  { id: `cond-${slug('D08 Maintenance 1er niveau')}`, ref: 'D08', title: 'Maintenance 1er niveau (préventif, dépannages simples)', group: 'Titres/CFP Conducteur routier', tags: ['Conducteur'] },

  // Réglementaires
  { id: `cond-${slug('E01 FIMO Marchandises')}`, ref: 'E01', title: 'FIMO Marchandises (140 h) — sécurité, RSE/tachy, service, écoconduite', group: 'Réglementaires', tags: ['FIMO'] },
  { id: `cond-${slug('E02 FCO')}`, ref: 'E02', title: 'FCO (35 h) — mises à jour RSE/sécurité, écoconduite, retours d’expérience', group: 'Réglementaires', tags: ['FCO'] },
  { id: `cond-${slug('E03 ADR Conducteur')}`, ref: 'E03', title: 'ADR Conducteur (base/colis/citerne) — classes, signalisation, équipements, urgence', group: 'Réglementaires', tags: ['ADR'] },

  // Permis Groupe Lourd
  { id: `cond-${slug('P01 Permis C')}`, ref: 'P01', title: 'Permis C (plateau/circulation, contrôle sécurité)', group: 'Permis Groupe Lourd', tags: ['Permis', 'C'] },
  { id: `cond-${slug('P02 Permis CE')}`, ref: 'P02', title: 'Permis CE (attelage/dételage, trajectoires, inertie)', group: 'Permis Groupe Lourd', tags: ['Permis', 'CE'] },
];

/**
 * Programmes (utilisés par les modales “nom de la formation → modules à cocher”)
 * Cohérents avec les suppressions ci-dessus.
 */
export const PROGRAMS_ENSEIGNEMENTS = [
  { id: `prog-${slug('Attestation >3,5 t')}`, title: 'Attestation capacité transport de marchandises (> 3,5 t)', provider: 'DREAL', moduleRefs: ['M01', 'M02', 'M03', 'M05', 'M06', 'M07', 'M08'] },
  { id: `prog-${slug('Attestation ≤3,5 t VUL')}`, title: 'Attestation capacité transport de marchandises (≤ 3,5 t — VUL)', provider: 'DREAL', moduleRefs: ['L01', 'L02', 'L03', 'L04', 'L05', 'L06'] },

  { id: `prog-${slug('BTS GTLA Transport')}`, title: 'BTS GTLA — Transport', provider: 'BTS', moduleRefs: ['F01', 'F02', 'F03', 'F04'] },
  { id: `prog-${slug('BTS GTLA Logistique')}`, title: 'BTS GTLA — Logistique', provider: 'BTS', moduleRefs: ['F05', 'F06', 'F07'] },

  { id: `prog-${slug('BUT MLT')}`, title: 'BUT MLT', provider: 'BUT', moduleRefs: ['G01', 'G02', 'G03', 'G04'] },

  { id: `prog-${slug('Licences Pro TRM/Data')}`, title: 'Licences Pro — TRM / Data', provider: 'LP', moduleRefs: ['H01', 'H05'] },

  { id: `prog-${slug('Masters')}`, title: 'Masters', provider: 'Master', moduleRefs: ['K02', 'K05'] },

  { id: `prog-${slug('GOTRM CCP1')}`, title: 'GOTRM — CCP1', moduleRefs: ['T1-11', 'T1-12', 'T1-13', 'T1-14'] },
  { id: `prog-${slug('GOTRM CCP2')}`, title: 'GOTRM — CCP2', moduleRefs: ['T1-21', 'T1-22', 'T1-23'] },
  { id: `prog-${slug('GOTRM CCP3')}`, title: 'GOTRM — CCP3', moduleRefs: ['T1-31', 'T1-32', 'T1-33', 'T1-34'] },

  { id: `prog-${slug('ETRM Niv4')}`, title: 'ETRM (Niv. 4)', moduleRefs: ['T2-01', 'T2-02'] },
  { id: `prog-${slug('RETM/EMTR Niv5')}`, title: 'RETM / EMTR (Niv. 5)', moduleRefs: ['T3-01', 'T3-02', 'T3-03', 'T3-04'] },

  { id: `prog-${slug('RPTL')}`, title: 'RPTL', moduleRefs: ['T4-01', 'T4-02', 'T4-03', 'T4-04'] },
  { id: `prog-${slug('RUTL BC1→BC4')}`, title: 'RUTL — BC1 à BC4', moduleRefs: ['T5-11', 'T5-21', 'T5-31', 'T5-41'] },
];

export const PROGRAMS_CONDUCTEURS = [
  { id: `prog-${slug('Titres/CFP Conducteur')}`, title: 'Titres/CFP Conducteur routier', moduleRefs: ['D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08'] },
  { id: `prog-${slug('Réglementaires')}`, title: 'Réglementaires', moduleRefs: ['E01', 'E02', 'E03'] },
  { id: `prog-${slug('Permis Groupe Lourd')}`, title: 'Permis Groupe Lourd', moduleRefs: ['P01', 'P02'] },
];

export default {
  CATALOG_ENSEIGNEMENTS,
  CATALOG_CONDUCTEURS,
  PROGRAMS_ENSEIGNEMENTS,
  PROGRAMS_CONDUCTEURS,
};
