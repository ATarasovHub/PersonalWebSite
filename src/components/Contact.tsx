import { useRef, useState } from 'react'
import { Check, Copy, Download, Mail } from 'lucide-react'
import { gsap, useGSAP, motionQuery } from '../animation/gsap'
import Section from './Section'
import LinkedInIcon from './LinkedInIcon'
import { personal } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

export default function Contact() {
  const { content, lang } = useLanguage()
  const [copied, setCopied] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const copyIconRef = useRef<HTMLSpanElement>(null)

  // The last screen of the site, so it arrives as one composed movement
  // instead of the generic reveal every other block uses.
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: panelRef.current, start: 'top 82%', once: true },
      })
        .from('.contact-panel .heading-word', { yPercent: 115, rotation: 3, stagger: 0.08, duration: 1 }, 0)
        .from('.contact-intro-text', { y: 22, opacity: 0, duration: 0.75 }, 0.25)
        .from('.contact-action', { y: 28, opacity: 0, stagger: 0.1, duration: 0.8, clearProps: 'transform,opacity' }, 0.38)
        .from('.contact-secondary > *', { y: 14, opacity: 0, stagger: 0.07, duration: 0.6, clearProps: 'all' }, 0.55)
    })
    return () => media.revert()
  }, { scope: panelRef, dependencies: [lang], revertOnUpdate: true })

  // Confirming the copy is the whole feedback, so the swap gets some weight.
  useGSAP(() => {
    if (!window.matchMedia(motionQuery).matches) return
    gsap.fromTo(copyIconRef.current,
      { scale: 0.4, rotation: -40, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.45, ease: 'back.out(2.2)' },
    )
  }, { dependencies: [copied], revertOnUpdate: true })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard blocked, the address is visible on the button anyway. */
    }
  }

  return (
    <Section id="contact" index="06" title={content.sections.contact} alt>
      <div className="contact-wrap">
        <div className="contact-panel" ref={panelRef}>
          <h3 aria-label={content.contact.heading}>
            {content.contact.heading.split(' ').map((word, i) => (
              <span className="heading-mask" key={i} aria-hidden="true">
                <span className="heading-word">{word}</span>{' '}
              </span>
            ))}
          </h3>
          <p className="contact-intro-text">{content.contact.intro}</p>

          <div className="contact-actions">
            <a className="contact-action primary" href={`mailto:${personal.email}`}>
              <Mail size={20} />
              <span className="contact-action-text">
                <strong>{content.contact.emailCta}</strong>
                <small>{personal.email}</small>
              </span>
            </a>

            <a
              className="contact-action"
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              <LinkedInIcon size={20} />
              <span className="contact-action-text">
                <strong>{content.contact.linkedinCta}</strong>
                <small>{personal.linkedinLabel}</small>
              </span>
            </a>
          </div>

          <div className="contact-secondary">
            <button className="contact-minor" onClick={copyEmail}>
              <span className="contact-copy-icon" ref={copyIconRef}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </span>
              {copied ? content.contact.copied : content.contact.copy}
            </button>

            <a className="contact-minor" href={personal.cv[lang]} download={personal.cvFileName[lang]}>
              <Download size={15} /> {content.hero.cvCta}
            </a>

            <span className="contact-note">{content.contact.responseNote}</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
