import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { TeamDirectory } from '@/components/team/team-directory'

export const metadata: Metadata = {
  title: 'Team',
  description: 'The people behind GDG on Campus RV College of Engineering — leadership, vertical heads, junior core and members.',
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        kicker="04 / The people"
        title="Built by students."
        intro="A president, a vice president, one head per vertical, a junior core already shipping, and every member who shows up to build."
      />
      <div className="px-4 pb-24 sm:px-8 sm:pb-32">
        <TeamDirectory />
      </div>
    </>
  )
}
