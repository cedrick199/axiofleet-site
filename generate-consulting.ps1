# ============================================
# Axiofleet — Génération des pages Consulting (Markdown)
# Usage : exécuter ce script à la racine du repo.
# Les fichiers sont créés dans .\content\consulting\*
# ============================================

$ErrorActionPreference = "Stop"

# Racine contenu (modifiable)
$Base   = Join-Path (Get-Location) "content\consulting"
$Offres = Join-Path $Base "offres"

# Création dossiers
[System.IO.Directory]::CreateDirectory($Base)   | Out-Null
[System.IO.Directory]::CreateDirectory($Offres) | Out-Null

function Write-Page {
  param(
    [Parameter(Mandatory=$true)][string]$Path,
    [Parameter(Mandatory=$true)][string]$Content
  )
  $dir = Split-Path $Path -Parent
  if ($dir -and !(Test-Path $dir)) { [System.IO.Directory]::CreateDirectory($dir) | Out-Null }
  # UTF-8 sans BOM (robuste pour Vite/MD)
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
  Write-Host ("✅ " + $Path)
}

# --------------------------------------------
# /consulting (hub)
# --------------------------------------------
$hub = @'
---
title: 'Consulting TRM — Messagerie & TP/BTP | Axiofleet'
description: 'Audit 72 h, Sprint 4-6 semaines, Accompagnement mensuel. Messagerie (POD < 24 h) ou TP/BTP (rotations plus courtes). Méthode simple, résultats mesurés.'
canonical: '/consulting'
h1: 'Axiofleet Consulting TRM — Marge & SLA, vite et bien'
keywords:
  - consulting TRM
  - audit exploitation transport
  - messagerie J+1
  - BTP bennes
  - planification RSE
  - SIG transport
  - indexation gazole
analytics_cta:
  - 'Diag 15 min'
  - 'Réserver 72 h'
  - 'Démarrer un Sprint'
  - 'Recevoir le kit SLA/CAPA'
---

## Pourquoi maintenant ?
- **-1,5 à -3,0 pts de marge (SIG/pricing).** Les fuites tarifaires et une indexation gazole incomplète grignotent la marge ; on les ferme rapidement.
- **12-20 % des courses sans POD < 24 h.** Une chaîne quai->POD mal huilée retarde la facturation ; on sécurise le flux et les preuves.
- **25-40 % de planning non conforme RSE/CCN.** Le non-respect J-1/J-0 et l'absence de buffers créent risques et absentéisme ; on remet un cadre.

## Offres prêtes à activer (sur-mesure)
*Prestations sur-mesure : notre accompagnement s'adapte à votre demande.*

### Audit Flash 72 h
Diag terrain express, quick wins et plan d'exécution 15 jours.
- Détecte les fuites SIG & pricing
- Cadrage J-1/J-0, buffers et RSE/CCN
- Accélère POD < 24 h  
**Signal prix : à partir de 3 900 € HT.**  
**CTA :** _Réserver 72 h_

### Sprint 4-6 semaines (deux parcours)
Transformation guidée **Messagerie** (POD < 24 h) **ou** **TP/BTP** (rotations plus courtes).
- +1 à +3 pts de marge opérationnelle
- POD < 24 h stabilisé **ou** rotations -6-12 %
- Gouvernance, rituels et CAPA en place  
**CTA :** _Démarrer un Sprint_

### Accompagnement mensuel
Pilotage récurrent, KPI pack, CAPA et war-room capacité J+7/J+14.
- Maintien des gains & montée en compétences
- Coaching responsables & revue performance
- Roadmap data/MDM et "trinôme" Pricing  
**CTA :** _Planifier un appel_

## Périmètres d'audit prioritaires
- **Messagerie — POD < 24 h** : sous 24 h systématique, exceptions cadrées.
- **Messagerie — Quai & dispatch** : moins d'attente, départs tenables.
- **TP/BTP — Rotations plus courtes** : mesures terrain, pics lissés.
- **TP/BTP — Capacité J+7/J+14** : prévoir charges, éviter sous/sur-utilisation.
- **Prix & indexation gazole** : barème clair, anti-fuites marge.
- **Organisation & Rôles** : qui fait quoi, rituels, décisions tracées.

