import { SKILL_GROUPS } from '../data/portfolio'
import FadeInSection from './FadeInSection'

/**
 * Pure-SVG radar (spider) chart rendering skill group coverage.
 * Each axis represents one skill group; the radius is proportional
 * to the number of skills in that group (normalized to the max).
 */

const SIZE = 300
const CENTER = SIZE / 2
const RADIUS = 120
const LEVELS = 4

/** Map skill groups into radar axes */
function useRadarData() {
  const max = Math.max(...SKILL_GROUPS.map((g) => g.skills.length))
  return SKILL_GROUPS.map((g, i) => {
    const angle = (Math.PI * 2 * i) / SKILL_GROUPS.length - Math.PI / 2
    const value = g.skills.length / max
    return {
      label: g.title.split('&')[0].trim(), // short label
      fullLabel: g.title,
      value,
      count: g.skills.length,
      x: CENTER + Math.cos(angle) * RADIUS * value,
      y: CENTER + Math.sin(angle) * RADIUS * value,
      labelX: CENTER + Math.cos(angle) * (RADIUS + 28),
      labelY: CENTER + Math.sin(angle) * (RADIUS + 28),
      axisX: CENTER + Math.cos(angle) * RADIUS,
      axisY: CENTER + Math.sin(angle) * RADIUS,
    }
  })
}

function RadarGrid() {
  const axes = SKILL_GROUPS.length
  const levels = Array.from({ length: LEVELS }, (_, i) => (i + 1) / LEVELS)

  return (
    <g className="text-border">
      {/* Concentric rings */}
      {levels.map((l) => {
        const points = Array.from({ length: axes }, (_, i) => {
          const angle = (Math.PI * 2 * i) / axes - Math.PI / 2
          const x = CENTER + Math.cos(angle) * RADIUS * l
          const y = CENTER + Math.sin(angle) * RADIUS * l
          return `${x},${y}`
        }).join(' ')
        return (
          <polygon
            key={l}
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
            opacity={0.4}
          />
        )
      })}
      {/* Axis lines */}
      {Array.from({ length: axes }, (_, i) => {
        const angle = (Math.PI * 2 * i) / axes - Math.PI / 2
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={CENTER + Math.cos(angle) * RADIUS}
            y2={CENTER + Math.sin(angle) * RADIUS}
            stroke="currentColor"
            strokeWidth={0.5}
            opacity={0.3}
          />
        )
      })}
    </g>
  )
}

export default function SkillRadar() {
  const data = useRadarData()
  const polygonPoints = data.map((d) => `${d.x},${d.y}`).join(' ')

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Skill Coverage
              </h2>
              <p className="text-subtle mt-2">
                Competency distribution across technical domains.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-xs text-muted bg-surface px-3 py-1 rounded border border-border">
                radar_v1.0
              </span>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={150}>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Radar SVG */}
            <div className="shrink-0">
              <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="w-[280px] h-[280px] md:w-[340px] md:h-[340px]"
                role="img"
                aria-label="Skill radar chart showing competency across 6 domains"
              >
                <RadarGrid />
                {/* Filled polygon */}
                <polygon
                  points={polygonPoints}
                  className="fill-primary/10 stroke-primary dark:fill-primary/15"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                />
                {/* Data points */}
                {data.map((d) => (
                  <circle
                    key={d.label}
                    cx={d.x}
                    cy={d.y}
                    r={3.5}
                    className="fill-primary"
                  />
                ))}
                {/* Labels */}
                {data.map((d) => (
                  <text
                    key={d.label}
                    x={d.labelX}
                    y={d.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-subtle text-[9px] font-mono"
                  >
                    {d.label}
                  </text>
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {data.map((d, i) => (
                <div
                  key={d.fullLabel}
                  className="bg-surface border border-border rounded p-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${SKILL_GROUPS[i].color}`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary truncate">
                      {d.fullLabel}
                    </p>
                    <p className="text-xs text-muted font-mono">
                      {d.count} skills · {Math.round(d.value * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
