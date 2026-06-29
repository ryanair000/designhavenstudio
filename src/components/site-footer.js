import Link from 'next/link'
import { Logo } from './logo'

export function SiteFooter({ settings = {} }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><Logo/><p>{settings.footerText || 'Bold poster design for businesses, brands and individuals.'}</p></div>
        <div><strong>Explore</strong><Link href="/work">Our work</Link><Link href="/pricing">Pricing</Link><Link href="/about">About</Link></div>
        <div><strong>Contact</strong><span>{settings.businessEmail || 'DesignHaven Studio'}</span><Link href="/contact">Request a design</Link></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 DesignHaven Studio</span><Link href="/admin/login">Admin</Link></div>
    </footer>
  )
}
