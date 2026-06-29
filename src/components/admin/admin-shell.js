import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Icon } from '@/components/icons'
import { LogoutButton } from './logout-button'

const groups=[
  ['CONTENT',[['Overview','/admin','grid'],['Projects','/admin/projects','image'],['Categories','/admin/categories','grid'],['Homepage','/admin/homepage','home'],['Services','/admin/services','grid'],['Pricing','/admin/pricing','grid']]],
  ['RELATIONSHIPS',[['Enquiries','/admin/enquiries','mail'],['Testimonials','/admin/testimonials','grid'],['Clients','/admin/clients','user']]],
  ['SYSTEM',[['Media library','/admin/media','image'],['Settings','/admin/settings','settings'],['Users & security','/admin/users','user']]]
]

export function AdminShell({admin,children,title='Dashboard',subtitle='Manage your website content'}){
  return <div className="admin-shell">
    <aside className="admin-sidebar"><Logo admin/><div className="site-health"><span/>designhavenstudio.vercel.app<small>Website is live</small></div><nav className="admin-nav">{groups.map(([group,items])=><div key={group}><strong>{group}</strong>{items.map(([label,href,icon])=><Link href={href} key={href}><Icon name={icon} size={18}/>{label}</Link>)}</div>)}</nav><div className="admin-account"><div className="avatar">DH</div><div><strong>{admin.fullName||admin.full_name||'DesignHaven Studio'}</strong><span>{admin.role||'Owner'}</span></div></div></aside>
    <main className="admin-main"><header className="admin-topbar"><div className="admin-title"><h1>{title}</h1><p>{subtitle}</p></div><div className="admin-actions"><Link className="button button-secondary" href="/" target="_blank">Preview site</Link><LogoutButton/></div></header>{children}<nav className="admin-mobile-bar"><Link href="/admin"><Icon name="grid"/>Overview</Link><Link href="/admin/projects"><Icon name="image"/>Projects</Link><Link href="/admin/enquiries"><Icon name="mail"/>Enquiries</Link><Link href="/admin/settings"><Icon name="settings"/>More</Link></nav></main>
  </div>
}
