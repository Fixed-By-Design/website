import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { resolveTriage, triageSchema } from '#shared/schemas/triage'

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, 'maintainer')

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.uuid() }).parse)
  const input = await readValidatedBody(event, triageSchema.parse)
  const patch = resolveTriage(input)

  const db = useDatabase()

  const [updated] = await db.update(tables.feedback)
    .set({
      status: patch.status,
      ...(patch.problemId !== undefined && { problemId: patch.problemId }),
      ...(patch.duplicateOfId !== undefined && { duplicateOfId: patch.duplicateOfId }),
      triagedAt: patch.triaged ? new Date() : null,
      triagedById: patch.triaged ? user.id : null,
      updatedAt: new Date(),
    })
    .where(eq(tables.feedback.id, id))
    .returning({ id: tables.feedback.id, status: tables.feedback.status })

  if (!updated) throw createError({ statusCode: 404, message: 'That feedback entry does not exist' })

  return updated
})
