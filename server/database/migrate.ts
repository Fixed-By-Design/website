import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const url = process.env.NUXT_DATABASE_URL
if (!url) throw new Error('NUXT_DATABASE_URL is not set')

const client = postgres(url, { max: 1 })

await migrate(drizzle(client), { migrationsFolder: './server/database/migrations' })
await client.end()

console.log('Migrations applied.')
