'use client'
import { useEffect, useState } from 'react'

export function ResourceManager({ resource, title, description, fields }) {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    const response = await fetch('/api/admin/' + resource)
    const data = await response.json()
    if (response.ok) setItems(Array.isArray(data) ? data : [])
    else setError(data.error || 'Could not load content')
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function createNew() {
    setEditing(Object.fromEntries(Object.entries(fields).map(([name, field]) => [name, field.default ?? ''])))
  }

  function searchableText(item) {
    return [item.title, item.name, item.client_name, item.category, item.description, item.summary, item.quote, item.slug]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
  }

  const visibleItems = items
    .filter((item) => !query || searchableText(item).includes(query.toLowerCase()))
    .sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999))

  async function save(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {}
    for (const [name, field] of Object.entries(fields)) {
      const value = form.get(name)
      if (field.type === 'checkbox') payload[name] = value === 'on'
      else if (field.type === 'number') payload[name] = Number(value || 0)
      else if (field.type === 'list') payload[name] = String(value || '').split('\n').map((entry) => entry.trim()).filter(Boolean)
      else if (field.type === 'json') {
        try { payload[name] = JSON.parse(value || '{}') }
        catch { setError('A JSON field is invalid'); return }
      } else payload[name] = value || ''
    }
    const endpoint = '/api/admin/' + resource + (editing?.id ? '?id=' + editing.id : '')
    const response = await fetch(endpoint, {
      method: editing?.id ? 'PATCH' : 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (!response.ok) { setError(data.error || 'Could not save'); return }
    setEditing(null)
    load()
  }

  async function remove(id) {
    if (!confirm('Remove this item from the dashboard?')) return
    const response = await fetch('/api/admin/' + resource + '?id=' + id, { method:'DELETE' })
    if (response.ok) load()
    else setError('Could not remove item')
  }

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button className="button button-primary" onClick={createNew}>Add new</button>
      </div>
      <div className="admin-toolbar">
        <label>Search<input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search by title, client, category..." /></label>
        <button className="button button-secondary" onClick={load} disabled={loading}>Refresh</button>
      </div>
      {error && <p className="error-box">{error}</p>}
      {loading && <div className="empty-state"><p>Loading content...</p></div>}
      {!loading && visibleItems.length === 0 && <div className="empty-state"><h3>No items found</h3><p>Add a new item or clear the search.</p></div>}
      <div className="resource-grid">
        {visibleItems.map((item) => (
          <article className="resource-card" key={item.id}>
            <ResourcePreview item={item} />
            <div className="resource-card-body">
              <span className={'badge ' + (item.status === 'draft' ? 'warning' : 'success')}>{item.status || (item.visible ? 'Visible' : 'Hidden')}</span>
              <h3>{item.title || item.name || item.client_name}</h3>
              <p>{item.description || item.summary || item.quote || item.slug}</p>
              <small>{[item.category, item.client_name, item.price_label].filter(Boolean).join(' - ')}</small>
              <div className="button-row">
                <button className="button button-secondary" onClick={()=>setEditing(item)}>Edit</button>
                {resource === 'projects' && item.slug && <a className="button button-ghost" href={`/work/${item.slug}`} target="_blank">Preview</a>}
                <button className="button button-ghost" onClick={()=>remove(item.id)}>Remove</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {editing !== null && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={save}>
            <div className="modal-head">
              <h2>{editing.id ? 'Edit' : 'Add'} item</h2>
              <button type="button" className="icon-button" onClick={()=>setEditing(null)} aria-label="Close">x</button>
            </div>
            <div className="modal-grid">
              {Object.entries(fields).map(([name, field]) => {
                const value = editing[name] ?? field.default ?? ''
                if (field.type === 'checkbox') return <label className="switch-row full" key={name}>{field.label}<input type="checkbox" name={name} defaultChecked={Boolean(value)} /></label>
                if (['textarea', 'list', 'json'].includes(field.type)) return <label className="full" key={name}>{field.label}<textarea name={name} rows={5} defaultValue={field.type === 'list' && Array.isArray(value) ? value.join('\n') : field.type === 'json' && typeof value !== 'string' ? JSON.stringify(value, null, 2) : value} /></label>
                if (field.type === 'select') return <label key={name}>{field.label}<select name={name} defaultValue={value}>{field.options.map((option) => <option key={option}>{option}</option>)}</select></label>
                return <label key={name}>{field.label}<input name={name} type={field.type || 'text'} defaultValue={value} required={field.required} /></label>
              })}
            </div>
            <div className="button-row">
              <button className="button button-primary">Save changes</button>
              <button type="button" className="button button-secondary" onClick={()=>setEditing(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function ResourcePreview({ item }) {
  const image = item.artwork_url || item.logo_url
  if (!image) return null
  return <div className="resource-preview" style={{ backgroundImage:`url(${image})` }} role="img" aria-label={item.alt_text || item.logo_alt || item.title || item.name} />
}
