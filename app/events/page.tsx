import type { Metadata } from 'next'
import { EventsExplorer } from '@/components/events/events-explorer'
import { PageHeader } from '@/components/site/page-header'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Workshops, study jams and build weekends from GDG on Campus RV College of Engineering.',
}

export default function EventsPage() {
  return (
    <>
      <PageHeader
        kicker="02 / Mark your calendar"
        title="Events."
        intro="Workshops, study jams and build weekends. Filter by what you are curious about, then come build with us."
      />
      <section aria-label="Event listing" className="px-4 pb-24 sm:px-8 sm:pb-32">
        <EventsExplorer />
      </section>
    </>
  )
}
