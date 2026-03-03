import { useState, useEffect, useCallback } from 'react'
import { PERSONAL } from '../data/portfolio'
import Icon from './Icon'
import ThemeToggle from './ThemeToggle'
import { useLocale } from '../hooks/useLocale'
import type { TranslationKey } from '../data/i18n'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#summary', id: 'summary', label: 'summary' },
  { href: '#experience', id: 'experience', label: 'timeline' },
  { href: '#stack', id: 'stack', label: 'stack' },
  { href: '#projects', id: 'projects', label: 'projects' },
  { href: '#playground', id: 'playground', label: 'playground' },
  { href: '#github', id: 'github', label: 'github' },
  { href: '#education', id: 'education', label: 'academic' },
  { href: '#contact', id: 'contact', label: 'contact' },
]

interface NavbarProps {
  readonly theme: 'light' | 'dark'
  readonly toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('summary')
  const { locale, toggleLocale, t } = useLocale()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ── active-section tracker via IntersectionObserver ── */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveSection(e.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  /* ── Cmd+K hint button ── */
  const openPalette = useCallback(() => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }),
    )
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 glass-panel border-b border-border transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#summary" className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="font-bold text-lg text-primary tracking-tight uppercase">
              {PERSONAL.lastName}{' '}
              <span className="text-accent">{PERSONAL.lastNameHighlight}</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden xl:flex items-baseline gap-3 2xl:gap-5 text-[11px] font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors font-mono whitespace-nowrap ${
                  activeSection === link.id
                    ? 'text-accent font-semibold'
                    : 'text-muted hover:text-primary'
                }`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {t(`nav.${link.label}` as TranslationKey)}
              </a>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Search (Cmd+K) */}
            <button
              onClick={openPalette}
              className="hidden xl:inline-flex items-center gap-1 px-2 py-1 rounded border border-border text-[11px] text-muted hover:text-primary hover:border-primary/40 transition-colors font-mono"
              aria-label="Open command palette"
            >
              <Icon icon="search" />
              <kbd className="text-[10px]">⌘K</kbd>
            </button>

            <ThemeToggle theme={theme} toggle={toggleTheme} />

            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="inline-flex items-center px-2 py-1 rounded border border-border text-[11px] text-muted hover:text-primary hover:border-primary/40 transition-colors font-mono font-medium"
              aria-label={`Switch to ${locale === 'en' ? 'Spanish' : 'English'}`}
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </button>

            {PERSONAL.available && (
              <span className="hidden 2xl:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 font-mono">
                AVAILABLE
              </span>
            )}

            <a
              href={`mailto:${PERSONAL.email}`}
              className="hidden sm:inline-flex bg-solid hover:bg-solid-hover text-on-solid px-3 py-1.5 rounded text-xs font-medium transition-colors"
            >
              Contact
            </a>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <Icon icon={mobileOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="xl:hidden pb-4 border-t border-border mt-2 pt-4 space-y-3 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block transition-colors font-mono text-sm ${
                    activeSection === link.id ? 'text-accent font-semibold' : 'text-muted hover:text-primary'
                  }`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {t(`nav.${link.label}` as TranslationKey)}
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${PERSONAL.email}`}
                className="block bg-solid hover:bg-solid-hover text-on-solid px-4 py-2 rounded text-sm font-medium text-center"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.04 }}
              >
                Contact
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
