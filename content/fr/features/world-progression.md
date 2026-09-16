---
title: "Progression du monde"
summary: "Les minerais sont rares près du point d’apparition et abondants au loin. La distance devient une ressource à exploiter."
category: world-generation
pillar: survival-multiplayer
mod: fairlands
status: stable
since: "0.2.1-beta"
order: 8
vanilla: "La densité de minerai est la même partout. Creuser sous le point d’apparition ou dix mille blocs plus loin donne le même rendement : aucune raison matérielle de partir."
problem: "En multijoueur, cela concentre toute l’activité. Tout le monde mine près du point d’apparition, le terrain commun devient un gruyère et le reste du monde sert de décor. L’exploration perd face à la facilité."
solution: "Dans un rayon de 2 000 blocs, seuls 45 % des filons apparaissent. Entre 2 000 et 6 000 blocs, la densité revient progressivement à la normale. Au-delà, chaque filon a 10 % de chances d’en générer un second à proximité."
tags: [worldgen, ore, progression, multiplayer, exploration]
related: [death-and-bonus-hearts]
wiki: [/wiki/multiplayer]
details:
  - label: "Rayon intérieur"
    value: "2 000 blocs, 45 % du nombre de filons habituel"
  - label: "Rayon normal"
    value: "6 000 blocs, où la densité atteint 100 %"
  - label: "Bonus lointain"
    value: "10 % de chances d’un second filon au-delà de 6 000 blocs"
  - label: "Périmètre"
    value: "Surface uniquement, huit familles de minerais du jeu de base ; Nether et End inchangés"
---

## Ce qui change

La densité du minerai dépend de la distance horizontale au point d’apparition du monde.

| Distance | Densité des filons |
| :-- | :-- |
| De 0 à 2 000 blocs | 45 % |
| De 2 000 à 6 000 blocs | Augmentation linéaire de 45 % à 100 % |
| Au-delà de 6 000 blocs | 100 %, plus 10 % de chances d’un filon supplémentaire |

La progression est linéaire, sans mur à franchir. Chaque centaine de blocs parcourue apporte un petit gain réel.

## L’effet sur un serveur

Les abords du point d’apparition restent plus intacts parce qu’y miner rapporte moins. Routes, rails et couloirs de vol valent la peine d’être construits : l’intérêt du voyage se mesure maintenant en diamants, pas seulement en paysages.

Le monde partagé prend aussi une forme : une zone proche où construire, une zone intermédiaire où miner et une zone lointaine qui mérite une expédition.

::note
Seules les huit familles de minerais du jeu de base sont concernées : charbon, cuivre, fer, or, redstone, lapis, émeraude et diamant. Les minerais du Nether, de l’End et des autres mods restent inchangés.
::

## Vérifier les chiffres

Les opérateurs peuvent utiliser `/fairlands_debug world_progression` pour afficher la distance, le pourcentage de filons et le bonus lointain à leur position, à des coordonnées choisies ou sur une série d’échantillons. Ajouter `count` inspecte réellement tous les blocs dans un rayon de chunks et affiche les totaux par minerai. La courbe peut ainsi être mesurée.

## Règles de jeu

| Règle | Par défaut |
| :-- | :-- |
| `world_progression` | true |
| `ore_progression_inner_radius` | 2000 |
| `ore_progression_inner_vein_percent` | 45 |
| `ore_progression_normal_radius` | 6000 |
| `ore_progression_far_bonus_percent` | 10 |
