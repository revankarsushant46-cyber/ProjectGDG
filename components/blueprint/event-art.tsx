'use client'

import { motion } from 'motion/react'
import { useId } from 'react'
import { BlueprintDefs, FrameChrome, MonoText } from './svg-kit'

export type ArtKey = 'ai-network' | 'web-terminal' | 'cloud-cubes' | 'recap-triangle' | 'android-stack'

const W = 360
const H = 240

function hex(cx: number, cy: number, s: number) {
  const k = 0.866 * s
  return {
    outline: `M${cx} ${cy - s} L${cx + k} ${cy - s / 2} L${cx + k} ${cy + s / 2} L${cx} ${cy + s} L${cx - k} ${cy + s / 2} L${cx - k} ${cy - s / 2} Z`,
    top: `M${cx} ${cy - s} L${cx + k} ${cy - s / 2} L${cx} ${cy} L${cx - k} ${cy - s / 2} Z`,
    left: `M${cx - k} ${cy - s / 2} L${cx} ${cy} L${cx} ${cy + s} L${cx - k} ${cy + s / 2} Z`,
    inner: `M${cx} ${cy} L${cx} ${cy + s} M${cx} ${cy} L${cx + k} ${cy - s / 2} M${cx} ${cy} L${cx - k} ${cy - s / 2}`,
  }
}

function Shell({ label, coords, hatch, title, children }: { label: string; coords: string; hatch: string; title: string; children: (id: string) => React.ReactNode }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <BlueprintDefs id={id} hatchColor={hatch} cell={18} />
      <rect width={W} height={H} fill={`url(#${id}-grid)`} />
      <FrameChrome w={W} h={H} label={label} coords={coords} inset={16} />
      {children(id)}
    </svg>
  )
}

const AI_NODES = { top: [180, 58], left: [104, 120], center: [180, 120], right: [256, 120], bottom: [180, 182] } as const
const AI_EDGES: [keyof typeof AI_NODES, keyof typeof AI_NODES][] = [
  ['top', 'left'], ['top', 'right'], ['left', 'bottom'], ['right', 'bottom'],
  ['center', 'top'], ['center', 'left'], ['center', 'right'], ['center', 'bottom'],
]

export function AiNetworkArt() {
  return (
    <Shell label="GDG / STUDY 06" coords="X.125 / Y.080" hatch="var(--g-red)" title="Isometric AI node network with a glowing yellow core">
      {() => (
        <>
          <path d="M180 30 L290 120 L180 212 L70 120 Z" fill="none" stroke="var(--g-red)" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" className="animate-dash" />
          {AI_EDGES.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={AI_NODES[a][0]}
              y1={AI_NODES[a][1]}
              x2={AI_NODES[b][0]}
              y2={AI_NODES[b][1]}
              stroke="var(--g-red)"
              strokeWidth="1.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
            />
          ))}
          {AI_EDGES.slice(4).map(([a, b], i) => (
            <motion.circle
              key={`p${i}`}
              r="2.6"
              fill="var(--g-yellow)"
              animate={{ cx: [AI_NODES[a][0], AI_NODES[b][0]], cy: [AI_NODES[a][1], AI_NODES[b][1]], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
            />
          ))}
          {(Object.keys(AI_NODES) as (keyof typeof AI_NODES)[]).map((k, i) => {
            const [x, y] = AI_NODES[k]
            const isCore = k === 'center'
            const h = hex(x, y, isCore ? 22 : 20)
            const fill = isCore ? 'var(--g-yellow)' : 'var(--g-red)'
            return (
              <motion.g
                key={k}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200, damping: 14 }}
              >
                <motion.g animate={{ y: [0, isCore ? -4 : -2, 0] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
                  <path d={h.outline} fill={fill} opacity="0.92" />
                  <path d={h.left} fill="#000" opacity="0.18" />
                  <path d={h.top} fill="#fff" opacity="0.12" />
                  <path d={h.inner} stroke="#000" strokeOpacity="0.25" strokeWidth="1" fill="none" />
                </motion.g>
              </motion.g>
            )
          })}
        </>
      )}
    </Shell>
  )
}

