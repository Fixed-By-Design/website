export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
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
      discordUrl: '',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/contribute': { prerender: true },
    '/fr': { prerender: true },
    '/fr/contribute': { prerender: true },
    '/fr/features/**': { isr: 3600 },
    '/fr/wiki/**': { isr: 3600 },
    '/fr/design/**': { isr: 3600 },
    '/fr/changelog': { isr: 3600 },
    '/fr/dashboard/**': { ssr: false, robots: false },
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

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://fixedbydesign.com',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en', name: 'English' },
      { code: 'fr', language: 'fr', name: 'Français' },
    ],
    detectBrowserLanguage: false,
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
    exclude: ['/dashboard/**', '/signin', '/changelog/**', '/fr/dashboard/**', '/fr/signin', '/fr/changelog/**'],
  },
})
