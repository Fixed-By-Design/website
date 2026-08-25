---
title: Why enchanting was rebuilt
summary: Random enchanting rewarded patience rather than planning, and four statistics enchantments crowded out everything interesting. The Catalogue and the smithing templates split the system in two.
decidedOn: "2026-03-14"
systems: [enchanting, equipment]
features: [the-catalogue, enchantment-slots, smithing-upgrades]
---

## Problem

Vanilla enchanting asks you to spend lapis and levels on three hidden offers, and lets you reroll for free by enchanting something worthless. The optimal play is therefore always the same: reroll until the offer is good.

That has two consequences. Enchanting rewards patience rather than any decision. And because the outcome is random, the player's actual engagement with the system is the reroll loop, not the enchantments.

Separately, twelve vanilla enchantments are pure statistics: Sharpness, Protection and its four variants, Unbreaking, Efficiency, Power, Density, Impaling, Smite and Bane of Arthropods. They are also, without exception, the enchantments that decide whether a piece of gear is good. Every enchanting decision starts by securing them, which means the enchantments with actual behaviour compete for whatever is left.

## Evidence

Playtesters consistently described enchanting as a chore rather than a system. Nobody built an enchanting room for its geometry; they built the minimum fifteen shelves and then rerolled.

Across a full playtest world, every diamond sword produced by more than one player converged on the same enchantment set. There was no build, only a target.

Bookshelves were placed once and never thought about again, which meant the most visually distinctive part of the whole system had no ongoing role.

## Constraints

The redesign had to keep four things.

**Enchanting must still feel like magic.** Whatever replaced the table could not read as a crafting recipe.

**Bookshelves must matter more, not less.** They are the visual identity of enchanting.

**Progression must still be gated.** Handing out every enchantment immediately would have been worse than randomness.

**Vanilla enchantments must keep their behaviour.** Changing what Fortune does was never on the table. What changed is how you get it.

## Considered solutions

**Keep randomness, remove rerolling.** Make the offers persistent per item so you cannot fish for a better one. This fixes the reroll loop but leaves the outcome outside the player's control, which is the deeper problem.

**Guaranteed offers by level.** Enchantment quality scales with experience level spent. Simple and predictable, but it converts enchanting into a shop with an experience price tag, and gives bookshelves nothing to do.

**A catalogue of unlocked enchantments.** Enchantments must be discovered as books and stored in chiseled bookshelves around the table. The table then offers exactly what the room contains.

**Split statistics from magic.** Move the twelve statistics enchantments to a different station entirely, so the enchanting table only ever offers things with behaviour.

## Decision

The last two, together.

The enchanting table opens the **Catalogue**: a list of every enchantment stored in chiseled bookshelves within vanilla's fifteen positions. You choose the enchantment and the level and pay a reagent specific to that enchantment plus an experience cost. Regular bookshelves in the remaining positions discount the reagent.

The twelve statistics enchantments become four smithing templates: **Honing** for damage, **Warding** for defence, **Tempering** for durability, **Grinding** for mining speed. The ingot you use decides the level, and no experience is charged.

Every item gets a **slot budget** from 3 to 6, and every enchantment costs slots equal to its level, so a fully enchanted item is a set of choices rather than a maximum.

## Consequences

**Bookshelves became the progression.** An enchanting room is now a library you build over dozens of hours, and its contents are visible from the outside. This is the change playtesters noticed most.

**Books became permanent unlocks.** This is the single biggest source of confusion, because nothing in game teaches it. That is now a tracked problem with its own roadmap item.

**Enchanting is slower to start and better later.** Early game enchanting is harder than vanilla, because you must find books before you can use the table at all. That is intentional but it is a real cost.

**Gold armor has a reason to exist.** Six slots against diamond's five turned the softest material in the game into the most interesting one to enchant, which was not the goal but is the best thing to come out of the slot system.

**Two stations means two mental models.** Some players still look for Sharpness in the Catalogue. The templates being findable in loot rather than craftable helps, but the split has to be taught.
