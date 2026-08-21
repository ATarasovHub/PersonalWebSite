import { GraduationCap } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { education } from '../data/profile'

export default function Education() {
  return (
    <Section id="education" index="05" title="Education">
      <div className="education-grid">
        {education.map((entry, i) => (
          <Reveal key={entry.title} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.08}>
            <div className="education-card">
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
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
