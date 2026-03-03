import { EDUCATION, CERTIFICATIONS, loc } from '../data/portfolio'
import Icon from './Icon'
import FadeInSection from './FadeInSection'
import { useLocale } from '../hooks/useLocale'

export default function EducationCerts() {
  const { t, locale } = useLocale()

  return (
    <section id="education" className="py-24 bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <FadeInSection>
              <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
                <span className="text-primary">
                  <Icon icon="school" />
                </span>{' '}
                {t('education.education')}
              </h2>
            </FadeInSection>

            <div className="space-y-6">
              {EDUCATION.map((edu, i) => (
                <FadeInSection key={edu.title.en} delay={i * 100}>
                  <div className="bg-surface p-6 rounded border border-border">
                    <h3 className="font-bold text-primary">{loc(edu.title, locale)}</h3>
                    <div className="text-accent text-sm font-mono">{edu.institution}</div>
                    <div className="text-muted text-xs mt-1">{edu.period}</div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <FadeInSection>
              <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
                <span className="text-accent">
                  <Icon icon="verified" />
                </span>{' '}
                {t('education.certifications')}
              </h2>
            </FadeInSection>

            <div className="grid grid-cols-1 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <FadeInSection key={cert.title} delay={i * 100}>
                    <div className="bg-surface p-4 rounded border border-border flex items-center gap-4 hover:border-accent/50 transition-colors">
                    <span className="text-accent">
                      <Icon icon="military_tech" />
                    </span>
                    <div>
                      <p className="font-bold text-primary text-sm">{cert.title}</p>
                      <p className="text-muted text-xs">{cert.year}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
