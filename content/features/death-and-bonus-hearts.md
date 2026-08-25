---
title: Death & Bonus Hearts
summary: Death keeps your tools and half your experience, and takes the bonus hearts you spent real effort earning.
category: death
pillar: survival-multiplayer
mod: fairlands
status: stable
since: "0.2.1-beta"
featured: true
order: 7
vanilla: Death drops everything. The penalty is a corpse run under a timer, and if you lose the race you lose hours of gear. Servers respond by turning keepInventory on, at which point death costs nothing at all.
problem: Both settings are bad. Full drop makes death a logistics disaster that punishes the time you spent enchanting rather than the mistake you made. keepInventory removes the stake entirely. Neither one makes dying interesting.
solution: Your equipped armor, tools and weapons come back with you, in their original slots. Half your experience comes back. What you lose is every bonus heart you earned from Tidal Draughts, which are renewable but slow.
tags: [death, keepinventory, bonus-hearts, tidal-draught, multiplayer]
related: [world-progression]
wiki: [/wiki/death]
decisions: [/design/why-death-keeps-tools-but-removes-bonus-hearts]
details:
  - label: Kept on death
    value: Worn armor, swords, axes, pickaxes, shovels, hoes, spears, bows, crossbows, tridents, maces, shields, shears, flint and steel, fishing rods, brushes, buckets, elytra, maps and recovery compasses
  - label: Experience kept
    value: 50%, configurable 0 to 100
  - label: Bonus heart cap
    value: 5, so +10 maximum health
  - label: Bonus heart source
    value: Tidal Draught, brewed from Thick Potion plus Heart of the Sea
---

## What changed

Death is now partial. Protected items stay in your inventory and return to their exact original slots on respawn. Everything else drops as normal.

Protected means your four worn armor pieces and, anywhere in your inventory, your tools and weapons: swords, axes, pickaxes, shovels, hoes, spears, anything bow, crossbow, trident or mace enchantable, shields, shears, flint and steel, fishing rods, brushes, any bucket, anything with a glider component, and carrot or fungus on a stick. Maps, filled maps and recovery compasses are kept through a tag that datapacks can extend. If Exploration Reloaded is installed, the Map Book is kept too.

You also keep 50% of the experience you had.

## What you actually lose

Bonus hearts.

A Tidal Draught, brewed from a Thick Potion and a Heart of the Sea, permanently adds one heart to your maximum health and heals you to full. You can stack five of them, for twenty-two hearts total.

Every death resets that to zero.

Hearts of the Sea are renewable through fishing, so bonus hearts are not a one-time reward you can lose forever. They are a running investment. Dying at five bonus hearts costs you five Hearts of the Sea worth of fishing, which is a real and specific amount of time, and it costs you nothing you cannot get back.

::note
Bonus hearts render as deep navy hearts at the end of your health bar, with a slow wave animation travelling along the row. They persist across relogs and come back full.
::

## Drinking at the cap

Nothing happens. The potion is not consumed, no message is shown, and the bonus hearts jitter sideways for a moment. That shake is the only "no" in the system.

## Splash and lingering

Splash and Lingering Tidal Draughts exist, and so do Arrows of the Tides. Because the effect grants a heart to any player it lands on, you can hand bonus hearts to teammates. Or shoot them at someone.

## Server configuration

| Setting | Default | Effect |
| :-- | :-- | :-- |
| `partial_keep_inventory` | true | Master switch, only active when vanilla keepInventory is off |
| `death_xp_keep_percent` | 50 | Percentage of experience returned |
| `bonusHeartsMax` | 5 | Maximum bonus hearts |
| `keepEquippedArmor` | true | Keep the four worn pieces |
| `keepToolsAndWeapons` | true | Keep tools and weapons anywhere in the inventory |
| `deathPenaltyEnabled` | false | Optional debuff on respawn, off because losing hearts is the intended penalty |
