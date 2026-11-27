import { MediaFrame } from '@/components/blueprint/media-frame'
import { RecapTriangleArt } from '@/components/blueprint/event-art'
import { Reveal, SectionLabel } from '@/components/motion/reveal'
import { BlueprintButton } from '@/components/site/blueprint-button'
import { LATEST_RECAP } from '@/lib/events'

const STEPS = ['Experiment', 'Collaborate', 'Ship']

export function Recap() {
  const e = LATEST_RECAP
  return (
    <section aria-labelledby="recap-title" className="px-4 py-24 sm:px-8 sm:py-32">
      <SectionLabel index="03">In the rearview</SectionLabel>
      <div className="mt-10 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <MediaFrame
            src={e.cover}
            alt={e.coverAlt ?? 'Build Weekend recap'}
            accent="blue"
            label="Recap / build_weekend"
            meta={e.dateLabel}
            caption={e.venue}
            aspect="aspect-[16/9]"
            sizes="(min-width: 1024px) 60vw, 100vw"
          >
            <RecapTriangleArt />
          </MediaFrame>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col border border-border bg-card">
          <p className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Fig. 009 / Experiment → ship
          </p>
          <div className="aspect-[3/2] lg:aspect-auto lg:min-h-0 lg:flex-1">
            <RecapTriangleArt />
          </div>
          <dl className="grid grid-cols-3 border-t border-border font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {[
              ['Format', '36 hrs'],
              ['Tracks', '03'],
              ['Team size', '≤ 04'],
            ].map(([k, v], i) => (
              <div key={k} className={i > 0 ? 'border-l border-border p-3' : 'p-3'}>
                <dt>{k}</dt>
                <dd className="mt-1 text-sm text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="mt-10 max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Build weekend / Oct 2026</p>
        <h2 id="recap-title" className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Big ideas. Small teams. A lot of possibility.
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{e.description[0]}</p>
        <ol className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span>{s}</span>
              {i < STEPS.length - 1 && <span aria-hidden="true" className="text-muted-foreground">→</span>}
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <BlueprintButton href={`/events/${e.slug}`}>Read the recap</BlueprintButton>
        </div>
      </Reveal>
    </section>
  )
}
