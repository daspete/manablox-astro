import type { APIContext } from 'astro'
import bcrypt from 'bcrypt'
import { lucia } from '@lib/auth'
import { db, type DatabaseUser } from '@lib/db'

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  if (typeof email !== 'string' || typeof password !== 'string') {
    return new Response(JSON.stringify({ error: 'invalid credentials' }), {
      status: 400
    })
  }

  const user = db.prepare<string, DatabaseUser>('SELECT * FROM users WHERE email = ?').get(email)
  if (!user) {
    return new Response(JSON.stringify({ error: 'invalid credentials' }), {
      status: 400
    })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return new Response(JSON.stringify({ error: 'invalid credentials' }), {
      status: 400
    })
  }

  const session = await lucia.createSession(`${user.id}`, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return new Response()
}
