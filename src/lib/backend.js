import { clientCategories, clientProjects } from './client-projects'

export const FUNCTIONS_URL = process.env.NEXT_PUBLIC_DESIGNHAVEN_FUNCTIONS_URL || 'https://llmbgigriltgikzmfmnf.functions.supabase.co'

export const endpoints = {
  public: `${FUNCTIONS_URL}/designhaven-public`,
  auth: `${FUNCTIONS_URL}/designhaven-auth`,
  overview: `${FUNCTIONS_URL}/designhaven-admin-overview`,
  projects: `${FUNCTIONS_URL}/designhaven-admin-projects`,
  categories: `${FUNCTIONS_URL}/designhaven-admin-categories`,
  services: `${FUNCTIONS_URL}/designhaven-admin-services`,
  packages: `${FUNCTIONS_URL}/designhaven-admin-packages`,
  testimonials: `${FUNCTIONS_URL}/designhaven-admin-testimonials`,
  clients: `${FUNCTIONS_URL}/designhaven-admin-clients`,
  enquiries: `${FUNCTIONS_URL}/dh-inbox`,
  pages: `${FUNCTIONS_URL}/dh-pages`,
  settings: `${FUNCTIONS_URL}/dh-config`,
  media: `${FUNCTIONS_URL}/designhaven-admin-media`
}

export const fallbackData = {
  projects: [
    { id:'1', title:'Maziwa Plus Launch', slug:'maziwa-plus-launch', category:'Brands & Products', client_name:'Maziwa Plus', project_year:2026, description:'A bold product launch campaign designed for instant recognition.', featured:true, status:'published', sort_order:1, metadata:{theme:'blue',headline:'FRESH EVERY DAY'} },
    { id:'2', title:'Weekend Menu Offer', slug:'weekend-menu-offer', category:'Food & Hospitality', client_name:'Urban Bites', project_year:2026, description:'A vibrant weekend menu campaign built to drive orders.', featured:true, status:'published', sort_order:2, metadata:{theme:'coral',headline:'TASTE THE WEEKEND'} },
    { id:'3', title:'Creative Summit', slug:'creative-summit', category:'Events & Entertainment', client_name:'Creative Summit', project_year:2026, description:'A confident visual identity for a creative industry gathering.', featured:true, status:'published', sort_order:3, metadata:{theme:'dark',headline:'IDEAS IN MOTION'} },
    { id:'4', title:'Property Campaign', slug:'property-campaign', category:'Business promotions', client_name:'Apex Realty', project_year:2026, description:'A premium property campaign focused on trust and opportunity.', status:'published', sort_order:4, metadata:{theme:'green',headline:'SPACE TO GROW'} },
    { id:'5', title:'Beauty Product Drop', slug:'beauty-product-drop', category:'Brands & Products', client_name:'Luma Beauty', project_year:2026, description:'A polished product-drop campaign for a beauty brand.', status:'published', sort_order:5, metadata:{theme:'pink',headline:'NEW DROP'} },
    { id:'6', title:'Graduation Glow', slug:'graduation-glow', category:'Personal', client_name:'Private client', project_year:2026, description:'A celebratory graduation poster with a premium finish.', status:'published', sort_order:6, metadata:{theme:'gold',headline:'GRADUATION GLOW'} }
  ],
  categories: [
    {name:'Business promotions',slug:'business-promotions'}, {name:'Brands & Products',slug:'brands-products'},
    {name:'Events & Entertainment',slug:'events-entertainment'}, {name:'Food & Hospitality',slug:'food-hospitality'},
    {name:'Corporate',slug:'corporate'}, {name:'Personal',slug:'personal'}
  ],
  services: [
    {id:'s1',title:'Business promotions',description:'Offers, launches and announcements designed to communicate clearly and sell.',display_number:'01'},
    {id:'s2',title:'Brand campaigns',description:'Consistent poster systems for products, social campaigns and monthly visibility.',display_number:'02'},
    {id:'s3',title:'Events & personal',description:'Memorable visuals for events, celebrations and individual milestones.',display_number:'03'}
  ],
  packages: [
    {id:'p1',name:'Single Poster',price_label:'KSh 1,500',summary:'One focused poster for a clear message.',features:['1 custom poster','1 revision round','Social-ready export','3-5 day turnaround']},
    {id:'p2',name:'Business Pack',price_label:'KSh 6,500',summary:'Five coordinated campaign posters.',features:['5 custom posters','2 revision rounds','Two social dimensions','5-7 day turnaround'],badge:'Most popular',highlighted:true},
    {id:'p3',name:'Growth Pack',price_label:'KSh 12,000',summary:'Ten posters with campaign direction.',features:['10 custom posters','Campaign direction','3 revision rounds','Priority turnaround']},
    {id:'p4',name:'Monthly Brand Pack',price_label:'KSh 22,000',summary:'Twenty custom posters every month.',features:['20 monthly posters','Priority queue','Brand consistency','Monthly content planning'],badge:'Monthly'}
  ],
  testimonials: [
    {id:'t1',quote:'DesignHaven turned our promotion into something customers noticed immediately.',client_name:'Verified client',company:'Business promotion'},
    {id:'t2',quote:'The process was clear, quick and the final posters stayed consistent with our brand.',client_name:'Verified client',company:'Brand campaign'},
    {id:'t3',quote:'Communication was easy and the revisions were handled professionally.',client_name:'Verified client',company:'Event design'}
  ],
  clients: [],
  pages: {
    home:{eyebrow:'Creative poster design studio',headline:'Make your brand impossible to ignore.',supportingCopy:'Strategic poster designs for businesses, brands and individuals — created to grab attention and communicate clearly.',primaryCta:{label:'Request a poster design',href:'/contact'},secondaryCta:{label:'View our work',href:'/work'},metrics:[{value:'30+',label:'Designs completed'},{value:'6',label:'Creative categories'},{value:'Fast',label:'Response and delivery'},{value:'100%',label:'Custom-made'}],whyHeadline:'Design that does more than look good.',whyCopy:'Every poster is built around a clear message, visual hierarchy and a goal: helping people notice, understand and act.'},
    about:{eyebrow:'About DesignHaven',headline:'We turn ideas into visuals people remember.',introduction:'DesignHaven Studio helps businesses, brands and individuals communicate through bold, thoughtful and professional poster design.',storyHeadline:'Design is more than decoration.',story:'We combine clear strategy, strong hierarchy and expressive visual direction to create poster designs that are useful, memorable and on-brand.',values:[{title:'Clarity first',description:'Every design starts with the message people need to understand.'},{title:'Made for attention',description:'Strong composition and contrast make the important idea impossible to miss.'},{title:'Professional process',description:'Clear communication, organized revisions and reliable delivery.'}]},
    contact:{headline:'Tell us what you need designed.',supportingCopy:'Share your idea, deadline and preferred package. We will reply with the next steps.'}
  },
  settings:{siteName:'DesignHaven Studio',tagline:'Creative Poster Studio',businessEmail:'hello@designhaven.studio',phone:'+254 700 000 000',whatsapp:'+254 700 000 000',instagram:'designhaven.studio',footerText:'Bold poster design for businesses, brands and individuals.'}
}

