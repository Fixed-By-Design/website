---
title: Enchantment Slots
summary: Every item has a slot budget, every enchantment costs slots, and the grindstone permanently scars whatever you strip.
category: enchanting
pillar: equipment-enchanting
mod: enchantment-overhaul
status: stable
since: "0.9.0"
order: 2
vanilla: An item can hold every compatible enchantment at once. Given enough anvil work, the endgame diamond sword is the same diamond sword for every player, carrying the maximum of everything.
problem: Without a budget there is no trade-off, so there is no build. Enchanting converges on one correct answer per item type, and the only thing separating two players is how much time they spent at an anvil.
solution: Each item carries a slot budget from three to six depending on its material. Each enchantment costs slots equal to its level. Curses cost nothing and grant an extra slot, which makes deliberately cursing a piece a real option.
tags: [enchanting, slots, grindstone, anvil]
related: [the-catalogue, smithing-upgrades]
wiki: [/wiki/enchanting]
details:
  - label: Tier 3
    value: Wood, stone, copper, leather, bow, fishing rod, shield
  - label: Tier 4
    value: Iron, chainmail, crossbow
  - label: Tier 5
    value: Diamond, netherite, elytra, turtle helmet, mace, trident
  - label: Tier 6
    value: All gold gear
  - label: Slot cost
    value: Equal to the enchantment level, Mending always 3, curses 0
---

## What changed

Every enchantable item now has a slot budget, shown as a row of pips in the Catalogue. Enchanting spends slots. Run out, and you have to choose what matters on that item.

## The budget

| Tier | Slots | Items |
| :-- | :-- | :-- |
| 3 | 3 | Wood, stone, copper, leather, bow, fishing rod, shield |
| 4 | 4 | Iron, chainmail, crossbow |
| 5 | 5 | Diamond, netherite, elytra, turtle helmet, mace, trident |
| 6 | 6 | All gold gear |

Gold is the outlier on purpose. It is the softest material in the game and the one nobody had a reason to enchant, so it gets the largest budget: fragile, brilliant, and worth protecting.

## Slot costs

An enchantment costs slots equal to its level. Protection IV would cost four, Fire Aspect II costs two, and so on. Mending is a flat 3 regardless.

Curses are free. They cost zero slots and each one grants an extra slot on top. Accepting Curse of Binding on a chestplate is a genuine bargain rather than a joke.

## The grindstone leaves a mark

Vanilla's grindstone strips enchantments and refunds a little experience, with no downside. Here it strips everything including curses, and stamps the item with a permanent penalty that removes one maximum slot per use.

An anvil can buy one of those slots back. Put the scarred item in with its repair material and pay the levels:

| Material | Levels |
| :-- | :-- |
| Netherite | 10 |
| Diamond | 8 |
| Gold | 5 |
| Iron, chainmail | 5 |
| Copper | 3 |
| Anything else | 2 |

::warning
The penalty is stored on the item itself, so it survives repairs, renaming and trading. A twice-ground sword is permanently a worse sword until you pay to restore it.
::
