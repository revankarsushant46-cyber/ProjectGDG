'use client'

import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import { FilterPills } from '@/components/site/filter-pills'
import { SectionLabel } from '@/components/motion/reveal'
import { MemberCard, MemberRow } from './member-card'
import { MemberDrawer } from './member-drawer'
import { ROLE_FILTERS, TEAM, TIER_SECTIONS, type Member, type RoleFilter, type Tier } from '@/lib/team'
import { cn } from '@/lib/utils'

const GRID: Record<Tier, string> = {
  lead: 'grid gap-4 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl',
  core: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  junior: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
  member: 'grid gap-3 md:grid-cols-2',
}

function Connector({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div aria-hidden="true" className="relative mx-auto hidden h-14 w-full lg:block">
      <motion.span
        className="absolute left-1/2 top-0 h-1/2 w-px bg-border"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        style={{ originY: 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.span
        className="absolute left-[10%] right-[10%] top-1/2 h-px bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      />
      <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 bg-g-blue" />
      <span className="absolute left-[10%] top-1/2 h-1/2 w-px bg-border" />
      <span className="absolute right-[10%] top-1/2 h-1/2 w-px bg-border" />
    </div>
  )
}

export function TeamDirectory() {
  const [filter, setFilter] = useState<RoleFilter>('All')
  const [open, setOpen] = useState<Member | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const onOpen = useCallback((m: Member, el: HTMLElement) => {
    trigger.current = el
    setOpen(m)
  }, [])
  const onClose = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => trigger.current?.focus())
  }, [])

  const visible = TEAM.filter((m) => filter === 'All' || m.domain === filter)
  const sections = TIER_SECTIONS.map((s) => ({ ...s, members: visible.filter((m) => m.tier === s.tier) })).filter((s) => s.members.length)

  return (
    <>
      <div className="sticky top-16 z-30 -mx-4 border-y border-border bg-background/85 px-4 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <FilterPills label="Filter team by role" options={ROLE_FILTERS} value={filter} onChange={setFilter} layoutId="role-pill" />
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground" aria-live="polite">
            {String(visible.length).padStart(2, '0')} people
          </p>
        </div>
      </div>

      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {sections.map((s, si) => (
            <motion.section
              key={s.tier}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-labelledby={`tier-${s.tier}`}
              className={cn('pt-16', si === 0 && 'pt-12')}
            >
              <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', s.tier === 'lead' && 'lg:items-center lg:text-center lg:flex-col')}>
                <div>
                  <SectionLabel index={s.index}>{s.label}</SectionLabel>
                  <h2 id={`tier-${s.tier}`} className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {s.title}
                  </h2>
                </div>
                <p className="max-w-sm text-sm text-muted-foreground">
                  {s.note}
                  {s.tier !== 'member' && <span className="text-foreground"> Tap a card to open their profile.</span>}
                </p>
              </div>

              <motion.ul layout className={cn('mt-8', GRID[s.tier])}>
                <AnimatePresence mode="popLayout">
                  {s.members.map((m, i) => (
                    <motion.li
                      key={m.slug}
                      layout
                      initial={{ opacity: 0, y: 24, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {m.tier === 'member' ? <MemberRow m={m} /> : <MemberCard m={m} onOpen={onOpen} size={m.tier === 'lead' ? 'lg' : 'md'} />}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
              {s.tier === 'lead' && <Connector show={filter === 'All'} />}
            </motion.section>
          ))}
        </AnimatePresence>
      </LayoutGroup>

      <MemberDrawer member={open} onClose={onClose} />
    </>
  )
}