function mergeBySlug(primary = [], secondary = []) {
  const seen = new Set(primary.map((item) => item.slug).filter(Boolean))
  return [...primary, ...secondary.filter((item) => !seen.has(item.slug))]
}

function categoryKey(category = {}) {
  return category.slug || category.name?.toLowerCase().replaceAll(' ', '-').replaceAll('&', '').replaceAll('--', '-')
}

function mergeCategories(primary = [], secondary = []) {
  const seen = new Set(primary.map(categoryKey).filter(Boolean))
  return [...primary, ...secondary.filter((category) => !seen.has(categoryKey(category)))]
}

function withClientPortfolio(data) {
  const projects = mergeBySlug(clientProjects, Array.isArray(data.projects) ? data.projects : [])
  const categories = mergeCategories(clientCategories, Array.isArray(data.categories) ? data.categories : [])
  const pages = {
    ...data.pages,
    home: {
      ...(data.pages?.home || {}),
      metrics: [
        { value: '45+', label: 'Designs completed' },
        { value: '8', label: 'Creative categories' },
        { value: 'Fast', label: 'Response and delivery' },
        { value: '100%', label: 'Custom-made' }
      ]
    }
  }
  return { ...data, projects, categories, pages }
}

export async function getPublicData() {
  try {
    const response = await fetch(endpoints.public, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) })
    if (!response.ok) throw new Error('Public content API unavailable')
    return withClientPortfolio(await response.json())
  } catch {
    return withClientPortfolio(fallbackData)
  }
}

export async function callAdmin(endpoint, token, options = {}) {
  const response = await fetch(endpoint, {
    ...options,
    headers: { 'content-type':'application/json', authorization:`Bearer ${token}`, ...(options.headers || {}) },
    cache: 'no-store'
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}
