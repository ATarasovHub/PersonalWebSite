import { createContext } from 'react'
import type { Content, Lang } from '../data/types'

export type LanguageValue = {
  lang: Lang
  content: Content
  toggle: () => void
}

export const LanguageContext = createContext<LanguageValue | null>(null)

export const STORAGE_KEY = 'preferred-lang'
