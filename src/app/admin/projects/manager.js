import { ResourceManager } from '@/components/admin/resource-manager'

const fields = {
  title: { label:'Project title', required:true },
  slug: { label:'Project slug', required:true },
  category: { label:'Category' },
  client_name: { label:'Client name' },
  project_year: { label:'Project year', type:'number', default:2026 },
  deliverable: { label:'Deliverable', default:'Poster design' },
  description: { label:'Description', type:'textarea' },
  artwork_url: { label:'Artwork URL' },
  alt_text: { label:'Alternative text' },
  featured: { label:'Show on homepage', type:'checkbox' },
  status: { label:'Status', type:'select', options:['draft','published','scheduled','archived'] },
  sort_order: { label:'Display order', type:'number' }
}

export function ProjectsManager(){return <ResourceManager resource="projects" title="Projects" description="Create and update portfolio projects." fields={fields}/>} 
