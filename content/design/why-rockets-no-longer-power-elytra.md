---
title: Why rockets no longer power elytra
summary: Rocket-powered flight removes route planning, terrain and every competing transportation system at once. Campfire flight puts the cost back on the ground, where you can build against it.
decidedOn: "2026-05-02"
systems: [elytra, exploration, transportation]
features: [campfire-elytra-flight, copper-rails, minecart-trains]
---

## Problem

Elytra flight is the best-feeling movement mechanic Minecraft has. Firework rockets turn it into holding right click.

Once you have a gunpowder farm, a rocket costs nothing and provides constant thrust in a straight line. Terrain stops mattering, distance stops mattering, and the flight itself stops being a skill.

It also quietly deletes everything else. Roads, boats, rails, horses, nether tunnels: every transportation system in the game becomes irrelevant the moment someone puts on an elytra, because none of them can compete with free unlimited flight.

## Evidence

Across playtest worlds, no player built a transportation system of any kind after acquiring an elytra. Not one.

The minecart rework had already raised rail speed five times over vanilla, to 40 blocks per second. It made no difference to how anyone travelled, because rocket flight is faster, cheaper and needs no track.

Flight sessions were observed to consist of a single input held for the duration.

## Constraints

**Elytra flight must stay good.** The goal was never to nerf it into irrelevance. Gliding is the best thing in the game.

**Flight must stay renewable.** Any solution that made flight consumable in a scarce resource would just be rockets with extra steps.

**The cost must be visible.** Whatever replaced rockets had to be something you build and can see, so that flight infrastructure reads as infrastructure.

**Vanilla gliding physics stay untouched.** Falling, turning and diving still work exactly as they do in vanilla.

## Considered solutions

**Nerf rockets numerically.** Reduce the thrust, add a cooldown, make them more expensive. This does not change what flight is, it only makes it more tedious. Rejected quickly.

**Durability cost on the elytra.** Makes flight a resource drain and pushes players toward Mending, which is exactly the enchantment we were trying to make optional.

**Stamina.** A flight meter that recharges on the ground. Honest, but invisible, and it turns flight into a cooldown rather than a system.

**Ground-based launch and lift.** Flight is powered by structures you build in the world. Campfires already produce a visible column of smoke that reads as lift, already exist in every world, and are cheap enough to place along a route.

## Decision

This one was not invented here. [Aileron](https://github.com/OrtusMC/Aileron) by ryanhcode and Violunae, and its Fabric rewrite [Eleron](https://codeberg.org/sindercube/eleron) by sindercube, had already reached the ground-based answer and implemented it well. Fixed by Design ports that design rather than reinventing a worse version of it, and relicensed Exploration Reloaded to LGPL-3.0-only in order to carry the code honestly.

Firework rockets give **zero thrust** while gliding. They still exist and still work as fireworks.

Flight is powered by campfires. Crouch in the smoke to charge, release to launch. How hard you are thrown depends on the **hearth** you built: each adjacent updraft block adds power, a hay bale adds four, and a full 3x3 signal hearth launches you almost four times as high as a lone campfire.

While gliding, passing over a lit campfire gives lift from an **updraft column**, so a line of hearths along a route is a corridor you can fly indefinitely.

**Smokestack**, a new elytra enchantment, lets you bank charges at a campfire and spend them mid-air as directional dashes. **Cloudskipper**, its mutually exclusive alternative, returns glide drag at high altitude instead.

## Consequences

**Flight became infrastructure.** Players build hearth networks along routes they actually use. Those hearths are visible from a distance, which turned them into landmarks and, unexpectedly, into a form of territorial marking on multiplayer.

**Rail and roads have a niche again.** Not because they are faster than flight, but because flight now has a preparation cost that rail does not. This is progress rather than a solution: rail still lacks a cargo role, which is tracked separately.

**Flight is harder to learn.** Hearth power is not explained in game and the numbers are not visible anywhere. Players discover the system by accident or by reading the wiki, which is not good enough.

**Long unprepared journeys got worse.** Flying somewhere you have never been is now genuinely difficult. We consider this correct, since it is what makes exploration mean something, but it is the change players most often ask us to revert.

**A gamerule exists to undo it.** `firework_boosts_flight` restores vanilla propulsion. Servers that want the old behaviour should have it, and publishing the switch is cheaper than arguing about it.
