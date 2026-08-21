import { personal } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

export default function Footer() {
  const { content } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          &copy; {new Date().getFullYear()} {personal.name}
        </span>
        <span className="footer-muted">{content.footer}</span>
      </div>
    </footer>
  )
}
