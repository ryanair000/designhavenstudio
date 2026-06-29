import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { endpoints } from './backend'

export async function getSessionToken() {
  const store = await cookies()
  return store.get('dh_session')?.value || ''
}

export async function getAdmin() {
  const token = await getSessionToken()
  if (!token) return null
  try {
    const response = await fetch(`${endpoints.auth}/me`, { headers:{authorization:`Bearer ${token}`}, cache:'no-store' })
    if (!response.ok) return null
    const data = await response.json()
    return data.admin || null
  } catch { return null }
}

export async function requireAdmin() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  return admin
}
