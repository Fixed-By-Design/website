---
title: Minecart Trains
summary: A lit furnace minecart couples the carts behind it into a train of up to eight, and drags them through curves, slopes and portals.
category: minecarts-trains
pillar: transportation
mod: minecarts-overhaul
status: stable
since: "0.5.0-beta"
order: 10
vanilla: Furnace minecarts move at half speed, push with a decaying vector, burn only coal and charcoal, and shove other carts apart rather than pulling them. Nobody uses them.
problem: Minecarts move one stack of goods or one player at a time. Without coupling there is no reason to build rail for logistics, so the entire transportation category loses to a shulker box in an ender chest.
solution: Furnace minecarts become locomotives. They self-propel constantly, burn any fuel, refuel automatically from a chest or hopper cart behind them, and automatically couple up to seven trailers that follow the track exactly.
tags: [minecarts, trains, furnace-minecart, coupling, transportation]
related: [copper-rails]
wiki: [/wiki/trains]
details:
  - label: Train length
    value: Up to 8 carts, so 1 locomotive and 7 trailers
  - label: Trailer spacing
    value: 1.5 blocks
  - label: Speed penalty
    value: 5% per car, so x0.95 solo down to x0.60 at 8 cars
  - label: Fuel tank
    value: 32000 ticks, about 26 minutes 40 seconds
  - label: Acceleration
    value: 0.025 blocks per tick along its facing, every tick
---

## The locomotive

The vanilla furnace minecart is replaced everywhere, including in worlds you already have, so existing carts pick up the new behaviour with no migration.

It no longer runs at half speed. It ignores slope slowdown entirely, so it climbs without bleeding momentum. It cannot be shoved by other minecarts, so a rear-ending cart cannot derail it. And instead of vanilla's decaying push vector it adds a constant 0.025 blocks per tick along its facing, for as long as it has fuel.

**It burns anything.** Any registry fuel works: coal for 1600 ticks, a blaze rod for 2400, a lava bucket for 20000 with the bucket handed back. The tank holds 32000 ticks and refuses an insert that would overflow rather than wasting it.

**Powered rails are the on/off switch.** Crossing a powered rail lights the cart, crossing an unpowered one puts it out. Fuel is preserved either way, so a station is just an unpowered rail.

**Out of fuel it stops fast.** An unlit locomotive multiplies its horizontal velocity by 0.75 per tick instead of vanilla's 0.98, so it comes to rest in a couple of blocks rather than coasting for a hundred.

## Coupling

A lit or moving furnace minecart automatically attaches any non-furnace minecart it overlaps, or that sits within one 1.5-block probe step behind the last car, up to eight carts total. Furnace minecarts cannot be trailers, so there is no double-heading.

Each trailer is dragged by running a ghost probe cart one spacing behind the car ahead and teleporting the trailer onto it every tick, matching position, pitch, yaw and velocity. The chain follows curves and slopes exactly rather than approximating them.

The cost of length is speed: the locomotive's maximum is multiplied by 5% per car, so a full eight-car train runs at 60%.

## Automatic refuelling

Below 100 ticks of fuel, the locomotive pulls one fuel item per tick from the first trailer, if that trailer is a chest or hopper minecart. Lava buckets are swapped for empty ones in place.

A locomotive with a coal-filled chest cart behind it runs until the coal runs out.

## When trains break

A trailer disconnects when it is removed, when it is grounded below 0.01 horizontal speed, or when its train tag expires 60 ticks after the locomotive stops refreshing it. Everything behind it drops off too.

Off the rails, any car that leaves the track and everything behind it switch to a yaw-aligned drag at the locomotive's speed, so a derailment stays in formation instead of exploding into eight directions.

Trains survive world reloads: trailer UUIDs and order are saved to NBT and the chain is rebuilt on the first tick after load. Going through a portal uncouples the train deliberately, force-loading chunks so the cars are not lost.

::note
A rope is rendered between coupled carts, in the style of a leash. The locomotive broadcasts its ordered car list to nearby players every 20 ticks to keep that rendering correct.
::

## Dispenser Minecart

A container cart with a nine-slot dispenser inventory that fires on powered activator rails, one dispense per trigger with an eight-tick cooldown. It uses the full vanilla dispenser behaviour registry, so projectiles, buckets, TNT, fireworks and armor equipping all work.

Sneak-right-click flips its firing direction, and coupling auto-corrects its aim so it keeps firing the same way relative to the train.
