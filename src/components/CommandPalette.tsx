import { useState, useEffect, useRef, useCallback } from 'react'
import { PERSONAL, PERSONAL_PROJECTS, PROFESSIONAL_PROJECTS, loc } from '../data/portfolio'
import { useLocale } from '../hooks/useLocale'
import type { TranslationKey } from '../data/i18n'

interface PaletteItem {
  id: string
  label: string
  subtitle?: string
  icon: string
  action: () => void
}

function buildItems(close: () => void, toggleTheme: (() => void) | undefined, t: (key: TranslationKey) => string, locale: 'en' | 'es'): PaletteItem[] {
  const go = (hash: string) => () => {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    close()
  }

  const sections: PaletteItem[] = [
    { id: 's-summary', label: './summary', subtitle: t('cmd.summary'), icon: 'home', action: go('summary') },
    { id: 's-experience', label: './timeline', subtitle: t('cmd.experience'), icon: 'work', action: go('experience') },
    { id: 's-stack', label: './stack', subtitle: t('cmd.stack'), icon: 'code', action: go('stack') },
    { id: 's-projects', label: './projects', subtitle: t('cmd.projects'), icon: 'folder', action: go('projects') },
    { id: 's-playground', label: './playground', subtitle: t('cmd.playground'), icon: 'sports_esports', action: go('playground') },
    { id: 's-github', label: './github', subtitle: t('cmd.github'), icon: 'monitoring', action: go('github') },
    { id: 's-education', label: './academic', subtitle: t('cmd.education'), icon: 'school', action: go('education') },
    { id: 's-contact', label: './contact', subtitle: t('cmd.contact'), icon: 'mail', action: go('contact') },
  ]

  const projects: PaletteItem[] = [...PROFESSIONAL_PROJECTS, ...PERSONAL_PROJECTS].map((p) => ({
    id: `p-${p.id}`,
    label: p.title,
    subtitle: loc(p.subtitle, locale),
    icon: 'terminal',
    action: () => {
      if (p.playground) {
        document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })
        window.dispatchEvent(new CustomEvent('playground-tab', { detail: p.playground }))
      } else {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }
      close()
    },
  }))

  const actions: PaletteItem[] = [
    {
      id: 'a-cv',
      label: t('cmd.downloadCv'),
      subtitle: t('cmd.downloadCvSub'),
      icon: 'download',
      action: () => { window.open(PERSONAL.cv, '_blank'); close() },
    },
    {
      id: 'a-github',
      label: t('cmd.githubProfile'),
      subtitle: PERSONAL.github,
      icon: 'link',
      action: () => { window.open(PERSONAL.github, '_blank'); close() },
    },
    {
      id: 'a-linkedin',
      label: t('cmd.linkedinProfile'),
      subtitle: PERSONAL.linkedin,
      icon: 'link',
      action: () => { window.open(PERSONAL.linkedin, '_blank'); close() },
    },
  ]

  if (toggleTheme) {
    actions.push({
      id: 'a-theme',
      label: t('cmd.toggleTheme'),
      subtitle: t('cmd.toggleThemeSub'),
      icon: 'dark_mode',
      action: () => { toggleTheme(); close() },
    })
  }

  return [...sections, ...projects, ...actions]
}

function fuzzyMatch(text: string, query: string): boolean {
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  let qi = 0
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++
  }
  return qi === q.length
}

interface Props {
  readonly toggleTheme?: () => void
}

export default function CommandPalette({ toggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelectedIdx(0)
  }, [])

  const { t, locale } = useLocale()
  const items = buildItems(close, toggleTheme, t, locale)
  const filtered = query
    ? items.filter((i) => fuzzyMatch(i.label, query) || fuzzyMatch(i.subtitle ?? '', query))
    : items

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  // Auto-focus input
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Reset selection on query change
  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  // Scroll selected into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIdx] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [selectedIdx])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx((prev) => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      e.preventDefault()
      filtered[selectedIdx].action()
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Palette */}
      <div
        className="relative w-full max-w-lg mx-4 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span className="material-symbols-outlined text-muted text-lg">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('cmd.placeholder')}
            className="flex-1 bg-transparent text-primary text-sm font-mono outline-none placeholder:text-muted"
          />
          <kbd className="hidden sm:inline-flex text-[10px] font-mono text-muted px-1.5 py-0.5 rounded border border-border bg-bg">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-muted text-sm font-mono">
              {t('cmd.noResults').replace('{query}', query)}
            </div>
          )}
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                idx === selectedIdx ? 'bg-solid text-on-solid' : 'text-subtle hover:bg-bg'
              }`}
            >
              <span className="material-symbols-outlined text-lg opacity-60">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium font-mono truncate">{item.label}</div>
                {item.subtitle && (
                  <div className={`text-xs truncate ${idx === selectedIdx ? 'text-on-solid/60' : 'text-muted'}`}>
                    {item.subtitle}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border text-[10px] text-muted font-mono">
          <span>{t('cmd.navigate')}</span>
          <span>{t('cmd.select')}</span>
          <span>{t('cmd.close')}</span>
        </div>
      </div>
    </div>
  )
}
