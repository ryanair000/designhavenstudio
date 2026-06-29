'use client'
import { useEffect, useState } from 'react'

const initial = { siteName:'DesignHaven Studio', tagline:'Creative Poster Studio', businessEmail:'', phone:'', whatsapp:'', instagram:'', websiteUrl:'', footerText:'', seo:{title:'',description:'',ogTitle:'',ogDescription:''} }

export function SettingsEditor() {
  const [data, setData] = useState(initial)
  const [state, setState] = useState({ loading:true, error:'', saved:false })
  useEffect(() => {
    fetch('/api/admin/settings?op=get').then((response) => response.json().then((value) => ({ ok:response.ok, value }))).then(({ok,value}) => {
      if (ok) setData(value.data || initial)
      else setState({ loading:false, error:value.error || 'Could not load', saved:false })
    }).finally(() => setState((current) => ({ ...current, loading:false })))
  }, [])
  const change = (key,value) => setData((current) => ({ ...current, [key]:value }))
  const seoChange = (key,value) => setData((current) => ({ ...current, seo:{ ...(current.seo || {}), [key]:value } }))
  async function save(event) {
    event.preventDefault()
    setState({ loading:true, error:'', saved:false })
    const response = await fetch('/api/admin/settings?op=save', { method:'PATCH', headers:{'content-type':'application/json'}, body:JSON.stringify(data) })
    const value = await response.json()
    setState({ loading:false, error:response.ok ? '' : value.error || 'Could not save', saved:response.ok })
  }
  return <div className="admin-content"><div className="admin-page-head"><div><h2>Website settings</h2><p>Contact channels, identity and global SEO.</p></div></div>{state.error&&<p className="error-box">{state.error}</p>}{state.saved&&<p className="form-success">Settings saved.</p>}<form className="admin-card" onSubmit={save}><div className="modal-grid"><Field label="Website name" value={data.siteName} onChange={(v)=>change('siteName',v)}/><Field label="Tagline" value={data.tagline} onChange={(v)=>change('tagline',v)}/><Field label="Business email" type="email" value={data.businessEmail} onChange={(v)=>change('businessEmail',v)}/><Field label="Phone" value={data.phone} onChange={(v)=>change('phone',v)}/><Field label="WhatsApp" value={data.whatsapp} onChange={(v)=>change('whatsapp',v)}/><Field label="Instagram username" value={data.instagram} onChange={(v)=>change('instagram',v)}/><Field label="Website URL" value={data.websiteUrl} onChange={(v)=>change('websiteUrl',v)}/><Field label="Footer text" value={data.footerText} onChange={(v)=>change('footerText',v)}/><Field label="Default SEO title" value={data.seo?.title||''} onChange={(v)=>seoChange('title',v)}/><Field label="Meta description" value={data.seo?.description||''} onChange={(v)=>seoChange('description',v)}/><Field label="Social title" value={data.seo?.ogTitle||''} onChange={(v)=>seoChange('ogTitle',v)}/><Field label="Social description" value={data.seo?.ogDescription||''} onChange={(v)=>seoChange('ogDescription',v)}/></div><div className="button-row"><button className="button button-primary" disabled={state.loading}>{state.loading?'Saving...':'Save settings'}</button></div></form></div>
}

function Field({ label, value, onChange, type='text' }) {
  return <label>{label}<input type={type} value={value||''} onChange={(event)=>onChange(event.target.value)}/></label>
}
