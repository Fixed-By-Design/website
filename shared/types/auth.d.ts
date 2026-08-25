import type { UserRole } from '../constants/workflow'

declare module '#auth-utils' {
  interface User {
    id: string
    githubId: number
    login: string
    name: string | null
    avatarUrl: string | null
    role: UserRole
  }

  interface UserSession {
    loggedInAt: string
  }
}

export {}
