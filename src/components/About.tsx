import Section from './Section'
import Reveal from './Reveal'
import { bio, stats, languages } from '../data/profile'

export default function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="about-grid">
        <div className="about-bio">
          {bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="languages">
              {languages.map((lang) => (
                <span key={lang.name} className="language-chip">
                  {lang.name} <em>{lang.level}</em>
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="about-stats">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} from="scale" delay={i * 0.08}>
              <div className="stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
