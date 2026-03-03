import { useState, type FormEvent } from 'react'
import { PERSONAL } from '../data/portfolio'
import FadeInSection from './FadeInSection'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID || 'xpwzgkby'}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/[0.02]" />
      <FadeInSection>
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="font-mono text-muted text-sm mb-4 block uppercase tracking-widest">
              Let's Connect
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
              Let's work together
            </h2>
          </div>

          {status === 'sent' ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl mb-3 block">check_circle</span>
              <p className="text-green-700 dark:text-green-300 font-medium">Message sent! I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-subtle mb-1.5">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-surface border border-border rounded px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-subtle mb-1.5">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-surface border border-border rounded px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-subtle mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-surface border border-border rounded px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project or how I can help..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-solid hover:bg-solid-hover text-on-solid px-8 py-4 rounded text-lg font-medium shadow-sm transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          )}

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 text-center">
            <span className="text-muted text-sm">Or reach me directly:</span>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="text-primary hover:text-accent text-sm font-mono transition-colors"
            >
              {PERSONAL.email}
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent text-sm font-mono transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
