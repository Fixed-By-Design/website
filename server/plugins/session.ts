import { eq } from 'drizzle-orm'

export default defineNitroPlugin(() => {
  // The role lives in the database, not the cookie. Without this the client keeps
  // whatever role it had at sign-in until the session expires.
  sessionHooks.hook('fetch', async (session) => {
    if (!session.user?.id) return

    const [record] = await useDatabase()
      .select({
        login: tables.users.login,
        name: tables.users.name,
        avatarUrl: tables.users.avatarUrl,
        role: tables.users.role,
      })
      .from(tables.users)
      .where(eq(tables.users.id, session.user.id))
      .limit(1)

    if (!record) return

    session.user = { ...session.user, ...record }
  })
})