## Méthode & gouvernance
- **72 h — Décider** : diag express, quick wins, plan 15 j.
- **4-6 sem. — Exécuter** : chantiers ciblés, revue hebdo 30 min.
- **Run — Tenir** : rituels, KPI utiles, transfert équipes.

## Preuves & mini-cas
**Messagerie — Hub régional (95 tournées/j)**  
Contexte • POD > 24 h récurrent • Actions : POD mobile, rattrapage J+1 • KPIs : POD < 24 h 93-96 % • Résultats : marge +1,5-2,3 pts • Délai : 5 sem.

**TP/BTP — Carrières (52 VL)**  
Contexte • pics départs • Actions : fenêtres lissées, créneaux sites • KPIs : rotations -7-12 % • Résultats : marge/heure +1,0-2,0 pts • Délai : 6 sem.

**Organisation & Rôles — Mono-site**  
Contexte • rôles flous • Actions : RACI, délégations, rituels • KPIs : incidents -20-35 % • Résultats : décisions plus rapides • Délai : 3 sem.

**CTA :** _Voir d'autres cas_

## Teaser TMS Axiofleet
Un **planning conducteur IA-ready**, contrôle **RSE** et **cockpit marge** pour visualiser vos gains.  
**CTA :** _Découvrir le TMS (teaser)_

## FAQ courte
- **Faut-il changer la flotte ?** Non, on agit sur règles et flux.
- **Charge équipes ?** 30 min/sem. côté pilotage.
- **Messagerie vs TP/BTP ?** On traite **un parcours à la fois**.
- **Données incomplètes ?** On fiabilise en parallèle (checklists).

## CTA final
**CTA primaire :** _Diag 15 min_ · **CTA secondaire :** _Recevoir le kit SLA/CAPA_
'@

Write-Page -Path (Join-Path $Base "index.md") -Content $hub

# --------------------------------------------
# /consulting/offres/audit-72h
# --------------------------------------------
$audit = @'
---
title: 'Audit Flash 72 h — Diag express & plan 15 j | Axiofleet'
description: 'Audit exploitation transport en 72 h pour PME TRM : diagnostic terrain, quick wins et plan d'exécution 15 jours. Visez POD < 24 h et +2 à +4 pts de marge nette.'
canonical: '/consulting/offres/audit-72h'
h1: 'Audit Flash 72 h — diagnostiquez, décidez, exécutez'
keywords:
  - consulting TRM
  - audit exploitation transport
  - messagerie J+1
  - BTP bennes
  - planification RSE
  - SIG transport
  - indexation gazole
---

## Hero — promesse & action
En 72 h, nous diagnostiquons votre exploitation TRM et posons un plan d'exécution 15 jours pour **fermer les fuites SIG**, stabiliser **POD < 24 h** et sécuriser **RSE/CCN** — sans changer la flotte.  
**Signal prix : à partir de 3 900 € HT.**  
**CTA :** _Réserver 72 h_

## Déroulé J0 -> J3
- **J0 — Kick-off (1 h)** : objectifs, périmètre, accès data/MDM, planning visites.
- **J1 — Terrain & data** : quai/hub, dispatch, planning RSE, facturation, tournées.
- **J2 — Analyse & chiffrage** : SIG/pricing, indexation gazole, T_cycle BTP, POD.
- **J3 — Restitution** : quick wins, CAPA, "trinôme" Pricing, feuille de route 15 j.  
**CTA :** _Voir le déroulé_

## Périmètre type (adaptable)
- **Planning RSE/CCN** : J-1/J-0, buffers, astreintes, choix tournées.
- **Quai -> POD** : capture preuves, délais < 24 h, exceptions.
- **SIG & Pricing** : barème, indexation gazole, remises.
- **BTP T_cycle** : chargement->déchargement, files, compatibilités.
- **MDM** : clients/sites, contrats, règles d'exploitation.  
**CTA :** _Adapter à mon site_

