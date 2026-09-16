---
title: "Rails en cuivre"
summary: "Quatre états d’oxydation, une vitesse maximale qui peut passer de 8 à 40 blocs par seconde, et des voies qu’il faut entretenir."
category: minecarts-trains
pillar: transportation
mod: minecarts-overhaul
status: stable
since: "0.5.0-beta"
featured: true
order: 9
vanilla: "Les wagonnets plafonnent à 8 blocs par seconde. Les rails ont peu évolué depuis 2011 et offrent tous la même vitesse. Construire une longue ligne coûte énormément pour un transport lent."
problem: "À 8 blocs par seconde, le wagonnet perd face à la marche avec un effet de vitesse, et très largement face aux élytres. Les réseaux ferrés n’en valent pas la peine ; le transport en redstone reste une curiosité."
solution: "Les rails en cuivre ont quatre états d’oxydation, avec des plafonds allant de 40 à 5 blocs par seconde. Ils s’oxydent environ quatre fois plus vite qu’un bloc de cuivre. Un rayon de miel les cire définitivement."
tags: [minecarts, rails, copper, oxidation, transportation]
related: [minecart-trains]
wiki: [/wiki/trains]
details:
  - label: "Rail en cuivre"
    value: "40 blocs/s, soit cinq fois la vitesse classique"
  - label: "Rail en cuivre exposé"
    value: "20 blocs/s, soit 2,5 fois la vitesse classique"
  - label: "Rail en cuivre érodé"
    value: "10 blocs/s, soit 1,25 fois la vitesse classique"
  - label: "Rail en cuivre oxydé"
    value: "5 blocs/s, moins qu’un rail classique"
  - label: "Recette"
    value: "Six lingots de cuivre et un bâton donnent douze rails"
---

## Ce qui change

Huit nouveaux rails : quatre états d’oxydation et leurs versions cirées. Ils fonctionnent en permanence, sans redstone, et ne font que relever le plafond de vitesse.

| Rail | Vitesse maximale |
| :-- | :-- |
| Cuivre | 40 blocs/s |
| Cuivre exposé | 20 blocs/s |
| Cuivre érodé | 10 blocs/s |
| Cuivre oxydé | 5 blocs/s |
| Rail classique | 8 blocs/s |

Les rails en cuivre ne propulsent pas le wagonnet. Un rail de propulsion, une pente ou une locomotive à fourneau reste nécessaire pour atteindre le plafond. Le rail décide seulement de la vitesse autorisée.

## L’oxydation impose l’entretien

Les rails s’oxydent environ quatre fois plus vite qu’un bloc de cuivre : chaque tick aléatoire tente jusqu’à quatre fois de faire progresser l’oxydation et s’arrête dès qu’un palier est franchi. Une voie abandonnée ralentit.

Les rails totalement oxydés ne reçoivent plus de ticks aléatoires. Une ligne entièrement dégradée ne coûte donc rien au serveur à ce titre.

Un rayon de miel fige l’état du rail comme celui d’un bloc de cuivre. Une hache retire la cire ou fait reculer l’oxydation d’un cran. Les rails cirés ne vieillissent plus.

::tip
Aucune recette ne produit directement de rails exposés, érodés ou oxydés. Il faut laisser vieillir le cuivre ou gratter un rail ciré.
::

## Préserver l’élan

Passer sur un rail plus lent ne coupe pas brutalement la vitesse. Le plafond ne peut pas descendre de plus de 10 % de la vitesse horizontale actuelle en un tick. Un wagonnet à 40 blocs/s ralentit donc progressivement sur une portion érodée.

L’eau divise le plafond par deux : un rail en cuivre immergé plafonne à 20 blocs/s.

## Une physique adaptée

Les déplacements améliorés des wagonnets de la version 1.21.2 sont activés dans tous les mondes, sans option expérimentale. En complément :

- Hors des rails, les wagonnets gardent un plafond de 40 blocs/s au lieu de 8.
- Un départ sur un tremplin doux conserve tout l’élan horizontal pour franchir un espace.
- Un atterrissage hors rails utilise le frottement réel des blocs : glisse sur la glace, adhérence sur la pierre.
- Un wagonnet avec passagers annule ses dégâts de chute et ceux de ses occupants.
- Les rails de propulsion et d’activation freinent les wagonnets sans fourneau jusqu’à 8 blocs/s, ce qui permet de construire des gares.
