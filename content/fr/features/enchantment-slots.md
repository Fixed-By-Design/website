---
title: "Emplacements d’enchantement"
summary: "Chaque objet a un budget d’emplacements, chaque enchantement en consomme, et la meule laisse une marque durable sur ce qu’elle efface."
category: enchanting
pillar: equipment-enchanting
mod: enchantment-overhaul
status: stable
since: "0.9.0"
order: 2
vanilla: "Un objet peut cumuler tous les enchantements compatibles. Avec assez de passages à l’enclume, chaque joueur finit avec la même épée en diamant, au maximum partout."
problem: "Sans limite, pas de compromis, donc pas de spécialisation. L’enchantement converge vers une seule bonne réponse par type d’objet. Seul le temps passé à l’enclume distingue les joueurs."
solution: "Chaque objet dispose de trois à six emplacements selon son matériau. Un enchantement coûte autant d’emplacements que son niveau. Les malédictions sont gratuites et ajoutent un emplacement : maudire volontairement une pièce devient un vrai choix."
tags: [enchanting, slots, grindstone, anvil]
related: [the-catalogue, smithing-upgrades]
wiki: [/wiki/enchanting]
details:
  - label: "Palier 3"
    value: "Bois, pierre, cuivre, cuir, arc, canne à pêche, bouclier"
  - label: "Palier 4"
    value: "Fer, mailles, arbalète"
  - label: "Palier 5"
    value: "Diamant, Netherite, élytres, carapace de tortue, masse, trident"
  - label: "Palier 6"
    value: "Tout l’équipement en or"
  - label: "Coût en emplacements"
    value: "Égal au niveau de l’enchantement ; Raccommodage : 3 ; malédictions : 0"
---

## Ce qui change

Chaque objet enchantable a un budget d’emplacements, affiché par une rangée de points dans le Catalogue. Enchanter les consomme. Quand il n’en reste plus, il faut choisir ce qui compte pour cet objet.

## Le budget

| Palier | Emplacements | Objets |
| :-- | :-- | :-- |
| 3 | 3 | Bois, pierre, cuivre, cuir, arc, canne à pêche, bouclier |
| 4 | 4 | Fer, mailles, arbalète |
| 5 | 5 | Diamant, Netherite, élytres, carapace de tortue, masse, trident |
| 6 | 6 | Tout l’équipement en or |

L’or fait volontairement exception. C’est le matériau le plus fragile et celui que personne n’avait de raison d’enchanter. Il reçoit donc le plus grand budget : fragile, puissant et digne d’être protégé.

## Le coût des enchantements

Un enchantement coûte autant d’emplacements que son niveau. Protection IV en coûterait quatre, Aura de feu II en coûte deux. Raccommodage coûte toujours trois emplacements.

Les malédictions ne coûtent rien et ajoutent chacune un emplacement. Accepter Malédiction du lien éternel sur un plastron devient un véritable compromis.

## La meule laisse une trace

Dans le jeu de base, la meule retire les enchantements et rend un peu d’expérience sans contrepartie. Ici, elle retire tout, malédictions comprises, et réduit définitivement le nombre maximal d’emplacements d’un point à chaque utilisation.

L’enclume permet de restaurer un de ces emplacements. Associez l’objet à son matériau de réparation et payez les niveaux :

| Matériau | Niveaux |
| :-- | :-- |
| Netherite | 10 |
| Diamant | 8 |
| Or | 5 |
| Fer, mailles | 5 |
| Cuivre | 3 |
| Autres | 2 |

::warning
La pénalité est stockée sur l’objet. Elle survit aux réparations, aux changements de nom et aux échanges. Une épée passée deux fois à la meule reste moins bonne tant que vous n’avez pas payé sa restauration.
::
