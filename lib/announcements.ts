import type { Announcement, AnnouncementCategory } from '@/lib/member'

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-001',
    title: 'Build with AI Workshop — Registrations Open!',
    body: 'Our flagship AI/ML workshop "Build with AI" is now accepting registrations. This full-day hands-on session covers prompt engineering, model integration, and shipping a working prototype. Limited to 60 seats — first come, first served.',
    category: 'workshop',
    priority: 'high',
    authorId: 'core-001',
    authorName: 'Aditi Rao',
    authorRole: 'core',
    createdAt: '2026-11-20T10:00:00+05:30',
    pinned: true,
    expiresAt: '2026-12-05T10:00:00+05:30',
    attachments: [
      { name: 'Workshop Schedule.pdf', url: '/announcements/build-with-ai-schedule.pdf', type: 'document' },
      { name: 'Registration Link', url: 'https://forms.gle/build-with-ai-rvce', type: 'link' }
    ]
  },
  {
    id: 'ann-002',
    title: 'Core Team Applications Open for Jan 2027',
    body: 'We are looking for passionate students to join the core team for the next semester. Roles available: Events Lead, Design Lead, Tech Lead, Outreach Lead, and Community Manager. Application deadline: Dec 15, 2026.',
    category: 'opportunity',
    priority: 'normal',
    authorId: 'core-002',
    authorName: 'Rahul Sharma',
    authorRole: 'core',
    createdAt: '2026-11-18T14:30:00+05:30',
    pinned: true,
    expiresAt: '2026-12-15T23:59:00+05:30'
  },
  {
    id: 'ann-003',
    title: 'Weekly Study Jam — React & TypeScript',
    body: 'Every Tuesday at 6:30 PM, Innovation Lab. This week: "Advanced TypeScript Patterns for React Developers". Bring your laptop. Snacks provided!',
    category: 'event',
    priority: 'normal',
    authorId: 'core-003',
    authorName: 'Priya Patel',
    authorRole: 'core',
    createdAt: '2026-11-15T09:00:00+05:30',
    pinned: false
  },
  {
    id: 'ann-004',
    title: 'GDG Global Summit 2026 — Travel Grant Applications',
    body: 'Google is offering travel grants for student leaders to attend the GDG Global Summit in Mountain View. Applications close Nov 30. Core team members get priority nomination.',
    category: 'opportunity',
    priority: 'urgent',
    authorId: 'core-001',
    authorName: 'Aditi Rao',
    authorRole: 'core',
    createdAt: '2026-11-10T16:45:00+05:30',
    pinned: false,
    expiresAt: '2026-11-30T23:59:00+05:30'
  },
  {
    id: 'ann-005',
    title: 'Website Maintenance — Scheduled Downtime',
    body: 'The GDG website will undergo scheduled maintenance on Sunday, Nov 24 from 2:00 AM to 4:00 AM IST. Event registrations and member portal may be temporarily unavailable.',
    category: 'maintenance',
    priority: 'low',
    authorId: 'core-004',
    authorName: 'Tech Team',
    authorRole: 'core',
    createdAt: '2026-11-20T11:00:00+05:30',
    pinned: false,
    expiresAt: '2026-11-24T04:00:00+05:30'
  },
  {
    id: 'ann-006',
    title: 'Congratulations to Our Hackathon Winners!',
    body: 'Team "Neural Navigators" (3rd Year CSE) won 1st place at HackRVCE 2026 with their project "MediScan — AI-powered medical report analyzer". Prize: ₹50,000 + Google Cloud credits. Well done!',
    category: 'celebration',
    priority: 'normal',
    authorId: 'core-002',
    authorName: 'Rahul Sharma',
    authorRole: 'core',
    createdAt: '2026-11-12T18:00:00+05:30',
    pinned: false
  },
  {
    id: 'ann-007',
    title: 'Mandatory Core Team Meeting — This Friday',
    body: 'All core team members must attend the planning meeting for Q1 2027 events. Agenda: event calendar finalization, budget approval, volunteer recruitment drive. Friday, 5:00 PM, Conference Room B.',
    category: 'meeting',
    priority: 'high',
    authorId: 'core-001',
    authorName: 'Aditi Rao',
    authorRole: 'core',
    createdAt: '2026-11-19T10:00:00+05:30',
    pinned: false,
    expiresAt: '2026-11-22T17:00:00+05:30'
  },
  {
    id: 'ann-008',
    title: 'Android Basics with Kotlin — New Cohort Starting',
    body: 'A 6-week beginner-friendly Android development cohort starts Dec 2. Covers Jetpack Compose, Room, Retrofit, and Play Store deployment. Mentored by senior members. Register by Nov 28.',
    category: 'workshop',
    priority: 'normal',
    authorId: 'core-003',
    authorName: 'Priya Patel',
    authorRole: 'core',
    createdAt: '2026-11-17T12:00:00+05:30',
    pinned: false,
    expiresAt: '2026-11-28T23:59:00+05:30'
  }
]

export function getAnnouncements(filters?: {
  category?: AnnouncementCategory
  priority?: Announcement['priority']
  authorRole?: 'core' | 'admin'
  onlyPinned?: boolean
  includeExpired?: boolean
}): Announcement[] {
  let result = [...ANNOUNCEMENTS]

  if (!filters?.includeExpired) {
    const now = new Date().toISOString()
    result = result.filter(a => !a.expiresAt || a.expiresAt > now)
  }

  if (filters?.category) result = result.filter(a => a.category === filters.category)
  if (filters?.priority) result = result.filter(a => a.priority === filters.priority)
  if (filters?.authorRole) result = result.filter(a => a.authorRole === filters.authorRole)
  if (filters?.onlyPinned) result = result.filter(a => a.pinned)

  return result.sort((a, b) => {
    if (a.pinned !== b.pinned) return b.pinned ? 1 : -1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}