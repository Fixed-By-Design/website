import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/fixed_by_design',
  },
  verbose: true,
})
