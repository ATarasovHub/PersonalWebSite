import { motion, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { skillGroups } from '../data/profile'

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section id="skills" index="02" title="Skills" alt>
      <div className="skills-grid">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            className="skill-group"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: gi * 0.06 }}
          >
            <h3>{group.title}</h3>
            <div className="skill-chips">
              {group.items.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
