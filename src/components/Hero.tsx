import { PERSONAL, HERO_ROLES, ABOUT_ME } from '../data/portfolio'
import Icon from './Icon'
import Terminal from './Terminal'
import TypeWriter from './TypeWriter'
import { motion } from 'framer-motion'
import { useLocale } from '../hooks/useLocale'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Hero() {
  const { t } = useLocale()

  return (
    <section
      id="summary"
      className="min-h-[90vh] flex items-center justify-center py-20 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column – text */}
        <motion.div
          className="space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <div className="flex items-center gap-5">
              {/* Professional photo */}
              <img
                src={PERSONAL.photo}
                alt={PERSONAL.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-border shadow-md flex-shrink-0"
              />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface border border-border text-xs font-mono text-primary font-semibold">
                  <Icon icon="security" />
                  {t('hero.badge')}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight tracking-tight">
              {PERSONAL.firstName} <br />
              {PERSONAL.lastName}{' '}
              <span className="text-accent">{PERSONAL.lastNameHighlight}</span>
            </h1>
            <div className="text-xl md:text-2xl font-mono text-muted mt-4 h-8">
              <TypeWriter phrases={HERO_ROLES} />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="bg-surface border border-border rounded-lg p-5 space-y-2 text-sm text-subtle font-medium">
              <div className="flex items-center gap-3">
                <Icon icon="location_on" />
                <span>{PERSONAL.location}</span>
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
                  aria-label="GitHub profile"
                >
                  <Icon icon="link" /> GitHub
                </a>
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:text-muted transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Icon icon="link" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <p className="text-lg text-subtle max-w-lg leading-relaxed border-l-4 border-accent pl-6">
              {t('hero.description')}
            </p>
            <p className="text-sm text-muted max-w-lg leading-relaxed mt-4 italic">
              {ABOUT_ME}
            </p>
          </motion.div>

          <motion.div variants={item}>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#experience"
                className="group flex items-center gap-3 bg-solid hover:bg-solid-hover text-on-solid px-6 py-3 rounded font-medium transition-all shadow-sm"
              >
                <Icon icon="description" className="group-hover:scale-110 transition-transform" />
                {t('hero.viewExperience')}
              </a>
              <a
                href={PERSONAL.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-border text-primary hover:bg-surface px-6 py-3 rounded font-medium transition-all cv-download"
              >
                <Icon icon="download" className="group-hover:scale-110 transition-transform" />
                {t('hero.downloadCv')}
              </a>
              <a
                href="#projects"
                className="group flex items-center gap-3 bg-transparent text-muted hover:text-primary px-6 py-3 rounded font-medium transition-all"
              >
                {t('hero.viewProjects')}
                <Icon icon="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right column – Terminal */}
        <motion.div
          className="relative w-full max-h-[600px] flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <Terminal />
          <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-border rounded-lg" />
          <div className="absolute -z-10 -top-4 -left-4 w-full h-full border border-muted/30 border-dashed rounded-lg" />
        </motion.div>
      </div>
    </section>
  )
}
