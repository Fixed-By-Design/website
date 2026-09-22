---
title: "Trains de wagonnets"
summary: "Un wagonnet à fourneau allumé attelle jusqu’à sept wagonnets derrière lui pour former un train qui suit les virages et les pentes."
category: minecarts-trains
pillar: transportation
mod: minecarts-overhaul
status: stable
since: "0.5.0-beta"
order: 10
vanilla: "Les wagonnets à fourneau roulent à demi-vitesse, perdent leur poussée, n’acceptent que charbon et charbon de bois, et écartent les autres wagonnets au lieu de les tirer. Personne ne les utilise."
problem: "Les wagonnets déplacent un seul chargement ou un joueur à la fois. Sans attelage, construire des rails pour la logistique n’a guère d’intérêt face à une boîte de Shulker dans un coffre de l’Ender."
solution: "Les wagonnets à fourneau deviennent des locomotives. Ils avancent avec une poussée constante, brûlent n’importe quel combustible, se ravitaillent depuis un wagonnet à coffre ou à entonnoir derrière eux et attellent jusqu’à sept remorques qui suivent exactement les rails."
tags: [minecarts, trains, furnace-minecart, coupling, transportation]
related: [copper-rails]
wiki: [/wiki/trains]
details:
  - label: "Longueur"
    value: "Huit wagonnets maximum : une locomotive et sept remorques"
  - label: "Espacement"
    value: "1,5 bloc"
  - label: "Pénalité de vitesse"
    value: "5 % par wagonnet : ×0,95 seule, jusqu’à ×0,60 à huit"
  - label: "Réservoir"
    value: "32 000 ticks, environ 26 minutes et 40 secondes"
  - label: "Accélération"
    value: "0,025 bloc par tick dans la direction de la locomotive, à chaque tick"
---

## La locomotive

Le wagonnet à fourneau classique est remplacé partout, y compris dans les mondes existants. Les anciens wagonnets adoptent le nouveau comportement sans migration.

Il ne roule plus à demi-vitesse et ignore le ralentissement en pente. Les autres wagonnets ne peuvent pas le pousser : un choc arrière ne le fait pas dérailler. Au lieu d’une poussée décroissante, il ajoute 0,025 bloc par tick dans sa direction tant qu’il a du carburant.

**Il brûle de tout.** Tous les combustibles enregistrés fonctionnent : charbon pour 1 600 ticks, bâton de Blaze pour 2 400, seau de lave pour 20 000 avec restitution du seau. Le réservoir contient 32 000 ticks. Un apport qui dépasserait cette limite est refusé pour éviter le gaspillage.

**Les rails de propulsion servent d’interrupteur.** Un rail alimenté allume la locomotive ; un rail non alimenté l’éteint. Le carburant est conservé dans les deux cas. Une gare peut donc se limiter à un rail non alimenté.

**Sans carburant, elle s’arrête vite.** Une locomotive éteinte multiplie sa vitesse horizontale par 0,75 à chaque tick, contre 0,98 dans le jeu de base. Elle s’arrête en quelques blocs plutôt que de continuer sur une centaine.

## L’attelage

Une locomotive allumée ou en mouvement attelle automatiquement les wagonnets sans fourneau qu’elle touche, ou qui se trouvent à une distance de sondage de 1,5 bloc derrière le dernier wagon. Le train peut compter huit wagonnets au total. Une locomotive ne peut pas devenir une remorque : pas de double traction.

Chaque remorque suit un wagonnet de sondage invisible placé un espacement derrière le précédent. À chaque tick, elle en reprend la position, l’inclinaison, l’orientation et la vitesse. Le train suit exactement les courbes et les pentes.

La longueur coûte de la vitesse : le plafond perd 5 % par wagonnet. Un train de huit roule donc à 60 % du maximum.

## Le ravitaillement automatique

Sous 100 ticks de carburant, la locomotive prélève un combustible par tick dans la première remorque si c’est un wagonnet à coffre ou à entonnoir. Les seaux de lave sont remplacés sur place par des seaux vides.

Avec un coffre rempli de charbon derrière elle, une locomotive roule jusqu’à épuisement du stock.

## Quand le train se sépare

Une remorque se détache si elle disparaît, si elle touche le sol à moins de 0,01 de vitesse horizontale, ou si son tag de train expire après 60 ticks sans actualisation par la locomotive. Tout ce qui suit se détache aussi.

En cas de déraillement, le wagonnet sorti des rails et ceux qui le suivent passent à une traction alignée sur l’orientation et la vitesse de la locomotive. Le train garde sa formation au lieu de partir dans huit directions.

Les identifiants UUID des remorques et leur ordre sont sauvegardés en NBT. L’attelage est reconstruit au premier tick après chargement. Un passage de portail détache volontairement le train et force le chargement des chunks pour ne perdre aucun wagonnet.

::note
Une corde semblable à une laisse relie les wagonnets attelés. La locomotive transmet leur liste ordonnée aux joueurs voisins toutes les 20 ticks pour maintenir un affichage correct.
::

## Le wagonnet distributeur

Ce wagonnet possède les neuf emplacements d’un distributeur et tire sur les rails d’activation alimentés, une fois par déclenchement avec huit ticks de délai. Tous les comportements du distributeur classique fonctionnent : projectiles, seaux, TNT, fusées et équipement d’armure.

S’accroupir et faire un clic droit inverse sa direction de tir. L’attelage corrige automatiquement son orientation pour conserver le même sens de tir par rapport au train.
