import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExperienceTimeline from './components/ExperienceTimeline'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Playground from './components/Playground'
import EducationCerts from './components/EducationCerts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ScrollToTop from './components/ScrollToTop'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="text-subtle font-[var(--font-display)] bg-bg">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-40" />

      <Navbar theme={theme} toggleTheme={toggle} />
      <CommandPalette toggleTheme={toggle} />
      <ScrollToTop />

      <main className="relative z-10 pt-16">
        <Hero />
        <ExperienceTimeline />
        <TechStack />
        <Projects />
        <Playground />
        <EducationCerts />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
