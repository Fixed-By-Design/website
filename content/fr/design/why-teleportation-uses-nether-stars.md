---
title: "Pourquoi la téléportation utilise des étoiles du Nether"
summary: "Faire de la téléportation un voyage de groupe préparé entre des lieux construits, avec un coût récurrent réel et un rôle distinct pour chaque matériau."
decidedOn: "2026-09-15"
systems: ["Transport", "Exploration et navigation"]
features: [wither-compass]
---

## Problème

Les joueurs ont besoin de trajets lointains occasionnels sans posséder d’élytres. La téléportation peut relier des temples, des lieux communs ou des étapes de chasse au trésor. Mais si elle est peu coûteuse et accessible partout, elle retire l’intérêt des itinéraires et des autres transports.

## Constats

La discussion du serveur a soulevé deux objections utiles. Changer de matériau ne protège pas un réseau privé : n’importe qui peut construire une plateforme correspondante. Dépenser une étoile du Nether par voyage donne aussi un coût assez élevé pour distinguer la téléportation du transport quotidien.

La conception retient ce coût récurrent et donne aux matériaux des rôles pratiques. Il s’agit de choix pour le test actuel, pas de conclusions issues de mesures d’utilisation sur le serveur.

## Contraintes

- Une plateforme est une fondation plate de 7 × 7, d’une couche et d’un seul matériau.
- La magnétite centrale reste accessible même sous un aménagement décoratif.
- La destination se définit en la visitant et en y liant une boussole.
- Les deux extrémités utilisent exactement le même bloc de fondation.
- La participation des joueurs doit être explicite et visible.
- Un échec conserve la charge.
- Objets, interactions, sons et particules familiers doivent intégrer le système à Minecraft.

## Pistes étudiées

### Des matériaux comme fréquences privées

L’accord des matériaux est une règle de construction utile, mais ne garantit aucune propriété. Un joueur avec une boussole liée peut reproduire la fondation. Le système ne promet donc ni confidentialité ni contrôle d’accès.

### Une téléportation générale et peu coûteuse

Elle faciliterait les déplacements courants mais concurrencerait directement couloirs aériens, montures et trains. Le choix retenu exige des plateformes construites et une étoile du Nether par départ réussi.

### Un prix par passager ou une limite de groupe

Faire payer chaque voyageur ou limiter fortement leur nombre découragerait les trajets partagés. Une seule charge paie donc le groupe complet, avec inscription explicite et position d’arrivée libre pour chacun.

## Décision

Charger une boussole liée avec une étoile du Nether et un niveau d’expérience à l’enclume. Un voyage réussi rend la boussole ordinaire, toujours nommée et liée. Une annulation ne consomme aucune charge.

Toutes les plateformes transportent les joueurs volontaires. Le fer assure les trajets régionaux ; l’or accélère la préparation et ajoute animaux et monstres ; l’émeraude ajoute les villageois ; le diamant supprime la limite de distance dans une dimension ; la Netherite relie les dimensions. Diamant, Netherite et or rose prennent aussi animaux et monstres. Avec Additional Additions, l’or rose permet en plus de rester sur une monture vivante. Villageois et marchands ambulants restent réservés à l’émeraude.

La boussole garde son apparence ordinaire pendant tout le cycle. Son nom et une courte infobulle indiquent la charge. L’embarquement, la préparation, le départ et l’annulation utilisent les sons et particules existants.

Le groupe conserve ses positions horizontales exactes par rapport à la magnétite, prises au départ, ainsi que son orientation. La hauteur s’adapte au sol d’arrivée en gardant l’éventuelle hauteur au-dessus du sol de départ. Chaque arrivée est vérifiée avant tout déplacement. Un obstacle annule le voyage au lieu de réarranger les voyageurs.

## Conséquences

La téléportation sert aux expéditions préparées, aux départs communs et aux lieux aménagés. Elle exige une plateforme au départ : ce n’est pas un retour d’urgence depuis n’importe où.

Les étoiles du Nether gagnent un usage récurrent. Leur rareté dépend toujours du rythme d’acquisition et des règles de farm du serveur. Les consommer ne garantit pas à lui seul un résultat économique particulier.

Les constructeurs doivent laisser assez d’espace aux deux extrémités, y compris pour les villageois et les cavaliers. Les sols décoratifs peuvent différer en matériau et en hauteur. L’arrivée suit leur surface dans la limite d’embarquement, sans décaler quiconque vers une autre case.

Les premiers essais doivent vérifier si le coût encourage les voyages partagés, si tous les matériaux sont utiles et si contours et sons expliquent clairement l’embarquement sur les plateformes couvertes. Portées et temps de préparation restent des valeurs à évaluer en jeu.

Les règles actuelles complètes figurent dans le [guide de téléportation](/wiki/teleportation).
