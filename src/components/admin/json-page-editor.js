'use client'
import { useEffect, useState } from 'react'

export function JsonPageEditor({ pageKey, title, description }) {
  const [value, setValue] = useState('{}')
  const [state, setState] = useState({ loading:true, error:'', saved:'' })
  async function load() {
    setState({ loading:true, error:'', saved:'' })
    const response = await fetch(`/api/admin/pages?key=${pageKey}&op=get`)
    const data = await response.json()
    if (response.ok) {
      setValue(JSON.stringify(data.draft || data.published || {}, null, 2))
      setState({ loading:false, error:'', saved:'' })
    } else setState({ loading:false, error:data.error || 'Could not load', saved:'' })
  }
  useEffect(() => { load() }, [])
  async function act(operation) {
    let payload
    try { payload = JSON.parse(value) } catch { setState((current) => ({ ...current, error:'The content contains invalid JSON.' })); return }
    setState({ loading:true, error:'', saved:'' })
    const response = await fetch(`/api/admin/pages?key=${pageKey}&op=${operation}`, { method:'PATCH', headers:{'content-type':'application/json'}, body:JSON.stringify(payload) })
    const data = await response.json()
    if (!response.ok) setState({ loading:false, error:data.error || 'Could not save', saved:'' })
    else {
      setValue(JSON.stringify(data.draft || data.published || payload, null, 2))
      setState({ loading:false, error:'', saved:operation === 'publish' ? 'Published successfully.' : 'Draft saved.' })
    }
  }
  return <div className="admin-content"><div className="admin-page-head"><div><h2>{title}</h2><p>{description}</p></div><button className="button button-secondary" onClick={load}>Reload</button></div>{state.error&&<p className="error-box">{state.error}</p>}{state.saved&&<p className="form-success">{state.saved}</p>}<div className="editor-layout"><section className="admin-card"><h3>Page content</h3><p>Edit the structured page content and keep the JSON keys intact.</p><textarea className="json-editor" value={value} onChange={(event)=>setValue(event.target.value)} spellCheck={false}/></section><aside className="admin-card sticky-panel"><h3>Publishing</h3><p>Save a private draft, then publish it when ready.</p><div className="quick-list"><button className="button button-secondary" onClick={()=>act('save')} disabled={state.loading}>Save draft</button><button className="button button-primary" onClick={()=>act('publish')} disabled={state.loading}>Save and publish</button><a className="button button-ghost" href="/" target="_blank">Preview public website</a></div></aside></div></div>
}
