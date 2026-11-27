import { ACCENTS, type Accent } from '@/lib/accent'

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

/** Geometric portrait placeholder. Shows until a real `photo` is set on the member. */
export function AvatarArt({ seed, accent, initials }: { seed: string; accent: Accent; initials: string }) {
  const c = ACCENTS[accent].color
  const h = hash(seed)
  const variant = h % 4
  const tilt = (h % 13) - 6
  const id = `av-${seed}`
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`${id}-h`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={c} strokeWidth="1" opacity="0.6" />
        </pattern>
      </defs>
      <line x1="100" y1="10" x2="100" y2="230" stroke={c} strokeWidth="0.6" opacity="0.35" />
      <line x1="10" y1="112" x2="190" y2="112" stroke={c} strokeWidth="0.6" opacity="0.35" />
      <g transform={`rotate(${tilt} 100 112)`}>
        <rect x="38" y="40" width="124" height="150" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4 4" opacity="0.55" />
      </g>
      <path d="M40 240 C 40 180, 70 160, 100 160 C 130 160, 160 180, 160 240" fill={`url(#${id}-h)`} stroke={c} strokeWidth="2" />
      {variant === 0 && <circle cx="100" cy="104" r="36" fill="var(--card)" stroke={c} strokeWidth="2.4" />}
      {variant === 1 && <rect x="66" y="70" width="68" height="68" fill="var(--card)" stroke={c} strokeWidth="2.4" transform={`rotate(${tilt} 100 104)`} />}
      {variant === 2 && <path d="M100 66 L133 85 L133 123 L100 142 L67 123 L67 85 Z" fill="var(--card)" stroke={c} strokeWidth="2.4" />}
      {variant === 3 && <rect x="66" y="70" width="68" height="68" rx="34" fill={`url(#${id}-h)`} stroke={c} strokeWidth="2.4" />}
      <rect x={variant % 2 ? 124 : 126} y={variant % 2 ? 132 : 126} width="16" height="16" fill="var(--g-yellow)" />
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fontSize="18"
        fill="var(--foreground)"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', letterSpacing: '0.1em' }}
      >
        {initials}
      </text>
    </svg>
  )
}
