import { useState, useRef, useEffect, useCallback } from 'react'
import { PERSONAL } from '../data/portfolio'

interface Line {
  type: 'cmd' | 'out'
  text: string
}

const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  help       – Show this message',
    '  about      – Professional summary',
    '  skills     – Core technical skills',
    '  experience – Work history overview',
    '  projects   – Highlighted projects',
    '  contact    – How to reach me',
    '  clear      – Clear terminal',
  ],
  about: [
    `${PERSONAL.name} — ${PERSONAL.title}`,
    '',
    'Tech Lead building internal cybersecurity platforms.',
    'Focused on API-first design, hexagonal architecture,',
    'and automating security workflows with Python.',
  ],
  skills: [
    'Languages : Python, TypeScript, SQL, Go',
    'Frameworks: FastAPI, Flask, React, Tailwind',
    'Cloud     : AWS, Azure, Docker, Kubernetes',
    'Tools     : uv, Poetry, GitHub Actions, Terraform',
    'Practices : Hexagonal arch, TDD, CI/CD, OWASP',
  ],
  experience: [
    '2022–now  Tech Lead @ Inditex (Cybersecurity)',
    '2021–2022 Senior Backend Dev @ Inditex',
    '2019–2021 Python Developer @ EY-Riverty',
    '2018–2019 Software Engineer @ Guadaltech',
  ],
  projects: [
    'Sugus      – Vulnerability management platform',
    'Insecquest – Security awareness gamification',
    'Carmen     – Security control framework',
    'GLaDOS     – AI file analysis service',
    'EvoFit AI  – Fitness companion with AI coaching',
  ],
  contact: [
    `Email   : ${PERSONAL.email}`,
    `GitHub  : ${PERSONAL.github}`,
    `LinkedIn: ${PERSONAL.linkedin}`,
  ],
}

const WELCOME: Line[] = [
  { type: 'out', text: `Welcome to ${PERSONAL.firstName.toLowerCase()}@workstation` },
  { type: 'out', text: 'Type "help" for available commands.' },
]

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(scrollToBottom, [lines, scrollToBottom])

  const run = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()
      const newLines: Line[] = [{ type: 'cmd', text: cmd }]

      if (trimmed === 'clear') {
        setLines(WELCOME)
        setInput('')
        return
      }

      const output = COMMANDS[trimmed]
      if (output) {
        newLines.push(...output.map((t) => ({ type: 'out' as const, text: t })))
      } else if (trimmed !== '') {
        newLines.push({ type: 'out', text: `command not found: ${trimmed}` })
        newLines.push({ type: 'out', text: 'Type "help" for available commands.' })
      }

      setLines((prev) => [...prev, ...newLines])
      setInput('')
    },
    [],
  )

  return (
    <div
      className="w-full bg-[#0d1117] rounded-lg border border-border shadow-xl overflow-hidden flex flex-col h-full max-h-[500px]"
      onClick={() => inputRef.current?.focus()}
      role="presentation"
    >
      {/* Title bar */}
      <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-xs text-slate-400 font-mono">
          jose@workstation:~/portfolio
        </div>
        <div className="w-4" />
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm text-slate-300 overflow-y-auto terminal-scroll flex-1">
        {lines.map((line, i) =>
          line.type === 'cmd' ? (
            <div key={i} className="whitespace-pre-wrap">
              <span className="text-green-400">➜</span>{' '}
              <span className="text-blue-400">~</span> {line.text}
            </div>
          ) : (
            <div key={i} className="whitespace-pre-wrap text-slate-400 pl-2">
              {line.text}
            </div>
          ),
        )}

        {/* Input line */}
        <div className="flex items-center">
          <span className="text-green-400">➜</span>{' '}
          <span className="text-blue-400 ml-1">~</span>{' '}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') run(input)
            }}
            className="bg-transparent text-slate-100 outline-none font-mono text-sm flex-1 ml-1 caret-slate-400"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  )
}
