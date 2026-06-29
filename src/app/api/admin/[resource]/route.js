import { cookies } from 'next/headers'
import { endpoints } from '@/lib/backend'

const map = {
  projects: endpoints.projects,
  categories: endpoints.categories,
  services: endpoints.services,
  packages: endpoints.packages,
  testimonials: endpoints.testimonials,
  clients: endpoints.clients,
  enquiries: endpoints.enquiries,
  pages: endpoints.pages,
  settings: endpoints.settings,
  media: endpoints.media,
  overview: endpoints.overview
}

async function proxy(request, { params }) {
  const { resource } = await params
  const base = map[resource]
  if (!base) return Response.json({ error: 'Unknown resource' }, { status: 404 })
  const token = (await cookies()).get('dh_session')?.value || ''
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const sourceUrl = new URL(request.url)
  const target = new URL(base)
  sourceUrl.searchParams.forEach((value, key) => target.searchParams.set(key, value))
  let body
  if (!['GET', 'HEAD'].includes(request.method)) body = await request.text()
  const response = await fetch(target, {
    method: request.method,
    headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
    body,
    cache: 'no-store'
  })
  const data = await response.text()
  return new Response(data, { status: response.status, headers: { 'content-type': 'application/json' } })
}

export const GET = proxy
export const POST = proxy
export const PATCH = proxy
export const DELETE = proxy
