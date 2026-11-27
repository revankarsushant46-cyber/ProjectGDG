'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { GdgLogo } from './gdg-logo'
import { ThemeToggle } from './theme-toggle'

const LINKS = [
  { href: '/', label: 'Home', index: '00' },
  { href: '/events', label: 'Events', index: '01' },
  { href: '/team', label: 'Team', index: '02' },
]

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8))

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-border bg-background/80 backdrop-blur-xl'
          : 'border-transparent bg-background',
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:h-20 sm:px-8">
        <GdgLogo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex h-10 items-center px-4 text-sm transition-colors',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 border border-border bg-card"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex size-10 items-center justify-center border border-border bg-card md:hidden"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              >
                {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <motion.ul
              className="bg-blueprint flex flex-col px-4 py-4"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
            >
              {LINKS.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <motion.li
                    key={link.href}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className="flex items-baseline justify-between border-b border-border py-4"
                    >
                      <span className={cn('font-display text-2xl font-bold tracking-tight', active ? 'text-foreground' : 'text-muted-foreground')}>
                        {link.label}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">{link.index}</span>
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-[linear-gradient(90deg,var(--g-blue),var(--g-red),var(--g-yellow),var(--g-green))]"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  )
}