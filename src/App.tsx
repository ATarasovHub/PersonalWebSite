import './App.css'
import './gsap.css'
import LanguageProvider from './i18n/LanguageProvider'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BottomFade from './components/BottomFade'
import MotionSurface from './components/MotionSurface'

function App() {
  return (
    <LanguageProvider>
      <MotionSurface>
        <div className="grain-overlay" aria-hidden="true" />
        <BottomFade />
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </MotionSurface>
    </LanguageProvider>
  )
}

export default App
