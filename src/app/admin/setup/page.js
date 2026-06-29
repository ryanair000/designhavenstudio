import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/logo'
import { AuthForm } from '@/components/admin/auth-form'
import { getAdmin } from '@/lib/admin'
export const metadata={title:'Set Up Admin',robots:{index:false,follow:false}}
export default async function Setup(){if(await getAdmin())redirect('/admin');return <main className="auth-page"><section className="auth-brand"><Logo admin/><h1>Create the secure owner account.</h1><p>Use the one-time setup token provided with the production handoff. It can only be used once.</p><div className="auth-posters"><span>YOUR<br/>WORK</span><span>YOUR<br/>CONTENT</span><span>YOUR<br/>CONTROL</span></div></section><section className="auth-side"><div className="auth-card"><p className="eyebrow">One-time setup</p><h2>Activate the dashboard</h2><p>Create a strong password with at least ten characters.</p><AuthForm mode="setup"/><p style={{marginTop:20}}><Link className="text-link" href="/admin/login">Back to sign in</Link></p></div></section></main>}
