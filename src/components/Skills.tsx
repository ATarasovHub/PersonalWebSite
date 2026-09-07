import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/useLanguage'

export default function Skills() {
  const { content } = useLanguage()
  return (
    <Section id="skills" index="02" title={content.sections.skills} alt>
      <div className="skills-grid">
        {content.skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <div className="skill-group">
              <h3>{group.title}</h3>
              <div className="skill-chips">
                {group.items.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