## Livrables fournis
- **Diag Flash** priorisé (PDF) + carte des risques.
- **Plan 15 jours** : 6-10 actions CAPA, responsables, jalons.
- **Tableau gains** : POD, SIG, T_cycle, conformité RSE (fourchettes).
- **Pack KPI** : templates SLA/POD, marge, taux conformité.
- **Checklist MDM** pour fiabiliser les données.  
**CTA :** _Obtenir un exemple_

## Mini-cas — TP/BTP (bennes enrobés)
Contexte • mono-site, 38 VL • Diagnostic • T_cycle sous-estimé • Actions • fenêtre départ lissée • KPIs • T_cycle -8-12 % • Résultats • marge/heure +1,0-1,8 pt • Délai • 3 semaines.  
**CTA :** _Voir détails_

## Mini-cas — Messagerie J/J+1
Contexte • hub + dernier km, 95 tournées/jour • Diagnostic • 22 % POD > 24 h • Actions • POD mobile, boucle exceptions • KPIs • POD < 24 h 92-96 % • Résultats • marge +1,5-2,5 pts • Délai • 4 semaines.  
**CTA :** _Voir détail POD_

## Objections fréquentes
- **"Pas de bande passante."** 72 h diag, actions prêtes J+1.
- **"Pas de changement de flotte ?"** Process, planning, MDM d'abord.
- **"ROI ?"** Gains chiffrés en fourchettes, revus chaque semaine.
- **"RSE/CCN ?"** Cadrage J-1/J-0 + contrôle conformité.  
**CTA :** _Parler 15 min_

## CTA final
**CTA primaire :** _Réserver 72 h_ · **CTA secondaire :** _Diag 15 min_
'@

Write-Page -Path (Join-Path $Offres "audit-72h.md") -Content $audit

# --------------------------------------------
# /consulting/offres/sprint-4-6-semaines
# --------------------------------------------
$sprint = @'
---
title: 'Sprint 4-6 semaines — Packs Messagerie ou BTP | Axiofleet'
description: 'Deux packs dédiés : Messagerie (POD < 24 h) ou TP/BTP (rotations). En 4-6 semaines : RSE/CCN, SIG/Pricing, MDM, CAPA. Résultats mesurés et ancrés.'
canonical: '/consulting/offres/sprint-4-6-semaines'
h1: 'Sprint 4-6 semaines — deux parcours dédiés'
keywords:
  - consulting TRM
  - messagerie J+1
  - BTP bennes
  - planification RSE
  - SIG transport
  - indexation gazole
---

## Hero — deux parcours au choix
En 4 à 6 semaines, nous mettons votre exploitation sur de bons rails : **Messagerie** (POD < 24 h) **ou** **TP/BTP** (rotations plus courtes). Objectif : **plus de marge**, **moins de retards**, **planning conforme**.  
**Signal prix : sur devis.**  
**CTA :** _Démarrer un Sprint_

## Jalons du Sprint (S1->S6)
- **S1 — Démarrage & mesures** : point d'entrée, chiffres de départ, priorités.
- **S2 — Planning propre** : règles simples, horaires tenables, respect CCN.
- **S3 — Flux clé** : **Messagerie :** POD < 24 h • **BTP :** temps de rotation.
- **S4 — Prix & gasoil** : barème clair, indexation appliquée.
- **S5 — Données fiables** : clients, sites, contrats, tournées.
- **S6 — Ancrage** : plan 30-60-90 j et passage de relais.  
**CTA :** _Voir le planning_

## Parcours Messagerie (J/J+1)
- POD mobile simple pour les chauffeurs
- Traitement des POD manquants le lendemain
- Réunions courtes quai/dispatch (matin/fin de journée)
- Règles claires J-1/J-0 et marges de sécurité
- Suivi des litiges et du délai de facturation  
**CTA :** _Choisir Messagerie_

### Livrables Messagerie
- Guide "POD < 24 h" + cas fréquents
- Grille prix + indexation gazole appliquée
- Tableau de bord (SLA, POD, litiges, DSO)
- Checklist données (clients/sites/OT)
- Plan d'actions 30-60-90 j  
**CTA :** _Voir un exemple_

