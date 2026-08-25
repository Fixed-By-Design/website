import { eq } from 'drizzle-orm'
import { createProblemFromFeedbackSchema, slugifyProblemTitle } from '#shared/schemas/triage'

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, 'maintainer')

  const input = await readValidatedBody(event, createProblemFromFeedbackSchema.parse)
  const db = useDatabase()

  const base = slugifyProblemTitle(input.title)
  if (!base) throw createError({ statusCode: 400, message: 'That title cannot be turned into a slug' })

  const existing = await db.select({ slug: tables.problems.slug }).from(tables.problems)
  const taken = new Set(existing.map(row => row.slug))

  let slug = base
  let suffix = 2
  while (taken.has(slug)) slug = `${base}-${suffix++}`

  const [problem] = await db.insert(tables.problems).values({
    slug,
    title: input.title,
    summary: input.summary,
    context: input.context || null,
    status: input.status,
    severity: input.severity ?? null,
    affectedSystems: input.affectedSystems,
    authorId: user.id,
  }).returning()

  if (!problem) throw createError({ statusCode: 500, message: 'The problem could not be created' })

  if (input.feedbackId) {
    await db.update(tables.feedback)
      .set({
        problemId: problem.id,
        status: 'triaged',
        triagedAt: new Date(),
        triagedById: user.id,
        updatedAt: new Date(),
      })
      .where(eq(tables.feedback.id, input.feedbackId))
  }

  setResponseStatus(event, 201)
  return problem
})
