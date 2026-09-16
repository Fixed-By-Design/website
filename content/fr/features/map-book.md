---
title: "Livre de cartes"
summary: "Un atlas qui regroupe vos cartes, se dessine pendant vos voyages et se partage pour que tout un serveur complète la même carte du monde."
category: maps-navigation
pillar: exploration-navigation
mod: exploration-reloaded
status: stable
since: "0.2.0-beta"
featured: true
order: 6
vanilla: "Chaque carte est un objet. Couvrir une vraie distance demande un coffre de cartes triées à la main. Les lire impose de les tenir. Les partager suppose de les copier à la table de cartographie, puis de penser à recommencer."
problem: "La cartographie est l’un des meilleurs systèmes de Minecraft, mais peu de joueurs dépassent la première carte : son coût en inventaire augmente plus vite que son utilité. L’exploration partagée n’a aucune solution satisfaisante."
solution: "Le livre de cartes rassemble plusieurs cartes dans un atlas plein écran, déplaçable et zoomable, aligné sur les coordonnées du monde. Deux livres peuvent partager un identifiant : plusieurs joueurs lisent et modifient le même atlas, avec des repères et des positions synchronisés en direct."
tags: [maps, navigation, cartography, multiplayer, atlas]
related: [campfire-elytra-flight]
wiki: [/wiki/map-book]
details:
  - label: "Fabrication"
    value: "Une carte vierge et un livre, sans disposition imposée"
  - label: "Taille de pile"
    value: "16"
  - label: "Mise à jour en direct"
    value: "Toute carte non verrouillée dont le bord est à moins de 128 blocs est actualisée lorsque le livre est porté"
  - label: "Zoom"
    value: "De ×0,005 à ×10 ; facteur ×1,15 par cran de molette"
  - label: "Partage"
    value: "Livre de cartes + livre à la table de cartographie : deux livres avec le même identifiant"
---

## Ce qui change

Le livre de cartes contient autant de cartes que nécessaire. Il ouvre un atlas plein écran sans mettre le jeu en pause. Chaque carte occupe sa vraie position dans le monde, les plus grandes échelles étant dessinées d’abord. Vous déplacez et zoomez sur l’ensemble.

## Le remplir

**Clic droit sans objet particulier en main secondaire :** la première carte vierge de l’inventaire devient une carte centrée sur vous. Depuis la barre rapide, elle est à l’échelle 2 ; depuis l’inventaire, à l’échelle 4.

**Clic droit avec une carte vierge en main secondaire :** elle est consommée pour créer une carte à l’échelle 0, centrée sur vous.

**Clic droit avec une carte remplie en main secondaire :** elle rejoint le livre. Les doublons sont refusés.

**Clic droit sur une bannière :** active ou désactive son repère sur la carte la plus proche dans le livre.

**Avec des cisailles en main secondaire :** la carte couvrant votre position est retirée et rendue comme une carte normale. Les cisailles perdent un point de durabilité. Le livre doit contenir au moins deux cartes.

## Le lire

Faites glisser avec l’un ou l’autre bouton de la souris pour déplacer la vue. La molette règle le zoom. Les coordonnées X et Z sous le curseur apparaissent en bas.

Les icônes de structures et de bannières portent leurs noms personnalisés sur une petite étiquette. Un monde bien nommé se lit comme une vraie carte plutôt que comme une collection de repères identiques.

Dans le Nether, les cartes de la Surface s’affichent à un huitième de leur échelle pour correspondre aux coordonnées locales. Vous pouvez suivre un tunnel de portails en lisant le monde qui lui correspond.

## Partager un atlas

Associez un livre de cartes à un livre dans une table de cartographie. Vous obtenez deux exemplaires portant le même identifiant. Tous les porteurs voient les mêmes cartes, les mêmes repères et la position des autres.

- **Maj + clic gauche** place une croix rouge visible par tous les porteurs. Recommencez dessus pour l’effacer.
- **Les autres porteurs** apparaissent sous forme d’icônes orientées, nommées et colorées selon leur équipe.
- La liste des cartes, des porteurs et le repère sont envoyés à chaque porteur à chaque tick serveur.

::tip
Quand vous tenez une carte ou un livre de cartes, la barre de localisation affiche les décorations de carte à portée, dans un angle de 60 degrés autour de votre regard, ainsi que le repère partagé et les points de passage stylisés, à la place des points des joueurs.
::

## Les petits détails

Le livre entre dans les bibliothèques sculptées. Il accepte Malédiction de disparition. En main, il affiche la carte couvrant votre position. Son infobulle indique l’identifiant du livre et le nombre de cartes plutôt que l’identifiant d’une carte unique.
