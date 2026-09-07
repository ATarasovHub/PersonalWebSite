import { useTilt } from '../hooks/useTilt'
import photo from '../assets/photo.jpg'
import { personal } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

export default function TiltCard() {
  const { wrapRef, cardRef } = useTilt()
  const { content } = useLanguage()

  return (
    <div
      ref={wrapRef}
      className="tilt-wrap"
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
            <span className="tilt-dot" /> {content.status}
          </span>
          <span className="tilt-place">{content.location}</span>
        </div>
      </div>
    </div>
  )
}
