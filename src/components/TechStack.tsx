import { SKILL_GROUPS } from '../data/portfolio'
import FadeInSection from './FadeInSection'

export default function TechStack() {
  return (
    <section id="stack" className="py-24 bg-bg border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Technical Ecosystem
              </h2>
              <p className="text-subtle mt-2">
                Comprehensive skill set for building production-ready security solutions.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-xs text-muted bg-surface px-3 py-1 rounded border border-border">
                stack_v4.2.0
              </span>
            </div>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, i) => (
            <FadeInSection key={group.title} delay={i * 80}>
              <div className="group bg-surface p-6 rounded border border-border hover:border-primary/30 transition-all hover:shadow-md h-full">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <span className={`w-2 h-2 ${group.color} rounded-full`} />
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-bg rounded text-xs font-mono text-subtle"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
