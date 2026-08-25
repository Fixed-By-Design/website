---
title: Map Book
summary: An atlas that holds every map you own, draws itself as you travel, and can be shared so a whole server edits the same world map.
category: maps-navigation
pillar: exploration-navigation
mod: exploration-reloaded
status: stable
since: "0.2.0-beta"
featured: true
order: 6
vanilla: Maps are single items. Covering any real distance means a chest of them, sorted by hand, and reading one means holding it and standing still. Sharing means cloning at a cartography table and hoping everyone remembers to re-clone.
problem: Cartography is one of the best systems in Minecraft and almost nobody uses it past the first map, because the inventory cost grows faster than the usefulness. Shared exploration in particular has no answer at all.
solution: The Map Book is one item holding many maps, opening as a pannable and zoomable full-screen atlas drawn in world coordinates. Two books can share an id, so several players read and edit the same atlas, with markers and holder positions synced live.
tags: [maps, navigation, cartography, multiplayer, atlas]
related: [campfire-elytra-flight]
wiki: [/wiki/map-book]
details:
  - label: Crafting
    value: 1 empty map plus 1 book, shapeless
  - label: Stack size
    value: 16
  - label: Live redraw
    value: Every unlocked map whose edge is within 128 blocks is ticked and redrawn while carried
  - label: Zoom range
    value: 0.005x to 10x, 1.15x per scroll notch
  - label: Sharing
    value: Map Book plus a book at a cartography table yields 2 books sharing one id
---

## What changed

The Map Book is a single item that holds an arbitrary number of maps. Open it and you get a full-screen atlas, not a paused screen: every map is drawn at its true world position, largest scale first, and you pan and zoom across the whole thing.

## Filling it

**Right-click with nothing relevant in the off hand** and the first empty map in your inventory becomes a new map centred on you. Hotbar maps become scale 2, inventory maps become scale 4.

**Right-click with an empty map in the off hand** and you get a scale 0 map centred on you, consuming that map.

**Right-click with a filled map in the off hand** and it is added to the book. Duplicates are rejected.

**Right-click a banner** to toggle that banner's marker on the nearest map in the book.

**Shears in the off hand** tear out the map covering your position and hand it back as a normal filled map, damaging the shears by one. You need at least two maps in the book to do this.

## Reading it

Pan by dragging with either mouse button. Scroll to zoom. The world X and Z under your cursor are shown near the bottom.

Structure and banner icons carry their custom names on a small plate, so a well-labelled world reads like an actual map rather than a field of identical markers.

While you are in the Nether, overworld maps render at one-eighth scale so that landmarks line up with Nether coordinates. Walking a portal tunnel and reading the overworld above it finally works.

## Sharing an atlas

Put a Map Book and a book into a cartography table and you get two books sharing the same id. Everyone holding a copy sees the same maps, the same markers, and each other.

- **Shift + left click** plants a red X visible to every holder. Shift-click it again to clear it.
- **Other holders** appear as rotating labelled icons in their team colour.
- The book pushes its map list, holder list and marker to every holder each server tick.

::tip
The locator bar changes behaviour while you hold a map or Map Book: instead of player dots it shows one dot per map decoration in range, within 60 degrees of your view, plus the shared marker and any styled waypoints.
::

## Small things that add up

The Map Book goes in chiseled bookshelves. It accepts Curse of Vanishing. It renders in your hand as the map covering your current position. Its tooltip shows the book id and map count instead of the vanilla map-id line.
