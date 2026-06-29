'use client'
import { useEffect, useState } from 'react'

export function EnquiryManager() {
  const [items,setItems] = useState([])
  const [error,setError] = useState('')
  async function load() {
    const response = await fetch('/api/admin/enquiries')
    const data = await response.json()
    if (response.ok) setItems(Array.isArray(data) ? data : [])
    else setError(data.error || 'Could not load enquiries')
  }
  useEffect(() => { load() }, [])
  async function changeStatus(item,status) {
    const response = await fetch('/api/admin/enquiries?id=' + item.id, {
      method:'PATCH',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({status})
    })
    if (response.ok) load()
    else setError('Could not update the enquiry')
  }
  return <div className="admin-content"><div className="admin-page-head"><div><h2>Quotation enquiries</h2><p>Track incoming requests and lead progress.</p></div><button className="button button-secondary" onClick={load}>Refresh</button></div>{error&&<p className="error-box">{error}</p>}<div className="resource-grid">{items.map((item)=><article className="resource-card" key={item.id}><span className={'badge ' + (item.status==='new'?'warning':'success')}>{item.status}</span><h3>{item.name}</h3><p>{item.description}</p><small>{item.package || 'Custom request'} · {item.category || 'General design'}</small><label>Status<select value={item.status} onChange={(event)=>changeStatus(item,event.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="quoted">Quoted</option><option value="won">Won</option><option value="closed">Closed</option></select></label></article>)}</div>{!items.length&&<div className="empty-state"><p>No enquiries found.</p></div>}</div>
}