### Mini-cas — Messagerie J/J+1
Contexte • hub + dernier km, 110 tournées/j • Diagnostic • 21 % POD > 24 h • Actions • POD mobile, traitement J+1 • KPIs • POD < 24 h 93-97 % • Résultats • marge +1,5-2,8 pts • Délai • 5 semaines.  
**CTA :** _Voir le flux POD_

## Parcours TP/BTP (bennes, enrobés, carrières)
- Mesures terrain : chargement, attente, déchargement
- Fenêtres de départ par site/engin, lissage des pics
- Règles d'affectation claires (jour/nuit)
- Prévision capacité à J+7/J+14
- Suivi marge/heure et retards  
**CTA :** _Choisir TP/BTP_

### Livrables TP/BTP
- Guide "Rotations plus courtes" par type de chantier
- Barème + indexation gazole (BTP)
- Tableau de bord (marge/heure, retards, rotations)
- Checklist données (chantiers/segments)
- Plan d'actions 30-60-90 j  
**CTA :** _Voir un exemple_

### Mini-cas — TP/BTP (carrières / 8x4)
Contexte • PME 52 VL • Diagnostic • départs en pics • Actions • fenêtres lissées, créneaux • KPIs • rotations -7-12 % • Résultats • marge/heure +1,0-2,0 pts • Délai • 6 semaines.  
**CTA :** _Voir le détail_

## Pilotage simple
- 30 min / semaine : décider, débloquer, ajuster
- Revue des chiffres et démonstration terrain
- Passage de relais : méthodes, fichiers, responsables  
**CTA :** _Organiser le point_

## CTA final
**CTA primaire :** _Démarrer un Sprint_ · **CTA secondaire :** _Diag 15 min_
'@

Write-Page -Path (Join-Path $Offres "sprint-4-6-semaines.md") -Content $sprint

# --------------------------------------------
# /consulting/offres/accompagnement-mensuel
# --------------------------------------------
$run = @'
---
title: 'Accompagnement mensuel — Tenir les gains | Axiofleet'
description: 'Accompagnement 3 ou 6 mois pour PME TRM : Messagerie (POD < 24 h) ou TP/BTP (rotations plus courtes). Rituels légers, KPIs mensuels, livrables réutilisables.'
canonical: '/consulting/offres/accompagnement-mensuel'
h1: 'Accompagnement mensuel — des résultats qui durent'
keywords:
  - consulting TRM
  - messagerie J+1
  - BTP bennes
  - planification RSE
  - SIG transport
  - indexation gazole
---

## Hero — tenir les gains, progresser chaque mois
Engagement 3 ou 6 mois : POD < 24 h (Messagerie) ou rotations plus courtes (TP/BTP), avec un pilotage léger (2-4 h/sem.).  
**Signal prix : sur devis.**  
**CTA :** _Planifier un appel_

## Rituels & cadence
- Hebdo 30 min : décisions, blocages, ajustements
- Mensuel 90 min : revue KPI & priorités
- Points flash après incidents (15 min)
- Suivi CAPA (qui fait quoi, pour quand)
- Transfert : modèles et méthodes réutilisables  
**CTA :** _Voir un exemple_

## Parcours Messagerie
- Routine J+1 des POD manquants
- Réunions quai/dispatch courtes
- Traitement des exceptions récurrentes
- Pilotage DSO & qualité client
- Coaching chef de quai / exploitant  
**CTA :** _Choisir Messagerie_

## Parcours TP/BTP
- Mesure des temps clés (charger/attente/décharger)
- Fenêtres de départ adaptées par site/engin
- Prévision capacité J+7/J+14
- Suivi marge/heure et retards
- Coaching chef d'exploitation / planificateur  
**CTA :** _Choisir TP/BTP_

## Livrables mensuels
- Tableau de bord (SLA, POD ou rotations, marge)
- Journal d'actions (responsable, échéance, statut)
- Guides pratiques mis à jour
- Checklist données (clients/sites/contrats/chantiers)
- Bilan mensuel + prochaines priorités  
**CTA :** _Recevoir un modèle_

## Modèle d'engagement
- Durée : 3 ou 6 mois (renouvelable)
- Charge : 2-4 h/sem. côté client
- Clause de sortie : mensuelle
- Onboarding : 1-2 semaines
- Option : pause/reprise selon saisonnalité  
**CTA :** _Voir les modalités_

