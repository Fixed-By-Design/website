export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@nuxtjs/seo',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  colorMode: { preference: 'dark', fallback: 'dark' },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Fixed by Design',
    description: 'An opinionated redesign of Minecraft Survival, built for both solo and multiplayer.',
    defaultLocale: 'en',
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: { default: 'github-dark', dark: 'github-dark' },
          langs: ['json', 'bash', 'yaml', 'java', 'ts', 'properties'],
        },
      },
    },
  },

  runtimeConfig: {
    databaseUrl: '',
    adminGithubLogins: '',
    public: {
      siteUrl: 'http://localhost:3000',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/contribute': { prerender: true },
    '/features/**': { isr: 3600 },
    '/wiki/**': { isr: 3600 },
    '/design/**': { isr: 3600 },
    '/changelog': { isr: 3600 },
    '/dashboard/**': { ssr: false, robots: false },
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: '2026-08-25',

  eslint: {
    config: { stylistic: true },
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },
})
