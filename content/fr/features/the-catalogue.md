---
title: "Le Catalogue"
summary: "La table d’enchantement devient un catalogue de sorts débloqués, payés en réactifs et en expérience plutôt qu’en chance."
category: enchanting
pillar: equipment-enchanting
mod: enchantment-overhaul
status: stable
since: "0.9.0"
featured: true
order: 1
vanilla: "Un clic droit sur la table propose trois enchantements aléatoires, cachés derrière l’alphabet galactique standard. Vous dépensez du lapis et des niveaux, relancez jusqu’à obtenir un résultat acceptable, et les bibliothèques ne font que gonfler les chiffres."
problem: "L’aléatoire fait de l’enchantement une corvée plutôt qu’un choix. La meilleure stratégie consiste à relancer : le système récompense la patience, pas la préparation. Les bibliothèques deviennent un décor posé une fois pour toutes."
solution: "La table ouvre le Catalogue, qui liste les enchantements stockés dans les bibliothèques sculptées voisines. Vous choisissez le sort et son niveau, payez son réactif et son coût en expérience, et obtenez exactement ce choix. Votre bibliothèque se construit avec une intention."
tags: [enchanting, catalogue, bookshelves, reagents]
related: [enchantment-slots, smithing-upgrades]
wiki: [/wiki/enchanting]
decisions: [/design/why-enchanting-was-rebuilt]
details:
  - label: "Source des enchantements"
    value: "Livres des bibliothèques sculptées aux quinze positions habituelles autour de la table"
  - label: "Réduction des réactifs"
    value: "3,33 % par bibliothèque classique, jusqu’à quinze pour 50 %"
  - label: "Quantité de réactif"
    value: "Niveau × 2, soit 2 au niveau I et 10 au niveau V"
  - label: "Coût en expérience"
    value: "2 / 4 / 7 / 10 niveaux de I à IV ; Raccommodage coûte toujours 8"
---

## Ce qui change

La table ne génère plus d’offres. Elle ouvre le Catalogue : un emplacement pour l’objet, un pour le réactif, un pour le résultat et une liste déroulante de tous les enchantements que la pièce peut vous apprendre.

Un enchantement n’apparaît que si un livre qui le contient se trouve dans une bibliothèque sculptée autour de la table. Les quinze positions du jeu de base et l’espace libre nécessaire devant chaque bibliothèque restent les mêmes. Leur rôle change : ce ne sont plus des points de puissance, mais votre grimoire.

## Le fonctionnement

**Remplissez les bibliothèques.** Placez des livres enchantés dans les bibliothèques sculptées, aux emplacements habituels. Tous leurs enchantements deviennent sélectionnables.

**Choisissez un enchantement et un niveau.** Chaque ligne propose un chiffre romain cliquable par niveau. Le vert indique ce que vous avez déjà, un chiffre clair ce que vous pouvez payer, un chiffre grisé ce qui vous manque.

**Payez le réactif.** Chaque enchantement demande son propre matériau. Aura de feu utilise de la poudre de Blaze, Canalisation un paratonnerre, Toucher de soie une toile d’araignée et Butin une patte de lapin. Ceux qui n’ont pas de réactif défini utilisent du lapis-lazuli.

**Payez les niveaux.** L’expérience est facturée par enchantement. Une amélioration ne coûte que la différence entre le niveau actuel et le niveau choisi.

::note
Les bibliothèques classiques restent utiles. Chacune réduit le coût en réactifs de 3,33 %, jusqu’à quinze bibliothèques pour 50 % de réduction. Le Catalogue affiche le total pendant que vous aménagez la pièce.
::

## Les réactifs

Quelques exemples :

| Enchantement | Réactif |
| :-- | :-- |
| Aura de feu, Flamme | Poudre de Blaze |
| Canalisation | Paratonnerre |
| Semelles givrantes | Glace compactée |
| Fortune | Émeraude |
| Butin, Enjambée | Patte de lapin |
| Toucher de soie | Toile d’araignée |
| Chance de la mer | Coquille de nautile |
| Infinité | Flèche spectrale |
| Impulsion | Cœur de la mer |
| Raccommodage et enchantements non listés | Lapis-lazuli |

## Pourquoi les noms restent cryptés

Les intitulés utilisent toujours l’alphabet galactique standard, et le vrai nom apparaît au survol. Ce détail visuel ne gêne plus le choix : vous consultez un catalogue, vous ne misez plus sur une inconnue.

## Les systèmes associés

Chaque enchantement consomme des emplacements, et chaque objet en a un nombre limité. Voir les [emplacements d’enchantement](/features/enchantment-slots). Les statistiques brutes quittent entièrement l’enchantement pour les [améliorations de forge](/features/smithing-upgrades).
