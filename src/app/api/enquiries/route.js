import { endpoints } from '@/lib/backend'

export async function POST(request) {
  try {
    const body = await request.json()
    const response = await fetch(endpoints.public + '/enquiries', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store'
    })
    const data = await response.json().catch(() => ({}))
    return Response.json(data, { status: response.status })
  } catch {
    return Response.json({ error: 'The request could not be processed.' }, { status: 500 })
  }
}
