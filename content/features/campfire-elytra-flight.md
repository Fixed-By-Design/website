---
title: Campfire Elytra Flight
summary: Rockets no longer push you. Campfires do, and building a good one is now part of building a route.
category: elytra
pillar: exploration-navigation
mod: exploration-reloaded
status: stable
since: "0.2.0-beta"
featured: true
order: 5
vanilla: Elytra flight ends at firework rockets. Once you have a gunpowder farm, flight is holding right click in a straight line at a fixed speed, indefinitely.
problem: Rockets delete route planning. Terrain stops mattering, distance stops mattering, and every transportation system you might have built becomes irrelevant the moment the elytra comes out. The best-looking mechanic in the game gets reduced to one button.
solution: Firework rockets give zero thrust while gliding. Flight is powered by campfires instead. Crouch in the smoke to launch and to bank charges, spend those charges as mid-air dashes, and ride updraft columns you built on the ground.
tags: [elytra, flight, campfire, smokestack, cloudskipper]
related: [map-book]
wiki: [/wiki/elytra-flight]
decisions: [/design/why-rockets-no-longer-power-elytra]
details:
  - label: Hearth power
    value: 0 to 12, from adjacent updraft blocks plus 4 for a hay bale signal fire
  - label: Launch velocity
    value: "0.45 plus 0.10 per hearth power, so 0.45 solo and 1.65 from a 3x3 signal hearth"
  - label: Burn duration
    value: 40 ticks plus 5 per hearth power
  - label: Charge interval
    value: 30 ticks crouched, configurable
  - label: Updraft column
    value: Scans down up to 38 blocks while gliding, range 10 plus 2 per hearth power
---

## What changed

Using a firework rocket while gliding consumes the rocket and produces no thrust. It emits campfire-signal smoke for five seconds and goes on cooldown. The item is not removed from the game, it simply stopped being an engine.

Flight now starts and refuels at campfires.

## Launching

Crouch on any lit campfire while wearing an elytra. You take no fire damage in the smoke column. After one charge interval the launch arms; release sneak and you are thrown upward, wings forced open, with a burn of directional thrust.

How hard you are thrown depends on the hearth you built.

## Hearth power

Every one of the eight blocks orthogonally or diagonally adjacent to the campfire that is itself an updraft block adds one power. A hay bale underneath, making it a signal fire, adds four.

| Hearth | Power | Launch | Burn |
| :-- | :-- | :-- | :-- |
| Lone campfire | 0 | 0.45 | 40 ticks |
| 3x3 signal hearth | 12 | 1.65 | 100 ticks |

A campfire with any hearth power always emits the tall signal column, hay bale or not, and adds extra visible plumes as it grows. A good launch pad is visible from a distance, which is the point: your infrastructure becomes landmarks.

## Steering the burn

While the burn is active, your velocity is pulled toward wherever you are looking, converging on roughly 1.5 blocks per tick. Thrust follows your view rather than your momentum, so a launch is a commitment to a direction.

## Updraft columns

While gliding, the game scans downward up to 38 blocks. Pass over a lit updraft block and you gain lift, scaled by the hearth's range and your distance from it, capped at a total upward speed of 1.0.

A line of campfires along a route is a flight corridor. This is the system that replaces holding right click: you build the sky roads first, then you fly them.

## Smokestack and Cloudskipper

Two elytra enchantments, mutually exclusive.

**Smokestack I to III** lets you bank one campfire charge per level while crouched in the smoke. In the air, the boost key spends one charge for a fifteen-tick directional dash. You need at least ten ticks of gliding first, and there is a sixty-tick cooldown between dashes. Charges persist across saves, and drop to zero if you stand around on the ground.

**Cloudskipper I to III** takes the other approach: above y=100 it returns part of the drag your glide is losing instead of adding thrust, saturating around y=230. It rewards flying high rather than flying hard.

::tip
A dedicated key, X by default, folds your wings instantly mid-air. The boost key defaults to Space and can be rebound if another mod already uses jump.
::

## Gamerules

| Gamerule | Default | Effect |
| :-- | :-- | :-- |
| `firework_boosts_flight` | false | Set true to restore vanilla rocket propulsion |
| `campfire_updrafts` | true | Set false to disable in-air lift columns |
| `smokestack_charge_ticks` | 30 | Ticks of crouching per charge |
