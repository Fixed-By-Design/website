export const PROJECT = {
  name: 'Fixed by Design',
  shortName: 'FBD',
  tagline: 'Minecraft Survival, fixed by design.',
  description: 'An opinionated redesign of Minecraft Survival, built for both solo and multiplayer.',
  minecraftVersion: '26.1.2',
  fabricLoaderVersion: '0.19.2',
  modpackName: 'Fixed SMP',
  modpackVersion: '1.8.0',
} as const

export const LINKS = {
  modrinth: 'https://modrinth.com/modpack/fixed-smp-modpack',
  modrinthOrg: 'https://modrinth.com/organization/fixed-by-design',
  github: 'https://github.com/Fixed-By-Design',
  githubWebsite: 'https://github.com/Fixed-By-Design/website',
  discord: 'https://discord.gg/fixed-by-design',
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
