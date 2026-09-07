import type { ReactNode } from 'react'

type SectionProps = { id: string; index: string; title: string; children: ReactNode; alt?: boolean }

export default function Section({ id, index, title, children, alt }: SectionProps) {
  return (
    <section id={id} className="section" style={{ background: alt ? 'var(--color-bg-elevated)' : 'transparent' }}>
      <div className="container">
        <div className="section-heading">
          <span className="index">{index}</span>
          <h2 aria-label={title}>
            {title.split(' ').map((word, i) => <span className="heading-mask" key={i} aria-hidden="true"><span className="heading-word">{word}</span>{' '}</span>)}
          </h2>
          <span className="section-rule" aria-hidden="true" />
        </div>
        {children}
      </div>
    </section>
  )
}
