import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExperienceTimeline from './components/ExperienceTimeline'
import TechStack from './components/TechStack'
import SkillRadar from './components/SkillRadar'
import Projects from './components/Projects'
import Playground from './components/Playground'
import GitHubStats from './components/GitHubStats'
import Blog from './components/Blog'
import EducationCerts from './components/EducationCerts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import { useTheme } from './hooks/useTheme'

/* Lazy-load heavy demo components */
const GladosDemo = lazy(() => import('./components/GladosDemo'))
const EvoFitDemo = lazy(() => import('./components/EvoFitDemo'))
const ForgeDemo = lazy(() => import('./components/ForgeDemo'))

function DemoFallback() {
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <span className="text-muted text-sm font-mono animate-pulse">Loading demo…</span>
    </div>
  )
}

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
        <SkillRadar />
        <Projects />
        <ErrorBoundary>
          <Suspense fallback={<DemoFallback />}>
            <Playground
              GladosDemo={GladosDemo}
              EvoFitDemo={EvoFitDemo}
              ForgeDemo={ForgeDemo}
            />
          </Suspense>
        </ErrorBoundary>
        <GitHubStats />
        <Blog />
        <EducationCerts />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