export function WebTerminalArt() {
  return (
    <Shell label="GDG / STUDY 07" coords="X.126 / Y.080" hatch="var(--g-green)" title="Layered green terminal windows with a blinking prompt">
      {(id) => (
        <>
          <motion.g initial={{ x: 0, y: 0 }} whileInView={{ x: 18, y: -16 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <rect x="96" y="56" width="200" height="140" fill={`url(#${id}-hatch)`} stroke="var(--g-green)" strokeWidth="1.2" />
          </motion.g>
          <motion.g initial={{ x: 0, y: 0 }} whileInView={{ x: 9, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
            <rect x="96" y="56" width="200" height="140" fill="var(--card)" stroke="var(--g-green)" strokeWidth="1" opacity="0.9" />
          </motion.g>
          <rect x="78" y="70" width="200" height="140" fill="var(--card)" stroke="var(--g-green)" strokeWidth="1.6" />
          <line x1="78" y1="90" x2="278" y2="90" stroke="var(--g-green)" strokeWidth="1" />
          <circle cx="90" cy="80" r="3" fill="var(--g-red)" />
          <circle cx="101" cy="80" r="3" fill="var(--g-yellow)" />
          <circle cx="112" cy="80" r="3" fill="var(--g-green)" />
          <path d="M96 112 L106 120 L96 128" fill="none" stroke="var(--g-yellow)" strokeWidth="2.2" />
          <rect x="114" y="126" width="26" height="2.6" fill="var(--g-yellow)" className="animate-blink" />
          {[150, 164, 178].map((y, i) => (
            <motion.line
              key={y}
              x1="96"
              y1={y}
              x2={[230, 196, 214][i]}
              y2={y}
              stroke="var(--g-green)"
              strokeWidth="1"
              opacity="0.7"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.25, duration: 0.6 }}
            />
          ))}
        </>
      )}
    </Shell>
  )
}

function WireCube({ cx, cy, s, hatchId, delay }: { cx: number; cy: number; s: number; hatchId: string; delay: number }) {
  const h = hex(cx, cy, s)
  return (
    <motion.g
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 140, damping: 16 }}
    >
      <path d={h.left} fill={`url(#${hatchId}-hatch)`} />
      <path d={h.outline} fill="none" stroke="var(--g-yellow)" strokeWidth="1.6" />
      <path d={h.inner} fill="none" stroke="var(--g-yellow)" strokeWidth="1.2" />
    </motion.g>
  )
}

export function CloudCubesArt() {
  return (
    <Shell label="GDG / STUDY 08" coords="X.127 / Y.080" hatch="var(--g-yellow)" title="Yellow wireframe cubes rising toward a blue cloud outline">
      {(id) => (
        <>
          <motion.path
            d="M120 82 C 112 60, 140 46, 156 58 C 166 34, 210 34, 218 60 C 240 52, 258 70, 248 90"
            fill="none"
            stroke="var(--g-blue)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          <line x1="110" y1="96" x2="250" y2="96" stroke="var(--g-blue)" strokeWidth="1.4" />
          <WireCube cx={132} cy={146} s={36} hatchId={id} delay={0.1} />
          <WireCube cx={180} cy={126} s={36} hatchId={id} delay={0.25} />
          <WireCube cx={228} cy={106} s={36} hatchId={id} delay={0.4} />
          <line x1="70" y1="204" x2="290" y2="204" stroke="var(--g-yellow)" strokeWidth="1.4" strokeDasharray="2 3" className="animate-dash" />
        </>
      )}
    </Shell>
  )
}

export function RecapTriangleArt() {
  return (
    <Shell label="GDG / STUDY 09" coords="X.128 / Y.080" hatch="var(--g-blue)" title="Hatched blueprint triangle with faint construction marks">
      {(id) => (
        <>
          <MonoText x={110} y={60} opacity={0.35}>EXPERIMENT · 01</MonoText>
          <MonoText x={250} y={196} anchor="end" opacity={0.35}>SHIP · 03</MonoText>
          <motion.circle
            cx="180"
            cy="138"
            r="78"
            fill="none"
            stroke="var(--g-blue)"
            strokeWidth="0.8"
            strokeDasharray="2 5"
            opacity="0.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M180 70 L262 186 L98 186 Z"
            fill={`url(#${id}-hatch)`}
            stroke="var(--g-blue)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
          />
          <rect x="154" y="134" width="52" height="30" fill="var(--card)" stroke="var(--g-blue)" strokeWidth="0.8" />
          <rect x="174" y="144" width="12" height="10" fill="var(--g-yellow)" />
          <line x1="60" y1="186" x2="300" y2="186" stroke="var(--g-blue)" strokeWidth="0.8" opacity="0.6" />
        </>
      )}
    </Shell>
  )
}

export function AndroidStackArt() {
  return (
    <Shell label="GDG / STUDY 10" coords="X.129 / Y.080" hatch="var(--g-green)" title="Wireframe phone with stacked composable cards">
      {(id) => (
        <>
          <rect x="140" y="40" width="80" height="160" rx="12" fill="var(--card)" stroke="var(--g-green)" strokeWidth="1.8" />
          <line x1="168" y1="50" x2="192" y2="50" stroke="var(--g-green)" strokeWidth="2" />
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x="150"
              y={64 + i * 40}
              width="60"
              height="32"
              fill={i === 1 ? `url(#${id}-hatch)` : 'none'}
              stroke="var(--g-green)"
              strokeWidth="1.2"
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 160, damping: 18 }}
            />
          ))}
          <rect x="196" y="140" width="10" height="10" fill="var(--g-yellow)" />
          <path d="M240 80 L270 80 M240 120 L290 120 M240 160 L262 160" stroke="var(--g-green)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
          <path d="M120 80 L90 80 M120 160 L80 160" stroke="var(--g-green)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        </>
      )}
    </Shell>
  )
}

export function EventArt({ art }: { art: ArtKey }) {
  switch (art) {
    case 'ai-network':
      return <AiNetworkArt />
    case 'web-terminal':
      return <WebTerminalArt />
    case 'cloud-cubes':
      return <CloudCubesArt />
    case 'recap-triangle':
      return <RecapTriangleArt />
    case 'android-stack':
      return <AndroidStackArt />
  }
}
