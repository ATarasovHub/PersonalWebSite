import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, motionQuery } from '../animation/gsap'
import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/useLanguage'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import LinkedInIcon from './LinkedInIcon'

export default function Skills() {
  const { content, lang } = useLanguage()
  const skillsRef = useRef<HTMLDivElement>(null)
  const credentialsRef = useRef<HTMLDivElement>(null)

  /**
   * One highlight crossing the whole grid, the way sunlight comes off a
   * window. Each card carries its own band, and the delay comes from where
   * the card actually sits, so the beam reads as a single pass rather than
   * every card flashing at once. It idles while the section is off screen.
   */
  useGSAP(() => {
    const grid = skillsRef.current
    if (!grid) return
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      const sheens = [...grid.querySelectorAll<HTMLElement>('.skill-sheen')]
      if (!sheens.length) return
      const lefts = sheens.map((sheen) => sheen.getBoundingClientRect().left)
      const first = Math.min(...lefts)
      const span = Math.max(...lefts) - first || 1

      const sweep = gsap.fromTo(sheens,
        { xPercent: -170 },
        {
          xPercent: 170, duration: 1.45, ease: 'none',
          repeat: -1, repeatDelay: 6.2,
          stagger: (i: number) => 0.62 * ((lefts[i] - first) / span),
        })

      ScrollTrigger.create({
        trigger: grid,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => { if (self.isActive) sweep.play(); else sweep.pause() },
      })
    })
    return () => media.revert()
  }, { scope: skillsRef, dependencies: [lang], revertOnUpdate: true })

  /**
   * Credentials get their own entrance instead of the shared Reveal, which is
   * already spent on the skill cards right above. Each card is stamped: it
   * settles out of a tilt, the seal ring opens, the badge inks its own check
   * and the skill chips come up last. Cards in a row land left to right.
   */
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      const cards = credentialsRef.current?.querySelectorAll<HTMLElement>('.credential-card')
      cards?.forEach((card, i) => {
        gsap.timeline({
          delay: (i % 2) * 0.12,
          defaults: { overwrite: 'auto' },
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
          .from(card, {
            autoAlpha: 0, y: 36, rotateX: 11, scale: 0.97, transformOrigin: '50% 100%',
            duration: 0.85, ease: 'power3.out',
            clearProps: 'transform,transformOrigin,opacity,visibility',
          })
          .from(card.querySelector('.credential-sun'), {
            autoAlpha: 0, scale: 0.55, duration: 1.2, ease: 'power2.out',
            clearProps: 'transform,opacity,visibility',
          }, 0.08)
          .from(card.querySelector('.credential-seal'), {
            scale: 0, autoAlpha: 0, duration: 0.95, ease: 'back.out(1.6)',
            clearProps: 'transform,opacity,visibility',
          }, 0.12)
          .from(card.querySelector('.credential-mark'), {
            scale: 0.4, rotate: -32, autoAlpha: 0, duration: 0.55, ease: 'back.out(2.4)',
            clearProps: 'transform,opacity,visibility',
          }, 0.2)
          .from(card.querySelectorAll('.credential-mark path'), {
            drawSVG: '0%', duration: 0.55, ease: 'power2.out', stagger: 0.1,
          }, 0.34)
          .from(card.querySelectorAll('.credential-skills span'), {
            y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out',
            clearProps: 'transform,opacity,visibility',
          }, 0.42)

        // Ambient loops on the corner light. Offset per card so the four
        // never pulse in lockstep, which would read as a single flicker.
        gsap.fromTo(card.querySelector('.credential-seal-ring'),
          { rotation: i * 43 },
          { rotation: i * 43 + 360, duration: 52, ease: 'none', repeat: -1 })
        gsap.to(card.querySelector('.credential-sun-core'), {
          scale: 1.09, opacity: 0.78, duration: 5.4, delay: i * 1.3,
          ease: 'sine.inOut', repeat: -1, yoyo: true,
        })
      })
    })
    return () => media.revert()
  }, { scope: credentialsRef, dependencies: [lang], revertOnUpdate: true })

  return (
    <Section id="skills" index="02" title={content.sections.skills} alt>
      <div className="skills-grid" ref={skillsRef}>
        {content.skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <div className="skill-group">
              <span className="skill-sheen" aria-hidden="true" />
              <h3>{group.title}</h3>
              <div className="skill-chips">
                {group.items.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="credentials-block" ref={credentialsRef}>
        <Reveal>
          <div className="credentials-heading">
            <span>{content.credentialsHeading}</span>
            <span className="credentials-count" aria-label={`${content.credentials.length} ${content.credentialsHeading}`}>
              {String(content.credentials.length).padStart(2, '0')}
            </span>
          </div>
        </Reveal>

        <div className="credentials-grid">
          {content.credentials.map((credential) => (
            <article className="credential-card" key={credential.title}>
              <span className="credential-sun" aria-hidden="true">
                <span className="credential-sun-core" />
              </span>
              <span className="credential-seal" aria-hidden="true">
                <span className="credential-seal-ring" />
              </span>

              <div className="credential-head">
                <span className="credential-mark" aria-hidden="true">
                  <BadgeCheck size={20} strokeWidth={1.8} />
                </span>
                <div className="credential-head-text">
                  <p className="credential-issuer">{credential.issuer}</p>
                  <h3>{credential.title}</h3>
                </div>
              </div>

              <p className="credential-summary">{credential.summary}</p>

              <div className="credential-skills" aria-label={credential.skills.join(', ')}>
                {credential.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <div className="credential-foot">
                <span className="credential-type">{credential.type}</span>
                {credential.href && credential.action && (
                  <a
                    className="credential-link"
                    href={credential.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {credential.action}
                    {credential.linkIcon === 'linkedin'
                      ? <LinkedInIcon size={15} />
                      : <ExternalLink size={15} aria-hidden="true" />}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
