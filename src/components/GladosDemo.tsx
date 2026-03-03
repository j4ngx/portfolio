import { useState, useRef, useEffect, useCallback } from 'react'

/* ─── Simulated output for each command ─── */

const BANNER_LINES = [
  { text: '    ██████╗ ██╗      █████╗ ██████╗  ██████╗ ███████╗', color: 'text-purple-400' },
  { text: '   ██╔════╝ ██║     ██╔══██╗██╔══██╗██╔═══██╗██╔════╝', color: 'text-purple-400' },
  { text: '   ██║  ███╗██║     ███████║██║  ██║██║   ██║███████╗', color: 'text-purple-500' },
  { text: '   ██║   ██║██║     ██╔══██║██║  ██║██║   ██║╚════██║', color: 'text-purple-500' },
  { text: '   ╚██████╔╝███████╗██║  ██║██████╔╝╚██████╔╝███████║', color: 'text-purple-600' },
  { text: '    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝', color: 'text-purple-600' },
]

const HELP_OUTPUT = [
  { text: 'GLaDOS Installer v2.0.0', cls: 'text-white font-bold' },
  { text: '' },
  { text: 'USAGE', cls: 'text-white font-bold' },
  { text: '  ./glados_installer.sh [OPTIONS]', cls: 'text-slate-300' },
  { text: '' },
  { text: 'CORE OPTIONS', cls: 'text-white font-bold' },
  { text: '  --model <tag>           Ollama model tag        (default: llama3)', cls: 'text-slate-400' },
  { text: '  --agent-name <name>     OpenClaw agent label    (default: GLaDOS)', cls: 'text-slate-400' },
  { text: '  --whisper-model <size>  Whisper STT model size  (default: base)', cls: 'text-slate-400' },
  { text: '  --piper-voice <name>    Piper TTS voice name    (default: en_US-amy)', cls: 'text-slate-400' },
  { text: '  --static-ip <ip>        Set a static IP         (e.g. 192.168.1.100)', cls: 'text-slate-400' },
  { text: '' },
  { text: 'FEATURE FLAGS', cls: 'text-white font-bold' },
  { text: '  --skip-audio            Do not install voice I/O (Whisper + Piper)', cls: 'text-slate-400' },
  { text: '  --skip-internet         Do not deploy SearXNG web-search', cls: 'text-slate-400' },
  { text: '  --skip-telegram         Skip Telegram channel configuration', cls: 'text-slate-400' },
  { text: '  --skip-gpu              Skip GPU detection and acceleration', cls: 'text-slate-400' },
  { text: '' },
  { text: 'RUN-MODE FLAGS', cls: 'text-white font-bold' },
  { text: '  --dry-run               Show what would be done without changes', cls: 'text-slate-400' },
  { text: '  --status                Show current installation status', cls: 'text-slate-400' },
  { text: '  --non-interactive       Accept all defaults without prompting', cls: 'text-slate-400' },
  { text: '  --help, -h              Show this message and exit', cls: 'text-slate-400' },
  { text: '' },
  { text: 'MAINTENANCE', cls: 'text-white font-bold' },
  { text: '  --backup                Create a backup of GLaDOS configuration', cls: 'text-slate-400' },
  { text: '  --restore [file]        Restore from a backup archive', cls: 'text-slate-400' },
  { text: '  --uninstall             Remove all GLaDOS components', cls: 'text-slate-400' },
]

