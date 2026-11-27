import type { Accent } from './accent'
import type { ArtKey } from '@/components/blueprint/event-art'
import type { EventVolunteerRole, VolunteerApplication, EventChat, ChatMessage } from '@/lib/member'

export type EventCategory = 'AI/ML' | 'Web' | 'Cloud' | 'Android'
export type EventStatus = 'upcoming' | 'past'

export type GdgEvent = {
  slug: string
  title: string
  tagline: string
  category: EventCategory
  format: string
  status: EventStatus
  /** ISO start in IST */
  start: string
  dateLabel: string
  timeLabel: string
  mode: 'In person' | 'Online'
  venue: string
  venueDetail: string
  accent: Accent
  art: ArtKey
  /** Event title picture. Replace with your own photo in /public/images/events. */
  cover?: string
  coverAlt?: string
  description: string[]
  takeaways: string[]
  agenda: { time: string; title: string; detail: string }[]
  speakers: { name: string; role: string; topic: string; accent: Accent; initials: string }[]
  registerUrl: string
  /** Volunteer roles for this event (core team only to create) */
  volunteerRoles?: EventVolunteerRole[]
  /** WhatsApp group link for event coordination */
  whatsappGroupUrl?: string
}

export const EVENTS: GdgEvent[] = [
  {
    slug: 'build-with-ai',
    title: 'Build with AI.',
    tagline: 'From your first prompt to a working prototype.',
    category: 'AI/ML',
    format: 'Workshop',
    status: 'upcoming',
    start: '2026-12-05T10:00:00+05:30',
    dateLabel: '05 DEC 2026',
    timeLabel: '10:00–16:00 IST',
    mode: 'In person',
    venue: 'Innovation Lab · RVCE',
    venueDetail: 'Innovation Lab, 2nd floor, CSE Block, RV College of Engineering, Mysuru Road, Bengaluru',
    accent: 'red',
    art: 'ai-network',
    cover: '/images/events/build-with-ai.png',
    coverAlt: 'Students collaborating on laptops at an AI workshop',
    description: [
      'A full day for people who want to stop reading about AI and start building with it. We start from a blank prompt and end with a small, working prototype you can demo to your friends.',
      'No prior ML experience needed — just a laptop, curiosity, and an idea you have been sitting on. Mentors float between tables all day.',
    ],
    takeaways: ['Prompt design that actually holds up', 'Calling a model from a real app', 'Shipping a demo in a single afternoon'],
    agenda: [
      { time: '10:00', title: 'Doors & setup', detail: 'Grab a seat, get your environment running, meet your table.' },
      { time: '10:30', title: 'Prompts are programs', detail: 'How to structure prompts, test them, and stop guessing.' },
      { time: '11:30', title: 'Hands-on: your first AI feature', detail: 'Wire a model call into a tiny web app, step by step.' },
      { time: '13:00', title: 'Lunch break', detail: 'Food, coffee, and hallway debugging.' },
      { time: '14:00', title: 'Build sprint', detail: 'Teams of 2–3 turn an idea into a prototype with mentor support.' },
      { time: '15:30', title: 'Show & tell', detail: 'Two-minute demos. Broken demos especially welcome.' },
    ],
    speakers: [
      { name: 'Kavya Iyengar', role: 'AI/ML Lead, GDG RVCE', topic: 'Prompts are programs', accent: 'red', initials: 'KI' },
      { name: 'Rohan Desai', role: 'Guest mentor', topic: 'Your first AI feature', accent: 'blue', initials: 'RD' },
      { name: 'Meera Nandakumar', role: 'Guest mentor', topic: 'Build sprint mentor', accent: 'yellow', initials: 'MN' },
    ],
    registerUrl: 'https://example.com/register/build-with-ai',
    volunteerRoles: [
      {
        id: 'vol-001',
        eventId: 'build-with-ai',
        title: 'Registration Desk',
        description: 'Check in attendees, hand out badges and swag bags',
        maxVolunteers: 4,
        currentVolunteers: [],
        skillsPreferred: ['Event Management', 'Public Speaking']
      },
      {
        id: 'vol-002',
        eventId: 'build-with-ai',
        title: 'AV & Livestream Support',
        description: 'Manage microphones, projector, and live stream to YouTube',
        maxVolunteers: 2,
        currentVolunteers: [],
        skillsPreferred: ['AV Support', 'Technical Writing']
      },
      {
        id: 'vol-003',
        eventId: 'build-with-ai',
        title: 'Mentor Assistant',
        description: 'Help mentors with table rotations, answer basic questions',
        maxVolunteers: 6,
        currentVolunteers: [],
        skillsPreferred: ['AI/ML', 'Programming', 'Leadership']
      },
      {
        id: 'vol-004',
        eventId: 'build-with-ai',
        title: 'Logistics & Food Coordinator',
        description: 'Coordinate lunch delivery, snack stations, and cleanup',
        maxVolunteers: 3,
        currentVolunteers: [],
        skillsPreferred: ['Event Management']
      }
    ],
    whatsappGroupUrl: 'https://chat.whatsapp.com/build-with-ai-rvce'
  },
  {
    slug: 'web-beyond-the-browser',
    title: 'Web, beyond the browser.',
    tagline: 'A hands-on lab for the next generation of the web.',
    category: 'Web',
    format: 'Workshop',
    status: 'upcoming',
    start: '2026-12-12T14:00:00+05:30',
    dateLabel: '12 DEC 2026',
    timeLabel: '14:00–17:00 IST',
    mode: 'In person',
    venue: 'Seminar Hall · RVCE',
    venueDetail: 'Main Seminar Hall, Admin Block, RV College of Engineering, Bengaluru',
    accent: 'green',
    art: 'web-terminal',
    cover: '/images/events/web-beyond-the-browser.png',
    coverAlt: 'Hands typing on a laptop with a code editor open',
    description: [
      'The web runs on servers, edges, terminals and phones now. In this lab we build one small app and push it to every one of those places.',
      'Expect a lot of terminal time, a little bit of theory, and one very satisfying deploy at the end.',
    ],
    takeaways: ['Server and client components in practice', 'Installable, offline-friendly web apps', 'Running code at the edge'],
    agenda: [
      { time: '14:00', title: 'The web is not a page', detail: 'A quick tour of where web code actually runs today.' },
      { time: '14:30', title: 'Lab 1: server-first UI', detail: 'Render on the server, hydrate only what needs it.' },
      { time: '15:30', title: 'Lab 2: make it installable', detail: 'Turn your app into something that lives on a home screen.' },
      { time: '16:30', title: 'Deploy & wrap-up', detail: 'Ship it live and compare notes.' },
    ],
    speakers: [
      { name: 'Arjun Menon', role: 'Dev Head, GDG RVCE', topic: 'Server-first UI', accent: 'green', initials: 'AM' },
      { name: 'Sneha Kulkarni', role: 'Junior Core, Dev', topic: 'Installable web apps', accent: 'blue', initials: 'SK' },
    ],
    registerUrl: 'https://example.com/register/web-beyond-the-browser',
    volunteerRoles: [
      {
        id: 'vol-005',
        eventId: 'web-beyond-the-browser',
        title: 'Setup & Environment Help',
        description: 'Help attendees install Node, VS Code extensions, and clone starter repo',
        maxVolunteers: 4,
        currentVolunteers: [],
        skillsPreferred: ['Web Development', 'Programming']
      },
      {
        id: 'vol-006',
        eventId: 'web-beyond-the-browser',
        title: 'Code Review Buddy',
        description: 'Pair with attendees during labs, review their code, suggest improvements',
        maxVolunteers: 5,
        currentVolunteers: [],
        skillsPreferred: ['Web Development', 'Leadership']
      }
    ],
    whatsappGroupUrl: 'https://chat.whatsapp.com/web-beyond-browser-rvce'
  },
  {
    slug: 'cloud-code-deploy',
    title: 'Cloud. Code. Deploy.',
    tagline: 'Take your side project from localhost to the world.',
    category: 'Cloud',
    format: 'Workshop',
    status: 'upcoming',
    start: '2026-12-19T11:00:00+05:30',
    dateLabel: '19 DEC 2026',
    timeLabel: '11:00–14:00 IST',
    mode: 'Online',
    venue: 'Online · mock meeting',
    venueDetail: 'Online session — the meeting link is shared with registered participants by email.',
    accent: 'yellow',
    art: 'cloud-cubes',
    cover: '/images/events/cloud-code-deploy.png',
    coverAlt: 'A student deploying an app late at night under a desk lamp',
    description: [
      'Your side project deserves a URL. We containerise a small app, push it to the cloud, and wire up a pipeline so every commit ships itself.',
      'Fully online, so you can join from your hostel room. Bring a project or use our starter.',
    ],
    takeaways: ['Containers without the fear', 'A CI pipeline that deploys on push', 'Logs, rollbacks and staying calm'],
    agenda: [
      { time: '11:00', title: 'Why "works on my machine" breaks', detail: 'Environments, containers and reproducibility.' },
      { time: '11:45', title: 'Containerise it', detail: 'Package the starter app and run it anywhere.' },
      { time: '12:45', title: 'Ship on every push', detail: 'Set up a pipeline from commit to live URL.' },
      { time: '13:30', title: 'Break it on purpose', detail: 'Roll back, read logs, fix forward.' },
    ],
    speakers: [
      { name: 'Vikram Shetty', role: 'Cloud Head, GDG RVCE', topic: 'Containerise it', accent: 'yellow', initials: 'VS' },
      { name: 'Ishita Rao', role: 'Junior Core, Cloud', topic: 'Ship on every push', accent: 'green', initials: 'IR' },
    ],
    registerUrl: 'https://example.com/register/cloud-code-deploy',
    volunteerRoles: [
      {
        id: 'vol-007',
        eventId: 'cloud-code-deploy',
        title: 'Discord/Zoom Moderator',
        description: 'Manage breakout rooms, mute/unmute, share links in chat',
        maxVolunteers: 3,
        currentVolunteers: [],
        skillsPreferred: ['Cloud/DevOps', 'Event Management']
      },
      {
        id: 'vol-008',
        eventId: 'cloud-code-deploy',
        title: 'Deployment Buddy',
        description: 'Help attendees troubleshoot container builds and pipeline failures',
        maxVolunteers: 4,
        currentVolunteers: [],
        skillsPreferred: ['Cloud/DevOps', 'Programming']
      }
    ],
    whatsappGroupUrl: 'https://chat.whatsapp.com/cloud-code-deploy-rvce'
  },
  {
    slug: 'compose-camp',
    title: 'Compose Camp.',
    tagline: 'Modern Android UI, one composable at a time.',
    category: 'Android',
    format: 'Study jam',
    status: 'upcoming',
    start: '2027-01-09T10:00:00+05:30',
    dateLabel: '09 JAN 2027',
    timeLabel: '10:00–13:00 IST',
    mode: 'In person',
    venue: 'Lab 3 · ISE Block',
    venueDetail: 'Lab 3, ISE Block, RV College of Engineering, Bengaluru',
    accent: 'green',
    art: 'android-stack',
    description: [
      'A relaxed study jam on building Android UIs declaratively. We build a small habit-tracker screen from scratch.',
      'Bring a laptop with Android Studio installed — we will help with setup in the first 20 minutes.',
    ],
    takeaways: ['Thinking in composables', 'State that flows one way', 'Previewing and theming your UI'],
    agenda: [
      { time: '10:00', title: 'Setup clinic', detail: 'Get the toolchain running on every laptop.' },
      { time: '10:30', title: 'Your first composable', detail: 'Layouts, modifiers and previews.' },
      { time: '11:30', title: 'State & interaction', detail: 'Make the habit tracker respond to taps.' },
      { time: '12:30', title: 'Theming & polish', detail: 'Colours, type and dark mode.' },
    ],
    speakers: [{ name: 'Nikhil Bhat', role: 'Junior Core, Dev', topic: 'Your first composable', accent: 'green', initials: 'NB' }],
    registerUrl: 'https://example.com/register/compose-camp',
    volunteerRoles: [
      {
        id: 'vol-009',
        eventId: 'compose-camp',
        title: 'Android Studio Setup Helper',
        description: 'Assist attendees with SDK, emulator, and Gradle sync issues',
        maxVolunteers: 4,
        currentVolunteers: [],
        skillsPreferred: ['Mobile Development', 'Programming']
      },
      {
        id: 'vol-010',
        eventId: 'compose-camp',
        title: 'UI Review Partner',
        description: 'Review composable code, suggest Material 3 improvements',
        maxVolunteers: 4,
        currentVolunteers: [],
        skillsPreferred: ['Mobile Development', 'UI/UX Design']
      }
    ],
    whatsappGroupUrl: 'https://chat.whatsapp.com/compose-camp-rvce'
  },
  {
    slug: 'build-weekend',
    title: 'Build Weekend.',
    tagline: 'Big ideas. Small teams. A lot of possibility.',
    category: 'AI/ML',
    format: 'Hackathon',
    status: 'past',
    start: '2026-10-17T09:00:00+05:30',
    dateLabel: '17–18 OCT 2026',
    timeLabel: '36 hours',
    mode: 'In person',
    venue: 'Main Auditorium · RVCE',
    venueDetail: 'Main Auditorium, RV College of Engineering, Bengaluru',
    accent: 'blue',
    art: 'recap-triangle',
    cover: '/images/events/build-weekend.png',
    coverAlt: 'Small teams working at tables during a night-time hackathon',
    description: [
      'Our mock flagship build weekend brought ideas off the whiteboard and into working prototypes. The best part? Everything we figured out together.',
      'Teams of up to four built across three open tracks with mentors on hand through the night.',
    ],
    takeaways: ['Scoping an idea to fit a weekend', 'Pairing across disciplines', 'Demoing something unfinished with confidence'],
    agenda: [
      { time: 'Sat 09:00', title: 'Kickoff & team formation', detail: 'Pitch ideas, find teammates.' },
      { time: 'Sat 11:00', title: 'Hacking begins', detail: 'Mentor rounds every three hours.' },
      { time: 'Sun 09:00', title: 'Code freeze', detail: 'Pencils down, demos up.' },
      { time: 'Sun 11:00', title: 'Demos & wrap-up', detail: 'Every team demos. Every team learns something.' },
    ],
    speakers: [
      { name: 'Ananya Rao', role: 'President, GDG RVCE', topic: 'Opening note', accent: 'blue', initials: 'AR' },
      { name: 'Kavya Iyengar', role: 'AI/ML Lead, GDG RVCE', topic: 'Mentor', accent: 'red', initials: 'KI' },
    ],
    registerUrl: 'https://example.com/recap/build-weekend',
    volunteerRoles: [],
    whatsappGroupUrl: 'https://chat.whatsapp.com/build-weekend-rvce'
  },
  {
    slug: 'intro-to-gemini-api',
    title: 'Hello, Gemini API.',
    tagline: 'Your first multimodal app in ninety minutes.',
    category: 'AI/ML',
    format: 'Talk + demo',
    status: 'past',
    start: '2026-09-05T16:00:00+05:30',
    dateLabel: '05 SEP 2026',
    timeLabel: '16:00–17:30 IST',
    mode: 'Online',
    venue: 'Online · mock meeting',
    venueDetail: 'Online session — recording shared with participants.',
    accent: 'blue',
    art: 'ai-network',
    description: ['A short intro to calling a multimodal model from a small app — text in, images in, structured answers out.'],
    takeaways: ['Text and image inputs', 'Structured outputs', 'Keeping keys out of your client'],
    agenda: [
      { time: '16:00', title: 'What "multimodal" means', detail: 'A tour with live examples.' },
      { time: '16:30', title: 'Live build', detail: 'A tiny image-describer app.' },
      { time: '17:15', title: 'Q&A', detail: 'Questions from the chat.' },
    ],
    speakers: [{ name: 'Kavya Iyengar', role: 'AI/ML Lead, GDG RVCE', topic: 'Live build', accent: 'red', initials: 'KI' }],
    registerUrl: 'https://example.com/recap/intro-to-gemini-api',
    volunteerRoles: [],
    whatsappGroupUrl: 'https://chat.whatsapp.com/gemini-api-rvce'
  },
  {
    slug: 'kubernetes-in-an-hour',
    title: 'Kubernetes in an hour.',
    tagline: 'Pods, services, and why you might not need them yet.',
    category: 'Cloud',
    format: 'Talk',
    status: 'past',
    start: '2026-08-22T15:00:00+05:30',
    dateLabel: '22 AUG 2026',
    timeLabel: '15:00–16:00 IST',
    mode: 'In person',
    venue: 'Seminar Hall · RVCE',
    venueDetail: 'Main Seminar Hall, Admin Block, RV College of Engineering, Bengaluru',
    accent: 'yellow',
    art: 'cloud-cubes',
    description: ['An honest, diagram-heavy hour on container orchestration — what it solves, and when it is overkill.'],
    takeaways: ['The mental model of a cluster', 'When to reach for orchestration', 'Simpler alternatives'],
    agenda: [
      { time: '15:00', title: 'Cluster mental model', detail: 'Nodes, pods and services on a whiteboard.' },
      { time: '15:40', title: 'Do you need it?', detail: 'A checklist for side projects.' },
    ],
    speakers: [{ name: 'Vikram Shetty', role: 'Cloud Head, GDG RVCE', topic: 'Cluster mental model', accent: 'yellow', initials: 'VS' }],
    registerUrl: 'https://example.com/recap/kubernetes-in-an-hour',
    volunteerRoles: [],
    whatsappGroupUrl: 'https://chat.whatsapp.com/kubernetes-rvce'
  },
  {
    slug: 'accessible-by-default',
    title: 'Accessible by default.',
    tagline: 'Build interfaces everyone can use.',
    category: 'Web',
    format: 'Workshop',
    status: 'past',
    start: '2026-07-25T14:00:00+05:30',
    dateLabel: '25 JUL 2026',
    timeLabel: '14:00–16:00 IST',
    mode: 'In person',
    venue: 'Lab 1 · CSE Block',
    venueDetail: 'Lab 1, CSE Block, RV College of Engineering, Bengaluru',
    accent: 'green',
    art: 'web-terminal',
    description: ['We audited real interfaces with a screen reader and a keyboard, then fixed what we found.'],
    takeaways: ['Semantic HTML first', 'Keyboard and focus', 'Contrast that passes'],
    agenda: [
      { time: '14:00', title: 'Try it blind', detail: 'Navigate a site with only a screen reader.' },
      { time: '14:45', title: 'Fix it', detail: 'Patch the issues we found, together.' },
    ],
    speakers: [{ name: 'Diya Prakash', role: 'Design Head, GDG RVCE', topic: 'Try it blind', accent: 'yellow', initials: 'DP' }],
    registerUrl: 'https://example.com/recap/accessible-by-default',
    volunteerRoles: [],
    whatsappGroupUrl: 'https://chat.whatsapp.com/accessibility-rvce'
  },
]

