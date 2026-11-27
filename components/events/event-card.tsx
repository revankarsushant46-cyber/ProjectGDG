import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MediaFrame } from '@/components/blueprint/media-frame'
import { EventArt } from '@/components/blueprint/event-art'
import { ACCENTS } from '@/lib/accent'
import type { GdgEvent } from '@/lib/events'
import { cn } from '@/lib/utils'

function Meta({ e }: { e: GdgEvent }) {
  return (
    <dl className="mt-5 space-y-1.5 font-mono text-[11px] tracking-[0.06em]">
      <div className="flex gap-2">
        <dt className="sr-only">Date and time</dt>
        <dd className="text-foreground">
          {e.dateLabel} · {e.timeLabel}
        </dd>
      </div>
      <div className="flex gap-2">
        <dt className="sr-only">Venue</dt>
        <dd className="text-muted-foreground">{e.venue}</dd>
      </div>
    </dl>
  )
}

export function EventKicker({ e }: { e: GdgEvent }) {
  return (
    <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
      <span className={ACCENTS[e.accent].text}>{e.category}</span>
      <span aria-hidden="true" className="text-muted-foreground">/</span>
      <span className="text-muted-foreground">{e.format}</span>
      {e.status === 'past' && (
        <span className="ml-1 border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">Recap</span>
      )}
    </p>
  )
}

export function EventCard({ e, featured, priority }: { e: GdgEvent; featured?: boolean; priority?: boolean }) {
  return (
    <article
      className={cn(
        'group relative h-full border border-border bg-card transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]',
        featured ? 'grid md:grid-cols-[1.1fr_1fr]' : 'flex flex-col',
      )}
    >
      <div className={cn('p-3 sm:p-4', featured && 'md:p-5')}>
        <MediaFrame
          src={e.cover}
          alt={e.coverAlt ?? `${e.title} blueprint illustration`}
          accent={e.accent}
          label={`${e.category} / ${e.slug.replace(/-/g, '_')}`}
          meta={e.dateLabel}
          caption={e.mode === 'Online' ? 'Remote · Online' : e.venue}
          aspect={featured ? 'aspect-[16/11]' : 'aspect-[16/10]'}
          sizes={featured ? '(min-width: 768px) 55vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          priority={priority}
        >
          <EventArt art={e.art} />
        </MediaFrame>
      </div>
      <div className={cn('flex flex-1 flex-col px-5 pb-6 sm:px-6', featured ? 'md:justify-center md:py-8 md:pr-10' : 'pt-2')}>
        <EventKicker e={e} />
        <h3 className={cn('mt-3 font-display font-bold tracking-tight text-balance', featured ? 'text-3xl sm:text-4xl' : 'text-2xl')}>
          <Link href={`/events/${e.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {e.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{e.tagline}</p>
        <Meta e={e} />
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
          {e.status === 'upcoming' ? 'View event' : 'Read recap'}
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
        style={{ background: ACCENTS[e.accent].color }}
      />
    </article>
  )
}
