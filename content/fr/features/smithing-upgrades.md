---
title: "Améliorations de forge"
summary: "Quatre modèles déplacent les statistiques brutes vers la table de forge, où le matériau utilisé détermine directement le niveau."
category: equipment
pillar: equipment-enchanting
mod: enchantment-overhaul
status: stable
since: "0.9.0"
featured: true
order: 3
vanilla: "Tranchant, Protection, Solidité et Efficacité sont des enchantements. Ce sont aussi les indispensables : on commence par les obtenir, puis on remplit ce qu’il reste."
problem: "Douze enchantements ne sont que des statistiques déguisées en magie. Ils prennent la place des effets qui changent vraiment le comportement d’un objet et réduisent la table à un distributeur de chiffres."
solution: "Affûtage, Blindage, Trempe et Meulage deviennent des modèles de forge. Ils s’appliquent à la table de forge, leur niveau dépend du matériau et ils ne coûtent aucune expérience. Les statistiques vont à la forge, la magie reste à la table d’enchantement."
tags: [smithing, templates, honing, warding, tempering, grinding]
related: [the-catalogue, enchantment-slots, material-resistances]
wiki: [/wiki/smithing-upgrades]
decisions: [/design/why-enchanting-was-rebuilt]
details:
  - label: "Niveau selon le matériau"
    value: "Cuivre I, fer II, or III, diamant IV, Netherite V"
  - label: "Coût en expérience"
    value: "Aucun. Seulement le modèle, l’objet et le matériau"
  - label: "Affûtage"
    value: "+1,0 à +3,0 dégâts d’attaque ; même bonus pour les flèches des arcs et arbalètes"
  - label: "Blindage"
    value: "3,2 % de réduction par niveau et par pièce portée, jusqu’à vingt niveaux cumulés"
  - label: "Meulage"
    value: "Carré du niveau plus un : +2 / +5 / +10 / +17 / +26"
---

## Ce qui change

Douze enchantements du jeu de base disparaissent : Protection, Protection contre le feu, Protection contre les explosions, Protection contre les projectiles, Tranchant, Châtiment, Fléau des arthropodes, Puissance, Densité, Empalement, Solidité et Efficacité. Ils ne sont plus proposés dans le Catalogue, le butin ni la liste des livres en créatif.

Quatre modèles de forge reprennent leurs fonctions.

## Les quatre améliorations

**Affûtage (Honing)** s’applique aux armes, arcs et arbalètes. Il remplace Tranchant et Puissance : les dégâts de mêlée augmentent de +1,0 à +3,0, et les flèches reçoivent le même bonus. Le chiffre est intégré aux dégâts de base affichés dans l’infobulle.

**Blindage (Warding)** s’applique aux armures. Elle remplace toute la famille Protection par une règle unique : 3,2 % de réduction par niveau et par pièce portée, jusqu’à vingt niveaux cumulés. Quatre pièces au niveau V donnent 64 % contre tous les dégâts, sans calcul distinct par type.

**Trempe (Tempering)** s’applique à tout objet ayant une durabilité. Elle remplace Solidité. Les niveaux I et II correspondent à Solidité I, III et IV à Solidité II, et V à Solidité III.

**Meulage (Grinding)** s’applique aux outils de minage. Il remplace Efficacité et ajoute le carré du niveau plus un : +2, +5, +10, +17, +26.

## Le choix du niveau

Pas de curseur : le matériau utilisé décide.

| Matériau | Niveau |
| :-- | :-- |
| Cuivre | I |
| Fer | II |
| Or | III |
| Diamant | IV |
| Netherite | V |

La table ne produit rien si le résultat n’est pas strictement supérieur au niveau actuel. Impossible de dégrader un objet par accident.

::tip
Les améliorations de forge ne coûtent aucune expérience. Le modèle, l’objet et le matériau constituent le prix complet. La progression passe par la recherche des modèles plutôt que par l’accumulation de niveaux.
::

## Dupliquer les modèles

Sept lingots de cuivre, un modèle et un matériau dans la disposition habituelle donnent deux modèles. Le matériau varie : silex pour Affûtage, lingot de fer pour Blindage, obsidienne pour Trempe, roche pour Meulage.

## Où les trouver

| Modèle | Sources |
| :-- | :-- |
| Affûtage | Forgeron d’armes de village 20 %, avant-poste de pillards 25 %, bibliothèque de fort 30 %, donjon 20 % |
| Blindage | Armurier de village 20 %, trésor de bastion 30 %, trésor enfoui 25 %, temple de la jungle 25 % |
| Trempe | Forgeron d’outils de village 11 %, pyramide du désert 25 %, trésor d’épave 20 %, mine abandonnée 12 % |
| Meulage | Mine abandonnée 12 %, portail en ruine 25 %, récompense rare de chambre des épreuves 17,6 % |
