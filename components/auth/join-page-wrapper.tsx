'use client'

import dynamic from 'next/dynamic'

const JoinPageClient = dynamic(
  () => import('@/components/auth/join-page-client').then(m => m.default),
  { ssr: false, loading: () => <div className="min-h-screen bg-background flex items-center justify-center">Loading…</div> }
)

export default function JoinPageWrapper() {
  return <JoinPageClient />
}