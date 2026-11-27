import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  className?: string
  size?: 'md' | 'lg'
}

export function BlueprintButton({ href, children, variant = 'ghost', external, className, size = 'md' }: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight
  const classes = cn(
    'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden border text-sm font-medium transition-[color,border-color,transform] duration-300 active:scale-[0.98]',
    size === 'lg' ? 'h-14 px-7 text-base' : 'h-11 px-5',
    variant === 'primary'
      ? 'border-foreground bg-foreground text-background'
      : 'border-border bg-card text-foreground hover:border-foreground/40',
    className,
  )
  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:translate-x-0',
          variant === 'primary' ? 'bg-g-blue' : 'bg-secondary',
        )}
      />
      <span className={cn('relative', variant === 'primary' && 'transition-colors group-hover/btn:text-white')}>{children}</span>
      <Icon
        aria-hidden="true"
        className={cn(
          'relative size-4 transition-transform duration-300',
          external ? 'group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5' : 'group-hover/btn:translate-x-1',
          variant === 'primary' && 'group-hover/btn:text-white',
        )}
      />
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}