const STATUS_OUTPUT = [
  { text: '╔══════════════════════════════════════════╗', cls: 'text-purple-400' },
  { text: '║  📊  GLaDOS Environment Status           ║', cls: 'text-purple-400' },
  { text: '╚══════════════════════════════════════════╝', cls: 'text-purple-400' },
  { text: '' },
  { text: '  Ollama            v0.6.2              ✅ running', cls: 'text-green-400' },
  { text: '  OpenClaw          v1.4.0              ✅ running', cls: 'text-green-400' },
  { text: '  Whisper           v1.7.3  (base)      ✅ installed', cls: 'text-green-400' },
  { text: '  Piper TTS         v2.1.0  (en_US-amy) ✅ installed', cls: 'text-green-400' },
  { text: '  SearXNG           v2024.12             ✅ running', cls: 'text-green-400' },
  { text: '  Docker            v27.5.1              ✅ running', cls: 'text-green-400' },
  { text: '' },
  { text: '  Static IP         192.168.1.100/24     ✅ configured', cls: 'text-blue-400' },
  { text: '  Swap              8192 MB              ✅ active', cls: 'text-blue-400' },
  { text: '  GPU               Intel UHD 600        ⚠️  no acceleration', cls: 'text-yellow-400' },
  { text: '  UFW Firewall      active (SSH 22)      ✅ enabled', cls: 'text-green-400' },
  { text: '  SSH Hardening     root login disabled   ✅ applied', cls: 'text-green-400' },
  { text: '  Health Monitor    cron 5min            ✅ active', cls: 'text-green-400' },
  { text: '' },
  { text: '  ℹ  Log directory  /var/log/glados/', cls: 'text-slate-500' },
  { text: '  📦 Backups        /opt/glados/backups/', cls: 'text-slate-500' },
]

const DRY_RUN_OUTPUT = [
  { text: '🔍  DRY-RUN MODE — no changes will be made', cls: 'text-yellow-400 font-bold' },
  { text: '' },
  { text: '  Phase 1 · System Foundations', cls: 'text-white font-bold' },
  { text: '    [SKIP] Network: would configure static IP 192.168.1.100/24', cls: 'text-slate-400' },
  { text: '    [SKIP] Swap: would create 8192 MB swap file', cls: 'text-slate-400' },
  { text: '    [SKIP] GPU: would detect and configure acceleration', cls: 'text-slate-400' },
  { text: '' },
  { text: '  Phase 2 · Core Services', cls: 'text-white font-bold' },
  { text: '    [SKIP] Packages: would install curl, jq, git, build-essential...', cls: 'text-slate-400' },
  { text: '    [SKIP] Docker: would install Docker CE + Compose v2', cls: 'text-slate-400' },
  { text: '    [SKIP] Ollama: would install Ollama + pull llama3', cls: 'text-slate-400' },
  { text: '    [SKIP] OpenClaw: would deploy AI assistant gateway + CLI', cls: 'text-slate-400' },
  { text: '' },
  { text: '  Phase 3 · Optional Features', cls: 'text-white font-bold' },
  { text: '    [SKIP] Audio: would install whisper.cpp + Piper TTS', cls: 'text-slate-400' },
  { text: '    [SKIP] Internet: would deploy SearXNG via Docker Compose', cls: 'text-slate-400' },
  { text: '    [SKIP] Telegram: would configure bot integration', cls: 'text-slate-400' },
  { text: '' },
  { text: '  Phase 4 · Hardening', cls: 'text-white font-bold' },
  { text: '    [SKIP] Firewall: would enable UFW + allow SSH port 22', cls: 'text-slate-400' },
  { text: '    [SKIP] Hardening: would disable root login, set hostname', cls: 'text-slate-400' },
  { text: '    [SKIP] Health: would install cron monitor (5min interval)', cls: 'text-slate-400' },
  { text: '' },
  { text: '  ✅ Dry-run complete — 17 modules analysed, 0 changes made', cls: 'text-green-400 font-bold' },
]

interface Line {
  text: string
  cls?: string
}

type HistoryEntry =
  | { kind: 'prompt'; command: string }
  | { kind: 'output'; lines: Line[] }
  | { kind: 'banner' }

const COMMANDS: Record<string, Line[]> = {
  help: HELP_OUTPUT,
  '--help': HELP_OUTPUT,
  '-h': HELP_OUTPUT,
  './glados_installer.sh --help': HELP_OUTPUT,
  status: STATUS_OUTPUT,
  '--status': STATUS_OUTPUT,
  './glados_installer.sh --status': STATUS_OUTPUT,
  'dry-run': DRY_RUN_OUTPUT,
  '--dry-run': DRY_RUN_OUTPUT,
  './glados_installer.sh --dry-run': DRY_RUN_OUTPUT,
}

