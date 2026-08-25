export default defineOAuthGitHubEventHandler({
  config: { scope: ['read:user'] },

  async onSuccess(event, { user: githubUser }) {
    const db = useDatabase()
    const adminLogins = String(useRuntimeConfig().adminGithubLogins || '')
      .split(',')
      .map(login => login.trim().toLowerCase())
      .filter(Boolean)

    const isAdmin = adminLogins.includes(String(githubUser.login).toLowerCase())

    const [record] = await db.insert(tables.users).values({
      githubId: githubUser.id,
      login: githubUser.login,
      name: githubUser.name ?? null,
      avatarUrl: githubUser.avatar_url ?? null,
      role: isAdmin ? 'admin' : 'player',
    }).onConflictDoUpdate({
      target: tables.users.githubId,
      set: {
        login: githubUser.login,
        name: githubUser.name ?? null,
        avatarUrl: githubUser.avatar_url ?? null,
        lastSeenAt: new Date(),
        ...(isAdmin && { role: 'admin' as const }),
      },
    }).returning()

    if (!record) throw createError({ statusCode: 500, message: 'Could not create the user account' })

    await setUserSession(event, {
      user: {
        id: record.id,
        githubId: record.githubId,
        login: record.login,
        name: record.name,
        avatarUrl: record.avatarUrl,
        role: record.role,
      },
      loggedInAt: new Date().toISOString(),
    })

    return sendRedirect(event, '/dashboard')
  },

  onError(event, error) {
    console.error('GitHub OAuth failed:', error)

    const reason = String(error?.message ?? '').includes('Missing NUXT_OAUTH_GITHUB')
      ? 'not-configured'
      : 'failed'

    return sendRedirect(event, `/signin?error=${reason}`)
  },
})
