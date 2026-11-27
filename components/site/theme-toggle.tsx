'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const isDark = !mounted || resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex h-10 items-center gap-2 overflow-hidden border border-border bg-card px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      <span className="relative block size-4">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            className="absolute inset-0"
            initial={{ y: 14, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -14, rotate: 90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          >
            {isDark ? <Moon className="size-4" aria-hidden="true" /> : <Sun className="size-4" aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