## CTA final
**CTA primaire :** _Planifier un appel_ · **CTA secondaire :** _Demander un devis_
'@

Write-Page -Path (Join-Path $Offres "accompagnement-mensuel.md") -Content $run

# --------------------------------------------
# /consulting/expertises
# --------------------------------------------
$expertises = @'
---
title: 'Expertises TRM — Messagerie & TP/BTP | Axiofleet'
description: 'POD < 24 h en messagerie, rotations plus courtes en TP/BTP, prix cadrés, données fiables, KPI utiles. Prestations sur-mesure, livrables prêts à l'emploi.'
canonical: '/consulting/expertises'
h1: 'Expertises — Messagerie & TP/BTP'
keywords:
  - consulting TRM
  - audit exploitation transport
  - messagerie J+1
  - BTP bennes
  - planification RSE
  - SIG transport
  - indexation gazole
---

Intro : Nous intervenons là où le gain est immédiat : promesse J/J+1 tenue, rotations plus courtes, prix cadrés, données fiables. Prestations sur-mesure : nos livrables s'adaptent à votre site et votre saisonnalité.

## Messagerie — POD < 24 h
- Guide "POD < 24 h" + cas d'exception
- Routine J+1 pour POD manquants
- Tableau de bord POD / litiges / DSO  
**CTA :** _Choisir Messagerie_

## Messagerie — Quai & dispatch
- Rituels matin/fin de journée (30 min)
- Standard chargement/déchargement
- Plan d'amélioration 30-60-90 j  
**CTA :** _Optimiser mon quai_

## Messagerie — Tournées J/J+1 fiables
- Playbook J-1/J-0 (buffers, exceptions)
- Priorités par zone/volume
- Kit formation exploitants (2 h)  
**CTA :** _Stabiliser mes tournées_

## TP/BTP — Rotations plus courtes (T_cycle)
- Mesures terrain par site/engin
- Fenêtres de départ et cadences
- Suivi : rotations, retards, marge/heure  
**CTA :** _Réduire mes rotations_

## TP/BTP — Capacité J+7 / J+14
- Prévision capacité simple
- Règles d'affectation jour/nuit
- War-room hebdo (30 min)  
**CTA :** _Prévoir ma capacité_

## Prix & indexation gazole (anti-fuites)
- Barème "maison" versionné
- Formule d'indexation gazole
- Cockpit marge (suivi hebdo)  
**CTA :** _Cadrer mes prix_

## Données fiables (MDM)
- Checklist qualité données
- Modèles clients/sites/contrats
- Règles de nommage & ownership  
**CTA :** _Nettoyer mes données_

## Planning conforme & simple (RSE/CCN)
- Règles pratiques horaires et repos
- Contrôles de conformité intégrés
- Guide d'arbitrage "cas fréquents"  
**CTA :** _Assainir mon planning_

## KPI & cockpit marge
- Pack KPI (SLA, POD/rotations, marge)
- Revue hebdo 30 min
- Journal "actions / responsables / échéances"  
**CTA :** _Installer mes KPI_

## Flux commande -> POD -> facture
- Schéma simple des étapes
- Checklists par rôle
- Journal d'incidents récurrents + correctifs  
**CTA :** _Accélérer ma facturation_

## Formation & montée en compétences
- Modules ciblés (2-3 h) par fonction
- Guides pas-à-pas (PDF)
- Quiz + coaching court  
**CTA :** _Former mon équipe_

## Gouvernance légère & rituels
- Cadence hebdo/mensuelle prête à l'emploi
- Modèles d'agenda et CR
- Plan 30-60-90 j par site  
**CTA :** _Mettre en place mes rituels_

## Organisation & Rôles (poste par poste)
- Cartographie réel vs papier, RACI, escalade
- Délégations, rituels, "sans dérangement"
- Scripts accueil, briefs chauffeurs, journal décisions  
**CTA :** _Cartographier mes rôles_
'@

Write-Page -Path (Join-Path $Base "expertises.md") -Content $expertises

