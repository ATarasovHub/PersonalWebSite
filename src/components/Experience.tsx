import { useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/useLanguage'

export default function Experience() {
  const { content } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const timelineRef = useRef<HTMLDivElement>(null)

  // The timeline line fills as the section scrolls past, rather than
  // drawing once and staying full.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <Section id="experience" index="04" title={content.sections.experience} alt>
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-track" />
        <motion.div className="timeline-line" style={{ scaleY: lineScale }} />

        {content.experienceEntries.map((entry, i) => {
          const isOpen = openIndex === i
          return (
            <Reveal key={entry.role + entry.period} from="left" delay={i * 0.08}>
              <article className="timeline-entry">
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
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
