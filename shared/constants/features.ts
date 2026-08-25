export const FEATURE_CATEGORIES = [
  'enchanting',
  'equipment',
  'combat',
  'death',
  'exploration',
  'maps-navigation',
  'elytra',
  'horses-mounts',
  'fishing',
  'world-generation',
  'loot-trading',
  'multiplayer',
  'pvp',
  'minecarts-trains',
  'quality-of-life',
] as const

export type FeatureCategory = (typeof FEATURE_CATEGORIES)[number]

export const FEATURE_CATEGORY_LABELS: Record<FeatureCategory, string> = {
  'enchanting': 'Enchanting',
  'equipment': 'Equipment',
  'combat': 'Combat',
  'death': 'Death',
  'exploration': 'Exploration',
  'maps-navigation': 'Maps & Navigation',
  'elytra': 'Elytra',
  'horses-mounts': 'Horses & Mounts',
  'fishing': 'Fishing',
  'world-generation': 'World Generation',
  'loot-trading': 'Loot & Trading',
  'multiplayer': 'Multiplayer',
  'pvp': 'PvP',
  'minecarts-trains': 'Minecarts & Trains',
  'quality-of-life': 'Quality of Life',
}

export const FEATURE_STATUSES = ['stable', 'experimental', 'playtesting', 'planned', 'deprecated'] as const

export type FeatureStatus = (typeof FEATURE_STATUSES)[number]

export const FEATURE_STATUS_LABELS: Record<FeatureStatus, string> = {
  stable: 'Stable',
  experimental: 'Experimental',
  playtesting: 'Playtesting',
  planned: 'Planned',
  deprecated: 'Deprecated',
}

export const MODS = ['enchantment-overhaul', 'exploration-reloaded', 'fairlands', 'minecarts-overhaul'] as const

export type ModId = (typeof MODS)[number]

export const MOD_LABELS: Record<ModId, string> = {
  'enchantment-overhaul': 'Enchantment Overhaul',
  'exploration-reloaded': 'Exploration Reloaded',
  'fairlands': 'Fairlands',
  'minecarts-overhaul': 'Minecarts Overhaul',
}

export const PILLARS = [
  'equipment-enchanting',
  'exploration-navigation',
  'survival-multiplayer',
  'transportation',
] as const

export type Pillar = (typeof PILLARS)[number]
