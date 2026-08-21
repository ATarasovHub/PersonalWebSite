import { motion, useReducedMotion } from 'framer-motion'
import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/useLanguage'

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()
  const { content } = useLanguage()

  return (
    <Section id="skills" index="02" title={content.sections.skills} alt>
      <div className="skills-grid">
        {content.skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.06}>
            <div className="skill-group">
              <h3>{group.title}</h3>
              <motion.div
                className="skill-chips"
                initial="hidden"
                whileInView="shown"
                viewport={{ once: false, amount: 0.4 }}
                variants={{
                  hidden: {},
                  shown: { transition: { staggerChildren: 0.035 } },
                }}
              >
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-chip"
                    variants={
                      shouldReduceMotion
                        ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
                        : {
                            hidden: { opacity: 0, y: 10, scale: 0.96 },
                            shown: { opacity: 1, y: 0, scale: 1 },
                          }
                    }
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