# --------------------------------------------
# /consulting/cas-clients
# --------------------------------------------
$cases = @'
---
title: 'Cas clients — Messagerie & TP/BTP | Axiofleet'
description: 'Exemples réels : POD < 24 h en messagerie, rotations plus courtes en TP/BTP. Gains mesurés en 3-6 semaines, sans changer la flotte.'
canonical: '/consulting/cas-clients'
h1: 'Cas clients — Messagerie & TP/BTP'
keywords:
  - consulting TRM
  - messagerie J+1
  - BTP bennes
  - audit exploitation transport
  - planification
  - POD
  - rotations chantier
---

Nos exemples sont anonymisés et réalistes. Objectif : gains rapides sans changer la flotte. Prestations sur-mesure : on adapte la mission à votre site et vos équipes.

## Messagerie (J/J+1)
**Mini-cas #1 — Hub régional (95 tournées/j)**  
Contexte • 22 % POD > 24 h • Actions • POD mobile, J+1, points quai • KPIs • POD < 24 h 93-96 % • Résultats • marge +1,5-2,3 pts • Délai • 5 sem.

**Mini-cas #2 — Multi-dépôts (140 tournées/j)**  
Contexte • 3 sites • Actions • standard exceptions, scan quai • KPIs • POD < 24 h 92-95 % • Résultats • marge +1,2-2,0 pts • Délai • 6 sem.

**Mini-cas #3 — Dernier km urbain (75 tournées/j)**  
Contexte • créneaux serrés • Actions • buffers J-1, réordonnancement • KPIs • retouches -30-40 % • Résultats • sat. client +10-15 % • Délai • 4 sem.  
**CTA :** _Voir le flux POD_

## TP/BTP (bennes, enrobés, carrières)
**Mini-cas #1 — Carrières (52 VL)**  
Contexte • pics départs • Actions • fenêtres départ, créneaux chargement • KPIs • rotations -7-12 % • Résultats • marge/heure +1,0-2,0 pts • Délai • 6 sem.

**Mini-cas #2 — Enrobés de nuit (38 VL)**  
Contexte • chantiers nuit • Actions • lissage départs, consignes radio • KPIs • T_cycle -8-12 % • Résultats • marge/heure +1,0-1,8 pt • Délai • 3 sem.

**Mini-cas #3 — Terrassement (46 VL)**  
Contexte • flux variables • Actions • règles affectation, indispos, prévision J+7 • KPIs • annulations -15-25 % • Résultats • marge/heure +0,8-1,6 pt • Délai • 5 sem.  
**CTA :** _Réduire mes rotations_

## Comment nous sécurisons les résultats
- Rituels courts (hebdo 30 min)
- Tableaux de bord simples
- Journal d'actions (responsable, échéance)
- Fichiers modèles réutilisables
- Revue 30-60-90 j  
**CTA :** _Demander un exemple_

## CTA final
**CTA primaire :** _Diag 15 min_ · **CTA secondaire :** _Réserver 72 h_
'@

Write-Page -Path (Join-Path $Base "cas-clients.md") -Content $cases

# --------------------------------------------
# /consulting/ressources
# --------------------------------------------
$ressources = @'
---
title: 'Ressources — Kit SLA/CAPA & checklists | Axiofleet'
description: 'Téléchargez le kit opérationnel : checklists Messagerie (POD < 24 h) et TP/BTP (rotations), modèle CAPA, tableau de bord KPI. Opt-in RGPD, envoi immédiat.'
canonical: '/consulting/ressources'
h1: 'Ressources — Kit SLA/CAPA & checklists'
keywords:
  - consulting TRM
  - messagerie J+1
  - BTP bennes
  - KPI transport
  - CAPA
  - POD < 24 h
  - rotations chantier
---

Téléchargez un kit opérationnel pour sécuriser POD < 24 h (Messagerie) ou rotations plus courtes (TP/BTP). Outils simples, prêts à l'emploi. Sur-mesure si besoin.

