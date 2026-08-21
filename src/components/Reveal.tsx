import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Which way the element travels in from. */
  from?: Direction
  delay?: number
  duration?: number
  /** How much of the element must be visible before it plays. */
  amount?: number
}

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  scale: { scale: 0.94 },
}

/**
 * Scroll-triggered reveal. Replays whenever the element re-enters the
 * viewport — scrolling back up plays it again rather than leaving the
 * page visually static.
 */
export default function Reveal({
  children,
  className,
  from = 'up',
  delay = 0,
  duration = 0.55,
  amount = 0.25,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const hidden = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...offsets[from] }
  const shown = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0, scale: 1 }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: false, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
