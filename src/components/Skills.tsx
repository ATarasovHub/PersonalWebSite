import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/useLanguage'
import { BadgeCheck, ExternalLink } from 'lucide-react'

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

      <div className="credentials-block">
        <Reveal>
          <div className="credentials-heading">
            <span>{content.credentialsHeading}</span>
            <span className="credentials-count" aria-label={`${content.credentials.length} ${content.credentialsHeading}`}>
              {String(content.credentials.length).padStart(2, '0')}
            </span>
          </div>
        </Reveal>

        <div className="credentials-grid">
          {content.credentials.map((credential, i) => (
            <Reveal key={credential.title} delay={i * 0.06}>
              <article className="credential-card">
                <div className="credential-topline">
                  <span className="credential-mark" aria-hidden="true">
                    <BadgeCheck size={20} strokeWidth={1.8} />
                  </span>
                  <span className="credential-index">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <p className="credential-issuer">{credential.issuer}</p>
                <h3>{credential.title}</h3>
                <p className="credential-type">{credential.type}</p>
                <p className="credential-summary">{credential.summary}</p>

                <div className="credential-skills" aria-label={credential.skills.join(', ')}>
                  {credential.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                {credential.href && credential.action && (
                  <a
                    className="credential-link"
                    href={credential.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {credential.action}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