## Ce que vous recevez (kit)
- Checklists Messagerie (POD < 24 h)
- Checklists TP/BTP (rotations, départs lissés)
- Plan CAPA (actions, responsables, délais)
- Tableau de bord KPI prêt à remplir
- Scripts : brief chauffeur, accueil/appels  
**CTA :** _Recevoir le kit_

## Messagerie — Checklists POD < 24 h
- Routine J+1 pour POD manquants
- Exceptions & traitement standard
- Points quai/dispatch 30 min
- Contrôles avant facturation
- Suivi litiges & DSO  
**CTA :** _Voir le sommaire_

## TP/BTP — Checklists rotations
- Mesure charger/attente/décharger
- Fenêtres par site/engin
- Règles d'affectation jour/nuit
- Journal indispos Parc/Atelier
- Suivi marge/heure & retards  
**CTA :** _Voir le sommaire_

## CAPA — Plan d'actions
- Action / responsable / échéance / statut
- Impact estimé (marge, POD/rotations)
- Commentaires & preuves
- Revue hebdo 30 min
- Consolidation mensuelle  
**CTA :** _Télécharger le modèle_

## KPI — Tableau de bord
- Messagerie : SLA, % POD < 24 h, litiges, DSO
- TP/BTP : rotations, retards, marge/heure
- Alertes (seuils) & historique semaine/mois  
**CTA :** _Obtenir le tableau_

## RGPD & confidentialité
- Opt-in explicite requis
- Email utilisé pour envoyer le kit et MAJ
- Pas de cookies intrusifs ni revente
- Désabonnement en 1 clic
- Droits d'accès/suppression  
**CTA :** _Lire la notice RGPD_

## CTA final
**CTA primaire :** _Recevoir le kit_ · **CTA secondaire :** _Diag 15 min_
'@

Write-Page -Path (Join-Path $Base "ressources.md") -Content $ressources

# --------------------------------------------
# /consulting/faq
# --------------------------------------------
$faq = @'
---
title: 'FAQ Consulting TRM — Messagerie & TP/BTP | Axiofleet'
description: 'Délais, flotte inchangée, CCN/RSE, données manquantes, ROI, dépendance TMS : nos réponses claires pour PME TRM. Décidez en 15 minutes.'
canonical: '/consulting/faq'
h1: 'FAQ — Consulting TRM Messagerie & TP/BTP'
keywords:
  - consulting TRM
  - messagerie J+1
  - BTP bennes
  - audit exploitation transport
  - planification RSE
  - SIG transport
  - indexation gazole
---

Intro : Réponses claires et concrètes pour décider sereinement. Sur-mesure : on adapte la mission à votre site et votre saisonnalité.

## 1) Peut-on obtenir des gains sans changer la flotte ?
Oui : tournées tenables, POD < 24 h, rotations plus courtes, prix cadrés.  
**CTA :** _Diag 15 min_

## 2) Quand voit-on les premiers résultats ?
Audit 72 h : quick wins dès J+1 • Sprint : hausse chaque semaine • Mensuel : consolidation.  
**CTA :** _Réserver 72 h_

## 3) Messagerie ou TP/BTP : comment choisir ?
Selon le flux critique : POD < 24 h (messagerie) ou rotations (BTP). On traite un parcours à la fois.  
**CTA :** _Choisir mon parcours_

## 4) CCN/RSE sans complexité ?
Règles simples + contrôles intégrés (J-1/J-0, marges, cas fréquents).  
**CTA :** _Assainir le planning_

## 5) Données incomplètes ?
On démarre et on fiabilise en parallèle (checklists, modèles, ownership).  
**CTA :** _Nettoyer mes données_

## 6) Charge côté équipes ?
Cadence légère : 30 min/semaine + livrables "plug & play".  
**CTA :** _Organiser le point_

## 7) ROI mesuré comment ?
Quelques KPI utiles : POD < 24 h / rotations, litiges/retards, marge/heure, indexation appliquée.  
**CTA :** _Voir un exemple KPI_

## 8) Dépendance TMS Axiofleet ?
Non. Méthodes compatibles avec votre outillage. Démo teaser possible.  
**CTA :** _Découvrir le teaser_

## CTA final
**CTA primaire :** _Diag 15 min_ · **CTA secondaire :** _Réserver 72 h_
'@

