---
title: "Mort et cœurs bonus"
summary: "La mort vous laisse vos outils et la moitié de votre expérience. Elle reprend les cœurs bonus que vous avez patiemment gagnés."
category: death
pillar: survival-multiplayer
mod: fairlands
status: stable
since: "0.2.1-beta"
featured: true
order: 7
vanilla: "La mort fait tout tomber. Il faut récupérer son inventaire avant le délai de disparition, sous peine de perdre des heures d’équipement. Les serveurs activent alors keepInventory, et la mort ne coûte plus rien."
problem: "Aucun des deux réglages n’est satisfaisant. Tout perdre punit le temps passé à enchanter plutôt que l’erreur commise. Tout conserver retire l’enjeu. Aucun ne rend la mort intéressante."
solution: "Votre armure portée, vos outils et vos armes reviennent avec vous à leur place d’origine, ainsi que la moitié de votre expérience. Vous perdez tous les cœurs bonus obtenus avec les breuvages des marées, une ressource renouvelable mais lente à acquérir."
tags: [death, keepinventory, bonus-hearts, tidal-draught, multiplayer]
related: [world-progression]
wiki: [/wiki/death]
decisions: [/design/why-death-keeps-tools-but-removes-bonus-hearts]
details:
  - label: "Conservé à la mort"
    value: "Armure portée, épées, haches, pioches, pelles, houes, lances, arcs, arbalètes, tridents, masses, boucliers, cisailles, briquets, cannes à pêche, pinceaux, seaux, élytres, cartes et boussoles de récupération"
  - label: "Expérience conservée"
    value: "50 %, configurable de 0 à 100"
  - label: "Limite de cœurs bonus"
    value: "5, soit +10 points de vie maximale"
  - label: "Source des cœurs bonus"
    value: "Breuvage des marées : potion épaisse + cœur de la mer"
---

## Ce qui change

La perte d’inventaire devient partielle. Les objets protégés restent dans l’inventaire et retrouvent exactement leurs emplacements à la réapparition. Le reste tombe normalement.

Sont protégés : les quatre pièces d’armure portées et, partout dans l’inventaire, les outils et armes. Cela comprend épées, haches, pioches, pelles, houes, lances, tout objet enchantable comme un arc, une arbalète, un trident ou une masse, boucliers, cisailles, briquets, cannes à pêche, pinceaux, tous les seaux, tout objet avec un composant de vol plané, carottes et champignons sur bâton. Cartes vierges, cartes remplies et boussoles de récupération sont conservées via un tag extensible par datapack. Avec Exploration Reloaded, le livre de cartes l’est aussi.

Vous gardez également 50 % de votre expérience.

## Ce que vous perdez vraiment

Les cœurs bonus.

Un breuvage des marées, préparé avec une potion épaisse et un cœur de la mer, ajoute durablement un cœur à votre vie maximale et vous soigne entièrement. Vous pouvez en cumuler cinq, pour vingt-deux cœurs au total.

Chaque mort remet ce bonus à zéro.

Les cœurs de la mer sont renouvelables grâce à la pêche. Les cœurs bonus ne sont donc pas une récompense unique perdue pour toujours, mais un investissement à entretenir. Mourir avec cinq cœurs bonus coûte cinq cœurs de la mer de pêche : un coût réel et précis, sans perte irrécupérable.

::note
Les cœurs bonus sont bleu marine, à la fin de la barre de vie, avec une lente animation de vague. Ils persistent après une reconnexion et reviennent pleins.
::

## Boire à la limite

Il ne se passe rien. La potion n’est pas consommée, aucun message ne s’affiche et les cœurs bonus tremblent brièvement sur le côté. Ce mouvement est le seul refus du système.

## Versions jetables et persistantes

Le breuvage existe en versions jetable et persistante, ainsi qu’en flèches des marées. L’effet donne un cœur au joueur touché : vous pouvez donc offrir des cœurs à vos coéquipiers, ou les leur tirer dessus.

## Configuration du serveur

| Réglage | Par défaut | Effet |
| :-- | :-- | :-- |
| `partial_keep_inventory` | true | Interrupteur principal, actif uniquement si keepInventory est désactivé |
| `death_xp_keep_percent` | 50 | Pourcentage d’expérience rendu |
| `bonusHeartsMax` | 5 | Nombre maximal de cœurs bonus |
| `keepEquippedArmor` | true | Conserve les quatre pièces portées |
| `keepToolsAndWeapons` | true | Conserve outils et armes partout dans l’inventaire |
| `deathPenaltyEnabled` | false | Malus facultatif à la réapparition ; désactivé car la perte des cœurs est la pénalité prévue |
