---
title: "Vol en élytres et feux de camp"
summary: "Les fusées ne vous propulsent plus. Les feux de camp prennent le relais, et construire un bon foyer fait désormais partie du trajet."
category: elytra
pillar: exploration-navigation
mod: exploration-reloaded
status: stable
since: "0.2.0-beta"
featured: true
order: 5
vanilla: "Le vol en élytres finit par se résumer aux fusées. Avec une ferme à poudre à canon, il suffit de maintenir le clic droit pour aller tout droit, à vitesse constante, indéfiniment."
problem: "Les fusées effacent la préparation des itinéraires. Relief, distance et autres moyens de transport perdent leur intérêt dès que les élytres sortent. L’une des plus belles mécaniques du jeu se réduit à un bouton."
solution: "Les fusées ne donnent plus aucune poussée en vol plané. Les feux de camp alimentent le vol : accroupissez-vous dans la fumée pour décoller et stocker des charges, dépensez-les pour accélérer en vol et profitez des colonnes ascendantes construites au sol."
tags: [elytra, flight, campfire, smokestack, cloudskipper]
related: [map-book]
wiki: [/wiki/elytra-flight]
decisions: [/design/why-rockets-no-longer-power-elytra]
credits:
  - name: Aileron
    author: ryanhcode et Violunae
    url: https://github.com/LodestarMC/Aileron
    license: LGPL-3.0-only
    note: La refonte à l’origine de ce système. Le vol par feux de camp reprend ses idées et, par endroits, son code.
  - name: Eleron
    author: sindercube
    url: https://codeberg.org/sindercube/eleron
    license: LGPL-3.0-only
    note: La réécriture Fabric d’Aileron, sur laquelle cette implémentation s’appuie directement.
details:
  - label: "Puissance du foyer"
    value: "De 0 à 12 : blocs ascendants voisins, plus 4 pour un feu sur une botte de paille"
  - label: "Vitesse de lancement"
    value: "0,45 + 0,10 par point de puissance : 0,45 seul, 1,65 pour un foyer de signal 3 × 3"
  - label: "Durée de poussée"
    value: "40 ticks + 5 par point de puissance"
  - label: "Intervalle de charge"
    value: "30 ticks accroupi, configurable"
  - label: "Colonne ascendante"
    value: "Inspection jusqu’à 38 blocs vers le bas en vol ; portée de 10 + 2 par point de puissance"
---

## D’où vient ce système

Ce système n’est pas une création originale de Fixed by Design. C’est un portage d’[Aileron](https://github.com/LodestarMC/Aileron), par ryanhcode et Violunae, et de sa réécriture pour Fabric, [Eleron](https://codeberg.org/sindercube/eleron), par sindercube.

Ils ont trouvé l’essentiel : pour corriger le vol à fusées, mieux vaut déplacer son coût au sol, où l’on peut construire, que simplement affaiblir les fusées. Feux de camp comme rampes de lancement, géométrie du foyer comme réserve de puissance, courants ascendants comme infrastructure. Cette conception est la leur, et elle est très aboutie.

Fixed by Design l’intègre au reste du pack : Cheminée et Effleure-nuages utilisent le [budget d’emplacements d’enchantement](/features/enchantment-slots), et les couloirs de vol interagissent avec les [rails](/features/copper-rails) et la [progression du monde](/features/world-progression).

Exploration Reloaded est sous licence LGPL-3.0-only précisément pour pouvoir inclure ce code. Les deux mods d’origine méritent aussi d’être installés seuls.

## Ce qui change

Utiliser une fusée en vol plané la consomme sans donner de poussée. Elle émet une fumée de signal pendant cinq secondes, puis passe en recharge. L’objet reste dans le jeu ; il ne sert simplement plus de moteur.

Le vol commence et se ravitaille désormais aux feux de camp.

## Décoller

Accroupissez-vous sur un feu allumé avec des élytres équipées. Vous ne subissez pas de dégâts de feu dans la colonne de fumée. Après un intervalle de charge, le décollage est prêt : relâchez la touche pour être projeté vers le haut, ailes ouvertes, avec une poussée directionnelle temporaire.

La force dépend du foyer que vous avez construit.

## La puissance du foyer

Chacun des huit blocs voisins, en ligne droite ou en diagonale, ajoute un point s’il produit lui aussi un courant ascendant. Une botte de paille sous le feu, qui en fait un feu de signal, ajoute quatre points.

| Foyer | Puissance | Vitesse de lancement | Durée de poussée |
| :-- | :-- | :-- | :-- |
| Feu isolé | 0 | 0,45 | 40 ticks |
| Foyer de signal 3 × 3 | 12 | 1,65 | 100 ticks |

Dès qu’un foyer a de la puissance, il émet une haute colonne de signal, avec ou sans paille. Des panaches supplémentaires accompagnent sa croissance. Un bon point de décollage se voit de loin : l’infrastructure devient un repère.

## Orienter la poussée

Pendant la poussée, la vitesse converge vers la direction du regard, autour de 1,5 bloc par tick. La poussée suit votre vue plutôt que votre élan : le décollage vous engage dans une direction.

## Les colonnes ascendantes

En vol plané, le jeu inspecte jusqu’à 38 blocs sous vous. Passer au-dessus d’un bloc ascendant allumé donne de la portance, selon la portée du foyer et votre distance, jusqu’à une vitesse verticale totale de 1,0.

Une ligne de feux de camp forme un couloir aérien. C’est ce qui remplace le clic droit continu : vous construisez d’abord la route, puis vous la survolez.

## Cheminée et Effleure-nuages

Deux enchantements d’élytres, incompatibles entre eux.

**Cheminée I à III (Smokestack)** stocke une charge de feu par niveau quand vous restez accroupi dans la fumée. En vol, la touche de propulsion dépense une charge pour quinze ticks de poussée directionnelle. Il faut avoir plané au moins dix ticks ; un délai de soixante ticks sépare deux poussées. Les charges survivent aux sauvegardes, mais tombent à zéro si vous restez au sol.

**Effleure-nuages I à III (Cloudskipper)** suit une autre logique : au-dessus de Y=100, il compense une partie de la traînée au lieu d’ajouter une poussée. L’effet atteint son maximum vers Y=230. Il récompense l’altitude plutôt que l’accélération.

::tip
Une touche dédiée, X par défaut, replie immédiatement les ailes en vol. La propulsion utilise Espace par défaut et peut être réattribuée si un autre mod utilise déjà le saut.
::

## Règles de jeu

| Règle | Par défaut | Effet |
| :-- | :-- | :-- |
| `firework_boosts_flight` | false | Passer à true rétablit la propulsion par fusées |
| `campfire_updrafts` | true | Passer à false désactive la portance en vol |
| `smokestack_charge_ticks` | 30 | Ticks accroupi nécessaires par charge |
