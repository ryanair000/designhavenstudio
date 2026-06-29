import Link from 'next/link'

export function Logo({ admin = false }) {
  return (
    <Link href={admin ? '/admin' : '/'} className="brand" aria-label="DesignHaven Studio home">
      <span className="brand-mark" aria-hidden="true"><span>H</span><i /></span>
      <span className="brand-words"><strong>DESIGNHAVEN</strong><small>{admin ? 'WEBSITE ADMIN' : 'CREATIVE POSTER STUDIO'}</small></span>
    </Link>
  )
}
