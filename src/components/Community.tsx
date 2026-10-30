import { ArrowUpRight, BookOpen, MessageCircle } from 'lucide-react'
import { GithubIcon } from './icons'

const links = [
  { icon: GithubIcon, title: 'Build with us', description: 'Read the code, report an issue, or contribute a change.', href: 'https://github.com/Ebenderooock/loom', cta: 'Explore GitHub' },
  { icon: MessageCircle, title: 'GitHub Discussions', description: 'Ask a question, share your setup, and help shape what comes next.', href: 'https://github.com/Ebenderooock/loom/discussions', cta: 'Join the discussion' },
  { icon: BookOpen, title: 'Your first contribution', description: 'Start with the contributor guide and development conventions.', href: 'https://github.com/Ebenderooock/loom/blob/main/CONTRIBUTING.md', cta: 'Read the guide' },
]

export default function Community() {
  return (
    <section className="section-space community-section">
      <div className="page-shell">
        <div className="section-heading"><span className="eyebrow">Open source, shared direction</span><h2>A better stack is<br /><em>a community effort.</em></h2><p>Built from scratch, with respect for the *arr ecosystem and the people who make self-hosting possible.</p></div>
        <div className="community-grid">{links.map((link) => (
          <a key={link.title} href={link.href} className="community-card"><link.icon size={23} aria-hidden="true" /><h3>{link.title}</h3><p>{link.description}</p><span>{link.cta}<ArrowUpRight size={16} /></span></a>
        ))}</div>
      </div>
    </section>
  )
}
