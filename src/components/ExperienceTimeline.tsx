import { EXPERIENCES, type Experience } from '../data/portfolio'
import FadeInSection from './FadeInSection'
import { useLocale } from '../hooks/useLocale'

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const isEven = index % 2 === 0

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between mb-20 group">
      {/* Content – alternating sides */}
      <div
        className={`order-1 w-full md:w-[45%] pl-20 md:pl-0 ${
          isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'
        }`}
      >
        <FadeInSection delay={index * 100}>
          <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
          <div className="text-accent font-mono text-sm mb-1">
            {exp.company} – {exp.location}
          </div>
          <div className="text-muted font-mono text-xs mb-4">{exp.period}</div>
          <ul
            className={`text-subtle text-sm leading-relaxed space-y-2 list-none ${
              isEven ? 'md:text-right' : ''
            }`}
          >
            {exp.bullets.map((bullet, i) => (
              <li key={i}>• {bullet}</li>
            ))}
          </ul>
        </FadeInSection>
      </div>

      {/* Timeline dot */}
      <div
        className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ring-4 ring-surface z-10 ${
          exp.highlight ? 'bg-primary' : 'bg-border'
        }`}
      />

      {/* Tech stack card – opposite side */}
      <div
        className={`order-1 w-full md:w-[45%] pl-20 md:pl-0 ${
          isEven ? 'md:pl-12' : 'md:order-1 md:pr-12 md:text-right'
        }`}
      >
        <FadeInSection delay={index * 100 + 50}>
          <div className="bg-bg p-4 rounded border border-border text-xs font-mono text-muted">
            Tech stack: {exp.techStack}
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}

export default function ExperienceTimeline() {
  const { t } = useLocale()

  return (
    <section id="experience" className="py-24 bg-surface relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('experience.title')}
            </h2>
            <p className="text-subtle max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </div>
        </FadeInSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />

          {EXPERIENCES.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
