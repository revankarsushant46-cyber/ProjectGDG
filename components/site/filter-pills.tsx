'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export function FilterPills<T extends string>({
  label,
  options,
  value,
  onChange,
  layoutId,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  layoutId: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o === value
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o)}
            className={cn(
              'relative h-9 border px-3.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300',
              active ? 'border-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className="absolute inset-0 bg-foreground"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{o}</span>
          </button>
        )
      })}
    </div>
  )
}
