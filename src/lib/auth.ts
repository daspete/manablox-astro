import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite'
import { db, type DatabaseUser } from './db'
import { Lucia } from 'lucia'

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions'
})

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD
    }
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email
    }
  }
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>
  }
}
