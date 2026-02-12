import { PERSONAL } from '../data/portfolio'
import FadeInSection from './FadeInSection'

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/[0.02]" />
      <FadeInSection>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="font-mono text-muted text-sm mb-4 block uppercase tracking-widest">
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
            Ready to optimize your<br />security operations?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="bg-primary hover:bg-accent text-white px-8 py-4 rounded text-lg font-medium shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              {PERSONAL.email}
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-border text-primary px-8 py-4 rounded text-lg font-medium hover:bg-bg transition-all"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
