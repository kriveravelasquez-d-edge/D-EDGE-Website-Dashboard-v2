# Refonte Chromatique Pastel des Sections Étapes & Modernisation UX des Blocs Enfants

Harmonisation visuelle des 4 sections étapes (`#section-sitemap`, `#section-content-collection`, `#section-revision-phase`, `#section-go-live`) avec une palette pastel douce et distinctive par étape, combinée à une modernisation UX des blocs enfants (cartes structurées avec barre d'accent et statuts clairs) tout en préservant une structure globale rigoureuse et cohérente.

---

## Décisions Validées avec l'Utilisateur

> [!IMPORTANT]
> Les deux orientations esthétiques et fonctionnelles validées :
> 1. **Ambiance chromatique des sections étapes** : *Thèmes doux pastel avec contrastes de statut* — Chaque étape bénéficie d'un ton pastel doux et distinctif (Lavande/Indigo pastel pour l'Étape 1, Cyan/Azur pastel pour l'Étape 2, Ambre/Pêche pastel pour l'Étape 3, et Émeraude/Menthe pastel pour l'Étape 4), offrant un repérage spatial immédiat sans agressivité visuelle.
> 2. **Traitement UX des blocs enfants** : *Cartes structurées avec barre d'accent et statuts clairs* — Chaque bloc enfant (Sitemap, SEO, Templates, Textes, Médias, Brand & Typo, Révisions, Go-Live) adopte un conteneur en carte blanche immaculée dotée d'une barre d'accent latérale gauche (3px ou 4px), d'un en-tête structuré avec icône et badge de statut explicite (Complété, En cours, Optionnel, À faire), et de micro-interactions fluides.
> 3. **Homogénéité structurelle garantie** : Toutes les sections étapes conservent exactement la même anatomie maîtresse (En-tête standardisé avec titre numéroté, jauge de complétion temps réel, sélecteur/badge de deadline, bouton d'aide contextuelle, bouton de repli accordéon et séparateurs inter-étapes).

---

## 1. Vue d'Ensemble & Objectifs

- **Problème résolu** : Auparavant, les 4 sections étapes présentaient une structure visuelle uniformément neutre (`bg-white border-slate-200`) avec les mêmes bordures grises monotones, rendant difficile la distinction rapide entre la structure du site, la collecte des contenus, les révisions et la mise en ligne. Par ailleurs, certains blocs enfants manquaient de clarté sur leur statut d'avancement et leur priorité opérationnelle.
- **Bénéfice utilisateur** :
  - **Repérage intuitif** : Le chef de projet (PM) et le client hôtelier identifient instantanément l'étape sur laquelle ils travaillent grâce à un bandeau d'en-tête pastel doux spécifique et des accents chromatiques coordonnés.
  - **Clarté d'action** : Les blocs enfants indiquent immédiatement ce qui est requis, ce qui est complété (vert menthe doux avec coche) et ce qui reste à renseigner, avec des barres d'accent visuelles nettes.
  - **Cohérence d'usage** : Aucun dépaysement : chaque étape propose les mêmes contrôles au même endroit (accordéon, progression, deadline, guide d'étape).

---

## 2. Expérience Utilisateur & Design Visuel

### A. Charte Chromatique Pastel par Étape

Chaque section étape hérite d'une identité pastel raffinée, respectant les ratios de contraste WCAG AA :

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ÉTAPE 1 : STRUCTURE DU SITE (Sitemap & Templates Showcase)                              │
│ • En-tête : Fond doux lavande pastel (bg-gradient-to-r from-violet-50/80 to-indigo-50/40)│
│ • Accentuation : Violet royal & Indigo (#5B1E82, border-violet-200, text-violet-900)    │
│ • Barre d'accent des blocs enfants : border-l-violet-600 / border-l-indigo-500          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ÉTAPE 2 : COLLECTE DE CONTENU (Textes, Photos, Typographies & Palette)                  │
│ • En-tête : Fond doux azur/cyan pastel (bg-gradient-to-r from-sky-50/80 to-blue-50/40)   │
│ • Accentuation : Bleu océan & Azur (#0284c7, border-sky-200, text-sky-900)            │
│ • Barre d'accent des blocs enfants : border-l-sky-500 / border-l-blue-600               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ÉTAPE 3 : PHASE DE RÉVISION (Staging, Vague 1 & Vague 2)                               │
│ • En-tête : Fond doux ambre/pêche pastel (bg-gradient-to-r from-amber-50/80 to-orange-50/40)│
│ • Accentuation : Ambre chaleureux (#d97706, border-amber-200, text-amber-900)          │
│ • Barre d'accent des blocs enfants : border-l-amber-500 / border-l-orange-500           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ÉTAPE 4 : MISE EN LIGNE (DNS, Domaine, Booking Engine & Lancement)                     │
│ • En-tête : Fond doux émeraude/menthe pastel (bg-gradient-to-r from-emerald-50/80 to-teal-50/40)│
│ • Accentuation : Vert émeraude succès (#059669, border-emerald-200, text-emerald-900)  │
│ • Barre d'accent des blocs enfants : border-l-emerald-500 / border-l-teal-600          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### B. Traitement UX des Blocs Enfants

Pour chaque sous-bloc opérationnel :
1. **Conteneur Carte Structurée** :
   - Fond blanc pur (`bg-white`), bordure douce (`border border-slate-200/80`), ombre légère (`shadow-xs hover:shadow-sm transition-all`).
   - **Barre d'accent latérale gauche** : 3.5px d'épaisseur, teintée selon l'étape et modulant sa couleur selon l'état (barre violette/azur par défaut, devenant vert émeraude vibrant lorsque le bloc est validé/terminé).
2. **En-tête de Bloc avec Hiérarchie Claire** :
   - Icône vectorielle dédiée dans une puce teintée pastel douce (`p-1.5 rounded-lg bg-...-100/70 text-...-700`).
   - Titre en gras lisible (`text-slate-900 font-bold text-xs sm:text-sm`).
   - Infobulle d'aide discrète (`help-circle` avec tooltip enrichi).
   - **Badge de statut dynamique** :
     - *Complété* : Pastille vert menthe douce (`bg-emerald-50 text-emerald-700 border border-emerald-200/80`) avec icône coche.
     - *En attente / To-do* : Pastille neutre élégante (`bg-slate-100 text-slate-600 border border-slate-200`).
     - *Optionnel* : Pastille ardoise douce (`text-slate-400 font-medium text-[11px]`).
3. **Zone de Contenu & Actions** :
   - Boutons d'action rapides et homogènes (boutons Google Docs, liens Drive, upload, sélecteur de templates).
   - Bouton de bascule de complétion (ex. `Mark as Done` / `Done`) parfaitement positionné en regard du titre ou en pied de carte.

---

## 3. Architecture Technique & Hiérarchie des Composants

```
#view-timeline
  │
  ├── section#section-timeline-axis (Cockpit d'ensemble sombre exécutif)
  │
  ├── #divider-timeline-sitemap (Bouton de navigation fluide vers Étape 1)
  │
  ├── section#section-sitemap [THEME PASTEL VIOLET / LAVANDE]
  │     ├── En-tête unifié (Icône, Titre, Jauge, Deadline, Accordéon)
  │     └── Corps (#section-sitemap-body)
  │           ├── Bloc 1.1 : Sitemap Google Drive (Barre d'accent lavande/émeraude)
  │           ├── Bloc 1.2 : Questionnaire SEO (Barre d'accent lavande/émeraude)
  │           └── Bloc 1.3 : Showcase Templates Evolution (Barre d'accent indigo)
  │
  ├── #divider-sitemap-content-collection (Bouton de navigation fluide vers Étape 2)
  │
  ├── section#section-content-collection [THEME PASTEL SKY / AZUR]
  │     ├── En-tête unifié (Icône, Titre, Jauge, Deadline, Save Elements, Accordéon)
  │     └── Corps (#section-content-collection-body)
  │           ├── Bloc 2.1 : Textes & Google Docs (Barre d'accent azur/émeraude)
  │           ├── Bloc 2.2 : Photos & Médias (Barre d'accent azur/émeraude)
  │           ├── Bloc 2.3 : Charte Graphique & Logo (Barre d'accent azur/émeraude)
  │           └── Bloc 2.4 : Typographies & Palette de Couleurs (Barre d'accent azur)
  │
  ├── #divider-content-collection-revision (Bouton de navigation fluide vers Étape 3)
  │
  ├── section#section-revision-phase [THEME PASTEL AMBRE / PÊCHE]
  │     ├── En-tête unifié (Icône, Titre, Jauge, Deadline, Guide, Accordéon)
  │     └── Corps (#section-revision-phase-body)
  │           ├── Bloc 3.1 : Liens Staging (Barre d'accent ambre/émeraude)
  │           ├── Bloc 3.2 : 1ère Vague de Révisions (Barre d'accent ambre)
  │           └── Bloc 3.3 : 2ème Vague de Révisions (Barre d'accent ambre)
  │
  ├── #divider-revision-go-live (Bouton de navigation fluide vers Étape 4)
  │
  └── section#section-go-live [THEME PASTEL ÉMERAUDE / MENTHE]
        ├── En-tête unifié (Icône, Titre, Jauge, Deadline, Accordéon)
        └── Corps (#section-go-live-body)
              ├── Bloc 4.1 : Checklist Pré-lancement DNS & Domaines (Barre d'accent émeraude)
              ├── Bloc 4.2 : Moteur de Réservation & Booking Engine (Barre d'accent émeraude)
              └── Bloc 4.3 : Validation Finale & Go-Live (Barre d'accent émeraude)
```

---

## 4. Plan de Modifications par Fichier

1. **`index.html` (Balisage HTML statique des 4 sections)** :
   - Mise à jour des classes d'en-tête de `#section-sitemap`, `#section-content-collection`, `#section-revision-phase`, `#section-go-live` pour intégrer leurs fonds dégradés pastel doux respectifs, leurs bordures délicates (`border-violet-100`, `border-sky-100`, `border-amber-100`, `border-emerald-100`) et leurs badges d'étape.
   - Amélioration des conteneurs statiques des blocs enfants (`#sitemap-card`, `#seo-questionnaire-card`, `#templates-card`, `#texts-card`, `#images-card`, `#branding-card`, etc.) avec classes de base `border-l-4` et styles d'en-tête épurés.
   - Ajustement harmonieux des séparateurs inter-étapes (`#divider-timeline-sitemap`, `#divider-sitemap-content-collection`, `#divider-content-collection-revision`, `#divider-revision-go-live`) avec pastilles pastel subtiles au survol.

2. **`index.html` (Scripts JavaScript dynamiques de rendu)** :
   - Fonction `renderSitemapSection()` : Mise à jour des classes dynamiques pour refléter la barre d'accent violette/émeraude et les statuts clairs.
   - Fonction `renderTemplatesSection()` : Harmonisation des cartes de templates avec bordures nettes et badges de sélection.
   - Fonction `renderContentCollectionSection()` & sous-fonctions (`renderTextsCard`, `renderImagesCard`, `renderBrandingCard`) : Application des bordures d'accent Sky/Azur et badges de statut.
   - Fonction `renderRevisionPhaseSection()` : Application des bordures d'accent Ambre/Pêche et cartes Staging/Vagues structurées.
   - Fonction `renderGoLiveSection()` : Application des bordures d'accent Émeraude/Menthe et checklist de validation claire.
   - Fonctions de mise à jour des jauges de complétion par section pour une synchronisation chromatique harmonieuse.

3. **Vérification & Validation** :
   - Exécution de `compile_applet` pour garantir l'absence d'erreurs de build ou de script.
   - Contrôle du bon fonctionnement des micro-interactions : accordéon physique, bascule de statut to-do/done, sélection de templates, et sauvegarde des éléments graphiques.
