---
title: "Boussole du Wither"
summary: "Deux plateformes à magnétite transforment une étoile du Nether en voyage de groupe, avec un rôle par matériau et des positions relatives préservées."
category: exploration
pillar: transportation
mod: exploration-reloaded
status: playtesting
since: "0.3.0-beta"
order: 10
vanilla: "Les boussoles liées à une magnétite indiquent un bloc choisi. Elles ne permettent pas de s’y rendre."
problem: "Un serveur peut avoir besoin de trajets occasionnels entre des lieux établis, tout en gardant un intérêt au transport quotidien et aux infrastructures construites."
solution: "Chargez une boussole liée avec une étoile du Nether sur une enclume, puis activez une plateforme correspondante. Chaque joueur choisit de rejoindre le groupe et garde sa position relative à l’arrivée. Le matériau détermine la portée, le temps de préparation et le transport des créatures ou des montures."
tags: [teleportation, lodestone, compass, multiplayer, villagers, mounts]
related: [map-book, campfire-elytra-flight]
wiki: [/wiki/teleportation]
decisions: [/design/why-teleportation-uses-nether-stars]
details:
  - label: "Plateforme"
    value: "49 blocs identiques utilisables comme base de balise, en une couche de 7 × 7, avec une magnétite au-dessus du centre"
  - label: "Recharge"
    value: "Boussole liée + étoile du Nether sur une enclume, pour un niveau d’expérience"
  - label: "Coût du voyage"
    value: "Une charge pour tout le groupe ; la boussole liée ordinaire est rendue"
  - label: "Arrivée"
    value: "Position horizontale exacte, hauteur adaptée au sol, orientation conservée et trois secondes de Cécité"
  - label: "Échec"
    value: "Une arrivée bloquée annule tout le voyage et conserve la charge"
---

## Disponibilité

Disponible dans [Exploration Reloaded 0.3.0-beta](https://modrinth.com/mod/exploration-reloaded/version/ZVOYzpGA) pour Minecraft 26.1.2. Installez le mod sur le client et le serveur.

## Des plateformes aux rôles distincts

::teleport-diagram{kind="platform"}
::

Tous les matériaux transportent des groupes. Le fer permet des trajets régionaux entre joueurs ; l’or raccourcit la préparation et ajoute les animaux et monstres ; l’émeraude inclut aussi les villageois ; le diamant supprime la limite de distance dans une dimension ; la Netherite permet de changer de dimension. Animaux et monstres peuvent aussi voyager sur diamant, Netherite et or rose. L’or rose d’Additional Additions inclut en plus les montures vivantes chevauchées.

Chaque plateforme utilise un seul matériau, identique aux deux extrémités. Les revêtements décoratifs sont permis. Utiliser un matériau coûteux ne constitue pas un contrôle d’accès.

## Un voyage choisi par le groupe

Le porteur de la boussole active la plateforme. Les autres joueurs rejoignent le voyage en utilisant la magnétite avec la main principale vide. Une limite visible, des particules sur les voyageurs et des sons familiers accompagnent la préparation et le départ.

Le groupe est déplacé sans réarrangement des positions. Chaque point d’arrivée exact est vérifié avant tout déplacement. Si un seul est bloqué ou dangereux, tout le monde reste sur place et la boussole conserve sa charge.

Le [guide de téléportation](/wiki/teleportation) détaille la construction, les matériaux, l’embarquement et les problèmes possibles. Le [choix de conception](/design/why-teleportation-uses-nether-stars) explique le coût et la place de ce système parmi les autres transports.
