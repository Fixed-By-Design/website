import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../database/schema'

let client: ReturnType<typeof postgres> | undefined
let database: ReturnType<typeof drizzle<typeof schema>> | undefined

export function useDatabase() {
  if (database) return database

  const url = useRuntimeConfig().databaseUrl
  if (!url) throw createError({ statusCode: 500, statusMessage: 'NUXT_DATABASE_URL is not configured' })

  client = postgres(url, { max: 10 })
  database = drizzle(client, { schema })
  return database
}

export { schema }
export const tables = schema
