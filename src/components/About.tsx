import { motion, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { bio, stats, languages } from '../data/profile'

export default function About() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section id="about" index="01" title="About">
      <div className="about-grid">
        <motion.div
          className="about-bio"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <div className="languages">
            {languages.map((lang) => (
              <span key={lang.name} className="language-chip">
                {lang.name} <em>{lang.level}</em>
              </span>
            ))}
          </div>
        </motion.div>

        <div className="about-stats">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
