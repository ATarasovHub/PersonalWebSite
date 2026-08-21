import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, Send } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import GradientBlobs from './GradientBlobs'
import LinkedInIcon from './LinkedInIcon'
import { personal } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const { content } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(content.contact.mailSubject(name))
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}${email ? `\n${content.contact.mailReplyTo}: ${email}` : ''}`,
    )
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" index="06" title={content.sections.contact} alt>
      <div className="contact-wrap">
        <GradientBlobs />

        <div className="contact-grid">
          <Reveal className="contact-intro" from="left">
            <h3>{content.contact.heading}</h3>
            <p>{content.contact.intro}</p>

            <div className="contact-links">
              <a className="pill-button" href={personal.phoneHref}>
                <Phone size={16} /> {personal.phone}
              </a>
              <a className="pill-button" href={`mailto:${personal.email}`}>
                <Mail size={16} /> {personal.email}
              </a>
              <a
                className="pill-button"
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <LinkedInIcon size={16} /> {personal.linkedinLabel}
              </a>
            </div>
          </Reveal>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <label>
              {content.contact.nameLabel}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={content.contact.namePlaceholder}
                required
              />
            </label>
            <label>
              {content.contact.emailLabel}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.contact.emailPlaceholder}
                required
              />
            </label>
            <label>
              {content.contact.messageLabel}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={content.contact.messagePlaceholder}
                rows={5}
                required
              />
            </label>
            <button type="submit" className="pill-button primary">
              <Send size={16} /> {content.contact.submit}
            </button>
          </motion.form>
        </div>
      </div>
    </Section>
  )
}
