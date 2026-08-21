import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/useLanguage'
import type { Lang } from '../data/types'

const options: Lang[] = ['en', 'de']

export default function LangToggle() {
  const { lang, content, toggle } = useLanguage()

  return (
    <button
      className="lang-toggle"
      onClick={toggle}
      aria-label={content.langToggleLabel}
      title={content.langToggleLabel}
    >
      {options.map((option) => (
        <span
          key={option}
          className={option === lang ? 'lang-option active' : 'lang-option'}
        >
          {option === lang && (
            <motion.span className="lang-pill" layoutId="lang-pill" />
          )}
          <span className="lang-label">{option.toUpperCase()}</span>
        </span>
      ))}
    </button>
  )
}
