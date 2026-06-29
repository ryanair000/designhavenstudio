import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PosterCard, PosterVisual } from '@/components/poster-card'
import { Icon } from '@/components/icons'
import { getPublicData } from '@/lib/backend'

export const revalidate = 60

export default async function Home() {
  const data = await getPublicData()
  const home = data.pages?.home || {}
  const projects = data.projects || []
  const featured = projects.filter((project) => project.featured).slice(0, 3)
  return (
    <>
      <SiteHeader/>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{home.eyebrow || 'Creative poster design studio'}</p>
              <h1>{home.headline || 'Make your brand impossible to ignore.'}</h1>
              <p className="lead">{home.supportingCopy}</p>
              <div className="button-row">
                <Link className="button button-primary button-large" href="/contact">Request a poster design <Icon name="arrow" size={18}/></Link>
                <Link className="button button-secondary button-large" href="/work">View our work</Link>
              </div>
            </div>
            <div className="hero-art">{projects.slice(0, 3).map((project, index) => <div className={'hero-poster hero-poster-' + (index + 1)} key={project.id}><PosterVisual project={project} compact/></div>)}</div>
          </div>
        </section>
        <section className="metrics"><div className="container metric-grid">{(home.metrics || []).map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></section>
        <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">Selected work</p><h2>Poster designs built to be noticed.</h2></div><Link href="/work" className="text-link">View all projects <Icon name="arrow" size={17}/></Link></div><div className="project-grid">{featured.map((project) => <PosterCard project={project} key={project.id}/>)}</div></div></section>
        <section className="section section-soft" id="services"><div className="container"><div className="section-head"><div><p className="eyebrow">What we design</p><h2>Creative support for every kind of message.</h2></div></div><div className="service-grid">{(data.services || []).map((service) => <article className="service-card" key={service.id}><span>{service.display_number}</span><h3>{service.title}</h3><p>{service.description}</p><Link href={service.link_url || '/work'}>View related work</Link></article>)}</div></div></section>
        <section className="section why-section"><div className="container why-grid"><div><p className="eyebrow light">Why DesignHaven</p><h2>{home.whyHeadline}</h2></div><div><p>{home.whyCopy}</p><ul className="check-list"><li><Icon name="check"/> Clear message hierarchy</li><li><Icon name="check"/> Original design direction</li><li><Icon name="check"/> Organized revision process</li><li><Icon name="check"/> Social-ready delivery</li></ul></div></div></section>
        <section className="section section-soft"><div className="container"><div className="section-head"><div><p className="eyebrow">Client feedback</p><h2>Work that feels clear and professional.</h2></div></div><div className="testimonial-grid">{(data.testimonials || []).map((item) => <blockquote key={item.id}><p>{item.quote}</p><footer><strong>{item.client_name}</strong><span>{item.company}</span></footer></blockquote>)}</div></div></section>
        <section className="cta-section"><div className="container cta-card"><div><p className="eyebrow light">Have something to promote?</p><h2>Turn the idea into a poster people remember.</h2></div><Link className="button button-white button-large" href="/contact">Start a project <Icon name="arrow" size={18}/></Link></div></section>
      </main>
      <SiteFooter settings={data.settings}/>
    </>
  )
}
