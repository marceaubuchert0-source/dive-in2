# [Nom du projet]
Le carnet de plongée numérique qui rassemble vos spots, les conditions de chaque immersion, les poissons observés et votre équipement.

## Utilisateur cible
Des plongeurs loisir, du débutant au confirmé, qui plongent en club ou en voyage. Ils veulent garder une trace fiable de leurs plongées pour suivre leur progression et retrouver les infos d'un spot avant d'y retourner. 
## Fonctionnalités

### Indispensable (Must Have)
- Fonctionnalité 1 : Enregistrer une plongée (date, spot, profondeur max, durée, notes)
- Fonctionnalité 2 : Consulter son carnet, avec la liste des plongées et une fiche détaillée modifiable pour chacune
ription
- Fonctionnalité 3 : Gérer ses spots de plongée et voir toutes les plongées faites sur chaque spot


### Souhaitable (Should Have)
- Fonctionnalité 4 : Noter les conditions de chaque plongée (température de l'eau, visibilité, courant, météo)
- Fonctionnalité 5 : Recenser les poissons observés à chaque plongée


### Possible (Could Have)
- Fonctionnalité 6 : Suivre son équipement (combinaison, détendeur, lestage) utilisé pour chaque plongée

## Modèle de données
- **Plongée** : date, spot, profondeur max, durée, conditions, poissons observés (liste), équipement utilisé (liste), notes
- **Spot** : nom, pays, région, type (récif, épave, tombant…), coordonnées GPS
- **Conditions** : température de l'eau, visibilité, courant, météo
- **Poisson** : nom commun, nom scientifique, famille, photo
- **Équipement** : nom, catégorie, marque, caractéristiques


## Stack technique
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Déployé sur Vercel

## Design
[Le lien Figma viendra ici]

## Démo en ligne
[L'URL Vercel viendra ici]