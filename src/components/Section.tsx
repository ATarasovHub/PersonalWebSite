import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionProps = {
  id: string
  index: string
  title: string
  children: ReactNode
  alt?: boolean
}

export default function Section({ id, index, title, children, alt }: SectionProps) {
  return (
    <section
      id={id}
      className="section"
      style={{ background: alt ? 'var(--color-bg-elevated)' : 'transparent' }}
    >
      <div className="container">
        <Reveal className="section-heading" amount={0.5}>
          <span className="index">{index}</span>
          <h2>{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
