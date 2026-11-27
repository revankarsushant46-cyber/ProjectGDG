'use client'

import { motion } from 'motion/react'
import { EASE } from '@/components/motion/reveal'

export function PageHeader({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <header className="px-4 pb-10 pt-12 sm:px-8 sm:pt-20">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        {kicker}
      </motion.p>
      <h1 className="mt-5 overflow-hidden font-display text-4xl font-bold tracking-[-0.03em] text-balance sm:text-6xl">
        <motion.span className="inline-block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
          {title}
        </motion.span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg"
      >
        {intro}
      </motion.p>
    </header>
  )
}
