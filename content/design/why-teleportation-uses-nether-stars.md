---
title: Why teleportation uses Nether Stars
summary: Make teleportation a planned group journey between built places, with a meaningful recurring cost and materials that have distinct roles.
decidedOn: "2026-09-15"
systems: [transportation, exploration-navigation]
features: [wither-compass]
---

## Problem

Players need a way to make occasional long journeys without owning elytra. Teleportation can also connect temples, communal hubs and locations used in treasure hunts. If it is cheap and available anywhere, however, it removes much of the reason to build routes or use the other transport systems.

## Evidence

The server's teleportation discussion raised two useful objections. A different foundation material does not protect a private network, because someone else can build a matching platform. Spending a Nether Star on every journey also makes teleportation expensive enough to serve a different purpose from everyday transport.

The resulting design accepts the recurring cost and gives materials practical transport roles. These are design choices for the current playtest, not conclusions from measured server usage.

## Constraints

- A platform is a flat 7 by 7 foundation with one layer and one material.
- The centre Lodestone remains accessible even when decorative blocks hide the foundation.
- The destination is established by visiting and linking a compass.
- Both endpoints use the exact same foundation block.
- Player participation must be explicit and visible.
- Failed travel must preserve the charge.
- Familiar items, interactions, sounds and particles should make the feature feel at home in Minecraft.

## Considered solutions

### Materials as private frequencies

Matching materials provide a useful construction rule, but no ownership guarantee. A player with a linked compass can reproduce the foundation. The feature therefore makes no promise of privacy or access control.

### A cheap general-purpose teleport

This would make routine travel easier, but would compete directly with the pack's flight routes, mounts and trains. The chosen design instead requires built endpoints and a Nether Star for each successful departure.

### Separate costs or player limits for groups

Charging each passenger or restricting groups to a small fixed size would discourage shared journeys. One charge instead pays for the full group, with explicit enrollment and a clear arrival for every traveller.

## Decision

Charge a Lodestone compass with one Nether Star and one experience level at an anvil. A successful journey returns the same named, linked ordinary compass. Cancellation consumes no charge.

Every platform carries consenting players. Iron supplies regional travel, gold speeds up preparation and adds animals and monsters, emerald additionally carries villagers, diamond allows unlimited distance within a dimension and netherite connects dimensions. Diamond, netherite and rose gold also carry animals and monsters. Rose gold, when Additional Additions is present, additionally supports ridden living mounts. Villagers and wandering traders remain exclusive to emerald.

Keep the ordinary compass appearance throughout the charge cycle. Identify the stored charge through its name and short tooltip. Use existing Minecraft particles and sounds for boarding, preparation, departure and cancellation.

Preserve the group's exact positions relative to the Lodestone, sampled at departure, together with looking direction. Check every arrival before moving anyone. An obstruction cancels the journey instead of rearranging travellers around the destination.

## Consequences

Teleportation is useful for planned expeditions, communal departures and built landmarks. It requires a departure platform, so it is not an unrestricted emergency return from anywhere in the world.

Nether Stars gain a recurring use. Their scarcity still depends on the server's actual acquisition rate and farming rules; consuming them does not by itself guarantee any particular economic outcome.

Platform builders must think about both ends of the route. Decorative blocks may differ, but floor heights and clearance must permit matching arrival positions, including villagers and mounted riders.

The first playtest should evaluate whether the cost encourages shared journeys, whether the material roles are all useful, and whether the outline and sounds communicate boarding clearly on covered platforms. Range and preparation times remain balance values to assess in play.

The complete current rules are in the [teleportation guide](/wiki/teleportation).
