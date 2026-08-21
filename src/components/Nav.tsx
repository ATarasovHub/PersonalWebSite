import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import LangToggle from './LangToggle'

const ids = ['about', 'skills', 'projects', 'experience', 'education', 'contact'] as const

export default function Nav() {
  const { content } = useLanguage()
  const [active, setActive] = useState<string>('about')
  const [open, setOpen] = useState(false)

  const links = ids.map((id) => ({ id, label: content.nav[id] }))

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container nav-inner">
        <a
          href="#top"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault()
            handleClick('top')
          }}
        >
          AT<span>.</span>
        </a>

        <nav className="nav-links">
          {links.map((link) => (
            <button
              key={link.id}
              className={active === link.id ? 'nav-link active' : 'nav-link'}
              onClick={() => handleClick(link.id)}
            >
              {link.label}
              {active === link.id && (
                <motion.span className="nav-underline" layoutId="nav-underline" />
              )}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <LangToggle />
          <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {links.map((link) => (
              <button
                key={link.id}
                className={active === link.id ? 'nav-mobile-link active' : 'nav-mobile-link'}
                onClick={() => handleClick(link.id)}
              >
                {link.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
