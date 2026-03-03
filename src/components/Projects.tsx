import { PROFESSIONAL_PROJECTS, PERSONAL_PROJECTS, loc, type Project } from '../data/portfolio'
import FadeInSection from './FadeInSection'
import { useLocale } from '../hooks/useLocale'
import type { TranslationKey } from '../data/i18n'

function ProjectCard({ project, index, tryLiveLabel }: { project: Project; index: number; tryLiveLabel: string }) {
  const { locale } = useLocale()
  const handlePlayground = (tabId: string) => {
    const el = document.getElementById('playground')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    window.dispatchEvent(new CustomEvent('playground-tab', { detail: tabId }))
  }

  return (
    <FadeInSection delay={index * 120}>
      <div className="bg-surface rounded-lg border border-border overflow-hidden group hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="bg-solid p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">{project.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-on-solid">{project.title}</h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-solid/50 hover:text-on-solid transition-colors"
                    title="View on GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                )}
                {project.playground && (
                  <button
                    onClick={() => handlePlayground(project.playground!)}
                    className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-white/15 text-on-solid/80 hover:bg-white/25 hover:text-on-solid transition-colors cursor-pointer"
                    title="Try interactive demo"
                  >
                    <span>▶</span>
                    <span>{tryLiveLabel}</span>
                  </button>
                )}
              </div>
              <p className="text-on-solid/60 text-sm font-mono mt-0.5">{loc(project.subtitle, locale)}</p>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs font-mono bg-white/10 text-on-solid/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic sections grid */}
        <div className="p-6 md:p-8">
          <div className={`grid grid-cols-1 ${
            project.sections.length === 2 ? 'md:grid-cols-2' :
            project.sections.length === 3 ? 'md:grid-cols-3' :
            project.sections.length >= 4 ? 'md:grid-cols-2' : ''
          } gap-8`}>
            {project.sections.map((section, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                  {loc(section.heading, locale)}
                </h4>
                <p className="text-sm text-subtle leading-relaxed">{loc(section.content, locale)}</p>
              </div>
            ))}
          </div>

          {/* Outcomes bar */}
          {project.outcomes.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <div className={`grid gap-6 ${
                ({ 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3' } as Record<number, string>)[Math.min(project.outcomes.length, 3)] ?? 'grid-cols-2 md:grid-cols-4'
              }`}>
                {project.outcomes.map((o, i) => (
                  <div key={i} className="text-center">
                    <span className="text-2xl md:text-3xl font-bold text-primary block">
                      {o.metric}
                    </span>
                    <span className="text-xs text-muted mt-1 block">{loc(o.label, locale)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  )
}

export default function Projects() {
  const { t } = useLocale()

  return (
    <section id="projects" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Projects */}
        <FadeInSection>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('projects.pro' as TranslationKey)}</h2>
            <p className="text-subtle mt-2">
              {t('projects.pro.subtitle' as TranslationKey)}
            </p>
          </div>
        </FadeInSection>

        <div className="space-y-8">
          {PROFESSIONAL_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} tryLiveLabel={t('projects.tryLive')} />
          ))}
        </div>

        {/* Personal / Open-Source Projects */}
        <FadeInSection>
          <div className="mt-20 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('projects.oss' as TranslationKey)}</h2>
            <p className="text-subtle mt-2">
              {t('projects.oss.subtitle' as TranslationKey)}
            </p>
          </div>
        </FadeInSection>

        <div className="space-y-8">
          {PERSONAL_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} tryLiveLabel={t('projects.tryLive')} />
          ))}
        </div>
      </div>
    </section>
  )
}
