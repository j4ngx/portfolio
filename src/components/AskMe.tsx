import { useState, useRef, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'
import {
  PERSONAL,
  EXPERIENCES,
  SKILL_GROUPS,
  PROFESSIONAL_PROJECTS,
  PERSONAL_PROJECTS,
  EDUCATION,
  CERTIFICATIONS,
} from '../data/portfolio'
import { useLocale } from '../hooks/useLocale'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function buildSystemPrompt(): string {
  const experiences = EXPERIENCES.map(
    (e) =>
      `### ${e.title} at ${e.company} (${e.period})\n${e.bullets.map((b) => `- ${b}`).join('\n')}\nTech: ${e.techStack}`,
  ).join('\n\n')

  const skills = SKILL_GROUPS.map(
    (g) =>
      `### ${g.title}\n${g.skills.map((s) => `- ${s.name} (${s.proficiency}%)`).join('\n')}`,
  ).join('\n\n')

  const proProjects = PROFESSIONAL_PROJECTS.map(
    (p) =>
      `### ${p.title}\n${p.subtitle}\n${p.sections.map((s) => `${s.heading}: ${s.content}`).join('\n')}`,
  ).join('\n\n')

  const ossProjects = PERSONAL_PROJECTS.map(
    (p) =>
      `### ${p.title}\n${p.subtitle}\n${p.sections.map((s) => `${s.heading}: ${s.content}`).join('\n')}`,
  ).join('\n\n')

  const education = EDUCATION.map(
    (e) => `- ${e.title} at ${e.institution} (${e.period})`,
  ).join('\n')

  const certs = CERTIFICATIONS.map((c) => `- ${c.title} (${c.year})`).join('\n')

  return `You are an AI assistant representing Jose Antonio Navarro Guerrero's professional portfolio. Answer questions about his background, skills, experience, and projects based ONLY on the following information. Do NOT make up information.

## Personal Information
- Name: ${PERSONAL.name}
- Title: ${PERSONAL.title}
- Location: ${PERSONAL.location}
- Email: ${PERSONAL.email}
- GitHub: ${PERSONAL.github}
- LinkedIn: ${PERSONAL.linkedin}

## Professional Experience
${experiences}

## Skills
${skills}

## Professional Projects
${proProjects}

## Open Source Projects
${ossProjects}

## Education
${education}

## Certifications
${certs}

Rules:
- Answer in the same language the user writes in (English or Spanish)
- Be professional, concise, and friendly
- If asked about something not in the data, politely say you don't have that information
- Keep responses under 200 words unless more detail is specifically requested
- You can highlight Jose's strengths based on the data provided
- Use markdown formatting for better readability when appropriate`
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

export default function AskMe() {
  const { t } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      if (messages.length === 0) {
        setMessages([{ role: 'assistant', content: t('chatbot.greeting') }])
      }
    }
  }, [isOpen])

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setIsLoading(true)

    try {
      if (!apiKey) {
        throw new Error('API key not configured')
      }

      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: buildSystemPrompt() },
            ...updated.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || `API error ${res.status}`)
      }

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      const errorMsg =
        err instanceof Error && err.message === 'API key not configured'
          ? 'The AI chatbot is not configured yet. Please set the VITE_GROQ_API_KEY environment variable.'
          : 'Sorry, I encountered an error. Please try again.'
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-solid hover:bg-solid-hover text-on-solid shadow-lg flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('chatbot.title')}
      >
        <Icon icon={isOpen ? 'close' : 'smart_toy'} className="text-2xl" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg">
              <Icon icon="smart_toy" className="text-primary" />
              <div className="flex-1">
                <p className="text-sm font-bold text-primary font-mono">
                  {t('chatbot.title')}
                </p>
                <p className="text-[10px] text-muted">Powered by Groq AI</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-primary transition-colors"
                aria-label="Close chat"
              >
                <Icon icon="close" className="text-lg" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite" aria-relevant="additions">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-solid text-on-solid'
                        : 'bg-bg border border-border text-subtle'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-bg border border-border rounded-lg px-3 py-2 text-sm text-muted">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" />
                      <span
                        className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"
                        style={{ animationDelay: '0.15s' }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"
                        style={{ animationDelay: '0.3s' }}
                      />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2 px-3 py-3 border-t border-border"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 bg-bg border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-mono"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-solid hover:bg-solid-hover text-on-solid rounded-lg p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Icon icon="send" className="text-lg" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
