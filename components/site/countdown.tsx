'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

function parts(target: number, now: number) {
  const diff = Math.max(0, target - now)
  const s = Math.floor(diff / 1000)
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60]
}

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-flex h-[1.2em] w-[0.62em] justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-100%', opacity: 0, filter: 'blur(2px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '100%', opacity: 0, filter: 'blur(2px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const LABELS = ['DD', 'HH', 'MM', 'SS']

export function Countdown({ target }: { target: string }) {
  const t = new Date(target).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const values = now === null ? null : parts(t, now)
  const label = values
    ? `${values[0]} days, ${values[1]} hours, ${values[2]} minutes until the event`
    : 'Countdown loading'

  return (
    <div className="flex items-start gap-1.5 font-mono tabular-nums" role="timer" aria-label={label}>
      {LABELS.map((l, i) => {
        const v = values ? String(values[i]).padStart(2, '0') : '--'
        return (
          <div key={l} className="flex items-start gap-1.5">
            <div className="flex flex-col items-center">
              <span aria-hidden="true" className="flex border border-border bg-background px-1.5 py-1 text-xl text-foreground sm:px-2 sm:text-2xl">
                {v.split('').map((d, j) => (
                  <Digit key={j} value={d} />
                ))}
              </span>
              <span aria-hidden="true" className="mt-1.5 text-[9px] tracking-[0.18em] text-muted-foreground">
                {l}
              </span>
            </div>
            {i < 3 && (
              <span aria-hidden="true" className="pt-1.5 text-xl text-muted-foreground sm:text-2xl">
                :
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
