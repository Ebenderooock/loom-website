export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-layout">
          <a className="footer-brand" href="#" aria-label="Loom home"><img src="/loom-logo.png" alt="" />loom<span>Unified media automation</span></a>
          <div className="footer-links">
            <a href="https://github.com/Ebenderooock/loom/tree/main/docs">Documentation</a>
            <a href="https://github.com/Ebenderooock/loom">GitHub</a>
            <a href="https://github.com/Ebenderooock/loom/blob/main/LICENSE">AGPL-3.0</a>
            <a href="https://github.com/Ebenderooock/loom/discussions">Discussions</a>
          </div>
        </div>
        <p className="footer-note">Not a fork. A clean-room reimplementation. Pre-release, actively developing.</p>
      </div>
    </footer>
  )
}