const SUGGESTION_COMMANDS = ['help', 'status', 'dry-run', 'clear']

export default function GladosDemo() {
  const [history, setHistory] = useState<HistoryEntry[]>([{ kind: 'banner' }])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    })
  }, [])

  useEffect(scrollToBottom, [history, scrollToBottom])

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase()
      if (!cmd) return

      setCmdHistory((prev) => [...prev, cmd])
      setCmdHistoryIdx(-1)

      if (cmd === 'clear') {
        setHistory([{ kind: 'banner' }])
        return
      }

      const output = COMMANDS[cmd]
      const newEntries: HistoryEntry[] = [{ kind: 'prompt', command: raw.trim() }]

      if (output) {
        newEntries.push({ kind: 'output', lines: output })
      } else {
        newEntries.push({
          kind: 'output',
          lines: [
            {
              text: `bash: ${raw.trim()}: command not found`,
              cls: 'text-red-400',
            },
            {
              text: 'Try: help, status, dry-run, or clear',
              cls: 'text-slate-500',
            },
          ],
        })
      }

      setHistory((prev) => [...prev, ...newEntries])
    },
    [],
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const newIdx = cmdHistoryIdx < cmdHistory.length - 1 ? cmdHistoryIdx + 1 : cmdHistoryIdx
        setCmdHistoryIdx(newIdx)
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdHistoryIdx > 0) {
        const newIdx = cmdHistoryIdx - 1
        setCmdHistoryIdx(newIdx)
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx])
      } else {
        setCmdHistoryIdx(-1)
        setInput('')
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {SUGGESTION_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              runCommand(cmd)
              inputRef.current?.focus()
            }}
            className="px-3 py-1 text-xs font-mono rounded bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal */}
      <div
        className="flex-1 bg-[#0d1117] rounded-lg border border-slate-700 overflow-hidden flex flex-col min-h-0 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="bg-[#161b22] px-4 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs text-slate-500 font-mono">root@glados:~</div>
          <div className="w-4" />
        </div>

        {/* Scrollable body */}
        <div
          ref={scrollRef}
          className="flex-1 p-4 font-mono text-xs md:text-sm text-slate-300 overflow-y-auto terminal-scroll"
        >
          {history.map((entry, idx) => {
            if (entry.kind === 'banner') {
              return (
                <div key={idx} className="mb-3">
                  {BANNER_LINES.map((line, li) => (
                    <div key={li} className={`${line.color} leading-tight whitespace-pre`}>
                      {line.text}
                    </div>
                  ))}
                  <div className="mt-2 text-slate-500 text-xs">
                    ⚡ Local LLM · 🎙 Voice I/O · 🌐 Web Search · 🔒 Hardening
                  </div>
                  <div className="text-slate-600 text-xs mt-1">
                    Type <span className="text-purple-400">help</span>,{' '}
                    <span className="text-purple-400">status</span>, or{' '}
                    <span className="text-purple-400">dry-run</span> to explore
                  </div>
                </div>
              )
            }

            if (entry.kind === 'prompt') {
              return (
                <div key={idx} className="mt-2">
                  <span className="text-green-400">root@glados</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-slate-500"># </span>
                  <span className="text-slate-200">{entry.command}</span>
                </div>
              )
            }

            if (entry.kind === 'output') {
              return (
                <div key={idx} className="ml-0">
                  {entry.lines.map((line, li) => (
                    <div
                      key={li}
                      className={`${line.cls ?? 'text-slate-300'} whitespace-pre leading-relaxed`}
                    >
                      {line.text || '\u00A0'}
                    </div>
                  ))}
                </div>
              )
            }

            return null
          })}

          {/* Active prompt */}
          <div className="mt-2 flex items-center">
            <span className="text-green-400">root@glados</span>
            <span className="text-slate-500">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-slate-500"># </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-200 outline-none caret-purple-400 font-mono"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
