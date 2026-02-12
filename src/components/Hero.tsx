import { PERSONAL, HERO_DESCRIPTION } from '../data/portfolio'
import Icon from './Icon'
import Terminal from './Terminal'
import FadeInSection from './FadeInSection'

export default function Hero() {
  return (
    <section
      id="summary"
      className="min-h-[90vh] flex items-center justify-center py-20 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column – text */}
        <div className="space-y-8">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface border border-border text-xs font-mono text-primary font-semibold">
              <Icon icon="security" />
              BACKEND PYTHON DEVELOPER & TECH LEAD
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight tracking-tight">
              Building <br />
              <span className="text-accent">
                Secure Backend
              </span>
              <br />
              Infrastructures.
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="bg-surface border border-border rounded-lg p-5 space-y-2 text-sm text-subtle font-medium">
              <div className="flex items-center gap-3">
                <Icon icon="location_on" />
                <span>{PERSONAL.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="phone_iphone" />
                <span>{PERSONAL.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mail" />
                <span>{PERSONAL.email}</span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:text-muted transition-colors"
                >
                  <Icon icon="link" /> GitHub
                </a>
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:text-muted transition-colors"
                >
                  <Icon icon="link" /> LinkedIn
                </a>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <p className="text-lg text-subtle max-w-lg leading-relaxed border-l-4 border-accent pl-6">
              {HERO_DESCRIPTION}
            </p>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#experience"
                className="group flex items-center gap-3 bg-primary hover:bg-accent text-white px-6 py-3 rounded font-medium transition-all shadow-sm"
              >
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                  description
                </span>
                Professional History
              </a>
              <a
                href="#projects"
                className="group flex items-center gap-3 bg-transparent text-muted hover:text-primary px-6 py-3 rounded font-medium transition-all"
              >
                View Projects
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </FadeInSection>
        </div>

        {/* Right column – Terminal */}
        <FadeInSection delay={200} className="relative w-full max-h-[600px] flex items-center justify-center">
          <Terminal />
          <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-border rounded-lg" />
          <div className="absolute -z-10 -top-4 -left-4 w-full h-full border border-muted/30 border-dashed rounded-lg" />
        </FadeInSection>
      </div>
    </section>
  )
}