export const CATEGORIES = ['All', 'AI/ML', 'Web', 'Cloud', 'Android'] as const

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug)
}

export const UPCOMING = EVENTS.filter((e) => e.status === 'upcoming').sort((a, b) => a.start.localeCompare(b.start))
export const NEXT_EVENT = UPCOMING[0]
export const LATEST_RECAP = EVENTS.filter((e) => e.status === 'past').sort((a, b) => b.start.localeCompare(a.start))[0]

export function getVolunteerRoles(eventId: string): EventVolunteerRole[] {
  const event = getEvent(eventId)
  return event?.volunteerRoles || []
}

export function getVolunteerApplications(eventId: string): VolunteerApplication[] {
  const stored = localStorage.getItem('gdg-volunteer-applications')
  if (!stored) return []
  return JSON.parse(stored).filter((a: VolunteerApplication) => a.eventId === eventId)
}

export function applyForVolunteerRole(application: Omit<VolunteerApplication, 'id' | 'appliedAt' | 'status'>): VolunteerApplication {
  const newApp: VolunteerApplication = {
    ...application,
    id: `app-${Date.now()}`,
    appliedAt: new Date().toISOString(),
    status: 'pending'
  }
  const existing = JSON.parse(localStorage.getItem('gdg-volunteer-applications') || '[]')
  existing.push(newApp)
  localStorage.setItem('gdg-volunteer-applications', JSON.stringify(existing))
  return newApp
}

