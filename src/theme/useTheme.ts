import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

/** Light is the default; only an explicit choice for dark is remembered. */
function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    /* Storage can be blocked outright, in which case the default stands. */
    return 'light'
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)

  useEffect(() => {
    // The inline script in index.html sets this before the first paint, so
    // here we are only keeping it in step with later toggles.
    if (theme === 'dark') {
      document.documentElement.dataset.theme = 'dark'
    } else {
      delete document.documentElement.dataset.theme
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      /* The choice just will not survive a reload. */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
