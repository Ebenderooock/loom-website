import { Box, Database, Layout } from 'lucide-react'

const highlights = [
  { icon: Box, title: 'One binary', description: 'A Go application built from scratch, not a fork. A unified home for media automation instead of separate core services.' },
  { icon: Database, title: 'One database', description: 'SQLite by default, with PostgreSQL support. Keep the platform’s configuration and library in one place.' },
  { icon: Layout, title: 'One interface', description: 'A responsive React interface for your library, indexers, search, downloads, workflows, and settings.' },
]

export default function WhatIsLoom() {
  return (
    <section className="platform-strip" aria-label="What is Loom">
      <div className="page-shell platform-grid">
        {highlights.map((item) => (
          <article key={item.title}><item.icon size={20} aria-hidden="true" /><div><h2>{item.title}</h2><p>{item.description}</p></div></article>
        ))}
      </div>
    </section>
  )
}
