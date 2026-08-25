---
title: Material Resistances
summary: Every armor material resists a specific kind of damage, so the set you wear is a decision about what you expect to fight.
category: combat
pillar: equipment-enchanting
mod: enchantment-overhaul
status: stable
since: "0.9.0"
order: 4
vanilla: Armor materials differ only in durability, armor points and toughness. Diamond and netherite are strictly better than everything else, so the moment you can make them, nothing else is ever worn again.
problem: A strictly ordered material ladder means five of the seven armor materials exist only as a step you pass through. Gold, chainmail and copper have no moment where they are the right answer.
solution: Each material carries an innate 5% reduction against one damage type, 20% for a full matching set. Netherite resists fire, diamond resists explosions, gold resists magic, iron and chainmail resist projectiles, copper resists poison and magic, leather resists falling.
tags: [combat, armor, materials, resistance]
related: [smithing-upgrades]
wiki: [/wiki/death]
details:
  - label: Per piece
    value: 5% reduction against the material's damage type
  - label: Full matching set
    value: 20% reduction
  - label: Stacking
    value: Innate, Warding and Last Stand apply as three successive multipliers before armor absorption
---

## What changed

Armor materials now mean something beyond their armor value.

| Material | Resists |
| :-- | :-- |
| Netherite | Fire |
| Diamond | Explosion |
| Gold | Magic, indirect magic, wither, dragon breath |
| Iron, Chainmail | Projectile |
| Copper | Poison and magic |
| Leather | Fall damage |

Each worn piece contributes 5%. A full matching set is 20%.

## How it stacks

Three reductions apply as successive multipliers before armor absorption is calculated: the innate material resistance, Warding, and Last Stand. They multiply rather than add, so nothing here produces an immunity.

This applies to armored mobs too. A skeleton wearing gold is genuinely harder to kill with a potion.

## Why it matters

Full netherite is still the best all-round set. It is no longer the best set for every situation. Walking into a bastion, gold is doing real work against magic damage. Diving a creeper farm, diamond is the correct chestplate. Falling is leather's whole answer, and leather is the one material you can make on day one.

::note
Damage type resistance is not visible on the tooltip. It is a property of the material itself, so the rule to remember is the table above, not a number on the item.
::
