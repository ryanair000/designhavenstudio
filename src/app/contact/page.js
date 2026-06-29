import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactForm } from '@/components/contact-form'
import { getPublicData } from '@/lib/backend'
export const metadata={title:'Start a Project',description:'Request a custom poster design from DesignHaven Studio.'}
export const revalidate=60
export default async function Contact(){const data=await getPublicData(),c=data.pages?.contact||{},s=data.settings||{};return <><SiteHeader/><main><section className="page-hero"><div className="container"><p className="eyebrow">Start a project</p><h1>{c.headline}</h1><p className="lead">{c.supportingCopy}</p></div></section><section className="section"><div className="container contact-layout"><div className="admin-card"><ContactForm packages={data.packages||[]}/></div><aside className="contact-info"><p className="eyebrow">Contact details</p><h2>Prefer a direct chat?</h2><p>Send your brief using the form or reach DesignHaven through the listed business contacts.</p><span>{s.businessEmail}</span><span>{s.whatsapp}</span><span>@{String(s.instagram||'').replace('@','')}</span></aside></div></section></main><SiteFooter settings={data.settings}/></>}
