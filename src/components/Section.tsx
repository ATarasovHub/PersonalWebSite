import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  index: string
  title: string
  children: ReactNode
  alt?: boolean
}

export default function Section({ id, index, title, children, alt }: SectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id={id}
      className="section"
      style={{ background: alt ? 'var(--color-bg-elevated)' : 'transparent' }}
    >
      <div className="container">
        <motion.div
          className="section-heading"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="index">{index}</span>
          <h2>{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  )
}
