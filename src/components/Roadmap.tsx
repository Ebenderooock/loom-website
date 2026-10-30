import { ArrowUpRight } from 'lucide-react'

const phases = [
  { id: 1, title: 'Usenet / NZB', status: 'Deferred proposal', description: 'External SABnzbd and NZBGet clients are supported. A built-in NZB client remains deferred; broader NZB workflow testing is still needed.', file: 'phase-1-usenet-nzb.md' },
  { id: 2, title: 'Media requests', status: 'Core implemented', description: 'Authenticated requests, quotas, admin approval, and Discord/Telegram bots exist. Guest requests, broader approval rules, and availability checks remain proposed.', file: 'phase-2-media-requests.md' },
  { id: 3, title: 'Library maintenance', status: 'Planned expansion', description: 'Extend existing cleanup and disk monitoring with library health, duplicate detection, safe previews, and maintenance tooling.', file: 'phase-3-library-maintenance.md' },
  { id: 4, title: 'Media-server analytics', status: 'Planned expansion', description: 'Build on media-server connections and play-session tracking toward watch-history reports, stream insights, and analytics dashboards.', file: 'phase-4-media-server-analytics.md' },
  { id: 5, title: 'Script engine', status: 'Design proposal', description: 'A proposed scripting layer for custom automation. The phase document is a design, not a promise of a shipped editor or complete plugin SDK.', file: 'phase-5-script-engine.md' },
  { id: 6, title: 'Script marketplace', status: 'Design proposal', description: 'Proposed discovery, installation, and sharing of community scripts, dependent on the script engine.', file: 'phase-6-script-marketplace.md' },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="section-space">
      <div className="page-shell">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">An honest work in progress</span><h2>Working today.<br /><em>More to weave in.</em></h2></div>
          <p>The core search-to-import pipeline is working. Release readiness, broader NZB testing, and the next verticals remain. These six documents describe upcoming work, not six completed milestones.</p>
        </div>
        <div className="roadmap-grid">
          {phases.map((phase) => (
            <a key={phase.id} className="roadmap-card" href={`https://github.com/Ebenderooock/loom/blob/main/docs/roadmap/${phase.file}`}>
              <div className="roadmap-meta"><span>PHASE {phase.id}</span><span className={phase.id === 2 ? 'status-current' : ''}>{phase.status}</span></div>
              <h3>{phase.title}<ArrowUpRight size={17} /></h3>
              <p>{phase.description}</p>
            </a>
          ))}
        </div>
        <div className="readiness-note">
          <div><span className="eyebrow">Release readiness</span><p>Performance benchmarks, documentation, release checks, and continued hardening come before a stable-release claim. APIs and schemas may still change.</p></div>
          <a className="text-link" href="https://github.com/Ebenderooock/loom/tree/main/docs/roadmap">Read the implementation roadmap <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  )
}
