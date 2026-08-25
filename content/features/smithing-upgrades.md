---
title: Smithing Upgrades
summary: Four templates move raw statistics out of enchanting and into the smithing table, where the ingot you use decides the level outright.
category: equipment
pillar: equipment-enchanting
mod: enchantment-overhaul
status: stable
since: "0.9.0"
featured: true
order: 3
vanilla: Sharpness, Protection, Unbreaking and Efficiency are enchantments. They are also the only enchantments that matter, so every enchanting decision starts by securing them and ends with whatever slots are left.
problem: Twelve vanilla enchantments are pure statistics wearing a magic costume. They crowd out the enchantments with actual behaviour, and they make the enchanting table a numbers dispenser rather than a place you go for something interesting.
solution: Honing, Warding, Tempering and Grinding become smithing templates. You apply them at a smithing table, the ingot decides the level, and no experience is charged. Statistics live at the anvil's neighbour, magic lives at the enchanting table.
tags: [smithing, templates, honing, warding, tempering, grinding]
related: [the-catalogue, enchantment-slots, material-resistances]
wiki: [/wiki/smithing-upgrades]
decisions: [/design/why-enchanting-was-rebuilt]
details:
  - label: Level from ingot
    value: Copper I, Iron II, Gold III, Diamond IV, Netherite V
  - label: Experience cost
    value: None. Template, item and ingot only
  - label: Honing
    value: "+1.0 to +3.0 attack damage, and the same bonus to arrow damage on bows and crossbows"
  - label: Warding
    value: 3.2% reduction per level per worn piece, capped at 20 total levels
  - label: Grinding
    value: Level squared plus one, so +2 / +5 / +10 / +17 / +26
---

## What changed

Twelve vanilla enchantments are gone: Protection, Fire Protection, Blast Protection, Projectile Protection, Sharpness, Smite, Bane of Arthropods, Power, Density, Impaling, Unbreaking and Efficiency. They are unselectable in the Catalogue, absent from loot, and removed from the creative book list.

Their jobs moved to four smithing templates.

## The four upgrades

**Honing** applies to weapons, bows and crossbows. It replaces Sharpness and Power at once: melee damage goes up between +1.0 and +3.0, and a honed bow adds the same bonus to arrow damage. The number moves in the tooltip because it is folded into the base damage modifier, not bolted on top.

**Warding** applies to armor. It replaces the entire Protection family with one scale: 3.2% damage reduction per level per worn piece, summed across four pieces and capped at twenty total levels. Full Warding V is 64% against everything, with no per-damage-type bookkeeping.

**Tempering** applies to anything damageable. It replaces Unbreaking. Levels I and II behave like Unbreaking 1, III and IV like Unbreaking 2, and V like Unbreaking 3.

**Grinding** applies to mining tools. It replaces Efficiency, adding level squared plus one: +2, +5, +10, +17, +26.

## How the level is chosen

There is no level slider. The ingot you put in decides:

| Ingot | Level |
| :-- | :-- |
| Copper | I |
| Iron | II |
| Gold | III |
| Diamond | IV |
| Netherite | V |

The table produces nothing unless the result would be strictly higher than what the item already has, so you cannot downgrade by accident.

::tip
Smithing upgrades cost no experience at all. Template, item and ingot is the whole price, which makes progression a matter of finding templates rather than farming levels.
::

## Duplicating templates

Seven copper ingots, one template and one material in the standard duplication pattern yields two templates. The material differs per template: Flint for Honing, Iron Ingot for Warding, Obsidian for Tempering, Stone for Grinding.

## Where to find them

| Template | Sources |
| :-- | :-- |
| Honing | Village Weaponsmith 20%, Pillager Outpost 25%, Stronghold Library 30%, Simple Dungeon 20% |
| Warding | Village Armorer 20%, Bastion Treasure 30%, Buried Treasure 25%, Jungle Temple 25% |
| Tempering | Village Toolsmith 11%, Desert Pyramid 25%, Shipwreck Treasure 20%, Abandoned Mineshaft 12% |
| Grinding | Abandoned Mineshaft 12%, Ruined Portal 25%, Trial Chamber rare reward 17.6% |
