import { useRef, useState } from 'react'
import { gsap, useGSAP, motionQuery } from '../animation/gsap'
import { ChevronDown } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/useLanguage'

export default function Experience() {
  const { content, lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const firstRun = useRef(true)

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      gsap.fromTo('.timeline-line', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', end: 'bottom 65%', scrub: 0.65 },
      })
    })
    return () => media.revert()
  }, { scope: timelineRef, dependencies: [lang], revertOnUpdate: true })

  // The open entry expands to its own height; the first paint just sets it.
  useGSAP(() => {
    const root = timelineRef.current
    if (!root) return
    const instant = firstRun.current || !window.matchMedia(motionQuery).matches
    firstRun.current = false
    root.querySelectorAll<HTMLElement>('.timeline-entry').forEach((entry, i) => {
      const isOpen = openIndex === i
      gsap.to(entry.querySelector('.timeline-highlights'), {
        height: isOpen ? 'auto' : 0, autoAlpha: isOpen ? 1 : 0,
        duration: instant ? 0 : 0.4, ease: 'power2.inOut',
      })
      gsap.to(entry.querySelector('.timeline-chevron'), {
        rotation: isOpen ? 180 : 0, duration: instant ? 0 : 0.35, ease: 'power2.out',
      })
    })
  }, { scope: timelineRef, dependencies: [openIndex, lang] })

  return (
    <Section id="experience" index="04" title={content.sections.experience} alt>
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-track" />
        <div className="timeline-line" aria-hidden="true" />

        {content.experienceEntries.map((entry, i) => {
          const isOpen = openIndex === i
          return (
            <Reveal key={entry.role + entry.period} from="left" delay={i * 0.08}>
              <article className="timeline-entry">
                <span className="timeline-dot" />
                <button
                  className="timeline-header"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div>
                    <h3>{entry.role}</h3>
                    <p className="timeline-org">
                      {entry.org} &middot; {entry.location}
                    </p>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-period">{entry.period}</span>
                    <span className="timeline-chevron">
                      <ChevronDown size={18} />
                    </span>
                  </div>
                </button>

                <p className="timeline-summary">{entry.summary}</p>

                <ul className="timeline-highlights" aria-hidden={!isOpen}>
                  {entry.highlights.map((point, hi) => (
                    <li key={hi}>{point}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
