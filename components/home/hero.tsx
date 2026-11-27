'use client'

import { motion } from 'motion/react'
import { HeroArt } from '@/components/blueprint/hero-art'
import { BlueprintButton } from '@/components/site/blueprint-button'
import { EASE } from '@/components/motion/reveal'

const HEADLINE = ['Stay', 'curious.', 'Build', 'together.']

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-4 pt-12 sm:px-8 sm:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            A campus. A community. A world of possibilities.
          </motion.p>
          <h1 id="hero-title" className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl">
            {HEADLINE.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: EASE }}
                >
                  {w}
                  {i < HEADLINE.length - 1 && '\u00A0'}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {"We're GDG RVCE. A home for curious minds, bold ideas, and people who learn by making. Your next big thing starts with a hello."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <BlueprintButton href="/events" variant="primary">
              Explore Events
            </BlueprintButton>
            <BlueprintButton href="/team">Meet the Team</BlueprintButton>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="border border-border bg-card"
        >
          <figcaption className="border-b border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Fig. 001 / Connecting possibilities
          </figcaption>
          <div className="aspect-[16/10]">
            <HeroArt />
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-1 border-t border-border px-4 py-3 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
            <span>12.9237° N</span>
            <span>77.4987° E</span>
            <span>/ BENGALURU</span>
          </div>
        </motion.figure>
      </div>
    </section>
  )
}
