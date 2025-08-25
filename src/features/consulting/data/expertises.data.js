// src/features/consulting/data/expertises.data.js
// Structure thématique + modules (orientée objectifs, pas de jargon)
// Tags possibles: "TP/BTP", "Messagerie", "Transverse"

export const EXPERTISES_FILTERS = ["Tout", "TP/BTP", "Messagerie", "Transverse"];

export const EXPERTISES_THEMES = [
  {
    id: "pricing",
    title: "Vendre au bon prix (immédiatement)",
    goal: "Chiffrer juste, décider vite, sécuriser la marge.",
    microKpi: ["Marge +2–4 pts", "Prix plancher clair"],
    modules: [
      {
        id: "tarification-instantanee",
        title: "Tarification instantanée",
        objective: "Donner un tarif en 1 min avec marge visée.",
        doing:
          "Entrées terrain (km, T_cycle estimé, attente, options) → coût de revient → prix plancher + tarif cible.",
        deliverables: [
          "Simulateur simple (€/km, €/course, €/colis)",
          "Grille segmentée PDF/XLS",
        ],
        tags: ["Transverse", "Messagerie", "TP/BTP"],
        slug: "/consulting/expertises/tarification-instantanee",
      },
      {
        id: "cout-de-revient",
        title: "Coût de revient & prix plancher",
        objective: "Connaître le vrai coût (CCN, fuel, péages, véhicule).",
        doing:
          "Modèle paramétré entreprise, règles ADR/ZFE, pneus/atelier, amortissement/LOA.",
        deliverables: [
          "Modèle chiffré",
          "Seuil d’acceptation",
          "Tableau go/no go",
        ],
        tags: ["Transverse"],
        slug: "/consulting/expertises/cout-de-revient",
      },
      {
        id: "indexation",
        title: "Indexation & surcharges",
        objective: "Protéger la marge dans le temps.",
        doing: "Index gazole, péages, nuit/WE, zones, ADR.",
        deliverables: ["Clauses type", "Tableau d’index", "Notice client"],
        tags: ["Transverse"],
        slug: "/consulting/expertises/indexation",
      },
    ],
  },

  {
    id: "messagerie",
    title: "J+1 qui tient ses promesses (Messagerie)",
    goal: "POD < 24 h, moins de re-livraisons, meilleur NPS.",
    microKpi: ["POD 92–97 %", "Re-livraisons −15–25 %"],
    modules: [
      {
        id: "qualite-pod",
        title: "Qualité & POD",
        objective: "POD < 24 h (photo/signature fiable).",
        doing: "Rituels J0/J+1, preuves utilisables en litige.",
        deliverables: ["Checklists chauffeur/quai", "Gabarits POD"],
        tags: ["Messagerie"],
        slug: "/consulting/expertises/qualite-pod",
      },
      {
        id: "re-livraisons",
        title: "Réduction des re-livraisons",
        objective: "−15–25 % en 6–10 semaines.",
        doing: "Racines causes, re-tentatives, boucles retour.",
        deliverables: ["Plan par typologie", "Alertes simples"],
        tags: ["Messagerie"],
        slug: "/consulting/expertises/re-livraisons",
      },
      {
        id: "flux-quai",
        title: "Flux quai & cut-offs",
        objective: "Moins de bouchons, départs à l’heure.",
        doing: "Cut-offs/files, affectations quai, sécurité/EPI.",
        deliverables: ["Plan de quai", "Modes dégradés", "Brief 1 page"],
        tags: ["Messagerie", "Transverse"],
        slug: "/consulting/expertises/flux-quai",
      },
    ],
  },

  {
    id: "marge-chantier",
    title: "Marge chantier (TP/BTP)",
    goal: "Baisser la conso, chiffrer juste tout de suite, clarifier qui décide.",
    microKpi: ["L/100 −4 à −8 %", "Marge €/rotation +2–3 pts"],
    modules: [
      {
        id: "consommation-tp",
        title: "Conso carburant & conduite efficace",
        objective: "−4 à −8 % de L/100 → +1 à +2 pts €/rotation.",
        doing: "Bilan conso, ralenti & trajets, pression pneus, brief conduite.",
        deliverables: [
          "Tableau conso (L/100, L/h, €/rotation)",
          "Alertes ralenti",
          "Checklist atelier",
        ],
        tags: ["TP/BTP"],
        slug: "/consulting/expertises/consommation-tp",
      },
      {
        id: "tarification-rotation",
        title: "Tarification instantanée €/rotation (outil)",
        objective: "Donner un prix en 1 min avec marge visée.",
        doing:
          "Coût de revient réel (CCN, fuel, péages, pneus, atelier) → prix plancher → tarif cible.",
        deliverables: [
          "Simulateur web/feuille smart",
          "Grille €/rotation PDF/XLS",
          "Modèle de devis",
          "Indexation gazole",
        ],
        tags: ["TP/BTP"],
        slug: "/consulting/expertises/tarification-rotation",
      },
      {
        id: "orchestration-chantier",
        title: "Orchestration d’exploitation chantier (rôles)",
        objective: "Zéro zone grise : qui décide quoi, quand.",
        doing:
          "Rôles Exploit/Chantier/Affrètement/Atelier/ADV, rituels J-1/J0, modes dégradés, escalades.",
        deliverables: ["Playbook 1 page/poste", "RACI light", "Matrice d’escalade"],
        tags: ["TP/BTP", "Transverse"],
        slug: "/consulting/expertises/orchestration-chantier",
      },
      {
        id: "attentes-payees",
        title: "Attentes payées, sans conflit",
        objective: "100 % des attentes facturables prouvées & facturées.",
        doing: "Protocole d’attente signé, horodatage simple (QR/photo), script ADV.",
        deliverables: ["Clause type", "Gabarit preuve", "Macro facturation"],
        tags: ["TP/BTP", "Transverse"],
        slug: "/consulting/expertises/attentes-payees",
      },
      {
        id: "retour-charge",
        title: "Retour chargé & couplage de chantiers",
        objective: "−10 à −18 % de km à vide, +2–3 pts de marge.",
        doing: "Matrice retours, bourse interne, règles dispatch simples.",
        deliverables: ["Matrice retours (.xlsx)", "Règles make/buy chantier"],
        tags: ["TP/BTP"],
        slug: "/consulting/expertises/retour-charge",
      },
    ],
  },

  {
    id: "capacite",
    title: "Capacité & ressources (ne pas subir les pics)",
    goal: "La bonne capacité au bon moment, affrètement maîtrisé.",
    microKpi: ["Dispo +5–8 %", "Pics lissés"],
    modules: [
      {
        id: "dimensionnement",
        title: "Dimensionnement flotte & ressources",
        objective: "Capacité vs demande, pics & saisonnalité.",
        doing: "Modèles de charge, scénarios, lissage heures de pointe.",
        deliverables: ["Plan capacité 12 semaines", "Règles make/buy"],
        tags: ["Transverse"],
        slug: "/consulting/expertises/dimensionnement",
      },
      {
        id: "affretement",
        title: "Affrètement sous le plancher",
        objective: "Acheter au bon prix, qualité suivie.",
        doing: "Prix plancher affrètement, score sous-traitants, clauses qualité.",
        deliverables: ["Grille achat", "Rapport mensuel"],
        tags: ["Transverse"],
        slug: "/consulting/expertises/affretement",
      },
      {
        id: "parc-maintenance",
        title: "Parc & maintenance (exploitation)",
        objective: "Dispo +5–8 %, immobilisations visibles.",
        doing: "By-pass véhicule, impacts planning, visibilité atelier.",
        deliverables: ["Tableau dispo", "File priorités atelier"],
        tags: ["Transverse"],
        slug: "/consulting/expertises/parc-maintenance",
      },
    ],
  },

  {
    id: "pilotage",
    title: "Pilotage simple (data utile, pas de reporting usine)",
    goal: "Décider vite avec peu d’indicateurs.",
    microKpi: ["5–6 KPI utiles", "Alerte simple"],
    modules: [
      {
        id: "data-kpi",
        title: "Data & KPI utiles",
        objective: "5–6 KPI max, lisibles.",
        doing: "Rituels chiffrés, ownership par poste, alertes simples.",
        deliverables: ["Tableau sobre", "Règles d’alerte"],
        tags: ["Transverse"],
        slug: "/consulting/expertises/data-kpi",
      },
      {
        id: "tableaux-exploitation",
        title: "Tableaux d’exploitation anti-bruit",
        objective: "Zéro sur-reporting, 1 page par rôle.",
        doing: "Filtrage, seuils, modes dégradés.",
        deliverables: ["3 vues (Direction, Exploit., Quai)"],
        tags: ["Transverse"],
        slug: "/consulting/expertises/tableaux-exploitation",
      },
    ],
  },

  {
    id: "tms-mdm",
    title: "TMS/MDM & intégrations (que ça marche… vraiment)",
    goal: "Faire avec votre TMS, pas contre.",
    microKpi: ["Flux propres", "Référentiels stables"],
    modules: [
      {
        id: "integrations-tms-mdm",
        title: "Intégrations TMS/MDM",
        objective: "Flux propres, référentiels stables.",
        doing: "Interfaces, mapping, contrôles qualité (quality gates).",
        deliverables: ["Plan d’intégration", "Règles de rejet/retour"],
        tags: ["Transverse"],
        slug: "/consulting/expertises/integrations-tms-mdm",
      },
      {
        id: "gouvernance-data",
        title: "Gouvernance data",
        objective: "Qui tient quoi, et quand.",
        doing: "Propriété des champs, cycle de vie, archivage.",
        deliverables: ["RACI light", "Fiche ownership"],
        tags: ["Transverse"],
        slug: "/consulting/expertises/gouvernance-data",
      },
    ],
  },

  // On garde T_cycle dans un thème dédié "Productivité rotation"
  {
    id: "productivite-rotation",
    title: "Productivité rotation",
    goal: "Produire plus avec les mêmes moyens.",
    microKpi: ["Rotations +8–12 %", "T_cycle réduit"],
    modules: [
      {
        id: "t-cycle",
        title: "T_cycle sous contrôle",
        objective: "−8 à −12 % sur le T_cycle (chargement → vidage → retour).",
        doing:
          "Mesure simple (smartphone/peseuse), corridor P50/P95, 3 causes majeures traitées.",
        deliverables: ["Carte T_cycle", "Plan d’actions 30 jours"],
        tags: ["TP/BTP", "Transverse"],
        slug: "/consulting/expertises/t-cycle",
      },
    ],
  },
];
