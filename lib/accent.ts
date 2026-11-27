export type Accent = 'blue' | 'red' | 'yellow' | 'green'

export const ACCENTS: Record<
  Accent,
  { color: string; ink: string; text: string; border: string; bg: string; borderTop: string; borderLeft: string }
> = {
  blue: {
    color: 'var(--g-blue)',
    ink: 'var(--g-blue-ink)',
    text: 'text-g-blue-ink',
    border: 'border-g-blue',
    bg: 'bg-g-blue',
    borderTop: 'border-t-g-blue',
    borderLeft: 'border-l-g-blue',
  },
  red: {
    color: 'var(--g-red)',
    ink: 'var(--g-red-ink)',
    text: 'text-g-red-ink',
    border: 'border-g-red',
    bg: 'bg-g-red',
    borderTop: 'border-t-g-red',
    borderLeft: 'border-l-g-red',
  },
  yellow: {
    color: 'var(--g-yellow)',
    ink: 'var(--g-yellow-ink)',
    text: 'text-g-yellow-ink',
    border: 'border-g-yellow',
    bg: 'bg-g-yellow',
    borderTop: 'border-t-g-yellow',
    borderLeft: 'border-l-g-yellow',
  },
  green: {
    color: 'var(--g-green)',
    ink: 'var(--g-green-ink)',
    text: 'text-g-green-ink',
    border: 'border-g-green',
    bg: 'bg-g-green',
    borderTop: 'border-t-g-green',
    borderLeft: 'border-l-g-green',
  },
}
