'use client'

import { motion } from 'motion/react'
import { BranchArt, CubeLaunchArt, GearsArt, NetworkArt } from '@/components/blueprint/interest-art'
import { SectionLabel, Stagger, staggerItem } from '@/components/motion/reveal'
import { ACCENTS, type Accent } from '@/lib/accent'
import { cn } from '@/lib/utils'

const CARDS: { title: string; body: string; accent: Accent; Art: () => React.JSX.Element }[] = [
  { title: 'Learn by doing.', body: 'Less watching. More building. Workshops that turn curiosity into working code.', accent: 'blue', Art: GearsArt },
  { title: 'Find your people.', body: 'Your future collaborators are probably debugging the same thing.', accent: 'red', Art: NetworkArt },
  { title: 'Make it real.', body: 'Ship your wild idea. Break it, fix it, and share what you learned.', accent: 'yellow', Art: CubeLaunchArt },
  { title: 'Grow in the open.', body: 'Open source, open minds. Everyone has something to teach.', accent: 'green', Art: BranchArt },
]

export function Interests() {
  return (
    <section aria-labelledby="interests-title" className="px-4 pt-24 sm:px-8 sm:pt-32">
      <SectionLabel index="01">The way we build</SectionLabel>
      <h2 id="interests-title" className="mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        Different interests. Shared curiosity.
      </h2>
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
        {CARDS.map(({ title, body, accent, Art }) => (
          <motion.article
            key={title}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={cn('group relative border border-border border-t-[3px] bg-card p-5 sm:p-7', ACCENTS[accent].borderTop)}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(600px circle at 50% 0%, color-mix(in srgb, ${ACCENTS[accent].color} 9%, transparent), transparent 60%)` }}
            />
            <div className="relative aspect-[16/9] border border-border bg-background">
              <Art />
            </div>
            <h3 className="relative mt-6 font-display text-2xl font-bold tracking-tight">{title}</h3>
            <p className="relative mt-3 max-w-sm leading-relaxed text-muted-foreground">{body}</p>
          </motion.article>
        ))}
      </Stagger>
    </section>
  )
}
