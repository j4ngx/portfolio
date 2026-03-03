import { useEffect, useState } from 'react'
import FadeInSection from './FadeInSection'
import GladosDemo from './GladosDemo'
import ForgeDemo from './ForgeDemo'
import EvoFitDemo from './EvoFitDemo'

interface Tab {
  id: string
  icon: string
  label: string
  desc: string
}

const TABS: Tab[] = [
  {
    id: 'forge',
    icon: '🔧',
    label: 'Forge MCP',
    desc: 'VS Code + Copilot Agent Mode — try review_pr, apply_issue and scaffold_project',
  },
  {
    id: 'glados',
    icon: '🤖',
    label: 'GLaDOS Installer',
    desc: 'Interactive terminal — run commands against a simulated GLaDOS environment',
  },
  {
    id: 'evofit',
    icon: '🏋️',
    label: 'EvoFit',
    desc: 'Mobile training app — tap Start Session to try the live workout tracker',
  },
]

export default function Playground() {
  const [activeTab, setActiveTab] = useState('forge')
  const currentTab = TABS.find((t) => t.id === activeTab)!
  const isEvofit = activeTab === 'evofit'

  useEffect(() => {
    const handler = (e: Event) => {
      const tabId = (e as CustomEvent<string>).detail
      if (TABS.some((t) => t.id === tabId)) setActiveTab(tabId)
    }
    window.addEventListener('playground-tab', handler)
    return () => window.removeEventListener('playground-tab', handler)
  }, [])

  return (
    <section id="playground" className="relative py-24 px-4 max-w-6xl mx-auto">
      <FadeInSection>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-muted">04</span>
          <span className="w-12 h-px bg-muted" />
          <span className="text-xs font-mono text-muted tracking-widest uppercase">
            Playground
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-3">
          Try My Projects
        </h2>
        <p className="text-muted max-w-2xl mb-10">
          Interactive demos running directly in your browser. Pick a project and start exploring —
          no installs required.
        </p>
      </FadeInSection>

      <FadeInSection delay={120}>
        {/* Tab bar */}
        <div className={`flex gap-2 mb-4 overflow-x-auto pb-1 px-1 py-1 rounded-xl transition-colors ${
          isEvofit ? 'bg-[#161618]' : ''
        }`}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono whitespace-nowrap transition-all border ${
                isEvofit
                  ? activeTab === tab.id
                    ? 'bg-[#0ff069] text-black border-[#0ff069] font-bold shadow-[0_0_12px_rgba(15,240,105,0.2)]'
                    : 'bg-transparent text-gray-500 border-white/5 hover:text-gray-300 hover:bg-white/5'
                  : activeTab === tab.id
                    ? 'bg-solid text-on-solid border-solid shadow-sm'
                    : 'bg-surface text-muted border-border hover:bg-card hover:text-primary'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Description */}
        <p className={`text-xs font-mono mb-4 pl-1 transition-colors ${
          isEvofit ? 'text-gray-600' : 'text-muted'
        }`}>{currentTab.desc}</p>

        {/* Demo panel */}
        <div className={`rounded-xl border p-4 md:p-6 h-[520px] md:h-[560px] transition-colors ${
          isEvofit
            ? 'bg-[#0c0c0e] border-white/5 shadow-[0_0_40px_rgba(15,240,105,0.04)]'
            : 'bg-surface border-border'
        }`}>
          {activeTab === 'glados' && <GladosDemo />}
          {activeTab === 'forge' && <ForgeDemo />}
          {activeTab === 'evofit' && <EvoFitDemo />}
        </div>
      </FadeInSection>
    </section>
  )
}
