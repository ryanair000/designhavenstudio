import Link from 'next/link'
import { ProtectedPage } from '@/components/admin/protected-page'
import { getSessionToken } from '@/lib/admin'
import { endpoints, callAdmin } from '@/lib/backend'
import { clientProjects } from '@/lib/client-projects'
import { Icon } from '@/components/icons'

export const dynamic = 'force-dynamic'

const workflow = [
  ['1', 'Add artwork', 'Upload or host the finished poster, then paste the artwork URL into Projects.'],
  ['2', 'Publish project', 'Set title, category, client, status and whether it appears on the homepage.'],
  ['3', 'Tune homepage', 'Update headline, metrics, CTA buttons and the why section.'],
  ['4', 'Manage enquiries', 'Move each lead from new to contacted, quoted, won or closed.']
]

export default async function Dashboard(){
  let data = { metrics:{ projects:0, newEnquiries:0, media:0, drafts:0 }, recentEnquiries:[] }
  try { data = await callAdmin(endpoints.overview, await getSessionToken()) } catch {}
  const metrics = data.metrics || {}
  const projectCount = Math.max(metrics.projects || 0, clientProjects.length)
  const mediaCount = Math.max(metrics.media || 0, clientProjects.filter((project) => project.artwork_url).length)
  return (
    <ProtectedPage title="Overview" subtitle="Manage the public website, portfolio and incoming design leads">
      <div className="admin-content">
        <div className="status-banner">
          <div>
            <h3>Designer dashboard is ready</h3>
            <p>Portfolio artwork, homepage copy, services, pricing, enquiries and site settings are all managed here.</p>
          </div>
          <span className="status-pill">Production website</span>
        </div>
        <div className="admin-grid">
          <Metric label="Published projects" value={projectCount}/>
          <Metric label="New enquiries" value={metrics.newEnquiries || 0}/>
          <Metric label="Media assets" value={mediaCount}/>
          <Metric label="Draft changes" value={metrics.drafts || 0}/>
        </div>
        <div className="admin-two-col">
          <section className="admin-card">
            <h3>Website management flow</h3>
            <p>Use this order when updating the live site for a new client or campaign.</p>
            <div className="workflow-list">
              {workflow.map(([step, title, text]) => (
                <div className="workflow-item" key={step}>
                  <span>{step}</span>
                  <div><strong>{title}</strong><p>{text}</p></div>
                </div>
              ))}
            </div>
          </section>
          <section className="admin-card">
            <h3>Quick actions</h3>
            <p>Jump into the screens your designer client will use most.</p>
            <div className="quick-list">
              <Quick href="/admin/projects" icon="image" title="Manage portfolio" text="Add or edit client work"/>
              <Quick href="/admin/homepage" icon="home" title="Edit homepage" text="Change copy and metrics"/>
              <Quick href="/admin/media" icon="image" title="Media library" text="Copy artwork paths"/>
              <Quick href="/admin/enquiries" icon="mail" title="Track enquiries" text="Manage new leads"/>
              <Quick href="/admin/settings" icon="settings" title="Site settings" text="Contact and SEO details"/>
            </div>
          </section>
        </div>
        <div className="admin-two-col">
          <section className="admin-card">
            <h3>Recent enquiries</h3>
            <p>Latest requests submitted through the website.</p>
            {data.recentEnquiries?.length ? (
              <table className="admin-table">
                <tbody>
                  {data.recentEnquiries.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.name}</strong></td>
                      <td>{item.package || 'Custom project'}</td>
                      <td><span className="badge">{item.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="empty-state"><p>No enquiries yet.</p></div>}
          </section>
          <section className="admin-card">
            <h3>Client portfolio now live</h3>
            <p>{clientProjects.length} curated client posters are available on the public Work page.</p>
            <div className="button-row">
              <Link className="button button-primary" href="/work" target="_blank">View work page</Link>
              <Link className="button button-secondary" href="/admin/projects">Edit records</Link>
            </div>
          </section>
        </div>
      </div>
    </ProtectedPage>
  )
}

function Metric({label,value}){return <article className="metric-card"><span>{label}</span><strong>{value}</strong><small>Production-ready</small></article>}
function Quick({href,icon,title,text}){return <Link className="quick-link" href={href}><span className="quick-icon"><Icon name={icon}/></span><span><strong>{title}</strong><span>{text}</span></span></Link>}
