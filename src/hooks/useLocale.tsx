import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import translations, { type Locale, type TranslationKey } from '../data/i18n'

interface LocaleContextType {
  locale: Locale
  toggleLocale: () => void
  t: (key: TranslationKey) => string
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({ children }: { readonly children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    return (localStorage.getItem('portfolio-locale') as Locale) || 'en'
  })

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'en' ? 'es' : 'en'
      localStorage.setItem('portfolio-locale', next)
      document.documentElement.lang = next
      return next
    })
  }, [])

  const t = useCallback(
    (key: TranslationKey) => {
      return translations[locale][key] ?? key
    },
    [locale],
  )

  const value = useMemo(
    () => ({ locale, toggleLocale, t }),
    [locale, toggleLocale, t],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
