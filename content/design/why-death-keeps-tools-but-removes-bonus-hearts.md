---
title: Why death keeps tools but removes bonus hearts
summary: Dropping everything punishes the hours you spent enchanting rather than the mistake you made. keepInventory punishes nothing. Bonus hearts are a penalty that is real, renewable and measurable.
decidedOn: "2026-06-19"
systems: [death, multiplayer]
features: [death-and-bonus-hearts]
---

## Problem

Minecraft offers two death models and both are bad.

**Full drop** makes death a logistics emergency. You lose your gear if you cannot beat a five-minute despawn timer, which means the real cost of dying is not the mistake, it is the enchanting time you have to redo. It also scales wrongly: the better your gear, the more catastrophic every death becomes, so the correct response is to stop taking risks.

**keepInventory** removes the stake entirely. Death becomes a fast-travel button with a small experience cost. Every survival system downstream of danger loses its teeth at once.

Almost every multiplayer server ends up on keepInventory, not because it is better design but because full drop is intolerable when a death can cost someone a week.

## Evidence

On playtest servers running full drop, players stopped exploring after acquiring good gear. Deep caving, nether travel and PvP all dropped off, and the stated reason was consistently the risk to equipment rather than the risk of dying.

On playtest servers running keepInventory, players reported that nothing felt dangerous. Lava, falls and creepers became inconveniences.

In both cases the actual mistake that caused the death was never the thing being punished.

## Constraints

**Death must cost something specific.** A penalty you cannot name is not a penalty, it is a mood.

**The cost must be recoverable.** Anything permanent turns a single bad night into a reason to stop playing.

**The cost must not scale with wealth.** A well-equipped player should not be punished more for the same mistake.

**Gear time must be protected.** Enchanting an item in Fixed by Design is a bigger investment than in vanilla, because books are permanent unlocks and slots are limited. Losing that to a fall is worse here than it is in vanilla.

## Considered solutions

**Full drop with a grave.** Keeps the tension but converts every death into a retrieval quest. It also solves the wrong problem: the corpse run is the tedious part, not the danger.

**Experience-only penalty.** Lose all experience, keep everything else. Clean, but experience is trivially renewable at any farm, so the penalty evaporates for exactly the players it should apply to.

**A temporary debuff on respawn.** Weakness or slowness for a few minutes. Punishes the next few minutes of play rather than the death, and it is annoying rather than costly.

**A separate, earned resource that death takes.** Something you accumulate deliberately, that has real value, that is renewable at a known rate, and that is not part of your gear.

## Decision

The last one, built on maximum health.

**You keep your gear.** Worn armor, and every tool and weapon anywhere in your inventory, returns to its original slot on respawn. Maps and recovery compasses too. Everything else drops normally.

**You keep half your experience.**

**You lose every bonus heart.** A **Tidal Draught**, brewed from a Thick Potion and a Heart of the Sea, permanently adds one heart, up to five. Every death resets that to zero. Hearts of the Sea are renewable through fishing, at a 4% chance per treasure catch.

The optional respawn debuff exists in the config and is **off by default**, because losing hearts is meant to be the whole penalty.

## Consequences

**Death costs a nameable amount of time.** Five bonus hearts is roughly five Hearts of the Sea worth of fishing. Players can state what a death cost them, which is something neither vanilla model allows.

**The penalty is flat.** A player in netherite loses exactly what a player in iron loses. Risk-taking stopped correlating with gear quality, and deep caving came back.

**Bonus hearts became a status symbol.** Twenty-two hearts is visibly different from twenty, and the navy hearts are distinctive enough that other players notice. That was not designed, but it turned the system into something players talk about.

**Fishing got a purpose.** Hearts of the Sea are the only renewable source, which gave the fishing rework a reason to exist beyond its own loot tables.

**It is easy to misread as keepInventory.** New players see their sword come back and conclude death is free, then are surprised when their hearts are gone. The bonus hearts are shown on the HUD, but nothing explains the connection at the moment it matters.

**Splash Tidal Draughts let you gift hearts.** Arrows of the Tides can hand a bonus heart to someone else, including someone you are fighting. We kept it because it is funny and because cooperative healing is a good thing to make possible.
