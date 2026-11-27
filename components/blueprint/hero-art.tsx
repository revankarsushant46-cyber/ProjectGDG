'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useId } from 'react'
import { BlueprintDefs, FrameChrome } from './svg-kit'

const draw = (delay: number, duration = 1.4) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] as const }, opacity: { delay, duration: 0.2 } },
})

export function HeroArt() {
  const id = useId().replace(/:/g, '')
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 80, damping: 18 })
  const sy = useSpring(py, { stiffness: 80, damping: 18 })

  const backX = useTransform(sx, (v) => v * -10)
  const backY = useTransform(sy, (v) => v * -8)
  const midX = useTransform(sx, (v) => v * 8)
  const midY = useTransform(sy, (v) => v * 6)
  const frontX = useTransform(sx, (v) => v * 18)
  const frontY = useTransform(sy, (v) => v * 14)
  const rot = useTransform(sx, (v) => v * 2)

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  return (
    <div onPointerMove={onMove} onPointerLeave={() => (px.set(0), py.set(0))} className="h-full w-full">
      <svg viewBox="0 0 640 400" className="h-full w-full" role="img" aria-label="Blueprint study of layered, tilted frames with a hatched circle and a yellow block">
        <BlueprintDefs id={id} />
        <rect width="640" height="400" fill={`url(#${id}-grid)`} />
        <FrameChrome w={640} h={400} label="GDG / STUDY 01" coords="X.120 / Y.080" inset={26} />

        <motion.line x1="70" y1="210" x2="570" y2="210" stroke="var(--g-blue)" strokeWidth="1" opacity="0.55" {...draw(0.1, 1)} />
        <motion.line x1="330" y1="50" x2="330" y2="360" stroke="var(--g-blue)" strokeWidth="1" opacity="0.55" {...draw(0.2, 1)} />

        <motion.g style={{ x: backX, y: backY, rotate: rot, originX: '50%', originY: '50%' }}>
          <g transform="rotate(-11 330 210)">
            <motion.rect x="160" y="100" width="330" height="220" fill="none" stroke="var(--g-blue)" strokeWidth="1.2" {...draw(0.3)} />
            <rect
              x="185"
              y="118"
              width="300"
              height="196"
              fill="none"
              stroke="var(--g-blue)"
              strokeWidth="1.2"
              strokeDasharray="6 6"
              className="animate-dash"
              opacity="0.8"
            />
          </g>
        </motion.g>

        <motion.g style={{ x: midX, y: midY }}>
          <motion.circle
            cx="250"
            cy="208"
            r="62"
            fill={`url(#${id}-hatch)`}
            stroke="var(--g-blue)"
            strokeWidth="1.2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 120, damping: 14 }}
            style={{ originX: '250px', originY: '208px' }}
          />
        </motion.g>

        <motion.g style={{ x: frontX, y: frontY }}>
          <g transform="rotate(-11 330 210)">
            <motion.rect x="210" y="130" width="250" height="170" fill="none" stroke="var(--g-blue)" strokeWidth="11" {...draw(0.6, 1.6)} />
            <motion.rect x="238" y="148" width="214" height="140" fill="none" stroke="var(--g-blue)" strokeWidth="1.2" opacity="0.8" {...draw(1, 1.2)} />
          </g>
          <motion.rect
            x="395"
            y="255"
            width="44"
            height="40"
            fill="var(--g-yellow)"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ opacity: { delay: 1.6, duration: 0.4 }, y: { delay: 1.6, duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          />
        </motion.g>
      </svg>
    </div>
  )
}
