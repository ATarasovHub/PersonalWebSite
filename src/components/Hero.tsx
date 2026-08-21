import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import GradientBlobs from './GradientBlobs'
import TiltCard from './TiltCard'
import { personal } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const { lang, content } = useLanguage()

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="top" className="hero">
      <GradientBlobs />
      <div className="container hero-inner">
        <motion.div
          /* Re-run the intro when the language changes so the new copy animates in. */
          key={lang}
          className="hero-text"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? { opacity: 0 } : 'hidden'}
          animate={shouldReduceMotion ? { opacity: 1 } : 'show'}
        >
          <motion.span className="hero-eyebrow" variants={item}>
            <MapPin size={14} /> {content.location}
          </motion.span>
          <motion.h1 className="hero-name" variants={item}>
            {personal.name}
          </motion.h1>
          <motion.p className="hero-role" variants={item}>
            {content.role}
          </motion.p>
          <motion.p className="hero-tagline" variants={item}>
            {content.tagline}
          </motion.p>
          <motion.div className="hero-cta" variants={item}>
            <a
              className="pill-button primary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('contact')
              }}
            >
              {content.hero.primaryCta}
            </a>
            <a
              className="pill-button"
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('projects')
              }}
            >
              {content.hero.secondaryCta}
            </a>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          <TiltCard />
        </div>
      </div>

      <motion.a
        className="hero-scroll"
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollTo('about')
        }}
        animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-label={content.hero.scrollLabel}
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  )
}
