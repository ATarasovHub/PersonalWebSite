import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en } from '../data/content.en'
import { de } from '../data/content.de'
import type { Lang } from '../data/types'
import { LanguageContext, STORAGE_KEY } from './context'

const dictionaries = { en, de }

/** Stored choice first, then the browser's preference, then English. */
function initialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'de') return stored
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    const { meta } = dictionaries[lang]
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.title = meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description)
  }, [lang])

  const toggle = useCallback(() => {
    setLang((current) => (current === 'en' ? 'de' : 'en'))
  }, [])

  const value = useMemo(
    () => ({ lang, content: dictionaries[lang], toggle }),
    [lang, toggle],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}
