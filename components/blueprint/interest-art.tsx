'use client'

import { motion } from 'motion/react'
import { useId } from 'react'
import { BlueprintDefs, FrameChrome } from './svg-kit'

const W = 320
const H = 180

function gearPath(cx: number, cy: number, r: number, teeth: number, depth = 6) {
  const pts: string[] = []
  const step = (Math.PI * 2) / (teeth * 2)
  for (let i = 0; i < teeth * 2; i++) {
    const rr = i % 2 === 0 ? r + depth : r
    const a0 = i * step - step / 2.4
    const a1 = i * step + step / 2.4
    pts.push(`${(cx + rr * Math.cos(a0)).toFixed(2)},${(cy + rr * Math.sin(a0)).toFixed(2)}`)
    pts.push(`${(cx + rr * Math.cos(a1)).toFixed(2)},${(cy + rr * Math.sin(a1)).toFixed(2)}`)
  }
  return `M${pts.join('L')}Z`
}

function Shell({ children, label, coords, hatch, title }: { children: (id: string) => React.ReactNode; label: string; coords: string; hatch: string; title: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={title}>
      <BlueprintDefs id={id} hatchColor={hatch} cell={16} />
      <rect width={W} height={H} fill={`url(#${id}-grid)`} />
      <FrameChrome w={W} h={H} label={label} coords={coords} inset={14} />
      {children(id)}
    </svg>
  )
}

/** Learn by doing — interlocking gears */
export function GearsArt() {
  const big = gearPath(0, 0, 34, 12)
  const small = gearPath(0, 0, 20, 8, 5)
  return (
    <Shell label="GDG / STUDY 02" coords="X.121 / Y.080" hatch="var(--g-blue)" title="Two interlocking wireframe gears">
      {(id) => (
        <>
          <line x1="60" y1="92" x2="260" y2="92" stroke="var(--g-blue)" strokeWidth="0.8" opacity="0.4" />
          <g transform="translate(138 92)">
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
              <path d={big} fill="none" stroke="var(--g-blue)" strokeWidth="2.5" />
              <circle r="22" fill={`url(#${id}-hatch)`} stroke="var(--g-blue)" strokeWidth="1" />
              <circle r="6" fill="var(--background)" stroke="var(--g-blue)" strokeWidth="1.5" />
            </motion.g>
          </g>
          <g transform="translate(196 62)">
            <motion.g animate={{ rotate: -540 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
              <path d={small} fill="none" stroke="var(--g-blue)" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle r="5" fill="var(--g-yellow)" />
            </motion.g>
          </g>
          <circle cx="196" cy="62" r="34" fill="none" stroke="var(--g-blue)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.6" />
          <rect x="200" y="110" width="18" height="18" fill="var(--g-yellow)" />
        </>
      )}
    </Shell>
  )
}

const NODES: [number, number][] = [
  [100, 60],
  [150, 42],
  [214, 58],
  [236, 112],
  [180, 134],
  [112, 124],
  [162, 90],
]
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [6, 0], [6, 2], [6, 4], [6, 1], [6, 3],
]

/** Find your people — connected dots */
export function NetworkArt() {
  return (
    <Shell label="GDG / STUDY 03" coords="X.122 / Y.080" hatch="var(--g-red)" title="A network of connected people nodes">
      {(id) => (
        <>
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              stroke="var(--g-red)"
              strokeWidth={a === 6 || b === 6 ? 1 : 1.6}
              strokeDasharray={a === 6 || b === 6 ? '3 3' : undefined}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.8 }}
            />
          ))}
          {NODES.slice(0, 6).map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="9" fill="var(--card)" stroke="var(--g-red)" strokeWidth="1.6" />
              <circle cx={x} cy={y} r="9" fill={`url(#${id}-hatch)`} />
            </g>
          ))}
          <g transform="translate(162 90)">
            <circle r="10" fill="var(--g-yellow)" className="animate-pulse-ring" style={{ transformOrigin: 'center', transformBox: 'fill-box' }} opacity="0.5" />
            <rect x="-8" y="-8" width="16" height="16" fill="var(--g-yellow)" />
          </g>
        </>
      )}
    </Shell>
  )
}

/** Make it real — wireframe cube with launch trajectory */
export function CubeLaunchArt() {
  return (
    <Shell label="GDG / STUDY 04" coords="X.123 / Y.080" hatch="var(--g-yellow)" title="A wireframe cube launching along a dashed trajectory">
      {(id) => (
        <>
          <motion.path
            d="M120 140 C 170 140, 210 100, 250 40"
            fill="none"
            stroke="var(--g-yellow)"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="animate-dash"
          />
          <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
            <g transform="translate(118 92)" fill="none" stroke="var(--g-yellow)">
              <path d="M0 -36 L36 -18 L36 22 L0 40 L-36 22 L-36 -18 Z" strokeWidth="2.4" />
              <path d="M0 -36 L36 -18 L0 0 L-36 -18 Z" fill={`url(#${id}-hatch)`} strokeWidth="1.2" />
              <path d="M0 0 L0 40" strokeWidth="1.2" />
              <path d="M-36 22 L0 4 L36 22" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />
            </g>
          </motion.g>
          <motion.g
            animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <g transform="translate(248 44) rotate(35)" fill="none" stroke="var(--g-yellow)" strokeWidth="1.6">
              <path d="M0 -16 C 7 -8, 7 4, 5 10 L-5 10 C -7 4, -7 -8, 0 -16 Z" />
              <path d="M-5 6 L-10 14 L-5 12 M5 6 L10 14 L5 12" />
              <circle cy="-3" r="2.4" fill="var(--g-red)" stroke="none" />
            </g>
          </motion.g>
          <rect x="188" y="120" width="16" height="16" fill="var(--g-blue)" opacity="0.9" />
        </>
      )}
    </Shell>
  )
}

/** Grow in the open — open-source branch graph inside brackets */
export function BranchArt() {
  return (
    <Shell label="GDG / STUDY 05" coords="X.124 / Y.080" hatch="var(--g-green)" title="An open-source branch graph wrapped in code brackets">
      {(id) => (
        <>
          <path d="M70 50 Q 58 50 58 62 L58 82 Q 58 90 50 90 Q 58 90 58 98 L58 118 Q 58 130 70 130" fill="none" stroke="var(--g-green)" strokeWidth="2.4" />
          <path d="M250 50 Q 262 50 262 62 L262 82 Q 262 90 270 90 Q 262 90 262 98 L262 118 Q 262 130 250 130" fill="none" stroke="var(--g-green)" strokeWidth="2.4" />
          <line x1="88" y1="110" x2="232" y2="110" stroke="var(--g-green)" strokeWidth="2" />
          <motion.path
            d="M118 110 C 130 110, 130 70, 150 70 L 190 70 C 205 70, 205 110, 214 110"
            fill="none"
            stroke="var(--g-green)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          {[88, 118, 172, 214, 232].map((x, i) => (
            <circle key={x} cx={x} cy={110} r={i === 4 ? 7 : 5} fill={i === 4 ? 'var(--g-green)' : 'var(--card)'} stroke="var(--g-green)" strokeWidth="1.6" />
          ))}
          <circle cx="150" cy="70" r="6" fill={`url(#${id}-hatch)`} stroke="var(--g-green)" strokeWidth="1.4" />
          <rect x="183" y="63" width="14" height="14" fill="var(--g-yellow)" />
        </>
      )}
    </Shell>
  )
}
