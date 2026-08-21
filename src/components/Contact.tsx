import { useState } from 'react'
import { Check, Copy, Download, Mail } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LinkedInIcon from './LinkedInIcon'
import { personal } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

export default function Contact() {
  const { content } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard blocked — the address is visible on the button anyway. */
    }
  }

  return (
    <Section id="contact" index="06" title={content.sections.contact} alt>
      <div className="contact-wrap">
        <Reveal className="contact-panel" amount={0.2}>
          <h3>{content.contact.heading}</h3>
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
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? content.contact.copied : content.contact.copy}
            </button>

            <a className="contact-minor" href={personal.cv} download={personal.cvFileName}>
              <Download size={15} /> {content.hero.cvCta}
            </a>

            <span className="contact-note">{content.contact.responseNote}</span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
