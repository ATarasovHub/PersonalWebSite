import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { Moon, Sun } from 'lucide-react'
import { gsap, useGSAP, motionQuery } from '../animation/gsap'
import { useLanguage } from '../i18n/useLanguage'
import { useTheme } from '../theme/useTheme'

export default function ThemeToggle() {
  const { content } = useLanguage()
  const { theme, toggle } = useTheme()
  const icon = useRef<HTMLSpanElement>(null)
  const ripple = useRef<HTMLDivElement>(null)
  const busy = useRef(false)
  const { contextSafe } = useGSAP()
  const label = theme === 'dark' ? content.themeToggle.toLight : content.themeToggle.toDark

  useGSAP(() => {
    if (window.matchMedia(motionQuery).matches) {
      gsap.fromTo(icon.current, { rotation: -75, scale: 0.5, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' })
    }
  }, { dependencies: [theme], revertOnUpdate: true })

  const change = (event: React.MouseEvent<HTMLButtonElement>) => contextSafe(() => {
    if (busy.current) return
    if (!window.matchMedia(motionQuery).matches || !ripple.current) { toggle(); return }
    busy.current = true
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    gsap.set(ripple.current, {
      width: radius * 2, height: radius * 2, left: x - radius, top: y - radius,
      backgroundColor: theme === 'light' ? '#06090a' : '#f7f5f1', scale: 0, autoAlpha: 1,
    })
    gsap.timeline({ onComplete: () => { busy.current = false }, onInterrupt: () => { busy.current = false } })
      .to(ripple.current, { scale: 1, duration: 0.65, ease: 'power3.inOut' })
      .call(toggle)
      .to(ripple.current, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, '+=0.03')
  })()

  return <>
    <button className="theme-toggle" onClick={change} aria-label={label} title={label}>
      <span ref={icon} className="theme-toggle-icon">{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</span>
    </button>
    {createPortal(<div ref={ripple} className="theme-ripple" aria-hidden="true" />, document.body)}
  </>
}
