'use client'

import { MotionConfig } from 'motion/react'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/components/auth'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
