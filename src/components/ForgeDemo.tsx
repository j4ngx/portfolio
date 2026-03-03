import { useState, useEffect, useRef, useCallback } from 'react'

/* ─── Types ─── */
interface TreeNode {
  name: string
  type: 'folder' | 'file'
  children?: TreeNode[]
  content?: string[]
  /** scaffold_project: only show after this message index */
  phase?: number
}

interface ChatMsg {
  role: 'user' | 'assistant' | 'tool'
  text: string
  toolName?: string
  /** Which editor view to show when this message appears */
  editorView?: EditorView
}

type EditorView =
  | { kind: 'code'; fileName: string; lines: string[] }
  | { kind: 'diff'; fileName: string; hunks: DiffLine[] }
  | { kind: 'tree'; label: string }

interface DiffLine {
  type: '+' | '-' | ' ' | 'header'
  text: string
}

/* ─── Tool definitions ─── */
const TOOLS = [
  { id: 'review_pr', label: 'review_pr', icon: '🔍' },
  { id: 'apply_issue', label: 'apply_issue', icon: '🛠️' },
  { id: 'scaffold_project', label: 'scaffold_project', icon: '🏗️' },
] as const
type ToolId = (typeof TOOLS)[number]['id']

/* ─── Base file tree (always visible) ─── */
const BASE_TREE: TreeNode[] = [
  {
    name: 'acme_api',
    type: 'folder',
    children: [
      {
        name: 'domain',
        type: 'folder',
        children: [
          {
            name: 'model',
            type: 'folder',
            children: [
              {
                name: 'product.py',
                type: 'file',
                content: [
                  'from dataclasses import dataclass',
                  'from typing import Optional',
                  '',
                  '@dataclass',
                  'class Product:',
                  '    id: Optional[int] = None',
                  '    name: str = ""',
                  '    price: float = 0.0',
                  '    stock: int = 0',
                  '',
                  '    def validate(self) -> None:',
                  '        if self.price < 0:',
                  '            raise ValueError("Price cannot be negative")',
                ],
              },
            ],
          },
          {
            name: 'repository',
            type: 'folder',
            children: [
              {
                name: 'product_repository.py',
                type: 'file',
                content: [
                  'from abc import ABC, abstractmethod',
                  '',
                  'class ProductRepository(ABC):',
                  '    @abstractmethod',
                  '    async def get_by_id(self, id: int) -> Product: ...',
                  '',
                  '    @abstractmethod',
                  '    async def save(self, p: Product) -> Product: ...',
                ],
              },
            ],
          },
          {
            name: 'service',
            type: 'folder',
            children: [
              {
                name: 'product_service.py',
                type: 'file',
                content: [
                  'class ProductService:',
                  '    def __init__(self, repo: ProductRepository):',
                  '        self._repo = repo',
                  '',
                  '    async def get(self, id: int) -> Product:',
                  '        p = await self._repo.get_by_id(id)',
                  '        if not p:',
                  '            raise NotFoundError(f"Product {id}")',
                  '        return p',
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'application',
        type: 'folder',
        children: [
          {
            name: 'use_case',
            type: 'folder',
            children: [
              {
                name: 'create_product.py',
                type: 'file',
                content: [
                  'class CreateProduct:',
                  '    def __init__(self, svc: ProductService):',
                  '        self._svc = svc',
                  '',
                  '    async def execute(self, p: Product) -> Product:',
                  '        p.validate()',
                  '        return await self._svc.save(p)',
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'infrastructure',
        type: 'folder',
        children: [
          {
            name: 'controller',
            type: 'folder',
            children: [
              {
                name: 'product_controller.py',
                type: 'file',
                content: [
                  '@router.post("/products")',
                  'async def create(req: CreateProductReq):',
                  '    product = mapper.to_domain(req)',
                  '    created = await use_case.execute(product)',
                  '    return mapper.to_response(created)',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'tests',
    type: 'folder',
    children: [
      {
        name: 'test_product_service.py',
        type: 'file',
        content: [
          'import pytest',
          '',
          '@pytest.mark.asyncio',
          'async def test_get_not_found():',
          '    repo = AsyncMock(spec=ProductRepository)',
          '    repo.get_by_id.return_value = None',
          '    svc = ProductService(repo)',
          '    with pytest.raises(NotFoundError):',
          '        await svc.get(999)',
        ],
      },
    ],
  },
  {
    name: 'pyproject.toml',
    type: 'file',
    content: ['[project]', 'name = "acme-api"', 'version = "0.1.0"'],
  },
]

/* ─── Scaffold progressive tree (files appear by phase) ─── */
const SCAFFOLD_TREE: TreeNode[] = [
  {
    name: 'order_svc',
    type: 'folder',
    children: [
      {
        name: 'domain',
        type: 'folder',
        phase: 2,
        children: [
          { name: 'model', type: 'folder', phase: 2, children: [
            { name: 'order.py', type: 'file', phase: 2 },
            { name: 'customer.py', type: 'file', phase: 2 },
          ]},
          { name: 'repository', type: 'folder', phase: 2, children: [
            { name: 'order_repository.py', type: 'file', phase: 2 },
            { name: 'customer_repository.py', type: 'file', phase: 2 },
          ]},
          { name: 'service', type: 'folder', phase: 2, children: [
            { name: 'order_service.py', type: 'file', phase: 2 },
          ]},
        ],
      },
      {
        name: 'application',
        type: 'folder',
        phase: 3,
        children: [
          { name: 'use_case', type: 'folder', phase: 3, children: [
            { name: 'create_order.py', type: 'file', phase: 3 },
            { name: 'get_order.py', type: 'file', phase: 3 },
          ]},
          { name: 'mapper', type: 'folder', phase: 3, children: [
            { name: 'order_mapper.py', type: 'file', phase: 3 },
          ]},
        ],
      },
      {
        name: 'infrastructure',
        type: 'folder',
        phase: 3,
        children: [
          { name: 'controller', type: 'folder', phase: 3, children: [
            { name: 'order_controller.py', type: 'file', phase: 3 },
          ]},
          { name: 'repository', type: 'folder', phase: 3, children: [
            { name: 'sqlalchemy_order_repo.py', type: 'file', phase: 3 },
          ]},
          { name: 'di', type: 'folder', phase: 3, children: [
            { name: 'container.py', type: 'file', phase: 3 },
          ]},
        ],
      },
      {
        name: 'tests',
        type: 'folder',
        phase: 4,
        children: [
          { name: 'test_order_service.py', type: 'file', phase: 4 },
          { name: 'test_create_order.py', type: 'file', phase: 4 },
        ],
      },
      { name: 'pyproject.toml', type: 'file', phase: 4 },
    ],
  },
]

/* ─── Editor views per scenario ─── */
const REVIEW_CODE: EditorView = {
  kind: 'code',
  fileName: 'product_service.py',
  lines: [
    'class ProductService:',
    '    def __init__(self, repo):',   // ← missing type hint
    '        self._repo = repo',
    '',
    '    async def get(self, id: int):',
    '        p = await self._repo.get_by_id(id)',
    '        if not p:',
    '            raise NotFoundError(f"Product {id}")',
    '        return p',
    '',
    '    async def create(self, data: dict):',  // ← dict, not DTO
    '        query = f"INSERT INTO products VALUES ({data})"',  // SQL injection!
    '        return await self._repo.execute(query)',
  ],
}

const APPLY_DIFF: EditorView = {
  kind: 'diff',
  fileName: 'product_repository.py',
  hunks: [
    { type: 'header', text: '@@ -3,6 +3,9 @@ class ProductRepository(ABC):' },
    { type: ' ', text: '    async def save(self, p: Product) -> Product: ...' },
    { type: ' ', text: '' },
    { type: '+', text: '    @abstractmethod' },
    { type: '+', text: '    async def delete(self, id: int) -> None: ...' },
    { type: '+', text: '' },
    { type: 'header', text: '@@ product_service.py @@' },
    { type: ' ', text: '        return p' },
    { type: ' ', text: '' },
    { type: '+', text: '    async def delete_product(self, id: int) -> None:' },
    { type: '+', text: '        p = await self._repo.get_by_id(id)' },
    { type: '+', text: '        if not p:' },
    { type: '+', text: '            raise NotFoundError(f"Product {id}")' },
    { type: '+', text: '        await self._repo.delete(id)' },
  ],
}

const SCAFFOLD_VIEW: EditorView = {
  kind: 'code',
  fileName: 'order.py',
  lines: [
    'from dataclasses import dataclass',
    'from datetime import datetime',
    '',
    '@dataclass',
    'class Order:',
    '    id: int | None = None',
    '    customer_id: int = 0',
    '    total: float = 0.0',
    '    created_at: datetime | None = None',
    '',
    '    def validate(self) -> None:',
    '        if self.total <= 0:',
    '            raise ValueError("Total must be positive")',
    '        if not self.customer_id:',
    '            raise ValueError("Customer required")',
  ],
}

/* ─── Scenario messages ─── */
const SCENARIOS: Record<ToolId, ChatMsg[]> = {
  review_pr: [
    { role: 'user', text: '@forge review_pr on PR #12' },
    { role: 'tool', text: 'Fetching PR #12 metadata…', toolName: 'pull_request_read' },
    { role: 'tool', text: 'Reading diff — 4 changed files…', toolName: 'get_file_contents', editorView: REVIEW_CODE },
    {
      role: 'assistant',
      text: [
        '## PR Review — product validation',
        '',
        '**🔒 Security** · FAIL',
        'L12: SQL injection via f-string. Use parameterised queries.',
        '',
        '**🧠 Logic** · WARN',
        'Missing null-check on `stock` before arithmetic.',
        '',
        '**🏗️ Design** · PASS',
        'Hexagonal boundaries respected.',
        '',
        '**✅ Testing** · WARN',
        'No test for `CreateProduct` use case.',
        '',
        '**📖 Readability** · WARN',
        'L2: missing type hint on `repo` param.',
        '',
        '**⚡ Perf** · PASS  |  **🔌 Integration** · PASS',
      ].join('\n'),
    },
    { role: 'tool', text: 'Posted review comment ✓', toolName: 'add_issue_comment' },
  ],

  apply_issue: [
    { role: 'user', text: '@forge apply_issue #42 — Add DELETE endpoint' },
    { role: 'tool', text: 'Fetching issue #42…', toolName: 'issue_read' },
    {
      role: 'assistant',
      text: [
        '## Action Plan',
        '',
        '1. `product_repository.py` → add `delete` abstract',
        '2. `product_service.py` → add `delete_product`',
        '3. `delete_product.py` → create use case',
        '4. `product_controller.py` → DELETE handler',
        '5. `test_delete.py` → create tests',
        '',
        '⛔ **Awaiting your approval…**',
      ].join('\n'),
    },
    { role: 'user', text: 'Approved ✅' },
    { role: 'tool', text: 'Creating branch feat/issue-42…', toolName: 'create_branch' },
    {
      role: 'assistant',
      text: 'Implementing changes…',
      editorView: APPLY_DIFF,
    },
    { role: 'tool', text: 'Self-reviewing with review_pr…', toolName: 'review_pr' },
    { role: 'assistant', text: 'Review clean — **0 blockers**. Opening PR…' },
    { role: 'tool', text: 'PR #13 created → main ✓', toolName: 'create_pull_request' },
  ],

  scaffold_project: [
    { role: 'user', text: '@forge scaffold name=order_svc entities=Order,Customer' },
    { role: 'tool', text: 'Validating inputs…', toolName: 'scaffold_project' },
    {
      role: 'assistant',
      text: [
        '## Scaffold: order_svc',
        '',
        '**Stack** fastapi · **DB** postgresql',
        '**Entities** Order, Customer',
        '',
        'Creating domain layer…',
      ].join('\n'),
    },
    {
      role: 'assistant',
      text: [
        'Creating application & infrastructure…',
        '',
        '✅ use_case/ — CRUD use cases',
        '✅ mapper/ — domain ↔ DTO',
        '✅ controller/ — REST endpoints',
        '✅ di/ — dependency injection',
        '✅ repository/ — SQLAlchemy impl',
      ].join('\n'),
      editorView: SCAFFOLD_VIEW,
    },
    {
      role: 'assistant',
      text: [
        '✅ tests/ — unit skeletons',
        '✅ pyproject.toml',
        '',
        '**18 files generated.** Run `uv sync && uv run pytest`',
      ].join('\n'),
    },
  ],
}

/* ─── Helpers ─── */
function fileIcon(name: string) {
  if (name.endsWith('.py')) return '🐍'
  if (name.endsWith('.toml')) return '⚙️'
  if (name.endsWith('.md')) return '📝'
  return '📄'
}

/** Filter tree nodes by phase (for scaffold progressive reveal) */
function filterByPhase(nodes: TreeNode[], msgIdx: number): TreeNode[] {
  return nodes
    .filter((n) => !n.phase || n.phase <= msgIdx)
    .map((n) => (n.children ? { ...n, children: filterByPhase(n.children, msgIdx) } : n))
}

/** Simple inline markdown: **bold**, `code`, and ```blocks``` */
function Fmt({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let inCodeBlock = false
  const codeBlockLines: string[] = []

  const lines = text.split('\n')
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        parts.push(
          <pre key={`cb-${li}`} className="bg-[#1a1a1a] rounded px-2 py-1 my-1 text-[10px] text-[#ce9178] overflow-x-auto">
            {codeBlockLines.join('\n')}
          </pre>,
        )
        codeBlockLines.length = 0
      }
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) {
      codeBlockLines.push(line)
      continue
    }
    // Inline formatting
    const formatted = fmtInline(line, li)
    parts.push(
      <div key={`l-${li}`}>
        {formatted}
      </div>,
    )
  }
  return <>{parts}</>
}

function fmtInline(line: string, keyBase: number): React.ReactNode[] {
  const result: React.ReactNode[] = []
  // Heading
  if (line.startsWith('## ')) {
    result.push(<span key={`h-${keyBase}`} className="font-bold text-white text-[12px]">{line.slice(3)}</span>)
    return result
  }
  // Process **bold** and `code`
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`)/g
  let last = 0
  let match
  let ki = 0
  while ((match = regex.exec(line)) !== null) {
    if (match.index > last) {
      result.push(<span key={`t-${keyBase}-${ki++}`}>{line.slice(last, match.index)}</span>)
    }
    if (match[2]) {
      result.push(<span key={`b-${keyBase}-${ki++}`} className="font-bold text-white">{match[2]}</span>)
    } else if (match[3]) {
      result.push(<code key={`c-${keyBase}-${ki++}`} className="bg-[#333] px-1 rounded text-[#ce9178]">{match[3]}</code>)
    }
    last = match.index + match[0].length
  }
  if (last < line.length) {
    result.push(<span key={`e-${keyBase}-${ki}`}>{line.slice(last)}</span>)
  }
  if (result.length === 0) result.push(<span key={`br-${keyBase}`}>{'\u00A0'}</span>)
  return result
}

/* ─── File Tree ─── */
function FileTree({
  nodes,
  depth = 0,
  onSelect,
  selectedFile,
}: {
  nodes: TreeNode[]
  depth?: number
  onSelect: (name: string, node: TreeNode) => void
  selectedFile: string
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {}
    for (const n of nodes) if (n.type === 'folder') m[n.name] = depth < 2
    return m
  })

  return (
    <>
      {nodes.map((node) => {
        const isDir = node.type === 'folder'
        const open = expanded[node.name]
        return (
          <div key={node.name}>
            <button
              onClick={() => {
                if (isDir) setExpanded((s) => ({ ...s, [node.name]: !s[node.name] }))
                else onSelect(node.name, node)
              }}
              className={`flex items-center gap-1 w-full text-left py-[2px] text-[11px] font-mono transition-colors hover:bg-[#2a2d2e] ${
                !isDir && selectedFile === node.name ? 'bg-[#37373d] text-white' : 'text-[#cccccc]'
              }`}
              style={{ paddingLeft: `${depth * 12 + 12}px` }}
            >
              {isDir ? (
                <span className={`text-[9px] inline-block transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
              ) : (
                <span className="w-[9px]" />
              )}
              <span className="text-[11px]">{isDir ? (open ? '📂' : '📁') : fileIcon(node.name)}</span>
              <span className="truncate">{node.name}</span>
            </button>
            {isDir && open && node.children && (
              <FileTree nodes={node.children} depth={depth + 1} onSelect={onSelect} selectedFile={selectedFile} />
            )}
          </div>
        )
      })}
    </>
  )
}

/* ─── Diff renderer ─── */
function DiffView({ hunks }: { hunks: DiffLine[] }) {
  return (
    <div className="font-mono text-[11px] leading-[18px]">
      {hunks.map((h, i) => {
        const bg =
          h.type === '+' ? 'bg-green-500/15' :
          h.type === '-' ? 'bg-red-500/15' :
          h.type === 'header' ? 'bg-blue-500/10' : ''
        const color =
          h.type === '+' ? 'text-green-400' :
          h.type === '-' ? 'text-red-400' :
          h.type === 'header' ? 'text-blue-400' : 'text-[#d4d4d4]'
        const prefix =
          h.type === '+' ? '+' :
          h.type === '-' ? '-' :
          h.type === 'header' ? '' : ' '
        return (
          <div key={i} className={`flex px-3 ${bg}`}>
            {h.type !== 'header' && (
              <span className={`w-4 shrink-0 select-none ${color}`}>{prefix}</span>
            )}
            <span className={`${color} ${h.type === 'header' ? 'text-[10px] py-0.5 px-2' : ''} whitespace-pre`}>
              {h.text}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Main component ─── */
export default function ForgeDemo() {
  const [activeTool, setActiveTool] = useState<ToolId>('review_pr')
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [running, setRunning] = useState(false)
  const [editorView, setEditorView] = useState<EditorView | null>(null)
  const [manualFile, setManualFile] = useState<TreeNode | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  // Auto-scroll chat
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Cleanup timer
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const runTool = useCallback(() => {
    if (running) return
    setRunning(true)
    setMessages([])
    setEditorView(null)
    setManualFile(null)
    const msgs = SCENARIOS[activeTool]
    let i = 0

    const tick = () => {
      if (i >= msgs.length) {
        setRunning(false)
        return
      }
      const current = msgs[i]
      i++
      setMessages((prev) => [...prev, current])
      if (current.editorView) setEditorView(current.editorView)
      timerRef.current = setTimeout(tick, current.role === 'tool' ? 700 : 1200)
    }
    tick()
  }, [activeTool, running])

  const switchTool = useCallback((id: ToolId) => {
    if (running) return
    setActiveTool(id)
    setMessages([])
    setEditorView(null)
    setManualFile(null)
  }, [running])

  // Compute file tree
  const tree = activeTool === 'scaffold_project' && messages.length > 0
    ? filterByPhase(SCAFFOLD_TREE, messages.length)
    : BASE_TREE

  // Resolve what to show in editor
  const editorContent = manualFile
    ? { kind: 'code' as const, fileName: manualFile.name, lines: manualFile.content ?? [] }
    : editorView

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden border border-[#333]">
      {/* ── Title bar ── */}
      <div className="bg-[#1f1f1f] flex items-center justify-between px-3 py-1.5 border-b border-[#333] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] text-slate-500 font-mono ml-2 hidden sm:inline">
            {activeTool === 'scaffold_project' ? 'order_svc' : 'acme_api'} — Forge MCP
          </span>
        </div>
        <div className="flex gap-1">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              onClick={() => switchTool(t.id)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
                activeTool === t.id
                  ? 'bg-[#0e639c] text-white'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-[#2a2d2e]'
              }`}
            >
              {t.icon} <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden bg-[#1e1e1e]">
        {/* Activity bar */}
        <div className="w-10 bg-[#181818] flex-col items-center pt-2 gap-2.5 border-r border-[#333] shrink-0 hidden md:flex">
          <span className="text-[14px] text-slate-500" title="Explorer">📂</span>
          <span className="text-[14px] text-slate-500" title="Search">🔍</span>
          <span className="text-[14px] text-slate-500" title="Git">🔀</span>
          <div className="mt-auto mb-2">
            <span className="text-[14px] text-white" title="Copilot">✨</span>
          </div>
        </div>

        {/* File explorer — hidden on mobile */}
        <div className="w-44 bg-[#181818] border-r border-[#333] overflow-y-auto terminal-scroll shrink-0 hidden lg:block">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest select-none">
            Explorer
          </div>
          <FileTree
            nodes={tree}
            onSelect={(_name, node) => { setManualFile(node); setEditorView(null) }}
            selectedFile={editorContent?.kind === 'code' ? editorContent.fileName : ''}
          />
        </div>

        {/* Editor area — hidden on small screens */}
        <div className="flex-1 flex-col min-w-0 overflow-hidden hidden md:flex">
          {/* Tab bar */}
          <div className="bg-[#252526] flex items-center border-b border-[#333] shrink-0 h-[30px]">
            {editorContent && (
              <div className="flex items-center gap-1.5 px-3 h-full bg-[#1e1e1e] border-r border-[#333] text-[11px] text-slate-300 font-mono">
                {editorContent.kind === 'diff' ? (
                  <>
                    <span className="text-green-400 text-[10px]">M</span>
                    <span>{editorContent.fileName}</span>
                  </>
                ) : editorContent.kind === 'code' ? (
                  <>
                    <span className="text-[11px]">{fileIcon(editorContent.fileName)}</span>
                    <span>{editorContent.fileName}</span>
                  </>
                ) : (
                  <span>📂 Project</span>
                )}
                <span className="text-slate-600 ml-1 cursor-pointer hover:text-white text-[10px]">×</span>
              </div>
            )}
          </div>
          {/* Editor content */}
          <div className="flex-1 overflow-y-auto terminal-scroll">
            {editorContent?.kind === 'code' ? (
              <div className="p-3 font-mono text-[11px] leading-[18px]">
                {editorContent.lines.map((line, i) => (
                  <div key={i} className="flex hover:bg-[#2a2d2e]">
                    <span className="text-[#858585] w-8 shrink-0 select-none text-right mr-4">{i + 1}</span>
                    <span className="text-[#d4d4d4] whitespace-pre">{line}</span>
                  </div>
                ))}
              </div>
            ) : editorContent?.kind === 'diff' ? (
              <DiffView hunks={editorContent.hunks} />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-600 text-xs font-mono">
                Press ▶ Run to start a demo
              </div>
            )}
          </div>
        </div>

        {/* ── Copilot Chat Panel ── */}
        <div className="flex-1 md:flex-none md:w-64 lg:w-72 bg-[#1e1e1e] border-l border-[#333] flex flex-col min-w-0">
          {/* Header */}
          <div className="bg-[#252526] px-3 py-1.5 flex items-center gap-2 border-b border-[#333] shrink-0 h-[30px]">
            <span className="text-[12px]">✨</span>
            <span className="text-[11px] text-slate-400 font-mono font-bold">Copilot Chat</span>
            <button
              onClick={runTool}
              disabled={running}
              className={`ml-auto px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
                running
                  ? 'bg-blue-500/20 text-blue-400 cursor-wait'
                  : 'bg-[#0e639c] text-white hover:bg-[#1177bb]'
              }`}
            >
              {running ? '⏳…' : messages.length > 0 ? '🔄 Replay' : '▶ Run'}
            </button>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto terminal-scroll px-2.5 py-2 space-y-2.5">
            {messages.length === 0 && !running && (
              <div className="text-slate-600 text-[11px] font-mono text-center mt-8 leading-relaxed px-2">
                Press <span className="text-white bg-[#0e639c] px-1.5 py-0.5 rounded text-[10px]">▶ Run</span> to simulate<br />
                <span className="text-blue-400">{activeTool}</span>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={`${activeTool}-${i}`} className="animate-fade-in-up">
                {msg.role === 'user' && (
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      👤
                    </div>
                    <div className="bg-[#2b2b2b] rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                )}
                {msg.role === 'tool' && (
                  <div className="flex items-start gap-1.5 text-[10px] text-slate-500 font-mono pl-7 leading-relaxed">
                    <span className="inline-block w-2.5 h-2.5 border border-blue-400 border-t-transparent rounded-full animate-spin mt-0.5 shrink-0" />
                    <span>
                      <span className="text-blue-400">{msg.toolName}</span>
                      <span className="text-slate-600"> — </span>
                      {msg.text}
                    </span>
                  </div>
                )}
                {msg.role === 'assistant' && (
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      ✨
                    </div>
                    <div className="bg-[#252526] rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono leading-relaxed border border-[#333] max-w-full overflow-x-auto min-w-0">
                      <Fmt text={msg.text} />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {running && (
              <div className="flex items-center gap-2 text-[11px] text-blue-400 font-mono pl-7">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
                Thinking…
              </div>
            )}
          </div>

          {/* Fake input */}
          <div className="border-t border-[#333] px-2.5 py-1.5 shrink-0">
            <div className="flex items-center gap-2 bg-[#2b2b2b] rounded px-2.5 py-1.5 text-[11px] text-slate-500 font-mono">
              <span>✨</span>
              <span className="truncate">Ask Copilot or type / for commands</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="bg-[#007acc] flex items-center justify-between px-3 py-[2px] text-[10px] text-white/80 font-mono shrink-0">
        <div className="flex items-center gap-3">
          <span>🔀 {activeTool === 'apply_issue' ? 'feat/issue-42' : 'main'}</span>
          <span className="hidden sm:inline">Python 3.11</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Forge MCP</span>
          <span className="hidden sm:inline">UTF-8</span>
        </div>
      </div>
    </div>
  )
}
