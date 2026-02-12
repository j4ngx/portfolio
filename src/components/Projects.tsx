import { PROJECTS, type Project } from '../data/portfolio'
import FadeInSection from './FadeInSection'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeInSection delay={index * 120}>
      <div className="bg-surface rounded-lg border border-border overflow-hidden group hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="bg-primary p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">{project.icon}</span>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-white/60 text-sm font-mono mt-0.5">{project.subtitle}</p>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs font-mono bg-white/10 text-white/80"
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
            project.sections.length >= 3 ? 'md:grid-cols-3' : ''
          } gap-8`}>
            {project.sections.map((section, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                  {section.heading}
                </h4>
                <p className="text-sm text-subtle leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Outcomes bar */}
          {project.outcomes.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <div className={`grid grid-cols-${Math.min(project.outcomes.length, 4)} gap-6`}>
                {project.outcomes.map((o, i) => (
                  <div key={i} className="text-center">
                    <span className="text-2xl md:text-3xl font-bold text-primary block">
                      {o.metric}
                    </span>
                    <span className="text-xs text-muted mt-1 block">{o.label}</span>
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
  return (
    <section id="projects" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Project Manifest</h2>
            <p className="text-subtle mt-2">
              Selected architectural challenges and outcomes.
            </p>
          </div>
        </FadeInSection>

        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
