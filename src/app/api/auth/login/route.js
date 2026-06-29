import { cookies } from 'next/headers'
import { endpoints } from '@/lib/backend'

export async function POST(request) {
  const body = await request.json()
  const response = await fetch(endpoints.auth + '/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store'
  })
  const data = await response.json().catch(() => ({}))
  if (response.ok && data.token) {
    const store = await cookies()
    store.set('dh_session', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  }
  return Response.json(data, { status: response.status })
}
