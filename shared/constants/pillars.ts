import type { Pillar } from './features'

export interface PillarDefinition {
  id: Pillar
  label: string
  icon: string
  summary: string
  examples: string[]
  mod: string
  category: string
}

export const PILLAR_DEFINITIONS: PillarDefinition[] = [
  {
    id: 'equipment-enchanting',
    label: 'Equipment & Enchanting',
    icon: 'i-lucide-sparkles',
    summary: 'Enchanting stops being a slot machine. Statistics move to the smithing table, magic stays at the enchanting table, and every item has a budget you have to spend deliberately.',
    examples: ['The Catalogue', 'Discoverable enchantments', 'Enchantment slots', 'Smithing upgrades', 'Reworked repairs', 'Material resistances'],
    mod: 'Enchantment Overhaul',
    category: 'enchanting',
  },
  {
    id: 'exploration-navigation',
    label: 'Exploration & Navigation',
    icon: 'i-lucide-compass',
    summary: 'Travel becomes something you plan. Elytra flight runs on campfires you built, maps collect into a shared atlas, and the world is spread out far enough to be worth crossing.',
    examples: ['Map Book', 'Shared cartography', 'Campfire flight', 'Exploration loot', 'Mount improvements', 'Fishing'],
    mod: 'Exploration Reloaded',
    category: 'maps-navigation',
  },
  {
    id: 'survival-multiplayer',
    label: 'Survival & Multiplayer',
    icon: 'i-lucide-shield',
    summary: 'Death costs something without costing everything. Spawn is protected, PvP has rules that hold up, and the map has a shape that rewards moving away from the crowd.',
    examples: ['Death redesign', 'Bonus hearts', 'PvP rules', 'Spawn protection', 'Geographic progression', 'Server rules'],
    mod: 'Fairlands',
    category: 'death',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    icon: 'i-lucide-train-front',
    summary: 'Rails become infrastructure worth building. Copper tiers set the speed ceiling, furnace carts drive themselves, and a locomotive pulls a real train behind it.',
    examples: ['Copper rails', 'Rail speed tiers', 'Furnace locomotives', 'Minecart trains', 'Specialized minecarts'],
    mod: 'Minecarts Overhaul',
    category: 'minecarts-trains',
  },
]
