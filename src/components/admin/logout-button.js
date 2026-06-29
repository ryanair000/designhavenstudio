'use client'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  return <button className="button button-ghost" onClick={async () => { await fetch('/api/auth/logout', { method:'POST' }); router.replace('/admin/login'); router.refresh() }}>Sign out</button>
}
