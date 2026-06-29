import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Logo } from '@/components/logo'
import { getPublicData } from '@/lib/backend'
export const metadata={title:'About',description:'Meet DesignHaven Studio and learn about our poster design approach.'}
export const revalidate=60
export default async function About(){const data=await getPublicData(),a=data.pages?.about||{};return <><SiteHeader/><main><section className="page-hero"><div className="container"><p className="eyebrow">{a.eyebrow||'About DesignHaven'}</p><h1>{a.headline}</h1><p className="lead">{a.introduction}</p></div></section><section className="section"><div className="container about-grid"><div><p className="eyebrow">Our approach</p><h2>{a.storyHeadline}</h2><p className="lead">{a.story}</p><Link href="/contact" className="button button-primary button-large">Start a project</Link></div><div className="about-visual"><div className="about-orb"/><Logo/><strong>CLARITY<br/>MEETS<br/>IMPACT</strong></div></div></section><section className="section section-soft"><div className="container"><div className="section-head"><div><p className="eyebrow">What matters</p><h2>Principles behind every project.</h2></div></div><div className="values-grid">{(a.values||[]).map((v,i)=><article key={v.title}><span>0{i+1}</span><h3>{v.title}</h3><p>{v.description}</p></article>)}</div></div></section></main><SiteFooter settings={data.settings}/></>}
