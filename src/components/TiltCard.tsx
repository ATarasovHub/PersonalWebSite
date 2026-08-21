import { motion } from 'framer-motion'
import { useTilt } from '../hooks/useTilt'
import photo from '../assets/photo.jpg'
import { personal } from '../data/profile'

export default function TiltCard() {
  const { wrapRef, cardRef } = useTilt()

  return (
    <motion.div
      ref={wrapRef}
      className="tilt-wrap"
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
    >
      <div className="tilt-behind" aria-hidden="true" />

      <div ref={cardRef} className="tilt-card">
        <div className="tilt-grid" aria-hidden="true" />

        <div className="tilt-photo">
          <img src={photo} alt={personal.name} />
        </div>

        <div className="tilt-glare" aria-hidden="true" />
        <div className="tilt-vignette" aria-hidden="true" />

        <div className="tilt-caption">
          <span className="tilt-status">
            <span className="tilt-dot" /> Open to work
          </span>
          <span className="tilt-place">{personal.location}</span>
        </div>
      </div>
    </motion.div>
  )
}
