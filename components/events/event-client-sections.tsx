'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const VolunteerSection = dynamic(
  () => import('@/components/events/volunteer-section').then(m => m.VolunteerSection),
  { ssr: false, loading: () => <div className="animate-pulse space-y-4"><div className="h-24 bg-muted/50 rounded-lg border border-border" /><div className="h-24 bg-muted/50 rounded-lg border border-border" /><div className="h-24 bg-muted/50 rounded-lg border border-border" /></div> }
)

const EventChat = dynamic(
  () => import('@/components/events/event-chat').then(m => m.EventChat),
  { ssr: false, loading: () => <div className="animate-pulse"><div className="h-64 bg-muted/50 rounded-lg border border-border" /></div> }
)

interface EventClientSectionsProps {
  eventId: string
  eventTitle: string
  whatsappUrl?: string
  isUpcoming: boolean
}

export function EventClientSections({ eventId, eventTitle, whatsappUrl, isUpcoming }: EventClientSectionsProps) {
  const [volunteerLoaded, setVolunteerLoaded] = useState(false)
  const [chatLoaded, setChatLoaded] = useState(false)

  if (!isUpcoming) return null

  return (
    <>
      <section aria-labelledby="volunteer-title" className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Volunteer</p>
            <h2 id="volunteer-title" className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
              Help make this event happen
            </h2>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </div>
        </div>
        <VolunteerSection eventId={eventId} canManage={false} onLoaded={setVolunteerLoaded} />
      </section>

      <section aria-labelledby="chat-title" className="mt-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Team Chat</p>
        <h2 id="chat-title" className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl">
          Coordinate with the team
        </h2>
        <EventChat eventId={eventId} eventTitle={eventTitle} whatsappUrl={whatsappUrl} canManage={false} onLoaded={setChatLoaded} />
      </section>
    </>
  )
}