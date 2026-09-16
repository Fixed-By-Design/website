---
title: "Le modpack"
description: "Le contenu du modpack Fixed by Design, en distinguant les créations du projet des mods qu’il rassemble."
---

Le **modpack Fixed by Design** est la distribution du projet. Il réunit nos quatre mods avec une sélection de mods tiers, packs de ressources, shaders et réglages.

Trois variantes sont prévues pour chaque version : **server**, **client** et **full**. La variante full sera proposée par défaut sur Modrinth.

::warning
Le pack n’est pas encore publié. Cette page décrit son contenu ; le téléchargement apparaîtra à sa sortie.
::

| | |
| :-- | :-- |
| Minecraft | 26.1.2 |
| Fabric Loader | 0.19.2 |
| Mods | 89 |
| Packs de ressources | 8 |
| Packs de shaders | 2 |

## Créés par Fixed by Design

Ces quatre mods forment le projet. Ce site documente leurs systèmes.

| Mod | Version | Contenu |
| :-- | :-- | :-- |
| [Enchantment Overhaul](/features?mod=enchantment-overhaul) | 0.9.0 | Catalogue, améliorations de forge, emplacements d’enchantement, résistances des matériaux, refonte de l’enclume et des réparations |
| [Exploration Reloaded](/features?mod=exploration-reloaded) | 0.3.0-beta | Téléportation par boussole du Wither, stations de vol couvertes, livre de cartes, pêche, montures et butin d’exploration |
| [Fairlands](/features?mod=fairlands) | 0.2.1-beta | Conservation partielle de l’inventaire, cœurs bonus, protection du point d’apparition, PvP et progression des minerais |
| [Minecarts Overhaul](/features?mod=minecarts-overhaul) | 0.5.0-beta | Rails en cuivre, locomotives à fourneau, trains et wagonnet distributeur |

Un cinquième projet, **Bare Bones x Enchantment Overhaul**, fournit des textures Bare Bones pour tous les ajouts d’Enchantment Overhaul. Graphismes par LolloNapo.

## Mods tiers

::warning
Les éléments ci-dessous viennent d’autres auteurs. Fixed by Design les assemble et les configure, sans les avoir créés. Attribution, licences et assistance restent du ressort de leurs auteurs.
::

**Performances et rendu.** Sodium, Sodium Extra, Reese’s Sodium Options, Lithium, ScalableLux, FerriteCore, ModernFix, Krypton, C2ME, VMP, ImmediatelyFast, More Culling, Entity Culling, Dynamic FPS, voxy et Voxy Server Side.

**Visuel.** Iris Shaders, Continuity, Entity Model Features, Entity Texture Features, Fancy Entity Renderer, Not Enough Animations, Player Animation Library, LambDynamicLights, Particle Rain, Visuality, 3D Skin Layers, Capes, skin overrides, Cubes Without Borders, Screencopy.

**Audio.** Simple Voice Chat, Sound Physics Remastered, AmbientSounds, Presence Footsteps, Sounds, Raise Sound Limit Simplified.

**Interface et information.** Jade, BetterF3, AppleSkin, Enchantment Descriptions, Effect Insights, Shulker Box Tooltip, Pick Up Notifier, Mod Menu, Controlling, Searchables, More Chat History, Chat Heads, Chat Animation, Centered Crosshair, Gamma Utils, Zoomify, SpeedFOVLimiter, FancyMenu, Melody, Konkrete, DeathLogPlus, Fast IP Ping.

**Inventaire et fabrication.** Better Recipe Book (Extended), Crafting Tweaks, Mouse Tweaks, InvMove, Lightweight Inventory Sorting, Visual Workbench, Armor Stand Arms.

**Gameplay.** Additional Additions, Horseman, Cut Through, Debugify, NetherPortalFix, Old Combat Mod, Emotecraft.

La page [Mods inclus](/wiki/bundled-mods) détaille ceux qui modifient le jeu, leurs effets concrets et leurs auteurs.

**Bibliothèques.** Fabric API, Fabric Language Kotlin, Cloth Config API, Balm, CreativeCore, Forge Config API Port, Puzzles Lib, Prickle, M.R.U, Text Placeholder API, YetAnotherConfigLib, Language Reload.

## Le travail sur lequel le projet s’appuie

Deux projets ne sont pas inclus directement, mais ont contribué à la forme du pack.

**[Aileron](https://github.com/LodestarMC/Aileron)**, par ryanhcode et Violunae, et **[Eleron](https://codeberg.org/sindercube/eleron)**, par sindercube, sont des refontes des élytres sous licence LGPL-3.0-only. Le vol par feux de camp d’Exploration Reloaded reprend leur conception et une partie de leur code. Exploration Reloaded utilise cette licence précisément pour pouvoir l’inclure. Les deux mods méritent d’être essayés seuls.

**[Fixed Minecraft](https://github.com/GreenJAB/fixed-minecraft)**, par green_jab, est un projet sous licence MIT dont plusieurs systèmes d’exploration dérivent, avec autorisation.

## Packs de ressources et shaders

**Packs de ressources.** Bare Bones x Enchantment Overhaul, Bare Bones X PvP Pack, Fresh Animations, New Glowing Ores [Border], OreUI Recreation, Translations for Sodium, Vocal Villagers, ainsi qu’un pack Low Fire qui réduit le feu affiché à la première personne.

**Shaders.** Complementary Reimagined et Complementary Unbound. Unbound est présélectionné mais les shaders sont **désactivés par défaut** pour ne pas imposer leur charge graphique dès l’installation.

## Les réglages du pack

Le pack ne fait pas qu’assembler des mods. Il règle aussi leur comportement.

**Chevaux :** franchissement et rebords plus fluides, attache, corne d’appel, minage à pleine vitesse en selle et interface montée, via Horseman.

**Information :** Jade s’active à la demande et montre outils, croissance des cultures, reproduction, statistiques des chevaux, aperçus des conteneurs et puissance d’enchantement. Affichages de texte, entités d’interaction et barrières restent masqués.

**Audio :** occlusion et réverbération complètes, voix de proximité à 48 blocs et limite de sons simultanés relevée pour éviter les coupures dans les bases denses.

**Commandes :** déplacement possible avec toute interface ouverte, y compris le Catalogue et le livre de cartes.

Le pack est configuré en français, avec l’anglais en langue de repli.
