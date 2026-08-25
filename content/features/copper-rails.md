---
title: Copper Rails
summary: Four rail tiers that oxidise over time, raising the speed ceiling from 8 blocks per second to 40 and making track a thing you maintain.
category: minecarts-trains
pillar: transportation
mod: minecarts-overhaul
status: stable
since: "0.5.0-beta"
featured: true
order: 9
vanilla: Minecarts cap at 8 blocks per second. Rails have not meaningfully changed since 2011, and every rail is the same rail. Building a long line is an enormous investment that produces slow transport.
problem: At 8 blocks per second a minecart loses to walking with any speed effect and loses catastrophically to an elytra. There is no rail network worth building, so redstone transport survives only as a novelty.
solution: Copper rails come in four oxidation tiers with real speed ceilings, from 40 blocks per second down to 5. They weather about four times faster than copper blocks, and honeycomb waxes them permanently.
tags: [minecarts, rails, copper, oxidation, transportation]
related: [minecart-trains]
wiki: [/wiki/minecarts]
details:
  - label: Copper Rail
    value: 40 blocks per second, 5x vanilla
  - label: Exposed Copper Rail
    value: 20 blocks per second, 2.5x vanilla
  - label: Weathered Copper Rail
    value: 10 blocks per second, 1.25x vanilla
  - label: Oxidized Copper Rail
    value: 5 blocks per second, slower than a vanilla rail
  - label: Recipe
    value: 6 copper ingots plus 1 stick yields 12
---

## What changed

Eight new rails: four oxidation tiers and their waxed equivalents. They are always on, need no redstone, and they only raise the ceiling.

| Rail | Speed cap |
| :-- | :-- |
| Copper Rail | 40 b/s |
| Exposed Copper Rail | 20 b/s |
| Weathered Copper Rail | 10 b/s |
| Oxidized Copper Rail | 5 b/s |
| Vanilla rail | 8 b/s |

Copper rails do not push your cart. You still need a powered rail, a slope, or a furnace locomotive to reach the higher cap. What the rail decides is how fast you are allowed to go.

## Oxidation is the maintenance loop

Copper rails weather roughly four times faster than a copper block: each random tick rolls the degradation up to four times, stopping early once the tier advances. A line you lay and forget will slow down.

Oxidized rails stop random-ticking entirely, so a fully decayed line costs the server nothing to keep around.

Honeycomb waxes a rail in place, exactly like a copper block, and an axe both de-waxes and steps oxidation back one tier. Waxed rails never advance.

::tip
There are no recipes for exposed, weathered or oxidized rails. The only way to get them is to let copper rails weather or to scrape a waxed one, so decayed track cannot be crafted directly.
::

## The momentum floor

Crossing from a copper rail onto a slower tier does not slam your speed down. The cap can never drop by more than 10% of your current horizontal speed in one tick, so a 40 b/s cart crossing a patch of weathered rail bleeds off gradually instead of stopping dead.

Water halves whatever tier you are on, so a copper rail underwater caps at 20.

## Physics that make this usable

The 1.21.2 improved minecart movement is forced on in every world, with no experimental toggle. On top of that:

- Off-rail carts get the same 40 b/s ceiling instead of the vanilla 8
- Leaving the track on a gentle launch preserves horizontal momentum entirely, so a copper-rail jump clears the gap
- Landing off-rail uses real block friction, so carts slide on ice and grip on stone
- A cart with passengers zeroes fall damage for itself and everyone in it
- Powered and activator rails hard-brake non-furnace carts back to 8 b/s, which is how you build a station
