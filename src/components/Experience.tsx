import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from './Section'
import { experience } from '../data/profile'

export default function Experience() {
  const shouldReduceMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const lineRef = useRef<HTMLDivElement>(null)

  return (
    <Section id="experience" index="03" title="Experience">
      <div className="timeline" ref={lineRef}>
        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />

        {experience.map((entry, i) => {
          const isOpen = openIndex === i
          return (
            <motion.article
              key={entry.role + entry.period}
              className="timeline-entry"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <span className="timeline-dot" />
              <button
                className="timeline-header"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <div>
                  <h3>{entry.role}</h3>
                  <p className="timeline-org">
                    {entry.org} &middot; {entry.location}
                  </p>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-period">{entry.period}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </div>
              </button>

              <p className="timeline-summary">{entry.summary}</p>

              <motion.ul
                className="timeline-highlights"
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                {entry.highlights.map((point, hi) => (
                  <li key={hi}>{point}</li>
                ))}
              </motion.ul>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
