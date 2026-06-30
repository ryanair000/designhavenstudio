import Link from 'next/link'
import { ProtectedPage } from '@/components/admin/protected-page'
import { clientProjects } from '@/lib/client-projects'

export default function Page(){
  const assets = clientProjects.filter((project) => project.artwork_url)
  return (
    <ProtectedPage title="Media library" subtitle="Manage reusable website images">
      <div className="admin-content">
        <div className="admin-page-head">
          <div>
            <h2>Project artwork</h2>
            <p>Copy these paths into project records or use them as references when replacing artwork.</p>
          </div>
          <Link className="button button-primary" href="/admin/projects">Manage projects</Link>
        </div>
        <div className="media-grid">
          {assets.map((project) => (
            <article className="media-card" key={project.id}>
              <div className="media-thumb" style={{ backgroundImage:`url(${project.artwork_url})` }} role="img" aria-label={project.alt_text || project.title}/>
              <div>
                <h3>{project.title}</h3>
                <p>{project.category}</p>
                <code>{project.artwork_url}</code>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ProtectedPage>
  )
}
