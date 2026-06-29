import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PosterVisual } from '@/components/poster-card'
import { Icon } from '@/components/icons'
import { getPublicData } from '@/lib/backend'

export async function generateMetadata({params}){const {slug}=await params;const data=await getPublicData();const p=(data.projects||[]).find(x=>x.slug===slug);return p?{title:p.title,description:p.description}:{title:'Project not found'}}
export default async function ProjectPage({params}){const {slug}=await params;const data=await getPublicData();const project=(data.projects||[]).find(p=>p.slug===slug);if(!project)notFound();return <><SiteHeader/><main><section className="page-hero"><div className="container"><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="lead">{project.description}</p></div></section><section className="section"><div className="container project-detail-grid"><PosterVisual project={project}/><aside className="detail-sidebar"><div><span>Client</span><strong>{project.client_name||'Private client'}</strong></div><div><span>Year</span><strong>{project.project_year}</strong></div><div><span>Deliverable</span><strong>{project.deliverable||'Poster design'}</strong></div><div><span>Category</span><strong>{project.category}</strong></div><Link className="button button-primary button-large" href={`/contact?project=${encodeURIComponent(project.title)}`}>Request something similar <Icon name="arrow" size={18}/></Link></aside></div></section></main><SiteFooter settings={data.settings}/></>}
