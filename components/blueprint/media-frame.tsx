import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ACCENTS, type Accent } from '@/lib/accent'

type MediaFrameProps = {
  /** Drop a photo path here (e.g. /images/team/ananya.jpg). Falls back to the blueprint art. */
  src?: string
  alt: string
  accent: Accent
  label: string
  meta?: string
  caption?: string
  className?: string
  aspect?: string
  sizes?: string
  priority?: boolean
  /** Rendered when there is no photo. */
  children?: React.ReactNode
  /** Hides the top/bottom chrome bars for compact frames. */
  compact?: boolean
}

function Corner({ position, color }: { position: 'tl' | 'tr' | 'bl' | 'br'; color: string }) {
  const base = 'pointer-events-none absolute size-3 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/frame:size-5'
  const map = {
    tl: 'left-2 top-2 border-l-2 border-t-2 group-hover/frame:left-1.5 group-hover/frame:top-1.5',
    tr: 'right-2 top-2 border-r-2 border-t-2 group-hover/frame:right-1.5 group-hover/frame:top-1.5',
    bl: 'bottom-2 left-2 border-b-2 border-l-2 group-hover/frame:bottom-1.5 group-hover/frame:left-1.5',
    br: 'bottom-2 right-2 border-b-2 border-r-2 group-hover/frame:bottom-1.5 group-hover/frame:right-1.5',
  }
  return <span aria-hidden="true" className={cn(base, map[position])} style={{ borderColor: color }} />
}

export function MediaFrame({
  src,
  alt,
  accent,
  label,
  meta,
  caption,
  className,
  aspect = 'aspect-[16/10]',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority,
  children,
  compact,
}: MediaFrameProps) {
  const a = ACCENTS[accent]
  return (
    <figure className={cn('group/frame relative border border-border bg-background', className)}>
      {!compact && (
        <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="flex items-center gap-2 truncate">
            <span aria-hidden="true" className="size-1.5 shrink-0" style={{ background: a.color }} />
            <span className="truncate">{label}</span>
          </span>
          {meta && <span className="shrink-0">{meta}</span>}
        </div>
      )}

      <div className={cn('relative overflow-hidden', aspect)}>
        {src ? (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover grayscale-[0.85] contrast-[1.05] transition-[filter,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/frame:scale-[1.04] group-hover/frame:grayscale-0"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 mix-blend-color opacity-40 transition-opacity duration-700 group-hover/frame:opacity-0"
              style={{ background: a.color }}
            />
            <span aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-60 mix-blend-overlay" />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
            />
          </>
        ) : (
          <div className="bg-blueprint absolute inset-0 bg-card" role="img" aria-label={alt}>
            {children}
          </div>
        )}

        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/4 overflow-hidden opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100">
          <span
            className="animate-scan block h-full w-full"
            style={{ background: `linear-gradient(to bottom, transparent, color-mix(in srgb, ${a.color} 18%, transparent), transparent)` }}
          />
        </span>

        <Corner position="tl" color={a.color} />
        <Corner position="tr" color={a.color} />
        <Corner position="bl" color={a.color} />
        <Corner position="br" color={a.color} />
      </div>

      {!compact && caption && (
        <figcaption className="flex items-center justify-between gap-3 border-t border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="truncate">{caption}</span>
          <span aria-hidden="true">{src ? 'IMG' : 'SVG'}</span>
        </figcaption>
      )}
    </figure>
  )
}