export function updateApplicationStatus(applicationId: string, status: 'accepted' | 'rejected') {
  const stored = localStorage.getItem('gdg-volunteer-applications')
  if (!stored) return
  const apps = JSON.parse(stored)
  const idx = apps.findIndex((a: VolunteerApplication) => a.id === applicationId)
  if (idx >= 0) {
    apps[idx].status = status
    localStorage.setItem('gdg-volunteer-applications', JSON.stringify(apps))
  }
}

export function getEventChat(eventId: string): EventChat {
  const stored = localStorage.getItem(`gdg-event-chat-${eventId}`)
  if (stored) return JSON.parse(stored)
  return { eventId, messages: [] }
}

export function saveEventChat(chat: EventChat) {
  localStorage.setItem(`gdg-event-chat-${chat.eventId}`, JSON.stringify(chat))
}

export function addChatMessage(eventId: string, message: Omit<ChatMessage, 'id' | 'createdAt'>): ChatMessage {
  const chat = getEventChat(eventId)
  const newMsg: ChatMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  chat.messages.push(newMsg)
  saveEventChat(chat)
  return newMsg
}

export function addWhatsAppLinkMessage(eventId: string, authorId: string, authorName: string, authorAvatar?: string): ChatMessage {
  return addChatMessage(eventId, {
    eventId,
    authorId,
    authorName,
    authorAvatar,
    body: 'WhatsApp group created for this event',
    type: 'whatsapp-link'
  })
}