import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { GdgMark } from './gdg-logo'

const COMMUNITY = [
  { label: 'GitHub', href: 'https://github.com/example-gdg-rvce' },
  { label: 'Discord', href: 'https://discord.gg/example-gdg-rvce' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/example-gdg-rvce' },
  { label: 'Instagram', href: 'https://www.instagram.com/example.gdg.rvce' },
]

const PAGES = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Team', href: '/team' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="bg-blueprint px-4 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <GdgMark className="mb-6 h-6 w-9" />
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Good things happen when we build together.
            </h2>
            <p className="mt-4 text-muted-foreground">GDG on Campus RV College of Engineering</p>
          </div>
          <nav aria-label="Footer">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Community</p>
            <ul className="flex flex-wrap gap-2">
              {COMMUNITY.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 items-center gap-1.5 border border-border bg-background px-4 text-sm transition-colors hover:border-foreground/30"
                  >
                    {c.label}
                    <ArrowUpRight
                      className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-6 font-mono text-[11px] leading-relaxed text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl">
            GDG on Campus RVCE is an independent, student-run community. It is not an official Google product, and
            is not endorsed by or affiliated with Google LLC. All names, events and links on this site are fictional
            placeholders.
          </p>
          <ul className="flex shrink-0 gap-4">
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="uppercase tracking-[0.12em] hover:text-foreground">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 font-mono text-[10px] tracking-[0.14em] text-muted-foreground/70">
          12.9237° N · 77.4987° E / BENGALURU
        </p>
      </div>
    </footer>
  )
}
