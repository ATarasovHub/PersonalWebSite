import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { useTheme } from '../theme/useTheme'

export default function ThemeToggle() {
  const { content } = useLanguage()
  const { theme, toggle } = useTheme()
  const label = theme === 'dark' ? content.themeToggle.toLight : content.themeToggle.toDark

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <motion.span
        className="theme-toggle-icon"
        key={theme}
        initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </motion.span>
    </button>
  )
}
