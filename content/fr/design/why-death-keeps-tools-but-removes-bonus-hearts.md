---
title: "Pourquoi la mort conserve les outils mais retire les cœurs bonus"
summary: "Tout perdre punit les heures d’enchantement plutôt que l’erreur commise. keepInventory ne punit rien. Les cœurs bonus donnent un coût réel, renouvelable et mesurable."
decidedOn: "2026-06-19"
systems: ["Mort", "Multijoueur"]
features: [death-and-bonus-hearts]
---

## Problème

Minecraft propose deux modèles de mort, tous deux insatisfaisants.

**Tout lâcher** transforme la mort en urgence logistique. Si vous ne récupérez pas l’équipement avant les cinq minutes de disparition, vous perdez le temps passé à l’enchanter. Le coût augmente avec la qualité du matériel : mieux vous êtes équipé, plus chaque mort est catastrophique. La réponse rationnelle est de ne plus prendre de risques.

**keepInventory** retire l’enjeu. La mort devient un raccourci de déplacement et les systèmes de survie liés au danger perdent leur portée.

Presque tous les serveurs finissent par l’activer, pas pour sa qualité de conception, mais parce que tout perdre devient intolérable quand une mort peut effacer une semaine de jeu.

## Constats

Sur les serveurs de test sans conservation, les joueurs cessaient d’explorer après avoir obtenu du bon équipement. Grottes profondes, Nether et PvP étaient délaissés. La raison donnée était toujours le risque pour le matériel, plutôt que la mort elle-même.

Avec keepInventory, les joueurs disaient ne plus sentir de danger. Lave, chutes et creepers devenaient des désagréments.

Dans les deux cas, l’erreur ayant causé la mort n’était pas ce qui était réellement sanctionné.

## Contraintes

**La mort doit avoir un coût précis.** Une pénalité impossible à nommer n’est qu’une impression.

**Ce coût doit être récupérable.** Une perte permanente peut transformer une mauvaise soirée en raison d’arrêter.

**Il ne doit pas croître avec la richesse.** Un joueur bien équipé ne devrait pas payer davantage la même erreur.

**Le temps investi dans l’équipement doit être protégé.** Ici, les livres sont des déblocages permanents et les emplacements sont limités. Enchanter demande plus d’investissement ; perdre cet objet dans une chute serait d’autant plus dur.

## Pistes étudiées

**Tout lâcher dans une tombe.** Cela garde la tension, mais transforme chaque mort en quête de récupération. Or le trajet de retour est précisément la partie fastidieuse, pas le danger.

**Ne perdre que l’expérience.** Clair, mais une ferme renouvelle l’expérience très facilement. La pénalité disparaît pour les joueurs qu’elle devrait concerner.

**Un malus temporaire à la réapparition.** Faiblesse ou Lenteur pendant quelques minutes sanctionne le temps qui suit plutôt que la mort. C’est agaçant plus que coûteux.

**Une ressource distincte, gagnée puis perdue à la mort.** Quelque chose qu’on accumule volontairement, qui a une vraie valeur, se renouvelle à un rythme connu et ne fait pas partie de l’équipement.

## Décision

La dernière piste, appliquée à la vie maximale.

**Vous gardez votre équipement.** Armure portée, outils et armes retrouvent leur emplacement à la réapparition. Cartes et boussoles de récupération aussi. Le reste tombe normalement.

**Vous gardez la moitié de votre expérience.**

**Vous perdez tous les cœurs bonus.** Le **breuvage des marées**, préparé avec une potion épaisse et un cœur de la mer, ajoute durablement un cœur, jusqu’à cinq. La mort les remet à zéro. Les cœurs de la mer se renouvellent à la pêche, avec 4 % de chances par prise de trésor.

Le malus facultatif à la réapparition existe dans la configuration, mais reste **désactivé par défaut**. La perte des cœurs doit suffire.

## Conséquences

**La mort coûte un temps identifiable.** Cinq cœurs bonus représentent cinq cœurs de la mer de pêche. Les joueurs peuvent nommer leur perte.

**La pénalité ne dépend pas du matériau porté.** Un joueur en Netherite perd les mêmes cœurs qu’un joueur en fer. La prise de risque s’est dissociée de la qualité du matériel, et l’exploration profonde a repris.

**Les cœurs bonus sont devenus un signe de progression.** Leur couleur bleu marine et leur présence sur la barre de vie les rendent distinctifs. Les joueurs en parlent, même si chacun ne voit que ses propres cœurs.

**La pêche a trouvé un rôle.** Elle est la source renouvelable des cœurs de la mer et gagne ainsi un intérêt au-delà de ses propres tables de butin.

**La confusion avec keepInventory reste facile.** Un nouveau joueur voit son épée revenir et pense que la mort est gratuite, puis découvre ses cœurs manquants. L’interface les montre, mais n’explique pas le lien au moment décisif.

**Les breuvages jetables permettent d’offrir des cœurs.** Les flèches des marées aussi, même à un adversaire. Nous l’avons gardé parce que c’est amusant et que permettre l’entraide a du sens.
