import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatIsLoom from './components/WhatIsLoom'
import Features from './components/Features'
import Architecture from './components/Architecture'
import MediaManagement from './components/MediaManagement'
import GettingStarted from './components/GettingStarted'
import Roadmap from './components/Roadmap'
import Community from './components/Community'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import Guides from './components/Guides'
import { getPage } from './site'

export default function App({ pathname }: { pathname: string }) {
  const page = getPage(pathname)

  return (
    <div className="site-root touch-manipulation">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-purple focus:text-zinc-950 focus:rounded-lg">Skip to Content</a>
      <Navbar />
      <main id="main">
        {page.kind === 'home' ? (
          <>
            <Hero />
            <WhatIsLoom />
            <Features />
            <Architecture />
            <MediaManagement />
            <GettingStarted />
            <Roadmap />
            <Community />
          </>
        ) : page.kind === 'not-found' ? (
          <section className="page-shell guide-page guide-heading">
            <span className="eyebrow">404 · Page not found</span>
            <h1>{page.heading}</h1>
            <p>This page does not exist. <a className="text-link" href="/guides/">Browse the operator guides</a> or <a className="text-link" href="/">return to Loom</a>.</p>
          </section>
        ) : <Guides page={page} />}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
