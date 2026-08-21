import { personal } from '../data/profile'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          &copy; {new Date().getFullYear()} {personal.name}
        </span>
        <span className="footer-muted">Built with React &amp; Framer Motion</span>
      </div>
    </footer>
  )
}
