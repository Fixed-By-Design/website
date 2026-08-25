import { eq } from 'drizzle-orm'
import { minecraftFeedbackSchema } from '#shared/schemas/feedback'

const WINDOW_MS = 60 * 1000
const LIMIT = 30

export default defineEventHandler(async (event) => {
  const header = getRequestHeader(event, 'authorization')
  const presented = header?.startsWith('Bearer ') ? header.slice(7).trim() : ''

  if (!presented) {
    throw createError({ statusCode: 401, message: 'A server API key is required' })
  }

  const db = useDatabase()
  const [key] = await db
    .select()
    .from(tables.serverApiKeys)
    .where(eq(tables.serverApiKeys.keyPrefix, extractPrefix(presented)))
    .limit(1)

  if (!key || key.revokedAt || !verifyApiKey(presented, key.keyHash)) {
    throw createError({ statusCode: 401, message: 'That server API key is not valid' })
  }

  const { allowed, retryAfterSeconds } = consumeRateLimit(`api-key:${key.id}`, LIMIT, WINDOW_MS)
  if (!allowed) {
    setResponseHeader(event, 'retry-after', retryAfterSeconds)
    throw createError({ statusCode: 429, message: 'Rate limit exceeded for this server key' })
  }

  const body = await readValidatedBody(event, minecraftFeedbackSchema.safeParse)

  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid feedback payload',
      data: { issues: body.error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message })) },
    })
  }

  const [record] = await db.insert(tables.feedback).values({
    message: body.data.message,
    type: body.data.type,
    source: 'minecraft',
    version: body.data.version || null,
    playerName: body.data.player,
    playerUuid: body.data.playerUuid,
    server: body.data.server || key.serverLabel,
    dimension: body.data.dimension || null,
    x: body.data.x ?? null,
    y: body.data.y ?? null,
    z: body.data.z ?? null,
  }).returning({ id: tables.feedback.id, createdAt: tables.feedback.createdAt, status: tables.feedback.status })

  await db.update(tables.serverApiKeys)
    .set({ lastUsedAt: new Date() })
    .where(eq(tables.serverApiKeys.id, key.id))

  setResponseStatus(event, 201)
  return {
    id: record!.id,
    createdAt: record!.createdAt.toISOString(),
    status: record!.status,
    source: 'minecraft',
  }
})
