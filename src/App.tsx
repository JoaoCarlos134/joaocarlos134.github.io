import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Publications } from './components/Publications'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
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
    </>
  )
}

export default App
