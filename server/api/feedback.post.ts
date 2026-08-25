import { webFeedbackSchema } from '#shared/schemas/feedback'

const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, webFeedbackSchema.safeParse)

  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: 'That feedback could not be accepted',
      data: { issues: body.data ? [] : body.error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message })) },
    })
  }

  if (body.data.website) {
    throw createError({ statusCode: 400, message: 'That feedback could not be accepted' })
  }

  const fingerprint = requestFingerprint(event)
  const { allowed, retryAfterSeconds } = consumeRateLimit(`feedback:${fingerprint}`, LIMIT, WINDOW_MS)

  if (!allowed) {
    setResponseHeader(event, 'Retry-After', String(retryAfterSeconds))
    throw createError({ statusCode: 429, message: 'You have sent several messages already. Try again shortly.' })
  }

  const session = await getUserSession(event)

  const [record] = await useDatabase().insert(tables.feedback).values({
    message: body.data.message,
    type: body.data.type,
    source: 'web',
    version: body.data.version || null,
    playerName: body.data.playerName || null,
    submittedById: session.user?.id ?? null,
    submitterHash: fingerprint,
  }).returning({ id: tables.feedback.id })

  setResponseStatus(event, 201)
  return { id: record!.id }
})
