import { EventCard } from '@/components/events/event-card'
import { Reveal, SectionLabel } from '@/components/motion/reveal'
import { BlueprintButton } from '@/components/site/blueprint-button'
import { UPCOMING } from '@/lib/events'

export function FeaturedEvents() {
  const [featured, ...rest] = UPCOMING
  return (
    <section aria-labelledby="calendar-title" className="px-4 pt-24 sm:px-8 sm:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel index="02">Mark your calendar</SectionLabel>
          <h2 id="calendar-title" className="mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Less someday. More Saturday.
          </h2>
        </div>
        <BlueprintButton href="/events">All events</BlueprintButton>
      </div>
      <div className="mt-10 grid gap-4">
        <Reveal>
          <EventCard e={featured} featured priority />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {rest.slice(0, 2).map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.1} className="h-full">
              <EventCard e={e} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
