import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PosterCard } from '@/components/poster-card'
import { getPublicData } from '@/lib/backend'

export const metadata={title:'Our Work',description:'Explore poster design projects by DesignHaven Studio.'}
export const revalidate=60
export default async function WorkPage({searchParams}){
 const data=await getPublicData(), params=await searchParams, selected=params?.category||'', categories=data.categories||[]
 const projects=(data.projects||[]).filter(p=>!selected||p.category.toLowerCase().replaceAll(' ','-').replaceAll('&','').replaceAll('--','-').includes(selected)||p.category===selected)
 return <><SiteHeader/><main><section className="page-hero"><div className="container"><p className="eyebrow">Selected projects</p><h1>Work designed to make the message land.</h1><p className="lead">Browse promotional, brand, event and personal poster designs created with clarity and attention in mind.</p></div></section><section className="section"><div className="container"><div className="filter-row"><a className={!selected?'filter-chip active':'filter-chip'} href="/work">All work</a>{categories.map(c=><a className={selected===c.slug?'filter-chip active':'filter-chip'} href={`/work?category=${c.slug}`} key={c.slug}>{c.name}</a>)}</div>{projects.length?<div className="project-grid work-grid">{projects.map(p=><PosterCard project={p} key={p.id}/>)}</div>:<div className="empty-state"><h2>No projects found</h2><p>Try another category.</p></div>}</div></section></main><SiteFooter settings={data.settings}/></>
}
