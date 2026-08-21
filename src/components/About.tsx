import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/useLanguage'

export default function About() {
  const { content } = useLanguage()

  return (
    <Section id="about" index="01" title={content.sections.about}>
      <div className="about-grid">
        <div className="about-bio">
          {content.bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="languages">
              {content.spokenLanguages.map((lang) => (
                <span key={lang.name} className="language-chip">
                  {lang.name} <em>{lang.level}</em>
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="about-stats">
          {content.stats.map((stat, i) => (
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
