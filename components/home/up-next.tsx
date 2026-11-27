import { NEXT_EVENT } from '@/lib/events'
import { Countdown } from '@/components/site/countdown'
import { BlueprintButton } from '@/components/site/blueprint-button'
import { Reveal } from '@/components/motion/reveal'

export function UpNext() {
  const e = NEXT_EVENT
  if (!e) return null
  return (
    <section aria-label="Up next" className="px-4 pt-10 sm:px-8">
      <Reveal className="relative overflow-hidden border border-border bg-card">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-g-red" />
        <div className="flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-g-red opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-g-red" />
              </span>
              Up next / {e.dateLabel.slice(0, 6)}
            </p>
            <p className="mt-3 text-pretty font-display text-lg font-bold tracking-tight sm:text-xl">
              {e.title.replace(/\.$/, '')}. <span className="text-muted-foreground">Bring an idea. Leave with a prototype.</span>
            </p>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <Countdown target={e.start} />
            <BlueprintButton href={`/events/${e.slug}`}>View event</BlueprintButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
