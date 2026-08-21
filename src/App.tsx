import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BottomFade from './components/BottomFade'
import CursorCloud from './components/CursorCloud'

function App() {
  return (
    <>
      <CursorCloud />
      <div className="grain-overlay" aria-hidden="true" />
      <BottomFade />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