Write-Page -Path (Join-Path $Base "faq.md") -Content $faq

# --------------------------------------------
# /consulting/tarifs
# --------------------------------------------
$tarifs = @'
---
title: 'Tarifs Consulting TRM — Audit 72 h, Sprint, Mensuel | Axiofleet'
description: 'Audit 72 h à partir de 3 900 € HT. Sprint 4-6 semaines et Accompagnement mensuel sur devis. Messagerie ou TP/BTP, livrables prêts à l'emploi, ROI suivi.'
canonical: '/consulting/tarifs'
h1: 'Tarifs — Audit 72 h, Sprint, Accompagnement'
keywords:
  - consulting TRM
  - tarifs audit exploitation transport
  - messagerie J+1
  - BTP bennes
  - planification RSE
  - SIG transport
  - indexation gazole
---

Prestations sur-mesure : on adapte l'accompagnement à votre activité (Messagerie ou TP/BTP) et à votre saisonnalité.

## Vue d'ensemble des offres
- Audit Flash 72 h : décision rapide, plan 15 j.
- Sprint 4-6 semaines : exécution guidée, résultats hebdo.
- Accompagnement mensuel : tenir les gains, faire grandir l'équipe.  
**CTA :** _Demander un devis_

## Audit Flash 72 h — signal prix
Diagnostic terrain + quick wins + plan d'exécution 15 jours.
- Cible : Messagerie (POD < 24 h) ou TP/BTP (rotations)
- Restitution claire, actions prêtes J+1
- Pack KPI & CAPA inclus  
**Signal prix : à partir de 3 900 € HT.**  
**CTA :** _Réserver 72 h_

## Sprint 4-6 semaines — sur devis
- Messagerie : POD < 24 h, exceptions, DSO
- TP/BTP : rotations plus courtes, départs lissés
- Rituels hebdo 30 min, transferts & kit 30-60-90 j  
**Signal prix : sur devis (selon périmètre).**  
**CTA :** _Démarrer un Sprint_

## Accompagnement mensuel — sur devis
- Charge côté client : 2-4 h/sem.
- Tableaux de bord, journal d'actions, coaching
- Engagement 3 ou 6 mois, clause de sortie mensuelle  
**Signal prix : sur devis (volume & sites).**  
**CTA :** _Planifier un appel_

## Ce qui fait varier le budget
- Nombre de sites et de tournées / chantiers
- Flux critique : POD (messagerie) ou rotations (BTP)
- Disponibilités équipe & données MDM
- Saison (pics, nuit, ZFE, contraintes clients)
- Besoin d'Organisation & Rôles (poste par poste)  
**CTA :** _Dimensionner mon périmètre_

## Inclus dans chaque mission
- Guides pratiques (POD / Rotations)
- Pack KPI et modèle CAPA
- Checklists MDM et rituels courts
- Restitution claire + passage de relais
- Support mail entre deux points hebdo  
**CTA :** _Voir un exemple_

## Options sur-mesure
- Organisation & Rôles (RACI, délégations, scripts)
- Prix & indexation gazole (barème, cockpit marge)
- War-room capacité J+7 / J+14 (BTP)
- Flux POD et litiges (Messagerie)
- Formation ciblée (2-3 h)  
**CTA :** _Composer mon pack_

## Processus de devis
- Étape 1 (15 min) : diagnostic express du besoin
- Étape 2 (48 h) : devis avec périmètre et jalons
- Étape 3 : kick-off et planning d'exécution
- Facturation : à l'étape / au jalon, sans surprise
- Confidentialité : NDA si requis  
**CTA :** _Demander un devis_

## CTA final
**CTA primaire :** _Demander un devis_ · **CTA secondaire :** _Diag 15 min_
'@

Write-Page -Path (Join-Path $Base "tarifs.md") -Content $tarifs

Write-Host ""
Write-Host "🎯 Contenus Consulting générés dans: $Base" -ForegroundColor Green
Write-Host "Ouvrez-les dans VS Code, branchez-les à vos routes React (MUI, thème sombre),"
Write-Host "ou servez-les via un loader Markdown. CTAs/SEO déjà inclus."