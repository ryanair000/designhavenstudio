'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AuthForm({ mode = 'login' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const body = Object.fromEntries(new FormData(event.currentTarget))
    const response = await fetch('/api/auth/' + mode, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(body) })
    const data = await response.json()
    if (!response.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
    router.replace('/admin')
    router.refresh()
  }
  return <form onSubmit={submit}>{mode==='setup'&&<><label>Full name<input name="fullName" defaultValue="DesignHaven Studio" required/></label><label>One-time setup token<input name="token" required autoComplete="off"/></label></>}<label>Email address<input type="email" name="email" required/></label><label>Password<input type="password" name="password" minLength={10} required/></label>{error&&<p className="auth-error">{error}</p>}<button className="button button-primary button-large" disabled={loading}>{loading?'Please wait...':mode==='setup'?'Create owner account':'Sign in to dashboard'}</button></form>
}
