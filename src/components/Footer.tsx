import { PERSONAL } from '../data/portfolio'
import { useLocale } from '../hooks/useLocale'

export default function Footer() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-solid text-on-solid/50 py-6 border-t border-border font-mono text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span>
            © {year} {PERSONAL.name.toUpperCase()}
          </span>
        </div>

        <div className="flex gap-6">
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-solid transition-colors"
          >
            GITHUB
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-solid transition-colors"
          >
            LINKEDIN
          </a>
        </div>

        <div className="text-on-solid/30">{t('footer.built')}</div>
      </div>
    </footer>
  )
}
