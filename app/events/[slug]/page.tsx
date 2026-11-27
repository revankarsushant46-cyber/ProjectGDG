import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock, MapPin, Video } from 'lucide-react'
import { EVENTS, getEvent } from '@/lib/events'
import { ACCENTS } from '@/lib/accent'
import { EventArt } from '@/components/blueprint/event-art'
import { MediaFrame } from '@/components/blueprint/media-frame'
import { AvatarArt } from '@/components/blueprint/avatar-art'
import { BlueprintButton } from '@/components/site/blueprint-button'
import { EventCard, EventKicker } from '@/components/events/event-card'
import { Reveal, SectionLabel } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const e = getEvent(slug)
  if (!e) return { title: 'Event not found' }
  return { title: e.title.replace(/\.$/, ''), description: e.tagline }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const e = getEvent(slug)
  if (!e) notFound()
  const a = ACCENTS[e.accent]
  const more = EVENTS.filter((x) => x.slug !== e.slug && x.status === 'upcoming').slice(0, 2)
  const facts = [
    { icon: CalendarDays, label: 'Date', value: e.dateLabel },
    { icon: Clock, label: 'Time', value: e.timeLabel },
    { icon: e.mode === 'Online' ? Video : MapPin, label: e.mode === 'Online' ? 'Online' : 'Venue', value: e.venue },
  ]

  return (
    <article className="px-4 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-12">
      <Link
        href="/events"
        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-1" />
        Back to events
      </Link>

      <Reveal className="mt-6 overflow-hidden border border-border bg-card" y={12}>
        <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>Fig. / {e.slug.replace(/-/g, '_')}</span>
          <span className={a.text}>{e.status === 'upcoming' ? 'Upcoming' : 'Recap'}</span>
        </div>
        <div className="bg-blueprint aspect-[16/9] sm:aspect-[21/8]">
          <EventArt art={e.art} />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
        <div className="min-w-0">
          <EventKicker e={e} />
          <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.03em] text-balance sm:text-6xl">{e.title}</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">{e.tagline}</p>

          <dl className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-card p-4">
                <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <Icon aria-hidden="true" className="size-3.5" style={{ color: a.color }} />
                  {label}
                </dt>
                <dd className="mt-2 font-display text-lg font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">{e.venueDetail}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <BlueprintButton href={e.registerUrl} variant="primary" external size="lg">
              {e.status === 'upcoming' ? 'Register now' : 'View recap materials'}
            </BlueprintButton>
          </div>

          <section aria-labelledby="about-title" className="mt-16">
            <SectionLabel index="A">About</SectionLabel>
            <h2 id="about-title" className="sr-only">About this event</h2>
            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {e.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-3">
              {e.takeaways.map((t) => (
                <li key={t} className="flex gap-3 border border-border bg-card p-4 text-sm">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0" style={{ background: a.color }} />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="agenda-title" className="mt-16">
            <SectionLabel index="B">Schedule</SectionLabel>
            <h2 id="agenda-title" className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl">
              Event agenda
            </h2>
            <ol className="relative mt-8 border-l border-border">
              {e.agenda.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05} y={12}>
                  <li className="group relative pb-8 pl-6 last:pb-0 sm:pl-8">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[5px] top-1.5 size-[9px] border bg-background transition-colors duration-300 group-hover:bg-[var(--dot)]"
                      style={{ borderColor: a.color, ['--dot' as string]: a.color }}
                    />
                    <div className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-6">
                      <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground">{item.time}</span>
                      <div>
                        <h3 className="font-display text-lg font-medium">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>

          <section aria-labelledby="speakers-title" className="mt-16">
            <SectionLabel index="C">Speakers</SectionLabel>
            <h2 id="speakers-title" className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl">
              Who you will build with
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {e.speakers.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.06}>
                  <li className={cn('group h-full border border-border border-t-[3px] bg-card p-3', ACCENTS[s.accent].borderTop)}>
                    <MediaFrame compact alt={`Portrait placeholder for ${s.name}`} accent={s.accent} label="" aspect="aspect-[5/4]">
                      <AvatarArt seed={s.name} accent={s.accent} initials={s.initials} />
                    </MediaFrame>
                    <div className="px-2 pb-2 pt-4">
                      <h3 className="font-display text-lg font-medium">{s.name}</h3>
                      <p className="text-sm text-muted-foreground">{s.role}</p>
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        Session / <span className="text-foreground">{s.topic}</span>
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Event summary">
          <MediaFrame
            src={e.cover}
            alt={e.coverAlt ?? `${e.title} illustration`}
            accent={e.accent}
            label="Event frame"
            meta={e.dateLabel}
            caption={e.mode}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 360px, 100vw"
            priority
          >
            <EventArt art={e.art} />
          </MediaFrame>
          <div className="mt-4 border border-border bg-card p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Quick details</p>
            <p className="mt-3 font-display text-lg font-medium">{e.title}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {e.dateLabel} · {e.timeLabel}
            </p>
            <p className="font-mono text-xs text-muted-foreground">{e.venue}</p>
            <BlueprintButton href={e.registerUrl} variant="primary" external className="mt-5 w-full">
              {e.status === 'upcoming' ? 'Register now' : 'View recap'}
            </BlueprintButton>
          </div>
        </aside>
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="mt-24">
          <SectionLabel index="D">Keep exploring</SectionLabel>
          <h2 id="more-title" className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl">
            More on the calendar
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {more.map((m) => (
              <EventCard key={m.slug} e={m} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}