import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExperienceTimeline from './components/ExperienceTimeline'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import EducationCerts from './components/EducationCerts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="text-subtle font-[var(--font-display)] bg-bg">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-40" />

      <Navbar theme={theme} toggleTheme={toggle} />

      <main className="relative z-10 pt-16">
        <Hero />
        <ExperienceTimeline />
        <TechStack />
        <Projects />
        <EducationCerts />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
