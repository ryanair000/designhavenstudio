'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Logo } from './logo'
import { Icon } from './icons'

const links=[['Work','/work'],['Services','/#services'],['Pricing','/pricing'],['About','/about']]
export function SiteHeader(){
 const [open,setOpen]=useState(false)
 return <header className="site-header"><div className="container nav-row"><Logo/><nav className={open?'site-nav open':'site-nav'}>{links.map(([l,h])=><Link key={l} href={h} onClick={()=>setOpen(false)}>{l}</Link>)}<Link className="button button-primary nav-cta" href="/contact" onClick={()=>setOpen(false)}>Start a project <Icon name="arrow" size={17}/></Link></nav><button className="menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle menu"><Icon name={open?'close':'menu'} size={24}/></button></div></header>
}
