import { GraduationCap } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/useLanguage'
import khnure from '../assets/khnure-main-building.jpg'
import rbbk from '../assets/robert-bosch-berufskolleg-dortmund.jpg'

/**
 * Both photos come from Wikimedia Commons under licences that require the
 * author to be credited, so the credit is rendered with the image rather
 * than buried somewhere in a footer.
 */
const photos = {
  rbbk: {
    src: rbbk,
    width: 900,
    height: 565,
    author: 'Björn Stankewitz',
    authorUrl: 'https://commons.wikimedia.org/wiki/File:Robert-Bosch-Berufskolleg-Dortmund.jpg',
    licence: 'CC BY 2.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
  khnure: {
    src: khnure,
    width: 900,
    height: 675,
    author: 'Kharkivian',
    authorUrl: 'https://commons.wikimedia.org/wiki/File:KhNURE._Main_Building_1.jpg',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
} as const

export default function Education() {
  const { content } = useLanguage()

  return (
    <Section id="education" index="05" title={content.sections.education}>
      <div className="education-grid">
        {content.education.map((entry, i) => {
          const photo = entry.photo ? photos[entry.photo] : null
          return (
            <Reveal key={entry.title} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.08}>
              <div className="education-card">
                {photo && (
                  <figure className="education-photo">
                    <img
                      src={photo.src}
                      alt={entry.photoAlt ?? entry.org}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* The licence asks for the author to be named. */}
                    <figcaption>
                      <a href={photo.authorUrl} target="_blank" rel="noreferrer noopener">
                        {photo.author}
                      </a>
                      {' · '}
                      <a href={photo.licenceUrl} target="_blank" rel="noreferrer noopener">
                        {photo.licence}
                      </a>
                    </figcaption>
                  </figure>
                )}

                <div className="education-text">
                  <span className="education-icon">
                    <GraduationCap size={20} />
                  </span>
                  <div>
                    <h3>{entry.title}</h3>
                    <p className="education-org">
                      {entry.org} &middot; {entry.period}
                    </p>
                    <p className="education-description">{entry.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
