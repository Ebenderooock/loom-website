import type { ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
}

export default function GlowCard({ children, className = '' }: GlowCardProps) {
  return <div className={`surface-card ${className}`}>{children}</div>
}
