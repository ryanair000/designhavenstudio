import Link from 'next/link'

const themeMap = {
  blue: 'poster-blue',
  coral: 'poster-coral',
  dark: 'poster-dark',
  green: 'poster-green',
  pink: 'poster-pink',
  gold: 'poster-gold'
}

export function PosterVisual({ project, compact = false }) {
  const hasArtwork = Boolean(project.artwork_url)
  const theme = project.metadata?.theme || 'blue'
  const className = `poster-visual ${hasArtwork ? 'poster-artwork' : themeMap[theme] || themeMap.blue} ${compact ? 'compact' : ''}`

  if (hasArtwork) {
    return (
      <div
        className={className}
        role="img"
        aria-label={project.alt_text || project.title}
        style={{ backgroundImage: `url(${project.artwork_url})` }}
      />
    )
  }

  return (
    <div className={className}>
      <span className="poster-line" />
      <span className="poster-kicker">DESIGNHAVEN / {String(project.project_year || 2026).slice(-2)}</span>
      <strong>{project.metadata?.headline || project.title}</strong>
      <span className="poster-chip">{project.category}</span>
    </div>
  )
}

export function PosterCard({ project }) {
  return (
    <article className="project-card">
      <Link href={`/work/${project.slug}`}>
        <PosterVisual project={project} />
        <div className="project-meta">
          <div>
            <h3>{project.title}</h3>
            <p>{project.category} - {project.client_name || 'DesignHaven Studio'}</p>
          </div>
          <span aria-hidden="true">-&gt;</span>
        </div>
      </Link>
    </article>
  )
}
