import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono, Sora } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  adjustFontFallback: 'Inter',
})
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
  adjustFontFallback: 'Arial',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'GDG on Campus RVCE — Stay curious. Build together.',
    template: '%s · GDG on Campus RVCE',
  },
  description:
    'GDG on Campus RV College of Engineering is an independent student developer community in Bengaluru. Workshops, build weekends and study jams across AI/ML, Web, Cloud and Android.',
  keywords: ['GDG', 'GDG on Campus', 'RVCE', 'RV College of Engineering', 'developer community', 'Bengaluru'],
  openGraph: {
    title: 'GDG on Campus RVCE',
    description: 'Stay curious. Build together.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0D10' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:bg-card focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
          >
            Skip to content
          </a>
          <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col border-x border-border/70">
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
