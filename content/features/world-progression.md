---
title: World Progression
summary: Ore is scarce near world spawn and abundant far from it, so distance from home becomes a resource you can spend.
category: world-generation
pillar: survival-multiplayer
mod: fairlands
status: stable
since: "0.2.1-beta"
order: 8
vanilla: Ore generates at the same density everywhere. Whether you dig under spawn or ten thousand blocks out, the yield is identical, so there is never a material reason to leave.
problem: On a multiplayer server this collapses the map. Everyone strip-mines near spawn, the shared area becomes swiss cheese, and the rest of the world is scenery. Exploration has to compete with convenience, and convenience always wins.
solution: Within 2000 blocks of world spawn only 45% of ore veins generate. Between 2000 and 6000 the density ramps back to normal. Past 6000, every vein has a 10% chance to spawn a second one nearby.
tags: [worldgen, ore, progression, multiplayer, exploration]
related: [death-and-bonus-hearts]
wiki: [/wiki/multiplayer]
details:
  - label: Inner radius
    value: 2000 blocks, 45% of vanilla vein count
  - label: Normal radius
    value: 6000 blocks, where density reaches 100%
  - label: Far bonus
    value: 10% chance of a duplicate vein beyond 6000 blocks
  - label: Scope
    value: Overworld only, the eight vanilla ore families, nether and end untouched
---

## What changed

Ore density is a function of horizontal distance from world spawn.

| Distance | Vein density |
| :-- | :-- |
| 0 to 2000 blocks | 45% |
| 2000 to 6000 blocks | Ramps linearly from 45% to 100% |
| Beyond 6000 blocks | 100%, plus a 10% chance of a bonus duplicate vein |

The ramp is linear, so there is no wall to hit. Every hundred blocks you move outward is a small, real improvement.

## What this does to a server

The area around spawn stays intact because mining it is a bad deal. Roads, rails and campfire flight corridors become worth building, because the reason to travel is now measured in diamonds rather than sightseeing.

It also gives a shared world a shape. There is a near zone where people build, a middle zone where they mine, and a far zone worth an expedition.

::note
Only the eight vanilla ore families are affected: coal, copper, iron, gold, redstone, lapis, emerald and diamond. Nether and End ores are untouched, as are ores added by other mods.
::

## Verifying it

Operators can run `/fairlands_debug world_progression` to print the distance, vein percentage and far-bonus percentage for their position, an arbitrary coordinate, or a set of sample rows. Adding `count` physically scans every block in a chunk radius and prints the real per-ore totals, so the curve can be checked empirically rather than trusted.

## Gamerules

| Gamerule | Default |
| :-- | :-- |
| `world_progression` | true |
| `ore_progression_inner_radius` | 2000 |
| `ore_progression_inner_vein_percent` | 45 |
| `ore_progression_normal_radius` | 6000 |
| `ore_progression_far_bonus_percent` | 10 |
