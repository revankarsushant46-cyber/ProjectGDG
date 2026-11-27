'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Search, X } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { EventCard } from './event-card'
import { FilterPills } from '@/components/site/filter-pills'
import { CATEGORIES, EVENTS } from '@/lib/events'

type Category = (typeof CATEGORIES)[number]
const STATUSES = ['Upcoming', 'Past'] as const
type Status = (typeof STATUSES)[number]

export function EventsExplorer() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [status, setStatus] = useState<Status>('Upcoming')
  const q = useDeferredValue(query.trim().toLowerCase())

  const results = useMemo(() => {
    return EVENTS.filter((e) => {
      if (category !== 'All' && e.category !== category) return false
      if (e.status !== status.toLowerCase()) return false
      if (!q) return true
      return [e.title, e.tagline, e.category, e.venue, e.format, ...e.speakers.map((s) => s.name)].join(' ').toLowerCase().includes(q)
    }).sort((a, b) => (status === 'Upcoming' ? a.start.localeCompare(b.start) : b.start.localeCompare(a.start)))
  }, [q, category, status])

  const reset = () => {
    setQuery('')
    setCategory('All')
  }

  return (
    <div>
      <div className="flex flex-col gap-5 border border-border bg-card p-4 sm:p-5">
        <label className="group relative block">
          <span className="sr-only">Search events</span>
          <Search aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, topic, venue or speaker"
            className="h-12 w-full border border-border bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </label>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Category</span>
            <FilterPills label="Filter by category" options={CATEGORIES} value={category} onChange={setCategory} layoutId="cat-pill" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Status</span>
            <FilterPills label="Filter by status" options={STATUSES} value={status} onChange={setStatus} layoutId="status-pill" />
          </div>
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground" aria-live="polite">
        {String(results.length).padStart(2, '0')} {results.length === 1 ? 'event' : 'events'} / {status.toLowerCase()}
        {category !== 'All' && ` / ${category}`}
      </p>

      <motion.ul layout className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((e, i) => (
            <motion.li
              key={e.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <EventCard e={e} priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-blueprint flex flex-col items-center border border-dashed border-border px-6 py-16 text-center"
          >
            <svg viewBox="0 0 120 80" className="h-20 w-32" aria-hidden="true">
              <rect x="20" y="14" width="80" height="52" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-muted-foreground" />
              <path d="M44 40 L76 40 M60 24 L60 56" stroke="var(--g-blue)" strokeWidth="1.5" />
              <rect x="74" y="50" width="8" height="8" fill="var(--g-yellow)" />
            </svg>
            <p className="mt-6 font-display text-xl font-bold">Nothing on this blueprint yet.</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">Try a different search or category — or check past events for recaps.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 h-10 border border-border bg-card px-4 font-mono text-[11px] uppercase tracking-[0.14em] hover:border-foreground/40"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
