import Link from 'next/link'
import { ProtectedPage } from '@/components/admin/protected-page'
import { getSessionToken } from '@/lib/admin'
import { endpoints, callAdmin } from '@/lib/backend'
import { Icon } from '@/components/icons'
export const dynamic='force-dynamic'

export default async function Dashboard(){
  let data={metrics:{projects:0,newEnquiries:0,media:0,drafts:0},recentEnquiries:[]}
  try { data=await callAdmin(endpoints.overview,await getSessionToken()) } catch {}
  const metrics=data.metrics||{}
  return <ProtectedPage title="Overview" subtitle="Monitor the website, content and incoming enquiries"><div className="admin-content"><div className="status-banner"><div><h3>Your website is live and healthy</h3><p>Content is connected to the production database.</p></div><span className="status-pill">Live website</span></div><div className="admin-grid"><Metric label="Published projects" value={metrics.projects||0}/><Metric label="New enquiries" value={metrics.newEnquiries||0}/><Metric label="Media assets" value={metrics.media||0}/><Metric label="Draft changes" value={metrics.drafts||0}/></div><div className="admin-two-col"><section className="admin-card"><h3>Recent enquiries</h3><p>Latest requests submitted through the website.</p>{data.recentEnquiries?.length?<table className="admin-table"><tbody>{data.recentEnquiries.map((item)=><tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.package||'Custom project'}</td><td><span className="badge">{item.status}</span></td></tr>)}</tbody></table>:<div className="empty-state"><p>No enquiries yet.</p></div>}</section><section className="admin-card"><h3>Quick actions</h3><p>Jump into common website tasks.</p><div className="quick-list"><Quick href="/admin/projects" icon="plus" title="Add portfolio project" text="Publish a new design"/><Quick href="/admin/homepage" icon="home" title="Edit homepage" text="Update website copy"/><Quick href="/admin/enquiries" icon="mail" title="View enquiries" text="Manage new leads"/><Quick href="/admin/settings" icon="settings" title="Site settings" text="Update contact details"/></div></section></div></div></ProtectedPage>
}
function Metric({label,value}){return <article className="metric-card"><span>{label}</span><strong>{value}</strong><small>Production data</small></article>}
function Quick({href,icon,title,text}){return <Link className="quick-link" href={href}><span className="quick-icon"><Icon name={icon}/></span><span><strong>{title}</strong><span>{text}</span></span></Link>}
