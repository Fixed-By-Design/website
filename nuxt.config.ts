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

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Fixed by Design',
    description: 'An opinionated redesign of Minecraft Survival, built for both solo and multiplayer.',
    defaultLocale: 'en',
  },

  colorMode: { preference: 'dark', fallback: 'dark' },

  content: {
    experimental: { sqliteConnector: 'native' },
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
  linkChecker: { enabled: false },

  ogImage: { enabled: false },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/dashboard/**', '/signin', '/changelog/**'],
  },
})
