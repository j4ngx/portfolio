import { useState, useEffect, useCallback } from 'react'

/* ──────────────── types ──────────────── */
type Screen = 'dashboard' | 'session'

interface HistoryItem {
  name: string
  date: string
  exercises: string[]
  volume: string
  duration: string
  type: 'strength' | 'hypertrophy' | 'power' | 'recovery'
}

/* ──────────────── mock data ──────────────── */
const HISTORY: HistoryItem[] = [
  {
    name: 'Leg Day — Absolute Strength',
    date: 'Yesterday',
    exercises: ['Back Squat', 'Leg Press', 'Leg Extensions', 'Calf Raise'],
    volume: '12,450 kg',
    duration: '84 min',
    type: 'strength',
  },
  {
    name: 'Pull Day — Volume',
    date: '3 days ago',
    exercises: ['Deadlift', 'Weighted Pull-ups', 'Rows', 'Curls'],
    volume: '9,200 kg',
    duration: '75 min',
    type: 'hypertrophy',
  },
  {
    name: 'Push Day — Dynamic Effort',
    date: '5 days ago',
    exercises: ['Bench Press', 'OHP', 'Dips', 'Lateral Raises'],
    volume: '7,800 kg',
    duration: '65 min',
    type: 'power',
  },
]

const TYPE_COLOR: Record<string, string> = {
  strength: 'text-[#0ff069]',
  hypertrophy: 'text-blue-400',
  power: 'text-orange-400',
  recovery: 'text-emerald-400',
}

const TYPE_ICON: Record<string, string> = {
  strength: '🏋️',
  hypertrophy: '📈',
  power: '⚡',
  recovery: '🧘',
}

/* ──────────────── WIP banner ──────────────── */
function WipBadge() {
  return (
    <div className="absolute top-2 right-2 z-30 flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
      <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
      In Development
    </div>
  )
}

