import { cookies } from 'next/headers'
import { endpoints } from '@/lib/backend'

export async function POST() {
  const store = await cookies()
  const token = store.get('dh_session')?.value || ''
  if (token) {
    await fetch(endpoints.auth + '/logout', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + token },
      cache: 'no-store'
    }).catch(() => {})
  }
  store.delete('dh_session')
  return Response.json({ ok: true })
}
