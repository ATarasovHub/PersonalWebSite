import { useEffect, useState } from 'react'

/**
 * Fixed fade that softens the bottom edge of the viewport while scrolling.
 * It hides itself once the footer comes into view, so the footer isn't
 * sitting behind a blur.
 */
export default function BottomFade() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={hidden ? 'bottom-fade is-hidden' : 'bottom-fade'}
      aria-hidden="true"
    />
  )
}
