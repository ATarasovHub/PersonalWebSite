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

    // Keep the sharing metadata in step with the visible language.
    const setMeta = (selector: string, value: string) =>
      document.querySelector(selector)?.setAttribute('content', value)

    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
    setMeta('meta[property="og:locale"]', lang === 'de' ? 'de_DE' : 'en_US')
    setMeta('meta[property="og:locale:alternate"]', lang === 'de' ? 'en_US' : 'de_DE')
    setMeta('meta[name="twitter:title"]', meta.title)
    setMeta('meta[name="twitter:description"]', meta.description)
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
