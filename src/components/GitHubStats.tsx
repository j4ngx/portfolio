import { useState, useEffect } from 'react'
import FadeInSection from './FadeInSection'
import { PERSONAL } from '../data/portfolio'

interface GitHubData {
  publicRepos: number
  followers: number
  following: number
  topLanguages: { name: string; pct: number }[]
  totalStars: number
  recentActivity: { repo: string; message: string; date: string }[]
}

const GITHUB_USER = PERSONAL.github.split('/').pop() ?? 'j4ngx'

async function fetchGitHubData(): Promise<GitHubData> {
  const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' }

  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=10`, { headers }),
  ])

  if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

  const user = await userRes.json()
  const repos: Array<Record<string, unknown>> = await reposRes.json()
  const events: Array<Record<string, unknown>> = eventsRes.ok ? await eventsRes.json() : []

  // Language stats
  const langMap = new Map<string, number>()
  for (const r of repos) {
    const lang = r.language as string | null
    if (lang) langMap.set(lang, (langMap.get(lang) ?? 0) + 1)
  }
  const total = [...langMap.values()].reduce((a, b) => a + b, 0)
  const topLanguages = [...langMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }))

  // Stars
  const totalStars = repos.reduce(
    (acc, r) => acc + ((r.stargazers_count as number) ?? 0),
    0,
  )

  // Recent push events
  const pushEvents = events
    .filter((e) => e.type === 'PushEvent')
    .slice(0, 4)
  const recentActivity = pushEvents.map((e) => {
    const payload = e.payload as Record<string, unknown>
    const commits = payload.commits as Array<Record<string, string>> | undefined
    return {
      repo: ((e.repo as Record<string, string>)?.name ?? '').replace(`${GITHUB_USER}/`, ''),
      message: commits?.[0]?.message?.split('\n')[0] ?? 'push',
      date: new Date(e.created_at as string).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }
  })

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    topLanguages,
    totalStars,
    recentActivity,
  }
}

const LANG_COLORS: Record<string, string> = {
  Python: 'bg-blue-500',
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-yellow-400',
  Shell: 'bg-green-500',
  Bash: 'bg-green-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
  Swift: 'bg-orange-400',
  Go: 'bg-cyan-400',
  Rust: 'bg-red-400',
}

function StatCard({ label, value }: Readonly<{ label: string; value: string | number }>) {
  return (
    <div className="bg-surface border border-border rounded p-4 text-center">
      <div className="text-2xl font-bold text-primary font-mono">{value}</div>
      <div className="text-xs text-muted mt-1">{label}</div>
    </div>
  )
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchGitHubData()
      .then(setData)
      .catch(() => setError(true))
  }, [])

  if (error) {
    return (
      <section className="py-24 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted text-sm font-mono">
            GitHub stats temporarily unavailable — rate limited.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="py-24 bg-bg border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                GitHub Activity
              </h2>
              <p className="text-subtle mt-2">
                Live stats from my open-source contributions.
              </p>
            </div>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-primary transition-colors mt-2 md:mt-0"
            >
              @{GITHUB_USER} ↗
            </a>
          </div>
        </FadeInSection>

        {data ? (
          <div className="space-y-8">
            {/* Stat cards */}
            <FadeInSection delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Public Repos" value={data.publicRepos} />
                <StatCard label="Total Stars" value={data.totalStars} />
                <StatCard label="Followers" value={data.followers} />
                <StatCard label="Following" value={data.following} />
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top languages */}
              <FadeInSection delay={200}>
                <div className="bg-surface border border-border rounded p-6 h-full">
                  <h3 className="text-sm font-bold text-primary mb-4 font-mono">
                    Top Languages
                  </h3>
                  <div className="space-y-3">
                    {data.topLanguages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-subtle">{lang.name}</span>
                          <span className="text-muted font-mono">{lang.pct}%</span>
                        </div>
                        <div className="w-full bg-bg rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-700 ${LANG_COLORS[lang.name] ?? 'bg-accent'}`}
                            style={{ width: `${lang.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              {/* Recent activity */}
              <FadeInSection delay={300}>
                <div className="bg-surface border border-border rounded p-6 h-full">
                  <h3 className="text-sm font-bold text-primary mb-4 font-mono">
                    Recent Activity
                  </h3>
                  {data.recentActivity.length === 0 ? (
                    <p className="text-muted text-xs">No recent public activity.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.recentActivity.map((event, i) => (
                        <div key={`${event.repo}-${event.date}`} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-subtle truncate">{event.message}</p>
                            <p className="text-[11px] text-muted font-mono">
                              {event.repo} · {event.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeInSection>
            </div>
          </div>
        ) : (
          /* Skeleton loader */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {['repos', 'stars', 'followers', 'following'].map((key) => (
              <div key={key} className="bg-surface border border-border rounded p-4 h-20" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
