// Flip to true once the modpack is published. Every download CTA reads this,
// so releasing is a one-line change rather than a hunt through the templates.
export const MODPACK_AVAILABLE = false

export const PROJECT = {
  name: 'Fixed by Design',
  shortName: 'FBD',
  tagline: 'Minecraft Survival, fixed by design.',
  description: 'An opinionated redesign of Minecraft Survival, built for both solo and multiplayer.',
  minecraftVersion: '26.1.2',
  fabricLoaderVersion: '0.19.2',
  modpackName: 'Fixed by Design',
} as const

export const LINKS = {
  // Points at the organisation until the modpack is published; swap in the
  // pack URL at the same time as flipping MODPACK_AVAILABLE.
  modrinth: 'https://modrinth.com/organization/fixed-by-design',
  modrinthOrg: 'https://modrinth.com/organization/fixed-by-design',
  github: 'https://github.com/Fixed-By-Design',
  githubWebsite: 'https://github.com/Fixed-By-Design/website',
  kofi: 'https://ko-fi.com/akitain',
} as const

export const MOD_LINKS: Record<string, { github: string, modrinth: string }> = {
  'enchantment-overhaul': {
    github: 'https://github.com/Fixed-By-Design/enchantment-overhaul',
    modrinth: 'https://modrinth.com/mod/enchantment-overhaul-fabric',
  },
  'exploration-reloaded': {
    github: 'https://github.com/Fixed-By-Design/exploration-reloaded',
    modrinth: 'https://modrinth.com/mod/exploration-reloaded',
  },
  'fairlands': {
    github: 'https://github.com/Fixed-By-Design/fairlands',
    modrinth: 'https://modrinth.com/mod/fairlands',
  },
  'minecarts-overhaul': {
    github: 'https://github.com/Fixed-By-Design/minecarts-overhaul',
    modrinth: 'https://modrinth.com/mod/minecarts-overhaul',
  },
}
