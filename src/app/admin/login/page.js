import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/logo'
import { AuthForm } from '@/components/admin/auth-form'
import { getAdmin } from '@/lib/admin'
export const metadata={title:'Admin Sign In',robots:{index:false,follow:false}}
export default async function Login(){if(await getAdmin())redirect('/admin');return <main className="auth-page"><section className="auth-brand"><Logo admin/><h1>Manage every part of DesignHaven in one place.</h1><p>Update portfolio projects, pricing, services, enquiries and website content without touching code.</p><div className="auth-posters"><span>CREATE<br/>BOLD</span><span>MAKE IT<br/>SEEN</span><span>GROW<br/>VISIBLE</span></div></section><section className="auth-side"><div className="auth-card"><p className="eyebrow">DesignHaven admin</p><h2>Welcome back</h2><p>Sign in to manage your website and client enquiries.</p><AuthForm/><p style={{marginTop:20}}>First time here? <Link className="text-link" href="/admin/setup">Set up owner account</Link></p></div></section></main>}
