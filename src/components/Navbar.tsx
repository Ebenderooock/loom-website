import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Platform', href: '#features' },
  { label: 'Why Loom', href: '#why-loom' },
  { label: 'Quickstart', href: '#getting-started' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Docs', href: 'https://github.com/Ebenderooock/loom/tree/main/docs' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <nav className="page-shell nav-layout" aria-label="Main navigation">
        <a href="#" className="brand-link" aria-label="Loom home"><img src="/loom-logo.png" alt="" />loom<span className="brand-label">MEDIA, CONNECTED.</span></a>
        <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="navigation-links" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
        <div id="navigation-links" className={`nav-links ${mobileOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>)}
          <a className="nav-github" href="https://github.com/Ebenderooock/loom">GitHub <ArrowUpRight size={14} /></a>
        </div>
      </nav>
    </header>
  )
}
