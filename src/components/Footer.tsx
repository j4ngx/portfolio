import { PERSONAL } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white/50 py-6 border-t border-border font-mono text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span>
            © {year} {PERSONAL.name.toUpperCase()}
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            System Operational
          </span>
        </div>

        <div className="flex gap-6">
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LINKEDIN
          </a>
        </div>

        <div className="text-white/30">v3.2.1 build_{year}_rev2</div>
      </div>
    </footer>
  )
}
