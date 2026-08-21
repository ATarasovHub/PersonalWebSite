import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import Section from './Section'
import { education } from '../data/profile'

export default function Education() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section id="education" index="04" title="Education" alt>
      <div className="education-grid">
        {education.map((entry, i) => (
          <motion.div
            key={entry.title}
            className="education-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
          >
            <span className="education-icon">
              <GraduationCap size={20} />
            </span>
            <div>
              <h3>{entry.title}</h3>
              <p className="education-org">
                {entry.org} &middot; {entry.period}
              </p>
              <p className="education-description">{entry.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
