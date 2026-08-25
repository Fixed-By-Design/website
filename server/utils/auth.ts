import type { H3Event } from 'h3'
import { eq } from 'drizzle-orm'
import { ROLE_RANK, type UserRole } from '#shared/constants/workflow'

export async function requireRole(event: H3Event, minimum: UserRole) {
  const { user } = await requireUserSession(event)

  const [record] = await useDatabase()
    .select({ role: tables.users.role })
    .from(tables.users)
    .where(eq(tables.users.id, user.id))
    .limit(1)

  if (!record) throw createError({ statusCode: 401, message: 'Your account no longer exists' })

  if (ROLE_RANK[record.role] < ROLE_RANK[minimum]) {
    throw createError({ statusCode: 403, message: 'You do not have permission to do that' })
  }

  return { ...user, role: record.role }
}
