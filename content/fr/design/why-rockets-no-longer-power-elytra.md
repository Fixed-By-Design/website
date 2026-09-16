---
title: "Pourquoi les fusées ne propulsent plus les élytres"
summary: "Le vol à fusées efface les itinéraires, le relief et les autres transports. Les feux de camp ramènent le coût au sol, là où l’on peut construire."
decidedOn: "2026-05-02"
systems: ["Élytres", "Exploration", "Transport"]
features: [campfire-elytra-flight, copper-rails, minecart-trains]
---

## Problème

Le vol en élytres est l’une des meilleures sensations de déplacement de Minecraft. Les fusées le réduisent à maintenir le clic droit.

Avec une ferme à poudre à canon, chaque fusée ne coûte presque rien et donne une poussée constante en ligne droite. Le relief, la distance et la maîtrise du vol perdent leur importance.

Routes, bateaux, rails, chevaux et tunnels du Nether perdent aussi leur rôle : aucun ne peut rivaliser avec un vol gratuit et illimité.

## Constats

Dans les mondes de test, aucun joueur n’a construit de transport après avoir obtenu des élytres.

La refonte des wagonnets avait pourtant multiplié la vitesse par cinq, jusqu’à 40 blocs par seconde. Cela n’avait rien changé aux déplacements : les fusées restaient plus rapides, moins chères et sans voie à construire.

Les sessions de vol se résumaient à une seule commande maintenue tout du long.

## Contraintes

**Le vol doit rester agréable.** Il ne s’agit pas de rendre les élytres inutiles. Le vol plané mérite d’être préservé.

**Il doit rester renouvelable.** Le lier à un consommable rare ne ferait que recréer les fusées avec une contrainte supplémentaire.

**Le coût doit être visible.** Le remplacement doit se construire et se voir dans le monde, comme une vraie infrastructure.

**La physique du vol plané reste intacte.** Chutes, virages et piqués fonctionnent comme dans le jeu de base.

## Pistes étudiées

**Affaiblir les fusées par les chiffres.** Réduire la poussée, ajouter un délai ou augmenter le prix ne change pas la nature du vol, seulement sa pénibilité. Piste vite écartée.

**Augmenter l’usure des élytres.** Cela pousse vers Raccommodage, précisément l’enchantement que nous cherchons à rendre facultatif.

**Ajouter de l’endurance.** Une jauge rechargeable au sol serait lisible, mais sans présence dans le monde. Le vol deviendrait un délai à attendre.

**Décollage et portance depuis le sol.** Le vol dépend de constructions. Les feux de camp émettent déjà une fumée visible qui évoque un courant ascendant. Ils sont disponibles partout et assez abordables pour jalonner un trajet.

## Décision

Cette solution n’a pas été inventée ici. [Aileron](https://github.com/LodestarMC/Aileron), par ryanhcode et Violunae, puis sa réécriture Fabric [Eleron](https://codeberg.org/sindercube/eleron), par sindercube, l’avaient déjà conçue et bien réalisée. Fixed by Design la porte plutôt que d’en refaire une version moins bonne. Exploration Reloaded est passé sous licence LGPL-3.0-only pour accueillir ce code.

Les fusées donnent **zéro poussée** en vol plané. Elles existent toujours et restent des feux d’artifice.

Le vol est alimenté par les feux de camp. Accroupissez-vous dans la fumée pour charger, relâchez pour décoller. La force dépend du **foyer** : chaque bloc ascendant voisin ajoute de la puissance, une botte de paille en ajoute quatre. Un foyer de signal de 3 × 3 lance presque quatre fois plus fort qu’un feu isolé.

Passer au-dessus d’un feu allumé en vol donne de la portance via une **colonne ascendante**. Une ligne de foyers devient un couloir aérien utilisable indéfiniment.

**Cheminée** permet de stocker des charges au feu et de les dépenser en poussées directionnelles. **Effleure-nuages**, incompatible avec lui, compense plutôt la traînée à haute altitude.

## Conséquences

**Le vol devient une infrastructure.** Les joueurs construisent des réseaux sur leurs trajets habituels. Visibles de loin, ces foyers deviennent des repères et même, sans que ce soit prévu, une façon de marquer le territoire en multijoueur.

**Rails et routes retrouvent un rôle.** Pas parce qu’ils sont plus rapides, mais parce que voler demande désormais une préparation. C’est un progrès, pas une solution complète : le fret ferroviaire reste un chantier distinct.

**Le vol est plus difficile à apprendre.** La puissance des foyers n’est pas expliquée ni chiffrée en jeu. La découvrir par hasard ou dans le wiki ne suffit pas.

**Les longs trajets non préparés se compliquent.** Aller là où l’on n’est jamais allé devient vraiment difficile. Nous pensons que cela donne du sens à l’exploration, mais c’est le changement dont les joueurs demandent le plus souvent l’annulation.

**Une règle permet de revenir en arrière.** `firework_boosts_flight` restaure la propulsion classique. Les serveurs qui la préfèrent doivent pouvoir la choisir.
