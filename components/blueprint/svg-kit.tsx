export function Cross({ x, y, size = 8, color = 'var(--muted-foreground)', opacity = 0.6 }: { x: number; y: number; size?: number; color?: string; opacity?: number }) {
  return (
    <g stroke={color} strokeWidth={1} opacity={opacity}>
      <line x1={x - size} y1={y} x2={x + size} y2={y} />
      <line x1={x} y1={y - size} x2={x} y2={y + size} />
    </g>
  )
}

export function MonoText({
  x,
  y,
  children,
  size = 8,
  anchor = 'start',
  opacity = 0.75,
}: {
  x: number
  y: number
  children: React.ReactNode
  size?: number
  anchor?: 'start' | 'middle' | 'end'
  opacity?: number
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      fill="var(--muted-foreground)"
      opacity={opacity}
      style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', letterSpacing: '0.08em' }}
    >
      {children}
    </text>
  )
}

/** Grid + hatch pattern definitions. Pass a unique `id` prefix per SVG instance. */
export function BlueprintDefs({ id, hatchColor = 'var(--g-blue)', cell = 20 }: { id: string; hatchColor?: string; cell?: number }) {
  return (
    <defs>
      <pattern id={`${id}-grid`} width={cell} height={cell} patternUnits="userSpaceOnUse">
        <path d={`M ${cell} 0 L 0 0 0 ${cell}`} fill="none" stroke="var(--grid-line-strong)" strokeWidth={0.6} />
      </pattern>
      <pattern id={`${id}-hatch`} width={5} height={5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1={0} y1={0} x2={0} y2={5} stroke={hatchColor} strokeWidth={1} opacity={0.7} />
      </pattern>
    </defs>
  )
}

export function FrameChrome({
  w,
  h,
  label,
  coords,
  inset = 16,
}: {
  w: number
  h: number
  label?: string
  coords?: string
  inset?: number
}) {
  return (
    <g>
      <Cross x={inset} y={inset} />
      <Cross x={w - inset} y={inset} />
      <Cross x={inset} y={h - inset} />
      <Cross x={w - inset} y={h - inset} />
      {label && <MonoText x={inset + 14} y={inset + 3}>{label}</MonoText>}
      {coords && (
        <MonoText x={w - inset - 14} y={h - inset + 3} anchor="end">
          {coords}
        </MonoText>
      )}
    </g>
  )
}
