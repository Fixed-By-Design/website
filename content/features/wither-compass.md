---
title: Wither Compass
summary: Paired Lodestone platforms turn a Nether Star into one group journey, with material roles and exact relative arrivals.
category: exploration
pillar: transportation
mod: exploration-reloaded
status: playtesting
since: "0.3.0-beta"
order: 10
vanilla: Lodestone compasses point towards a chosen block. They do not provide a way to travel to it.
problem: A server can benefit from occasional long journeys between established places while keeping everyday travel and built infrastructure useful.
solution: Charge a linked compass with one Nether Star at an anvil, then activate a matching platform. Each player joins explicitly and keeps their relative position on arrival. Materials control reach, preparation time and transport of villagers or mounts.
tags: [teleportation, lodestone, compass, multiplayer, villagers, mounts]
related: [map-book, campfire-elytra-flight]
wiki: [/wiki/teleportation]
decisions: [why-teleportation-uses-nether-stars]
details:
  - label: Platform
    value: 49 identical beacon foundation blocks in a single 7 by 7 layer, with a Lodestone on top of the centre
  - label: Charging
    value: Linked compass plus one Nether Star at an anvil, costing one experience level
  - label: Cost per journey
    value: One charge for the entire group, returning the linked ordinary compass
  - label: Arrival
    value: Exact relative position and looking direction, with three seconds of Blindness
  - label: Failure
    value: A blocked arrival cancels the whole journey and preserves the charge
---

## Availability

Implemented for playtesting in Exploration Reloaded 0.3.0-beta. This feature is not yet part of the public modpack release.

## Platforms with different roles

All materials support groups. Iron provides regional travel; gold shortens preparation; emerald includes villagers; diamond removes the distance limit within a dimension; netherite allows travel between dimensions. Additional Additions' rose gold includes ridden living mounts.

Each platform uses a single material, and both ends must match. Decorative coverings are allowed. Matching expensive materials do not provide access control.

## A journey the group chooses

The compass holder activates the platform. Other players join by using the Lodestone with an empty main hand. A visible boundary, traveller particles and familiar Minecraft sounds mark preparation and departure.

At departure, the group is translated to the destination without rearranging anyone. Every exact arrival is checked before anybody moves. If one is obstructed or unsafe, everyone stays and the compass remains charged.

Read the [teleportation guide](/wiki/teleportation) for construction, the material table, boarding rules and troubleshooting. The [design decision](/design/why-teleportation-uses-nether-stars) explains the cost and relationship to other transport.
