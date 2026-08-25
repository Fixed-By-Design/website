import type { Pillar } from './features'

export interface PillarDefinition {
  id: Pillar
  label: string
  summary: string
  examples: string[]
  category: string
}

export const PILLAR_DEFINITIONS: PillarDefinition[] = [
  {
    id: 'equipment-enchanting',
    label: 'Equipment & Enchanting',
    summary: 'Enchanting stops being a slot machine. It becomes a catalogue you stock yourself, spent against a budget.',
    examples: ['The Catalogue', 'Enchantment slots', 'Smithing upgrades', 'Material resistances'],
    category: 'enchanting',
  },
  {
    id: 'exploration-navigation',
    label: 'Exploration & Navigation',
    summary: 'Flight runs on campfires you built, and the map becomes an atlas a whole server can edit.',
    examples: ['Campfire flight', 'Map Book', 'Shared cartography', 'Reworked fishing'],
    category: 'maps-navigation',
  },
  {
    id: 'survival-multiplayer',
    label: 'Survival & Multiplayer',
    summary: 'Death costs something real without costing everything, and the world has a shape worth crossing.',
    examples: ['Bonus hearts', 'Partial keep inventory', 'Spawn protection', 'Ore progression'],
    category: 'death',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    summary: 'Rails become infrastructure. Copper sets the speed, and a locomotive pulls a real train behind it.',
    examples: ['Copper rails', 'Furnace locomotives', 'Minecart trains', 'Dispenser Minecart'],
    category: 'minecarts-trains',
  },
]
