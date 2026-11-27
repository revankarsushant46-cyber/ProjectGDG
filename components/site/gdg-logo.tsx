import Link from 'next/link'

const CAPSULES = [
  { cx: 126.25, cy: 191, angle: -37, fill: 'var(--g-red)' },
  { cx: 126.25, cy: 321, angle: 37, fill: 'var(--g-blue)' },
  { cx: 385.75, cy: 191, angle: 217, fill: 'var(--g-green)' },
  { cx: 385.75, cy: 321, angle: 143, fill: 'var(--g-yellow)' },
] as const

export function GdgMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true" fill="none">
      {CAPSULES.map((c, i) => (
        <g key={i} transform={`rotate(${c.angle} ${c.cx} ${c.cy})`}>
          <rect
            x={c.cx - 86}
            y={c.cy - 50}
            width={172}
            height={100}
            rx={50}
            fill={c.fill}
            stroke="var(--foreground)"
            strokeWidth={16}
          />
        </g>
      ))}
    </svg>
  )
}

export function GdgLogo() {
  return (
    <Link
      href="/"
      aria-label="GDG on Campus RV College of Engineering — home"
      className="group flex items-center gap-3 rounded-sm py-1 pr-2"
    >
      <span className="flex size-10 items-center justify-center border border-border bg-card transition-colors duration-300 group-hover:border-foreground/30">
        <GdgMark className="size-6 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-bold tracking-tight text-foreground">GDG on Campus</span>
        <span className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
          RV College of Engineering
        </span>
      </span>
    </Link>
  )
}