/* ──────────────── Dashboard screen ──────────────── */
function Dashboard({ onStartSession }: { onStartSession: () => void }) {
  return (
    <div className="flex flex-col gap-4 px-3 pt-3 pb-16 overflow-y-auto h-full hide-evofit-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="size-8 rounded-full bg-gradient-to-br from-[#0ff069] to-emerald-600 flex items-center justify-center text-[10px] font-black text-black">
          AR
        </div>
        <div>
          <p className="text-[8px] font-bold uppercase tracking-widest text-gray-500">
            Welcome Back
          </p>
          <p className="text-xs font-bold text-white leading-none">Alex Rivera</p>
        </div>
      </div>

      {/* Active plan */}
      <div>
        <div className="flex items-end justify-between mb-1.5">
          <div>
            <span className="text-[7px] font-bold uppercase tracking-widest text-[#0ff069] bg-[#0ff069]/10 px-1.5 py-0.5 rounded border border-[#0ff069]/20">
              Active Plan
            </span>
            <h3 className="text-sm font-bold text-white mt-0.5">Hypertrophy Phase I</h3>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-gray-500">M2 of 4</p>
            <p className="text-[10px] font-bold text-[#0ff069]">Week 6</p>
          </div>
        </div>

        {/* Next training card */}
        <button
          onClick={onStartSession}
          className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a3526] to-[#0c1a10] border border-[#0ff069]/10 h-36 flex flex-col justify-end p-4 group hover:border-[#0ff069]/30 transition-all cursor-pointer text-left"
        >
          <span className="text-[7px] font-bold uppercase tracking-widest text-[#0ff069] bg-[#0ff069]/15 px-2 py-0.5 rounded-md w-fit mb-auto">
            Next Training
          </span>
          <div>
            <h2 className="text-lg font-black text-white leading-tight tracking-tight uppercase">
              Push Day
            </h2>
            <p className="text-[9px] text-gray-400 mb-2">
              Compound Movements & Strength Accumulation
            </p>
            <div className="w-full h-7 bg-[#0ff069] text-black font-black text-[9px] rounded-lg flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(15,240,105,0.3)] group-hover:shadow-[0_0_20px_rgba(15,240,105,0.5)] transition-shadow uppercase tracking-wider">
              ▶ Start Session
            </div>
          </div>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#161618] border border-white/5 rounded-xl p-3">
          <p className="text-[7px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">
            Stress Balance
          </p>
          <div className="flex items-end gap-1">
            <span className="text-xl font-black text-white">+12</span>
            <span className="text-[8px] font-bold text-[#0ff069] mb-0.5">Optimal</span>
          </div>
        </div>
        <div className="bg-[#161618] border border-white/5 rounded-xl p-3">
          <p className="text-[7px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">
            Est. 1RM
          </p>
          <div className="flex items-end gap-1">
            <span className="text-xl font-black text-white">100</span>
            <span className="text-[8px] font-bold text-gray-400 mb-0.5">kg · Bench</span>
          </div>
        </div>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <h3 className="text-xs font-bold text-white">Training History</h3>
          <span className="text-[7px] font-bold text-[#0ff069] uppercase tracking-widest">
            View Log →
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {HISTORY.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2.5 bg-[#161618] border border-white/5 rounded-xl"
            >
              <div
                className={`size-8 rounded-lg bg-white/5 flex items-center justify-center text-sm shrink-0 ${TYPE_COLOR[item.type]}`}
              >
                {TYPE_ICON[item.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="text-[10px] font-bold text-white truncate pr-2">{item.name}</h4>
                  <span className="text-[7px] font-bold text-gray-600 uppercase whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
                <p className="text-[8px] text-gray-500 truncate">
                  {item.exercises.join(' · ')}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">
                    📊 {item.volume}
                  </span>
                  <span className="text-[7px] font-bold text-gray-600 uppercase tracking-wider">
                    ⏱ {item.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ──────────────── Active session screen ──────────────── */
function ActiveSession({ onBack }: { onBack: () => void }) {
  const [elapsed, setElapsed] = useState(0)
  const [activeSet, setActiveSet] = useState(1)
  const [resting, setResting] = useState(false)
  const [restTime, setRestTime] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!resting || restTime <= 0) {
      if (resting) setResting(false)
      return
    }
    const t = setInterval(() => setRestTime((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [resting, restTime])

  const fmt = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  const handleComplete = useCallback(() => {
    if (activeSet < 3) {
      setActiveSet((s) => s + 1)
      setRestTime(180)
      setResting(true)
    } else {
      onBack()
    }
  }, [activeSet, onBack])

  return (
    <div className="flex flex-col h-full bg-[#0c0c0e] relative">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
        <button onClick={onBack} className="text-gray-500 text-xs">
          ← Back
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-[#0ff069] animate-pulse" />
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-gray-500">
              Live Tracker
            </span>
          </div>
          <span className="text-base font-black font-mono tracking-tighter text-white">
            {fmt(elapsed)}
          </span>
        </div>
        <button
          onClick={onBack}
          className="px-2.5 py-1 bg-[#0ff069]/10 text-[#0ff069] border border-[#0ff069]/20 rounded-full text-[8px] font-black uppercase tracking-wider"
        >
          Finish
        </button>
      </div>

      {/* Exercise card */}
      <div className="flex-1 flex flex-col gap-4 p-3 overflow-y-auto hide-evofit-scrollbar">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-t from-[#0c0c0e] via-[#1a3526]/60 to-[#1a3526]/30 border border-white/5 p-4 flex flex-col gap-3">
          <span className="text-[7px] font-black uppercase tracking-[0.15em] text-[#0ff069] bg-[#0ff069]/10 px-2 py-0.5 rounded-full border border-[#0ff069]/20 w-fit">
            Step 1 of 5
          </span>
          <div>
            <h2 className="text-2xl font-black text-white leading-none tracking-tighter uppercase">
              Back Squat
            </h2>
            <p className="text-[9px] text-gray-400 mt-0.5">
              Accumulation · 3 × 5-8 Reps @ RPE 8.5
            </p>
          </div>

          {/* Set indicators */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((set) => (
              <div
                key={set}
                className={`h-12 rounded-xl flex flex-col items-center justify-center border transition-all ${
                  set < activeSet
                    ? 'bg-[#0ff069] border-[#0ff069] text-black'
                    : set === activeSet
                      ? 'bg-[#161618] border-[#0ff069] text-white'
                      : 'bg-black/40 border-white/5 text-gray-700'
                }`}
              >
                <span className="text-[7px] font-black uppercase tracking-widest opacity-60">
                  SET {set}
                </span>
                {set < activeSet ? (
                  <span className="text-sm">✓</span>
                ) : (
                  <span className="text-sm font-black">
                    140<span className="text-[8px] ml-0.5">kg</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input section */}
        <div className="bg-[#161618] rounded-2xl p-4 border border-white/5">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'Weight', value: '140', color: 'text-[#0ff069]' },
              { label: 'Reps', value: '6', color: 'text-white' },
              { label: 'RPE', value: '8', color: 'text-white' },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <span className="text-[7px] font-black uppercase tracking-widest text-gray-600 text-center">
                  {f.label}
                </span>
                <div
                  className={`bg-black/40 border border-white/5 rounded-xl py-2.5 text-lg font-black text-center ${f.color}`}
                >
                  {f.value}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleComplete}
            className="w-full h-10 bg-[#0ff069] text-black font-black text-[10px] rounded-xl flex items-center justify-center gap-1 uppercase tracking-wider shadow-[0_0_12px_rgba(15,240,105,0.3)] hover:shadow-[0_0_20px_rgba(15,240,105,0.5)] transition-shadow"
          >
            ✓ Complete Set
          </button>
        </div>
      </div>

      {/* Rest timer overlay */}
      {resting && (
        <div className="absolute inset-0 z-40 bg-[#0c0c0e]/98 flex flex-col items-center justify-center backdrop-blur-sm">
          {/* Circular progress */}
          <div className="relative flex items-center justify-center">
            <svg className="size-40 -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-white/5"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-[#0ff069]"
                strokeDasharray={440}
                strokeDashoffset={440 - (restTime / 180) * 440}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1">
                Recovery
              </span>
              <span className="text-4xl font-black text-white font-mono tracking-tighter">
                {restTime}s
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setResting(false)
              setRestTime(0)
            }}
            className="mt-6 px-6 py-2 bg-[#0ff069] text-black font-black text-[9px] rounded-xl uppercase tracking-wider"
          >
            Skip Rest
          </button>
        </div>
      )}
    </div>
  )
}

/* ──────────────── Bottom nav ──────────────── */
function BottomNav({ active }: { active: string }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'log', icon: '📅', label: 'Log' },
    { id: 'add', icon: '➕', label: '' },
    { id: 'plan', icon: '📐', label: 'Plan' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ]
  return (
    <div className="flex items-center justify-around h-10 border-t border-white/5 bg-[#161616] shrink-0">
      {tabs.map((t) =>
        t.id === 'add' ? (
          <div
            key={t.id}
            className="size-9 -mt-4 rounded-full bg-[#0ff069] flex items-center justify-center text-black text-lg shadow-[0_0_12px_rgba(15,240,105,0.3)]"
          >
            {t.icon}
          </div>
        ) : (
          <div
            key={t.id}
            className={`flex flex-col items-center gap-0.5 ${active === t.id ? 'text-[#0ff069]' : 'text-gray-600'}`}
          >
            <span className="text-xs">{t.icon}</span>
            <span className="text-[7px] font-medium">{t.label}</span>
          </div>
        ),
      )}
    </div>
  )
}

/* ──────────────── Main component ──────────────── */
export default function EvoFitDemo() {
  const [screen, setScreen] = useState<Screen>('dashboard')

  return (
    <div className="flex h-full w-full items-center justify-center gap-6" role="region" aria-label="EvoFit mobile app demo">
      {/* Phone mockup */}
      <div className="relative flex flex-col w-[280px] h-full max-h-[480px] bg-[#0c0c0e] rounded-[2rem] border-2 border-white/10 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="flex items-center justify-center pt-1.5 pb-1 shrink-0">
          <div className="w-16 h-1 rounded-full bg-white/10" />
        </div>

        <WipBadge />

        {/* Screen content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {screen === 'dashboard' && (
            <Dashboard onStartSession={() => setScreen('session')} />
          )}
          {screen === 'session' && (
            <ActiveSession onBack={() => setScreen('dashboard')} />
          )}
        </div>

        {/* Bottom nav (only on dashboard) */}
        {screen === 'dashboard' && <BottomNav active="home" />}
      </div>

      {/* Side info panel — hidden on mobile */}
      <div className="hidden md:flex flex-col gap-4 max-w-[280px]">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Work in Progress
          </span>
        </div>
        <h3 className="text-lg font-bold text-primary leading-snug">
          EvoFit — Mesocycle Planner
        </h3>
        <p className="text-xs text-muted leading-relaxed">
          Native mobile app for science-based training periodization. This is a preview of the
          React prototype — the production app targets iOS (SwiftUI) with a FastAPI + MongoDB
          backend exposing 38 REST endpoints.
        </p>
        <div className="flex flex-col gap-2 mt-1">
          {[
            { label: 'Dashboard', desc: 'Active plan, stats, workout history' },
            { label: 'Live Tracker', desc: 'Set logging, rest timer, RPE tracking' },
            { label: 'Periodization', desc: 'Mesocycles, microcycles, deload weeks' },
            { label: 'Analytics', desc: 'Stress balance, 1RM estimation, progress charts' },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-2">
              <span className="text-[#0ff069] text-xs mt-0.5">▸</span>
              <div>
                <span className="text-xs font-bold text-primary">{f.label}</span>
                <span className="text-xs text-muted ml-1">— {f.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted/60 italic mt-2">
          Tap "Start Session" on the phone to try the live workout tracker.
        </p>
      </div>
    </div>
  )
}
