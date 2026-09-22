---
title: "Résistances des matériaux"
summary: "Chaque matériau d’armure résiste à un type de dégâts. Choisir sa tenue, c’est choisir ce qu’on se prépare à affronter."
category: combat
pillar: equipment-enchanting
mod: enchantment-overhaul
status: stable
since: "0.9.0"
order: 4
vanilla: "Les matériaux ne diffèrent que par leur durabilité, leurs points d’armure et leur robustesse. Diamant et Netherite sont strictement supérieurs : dès qu’on les obtient, on ne porte plus rien d’autre."
problem: "Une progression parfaitement linéaire réduit cinq des sept matériaux à des étapes provisoires. L’or, les mailles et le cuivre n’ont jamais l’occasion d’être le bon choix."
solution: "Chaque matériau réduit naturellement un type de dégâts de 5 % par pièce, soit 20 % pour une tenue complète. Netherite contre le feu, diamant contre les explosions, or contre la magie, fer et mailles contre les projectiles, cuivre contre le poison et la magie, cuir contre les chutes."
tags: [combat, armor, materials, resistance]
related: [smithing-upgrades]
wiki: [/wiki/death]
details:
  - label: "Par pièce"
    value: "5 % de réduction contre le type de dégâts associé au matériau"
  - label: "Tenue complète assortie"
    value: "20 % de réduction"
  - label: "Cumul"
    value: "Résistance naturelle, Blindage et Baroud d’Honneur : trois multiplicateurs successifs avant l’absorption par l’armure"
---

## Ce qui change

Les matériaux d’armure ont désormais un intérêt au-delà de leur valeur d’armure.

| Matériau | Résistance |
| :-- | :-- |
| Netherite | Feu |
| Diamant | Explosions |
| Or | Magie, magie indirecte, Wither, souffle de dragon |
| Fer, mailles | Projectiles |
| Cuivre | Poison et magie |
| Cuir | Dégâts de chute |

Chaque pièce portée apporte 5 %. Une tenue complète du même matériau apporte 20 %.

## Le cumul des réductions

Trois réductions s’appliquent successivement avant le calcul de l’absorption par l’armure : la résistance du matériau, Blindage (Warding) et Baroud d’Honneur (Last Stand). Elles se multiplient au lieu de s’additionner, donc ne donnent jamais d’immunité.

Les créatures en armure en bénéficient aussi. Un squelette en or résiste vraiment mieux aux potions.

## Pourquoi cela compte

La Netherite reste le meilleur choix polyvalent, mais plus le meilleur dans toutes les situations. Dans un bastion, l’or apporte une vraie résistance à la magie. Dans une ferme à creepers, le diamant protège des explosions. Le cuir répond aux chutes, et il est disponible dès le premier jour.

::note
La résistance n’apparaît pas dans l’infobulle. Elle appartient au matériau lui-même : retenez le tableau, pas un chiffre sur l’objet.
::
