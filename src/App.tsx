import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Publications } from './components/Publications'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { GlobeCompanion } from './components/GlobeCompanion'

function App() {
  // A direct load of /#section fails silently: the browser's native
  // hash-scroll runs before React has mounted the target element, and it
  // never retries. Redo it once the DOM actually has the section.
  useEffect(() => {
    if (!location.hash) return
    document.getElementById(location.hash.slice(1))?.scrollIntoView()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Publications />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <GlobeCompanion />
    </>
  )
}

export default App
