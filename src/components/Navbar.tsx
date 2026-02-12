import { useState, useEffect } from 'react'
import { PERSONAL } from '../data/portfolio'
import Icon from './Icon'

const NAV_LINKS = [
  { href: '#summary', label: './summary' },
  { href: '#experience', label: './timeline' },
  { href: '#stack', label: './stack' },
  { href: '#projects', label: './projects' },
  { href: '#education', label: './academic' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
          <div className="hidden md:flex items-baseline space-x-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-primary transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {PERSONAL.available && (
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200 font-mono">
                STATUS: AVAILABLE
              </span>
            )}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="hidden sm:inline-flex bg-primary hover:bg-accent text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Contact
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <Icon icon={mobileOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-muted hover:text-primary transition-colors font-mono text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="block bg-primary hover:bg-accent text-white px-4 py-2 rounded text-sm font-medium text-center"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
