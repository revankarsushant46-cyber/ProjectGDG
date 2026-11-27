'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, GitBranch, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { MediaFrame } from '@/components/blueprint/media-frame'
import { AvatarArt } from '@/components/blueprint/avatar-art'
import { ACCENTS } from '@/lib/accent'
import type { Member } from '@/lib/team'
import { EASE } from '@/components/motion/reveal'

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export function MemberDrawer({ member, onClose }: { member: Member | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!member) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panelRef.current) return
      const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [member, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {member && (
        <div className="fixed inset-0 z-[60]" key={member.slug}>
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            className="bg-blueprint absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-border bg-background"
          >
            <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Profile / {member.slug.replace(/-/g, '_')}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close profile"
                className="grid size-9 place-items-center border border-border transition-colors hover:bg-secondary"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <motion.div
              className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              <Profile m={member} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function Profile({ m }: { m: Member }) {
  const a = ACCENTS[m.accent]
  return (
    <>
      <motion.div variants={item} className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-end">
        <MediaFrame src={m.photo} alt={`Portrait of ${m.name}`} accent={m.accent} label={m.domain} aspect="aspect-[5/6]" sizes="180px" compact>
          <AvatarArt seed={m.slug} accent={m.accent} initials={m.initials} />
        </MediaFrame>
        <div>
          <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${a.text}`}>{m.role}</p>
          <h2 id="member-title" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {m.name}
          </h2>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{m.year}</p>
        </div>
      </motion.div>

      <motion.p variants={item} className="mt-6 text-pretty leading-relaxed text-muted-foreground">
        {m.bio}
      </motion.p>

      {m.focus && (
        <motion.div variants={item} className="mt-6 border border-border bg-card p-4" style={{ borderLeft: `3px solid ${a.color}` }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Focus area</p>
          <p className="mt-2 text-sm">{m.focus}</p>
        </motion.div>
      )}

      <motion.section variants={item} className="mt-8" aria-labelledby="contrib-h">
        <h3 id="contrib-h" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          01 / Main contributions
        </h3>
        <ol className="mt-3 space-y-px border border-border bg-border">
          {m.contributions.map((c, i) => (
            <li key={c} className="flex gap-4 bg-card p-4 text-sm">
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
              <span>{c}</span>
            </li>
          ))}
        </ol>
      </motion.section>

      <motion.section variants={item} className="mt-8" aria-labelledby="skills-h">
        <h3 id="skills-h" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          02 / Skills
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {m.skills.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.04, type: 'spring', stiffness: 300, damping: 20 }}
              className="border border-border bg-card px-3 py-1.5 font-mono text-xs"
            >
              {s}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {m.repos && m.repos.length > 0 && (
        <motion.section variants={item} className="mt-8" aria-labelledby="repos-h">
          <h3 id="repos-h" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            03 / GitHub repositories
          </h3>
          <ul className="mt-3 grid gap-3">
            {m.repos.map((r) => (
              <li key={r.name}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 border border-border bg-card p-4 transition-colors hover:border-foreground/30"
                >
                  <GitBranch aria-hidden="true" className="mt-0.5 size-4 shrink-0" style={{ color: a.color }} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-sm text-foreground">{r.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{r.description}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: a.color }} />
                      {r.language}
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      <motion.div variants={item} className="mt-8 flex flex-wrap gap-2 pb-4">
        {[
          { href: m.github, label: 'GitHub profile' },
          { href: m.linkedin, label: 'LinkedIn' },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 border border-border bg-card px-4 text-sm transition-colors hover:border-foreground/40"
          >
            {l.label}
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
      </motion.div>
    </>
  )
}
