---
title: The Catalogue
summary: The enchanting table becomes a catalogue of enchantments you have unlocked, paid for with reagents and experience instead of luck.
category: enchanting
pillar: equipment-enchanting
mod: enchantment-overhaul
status: stable
since: "0.9.0"
featured: true
order: 1
vanilla: Right-clicking an enchanting table offers three random enchantments hidden behind Standard Galactic Alphabet. You spend lapis and levels on a slot machine, reroll until the result is acceptable, and bookshelves only raise the numbers.
problem: Randomness makes enchanting a chore rather than a decision. The optimal play is to reroll, so the system rewards patience instead of planning, and bookshelves become wallpaper you place once and never think about again.
solution: The table opens the Catalogue, a list of every enchantment stored in the chiseled bookshelves around it. You choose the enchantment and the level, pay its specific reagent and an experience cost, and get exactly that. Bookshelves become a library you build deliberately.
tags: [enchanting, catalogue, bookshelves, reagents]
related: [enchantment-slots, smithing-upgrades]
wiki: [/wiki/enchanting]
decisions: [/design/why-enchanting-was-rebuilt]
details:
  - label: Enchantment source
    value: Books inside chiseled bookshelves in vanilla's 15 table offsets
  - label: Reagent discount
    value: 3.33% per regular bookshelf, capped at 15 shelves for 50%
  - label: Reagent quantity
    value: Level x 2, from 2 at level I up to 10 at level V
  - label: Experience cost
    value: 2 / 4 / 7 / 10 levels for I to IV, Mending a flat 8
---

## What changed

The enchanting table no longer generates offers. It opens the Catalogue: an item slot, a reagent slot, an output slot, and a scrollable list of every enchantment the room can teach you.

An enchantment appears in that list only if a book containing it sits in a chiseled bookshelf around the table. The game still uses vanilla's fifteen bookshelf positions and still requires a clear line to each one, so the geometry you already know carries over. What changed is what those positions mean: they are no longer a power number, they are your spellbook.

## How it works

**Stock the shelves.** Put enchanted books into chiseled bookshelves placed in the vanilla enchanting positions. Every enchantment stored in them becomes selectable.

**Pick an enchantment and a level.** Each row in the list shows one clickable Roman numeral per level. Green means you already have it, bright means you can afford it, dimmed means you cannot.

**Pay the reagent.** Every enchantment demands its own material rather than lapis. Fire Aspect wants Blaze Powder, Channeling wants a Lightning Rod, Silk Touch wants Cobweb, Looting wants a Rabbit's Foot. Anything without a listed reagent falls back to Lapis Lazuli.

**Pay the levels.** Experience is charged per enchantment, and an upgrade only ever charges the difference between what the item has and what you asked for.

::note
Regular bookshelves still matter. Each one cuts reagent cost by 3.33%, up to fifteen shelves for a 50% discount. The Catalogue shows the running total as you build.
::

## Reagents

A selection of the reagent table:

| Enchantment | Reagent |
| :-- | :-- |
| Fire Aspect, Flame | Blaze Powder |
| Channeling | Lightning Rod |
| Frost Walker | Packed Ice |
| Fortune | Emerald |
| Looting, Step-Up | Rabbit's Foot |
| Silk Touch | Cobweb |
| Luck of the Sea | Nautilus Shell |
| Infinity | Spectral Arrow |
| Riptide | Heart of the Sea |
| Mending and anything unlisted | Lapis Lazuli |

## Why the names are still scrambled

Row labels still render in the Standard Galactic Alphabet, and the real name still appears in the hover tooltip. Keeping the flourish costs nothing now that the choice is deliberate: you are reading a catalogue, not gambling on a mystery.

## Related systems

Enchantments cost slots, and every item has a slot budget. See [Enchantment Slots](/features/enchantment-slots). Raw statistics moved out of enchanting entirely and into [Smithing Upgrades](/features/smithing-upgrades).
