import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, Send } from 'lucide-react'
import Section from './Section'
import GradientBlobs from './GradientBlobs'
import LinkedInIcon from './LinkedInIcon'
import { personal } from '../data/profile'

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}${email ? `\nReply to: ${email}` : ''}`,
    )
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" index="05" title="Contact">
      <div className="contact-wrap">
        <GradientBlobs />

        <div className="contact-grid">
          <motion.div
            className="contact-intro"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h3>Let's talk</h3>
            <p>
              Open to new backend roles and freelance work. The fastest way to reach me is
              directly — pick whatever's easiest for you.
            </p>

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
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to talk about?"
                rows={5}
                required
              />
            </label>
            <button type="submit" className="pill-button primary">
              <Send size={16} /> Send message
            </button>
          </motion.form>
        </div>
      </div>
    </Section>
  )
}
