'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { MediaFrame } from '@/components/blueprint/media-frame'
import { AvatarArt } from '@/components/blueprint/avatar-art'
import { ACCENTS } from '@/lib/accent'
import type { Member } from '@/lib/team'
import { cn } from '@/lib/utils'

function Socials({ m }: { m: Member }) {
  return (
    <div className="relative z-10 flex gap-2">
      {[
        { href: m.github, label: 'GitHub' },
        { href: m.linkedin, label: 'LinkedIn' },
      ].map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${m.name} on ${l.label} (opens in a new tab)`}
          className="inline-flex h-8 items-center gap-1 border border-border px-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          {l.label}
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </a>
      ))}
    </div>
  )
}

export function MemberCard({ m, onOpen, size = 'md' }: { m: Member; onOpen: (m: Member, el: HTMLElement) => void; size?: 'lg' | 'md' }) {
  const a = ACCENTS[m.accent]
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn('group relative flex h-full flex-col border border-border border-t-[3px] bg-card p-3', a.borderTop)}
    >
      <MediaFrame
        src={m.photo}
        alt={`Portrait of ${m.name}`}
        accent={m.accent}
        label={m.domain}
        meta={m.initials}
        caption={m.year}
        aspect={size === 'lg' ? 'aspect-[4/5]' : 'aspect-[5/6]'}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      >
        <AvatarArt seed={m.slug} accent={m.accent} initials={m.initials} />
      </MediaFrame>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className={cn('font-mono text-[10px] uppercase tracking-[0.14em]', a.text)}>{m.role}</p>
        <h3 className={cn('mt-1.5 font-display font-bold tracking-tight', size === 'lg' ? 'text-2xl' : 'text-xl')}>
          <button
            type="button"
            onClick={(e) => onOpen(m, e.currentTarget)}
            className="text-left after:absolute after:inset-0 focus-visible:outline-none"
            aria-haspopup="dialog"
          >
            {m.name}
            <span className="sr-only">, view profile</span>
          </button>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <Socials m={m} />
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center border border-border text-muted-foreground transition-all duration-300 group-hover:rotate-90 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
          >
            <Plus className="size-4" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function MemberRow({ m }: { m: Member }) {
  const a = ACCENTS[m.accent]
  return (
    <article className={cn('group relative flex h-full gap-4 border border-border border-l-[3px] bg-card p-3 transition-colors duration-300 hover:border-foreground/25', a.borderLeft)}>
      <div className="w-20 shrink-0 sm:w-24">
        <MediaFrame compact src={m.photo} alt={`Portrait of ${m.name}`} accent={m.accent} label="" aspect="aspect-[5/6]" sizes="96px">
          <AvatarArt seed={m.slug} accent={m.accent} initials={m.initials} />
        </MediaFrame>
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <p className={cn('font-mono text-[10px] uppercase tracking-[0.14em]', a.text)}>{m.role}</p>
        <h3 className="mt-1 font-display text-lg font-bold tracking-tight">{m.name}</h3>
        <p className="font-mono text-[10px] text-muted-foreground">{m.year}</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Contributions</p>
        <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
          {m.contributions.map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 size-1 shrink-0" style={{ background: a.color }} />
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {m.skills.map((s) => (
            <span key={s} className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
