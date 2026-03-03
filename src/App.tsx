import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExperienceTimeline from './components/ExperienceTimeline'
import TechStack from './components/TechStack'
import SkillRadar from './components/SkillRadar'
import Projects from './components/Projects'
import Playground from './components/Playground'
import GitHubStats from './components/GitHubStats'
import EducationCerts from './components/EducationCerts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import AskMe from './components/AskMe'
import { useTheme } from './hooks/useTheme'
import { LocaleProvider, useLocale } from './hooks/useLocale'

/* Lazy-load heavy demo components */
const GladosDemo = lazy(() => import('./components/GladosDemo'))
const EvoFitDemo = lazy(() => import('./components/EvoFitDemo'))
const ForgeDemo = lazy(() => import('./components/ForgeDemo'))

function DemoFallback() {
  const { t } = useLocale()
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <span className="text-muted text-sm font-mono animate-pulse">{t('app.loading')}</span>
    </div>
  )
}

function SkipToContent() {
  const { t } = useLocale()
  return <>{t('app.skipToContent')}</>
}

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <LocaleProvider>
    <div className="text-subtle font-[var(--font-display)] bg-bg">
      {/* Skip to content (accessibility) */}
      <a
        href="#summary"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:bg-solid focus:text-on-solid focus:px-4 focus:py-2 focus:rounded focus:text-sm"
      >
        <SkipToContent />
      </a>

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
        <EducationCerts />
        <Contact />
      </main>

      <Footer />
      <AskMe />
    </div>
    </LocaleProvider>
  )
}
