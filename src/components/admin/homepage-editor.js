'use client'
import { useEffect, useState } from 'react'

const emptyHome = {
  eyebrow: '',
  headline: '',
  supportingCopy: '',
  whyHeadline: '',
  whyCopy: '',
  primaryCta: { label: '', href: '' },
  secondaryCta: { label: '', href: '' },
  metrics: [
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' }
  ]
}

export function HomepageEditor() {
  const [content, setContent] = useState(emptyHome)
  const [state, setState] = useState({ loading:true, error:'', saved:'' })

  async function load() {
    setState({ loading:true, error:'', saved:'' })
    const response = await fetch('/api/admin/pages?key=home&op=get')
    const data = await response.json()
    if (!response.ok) {
      setState({ loading:false, error:data.error || 'Could not load homepage content', saved:'' })
      return
    }
    const current = data.draft || data.published || {}
    setContent({
      ...emptyHome,
      ...current,
      primaryCta: { ...emptyHome.primaryCta, ...(current.primaryCta || {}) },
      secondaryCta: { ...emptyHome.secondaryCta, ...(current.secondaryCta || {}) },
      metrics: [...emptyHome.metrics].map((metric, index) => ({ ...metric, ...((current.metrics || [])[index] || {}) }))
    })
    setState({ loading:false, error:'', saved:'' })
  }

  useEffect(() => { load() }, [])

  const change = (key, value) => setContent((current) => ({ ...current, [key]: value }))
  const ctaChange = (group, key, value) => setContent((current) => ({ ...current, [group]: { ...(current[group] || {}), [key]: value } }))
  const metricChange = (index, key, value) => setContent((current) => ({
    ...current,
    metrics: current.metrics.map((metric, metricIndex) => metricIndex === index ? { ...metric, [key]: value } : metric)
  }))

  async function save(operation) {
    setState({ loading:true, error:'', saved:'' })
    const response = await fetch(`/api/admin/pages?key=home&op=${operation}`, {
      method:'PATCH',
      headers:{ 'content-type':'application/json' },
      body:JSON.stringify(content)
    })
    const data = await response.json()
    if (!response.ok) {
      setState({ loading:false, error:data.error || 'Could not save homepage content', saved:'' })
      return
    }
    setState({ loading:false, error:'', saved:operation === 'publish' ? 'Homepage published.' : 'Homepage draft saved.' })
    setContent(data.draft || data.published || content)
  }

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <h2>Homepage content</h2>
          <p>Edit the public homepage without touching JSON.</p>
        </div>
        <button className="button button-secondary" onClick={load} disabled={state.loading}>Reload</button>
      </div>
      {state.error && <p className="error-box">{state.error}</p>}
      {state.saved && <p className="form-success">{state.saved}</p>}
      <div className="editor-layout">
        <section className="admin-card">
          <h3>Hero section</h3>
          <div className="modal-grid">
            <Field label="Small label" value={content.eyebrow} onChange={(value)=>change('eyebrow', value)} />
            <Field label="Headline" value={content.headline} onChange={(value)=>change('headline', value)} />
            <Field className="full" label="Supporting copy" textarea value={content.supportingCopy} onChange={(value)=>change('supportingCopy', value)} />
            <Field label="Primary button text" value={content.primaryCta?.label} onChange={(value)=>ctaChange('primaryCta', 'label', value)} />
            <Field label="Primary button link" value={content.primaryCta?.href} onChange={(value)=>ctaChange('primaryCta', 'href', value)} />
            <Field label="Secondary button text" value={content.secondaryCta?.label} onChange={(value)=>ctaChange('secondaryCta', 'label', value)} />
            <Field label="Secondary button link" value={content.secondaryCta?.href} onChange={(value)=>ctaChange('secondaryCta', 'href', value)} />
          </div>
        </section>
        <aside className="admin-card sticky-panel">
          <h3>Publishing</h3>
          <p>Save a draft while designing. Publish when the homepage is ready.</p>
          <div className="quick-list">
            <button className="button button-secondary" onClick={()=>save('save')} disabled={state.loading}>Save draft</button>
            <button className="button button-primary" onClick={()=>save('publish')} disabled={state.loading}>Publish homepage</button>
            <a className="button button-ghost" href="/" target="_blank">Preview website</a>
          </div>
        </aside>
      </div>
      <section className="admin-card admin-section-card">
        <h3>Metrics</h3>
        <div className="metric-editor-grid">
          {content.metrics.map((metric, index) => (
            <div className="mini-panel" key={index}>
              <Field label="Value" value={metric.value} onChange={(value)=>metricChange(index, 'value', value)} />
              <Field label="Label" value={metric.label} onChange={(value)=>metricChange(index, 'label', value)} />
            </div>
          ))}
        </div>
      </section>
      <section className="admin-card admin-section-card">
        <h3>Why DesignHaven</h3>
        <div className="modal-grid">
          <Field label="Section headline" value={content.whyHeadline} onChange={(value)=>change('whyHeadline', value)} />
          <Field label="Section copy" textarea value={content.whyCopy} onChange={(value)=>change('whyCopy', value)} />
        </div>
      </section>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', textarea = false, className = '' }) {
  return (
    <label className={className}>
      {label}
      {textarea
        ? <textarea rows={4} value={value || ''} onChange={(event)=>onChange(event.target.value)} />
        : <input type={type} value={value || ''} onChange={(event)=>onChange(event.target.value)} />}
    </label>
  )
}
