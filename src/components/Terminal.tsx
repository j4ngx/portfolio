export default function Terminal() {
  return (
    <div className="w-full bg-[#0d1117] rounded-lg border border-border shadow-xl overflow-hidden flex flex-col h-full max-h-[500px]">
      {/* Title bar */}
      <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-xs text-slate-400 font-mono">jose@workstation:~/summary</div>
        <div className="w-4" />
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-sm md:text-base text-slate-300 overflow-y-auto terminal-scroll flex-1">
        {/* Command */}
        <div className="mb-4">
          <span className="text-green-400">➜</span>{' '}
          <span className="text-blue-400">~</span>{' '}
          <span className="text-slate-100">cat vision.py</span>
        </div>

        {/* Python code */}
        <div className="pl-4 space-y-0.5 leading-relaxed">
          <div>
            <span className="text-purple-400">def</span>{' '}
            <span className="text-yellow-400">get_professional_summary</span>():
          </div>
          <div className="pl-4">
            <span className="text-slate-500">"""</span>
          </div>
          <div className="pl-4">
            <span className="text-slate-500">
              Acts as technical lead for several internal
            </span>
          </div>
          <div className="pl-4">
            <span className="text-slate-500">
              projects, defining technical direction and
            </span>
          </div>
          <div className="pl-4">
            <span className="text-slate-500">
              managing delivery in Agile teams.
            </span>
          </div>
          <div className="pl-4">
            <span className="text-slate-500">
              Experienced with modern Python tooling
            </span>
          </div>
          <div className="pl-4">
            <span className="text-slate-500">
              (Poetry, UV, asdf), CI/CD pipelines and
            </span>
          </div>
          <div className="pl-4">
            <span className="text-slate-500">
              cloud services (AWS, Azure).
            </span>
          </div>
          <div className="pl-4">
            <span className="text-slate-500">"""</span>
          </div>
          <div className="pl-4">
            <span className="text-purple-400">return</span> {'{'}
          </div>
          <div className="pl-8">
            <span className="text-blue-300">"focus"</span>:{' '}
            <span className="text-green-300">"API-first design"</span>,
          </div>
          <div className="pl-8">
            <span className="text-blue-300">"architecture"</span>:{' '}
            <span className="text-green-300">"Hexagonal"</span>,
          </div>
          <div className="pl-8">
            <span className="text-blue-300">"mission"</span>:{' '}
            <span className="text-green-300">"Automate security workflows"</span>,
          </div>
          <div className="pl-4">{'}'}</div>
        </div>

        {/* Blinking cursor */}
        <div className="mt-4">
          <span className="text-green-400">➜</span>{' '}
          <span className="text-blue-400">~</span>{' '}
          <span className="inline-block w-2 h-4 bg-slate-400 align-middle animate-cursor" />
        </div>
      </div>
    </div>
  )
}
