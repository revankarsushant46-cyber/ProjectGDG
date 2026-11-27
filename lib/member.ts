export type Role = 'guest' | 'member' | 'core' | 'admin'

export type MemberStatus = 'pending' | 'approved' | 'rejected'

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface MemberProfile {
  id: string
  name: string
  year: string        // e.g., "2nd Year"
  branch: string      // e.g., "CSE", "ECE", "ISE", "ME", "CV", "EEE"
  usn: string         // University Seat Number
  skills: SkillEntry[]
  interests: string[]
  avatar?: string     // data URL or path
  github?: string
  linkedin?: string
  email?: string
  phone?: string
  role: Role
  status: MemberStatus
  joinedAt: string    // ISO date
  approvedAt?: string
  approvedBy?: string
}

export interface SkillEntry {
  name: string
  level: SkillLevel
}

export interface Announcement {
  id: string
  title: string
  body: string
  category: AnnouncementCategory
  priority: 'low' | 'normal' | 'high' | 'urgent'
  authorId: string
  authorName: string
  authorRole: Role
  createdAt: string
  updatedAt?: string
  pinned: boolean
  expiresAt?: string
  attachments?: Attachment[]
}

export type AnnouncementCategory =
  | 'general'
  | 'event'
  | 'workshop'
  | 'meeting'
  | 'deadline'
  | 'opportunity'
  | 'celebration'
  | 'maintenance'

export interface Attachment {
  name: string
  url: string
  type: 'image' | 'document' | 'link'
}

export interface EventVolunteerRole {
  id: string
  eventId: string
  title: string           // e.g., "Registration Desk", "AV Support", "Mentor"
  description: string
  maxVolunteers: number
  currentVolunteers: string[]  // member IDs
  skillsPreferred?: string[]
}

export interface EventChat {
  eventId: string
  messages: ChatMessage[]
  whatsappGroupUrl?: string
}

export interface ChatMessage {
  id: string
  eventId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  body: string
  createdAt: string
  type: 'text' | 'system' | 'whatsapp-link'
}

export interface VolunteerApplication {
  id: string
  eventId: string
  memberId: string
  roleId: string
  status: 'pending' | 'accepted' | 'rejected'
  appliedAt: string
  note?: string
}

export const BRANCHES = [
  'CSE', 'ISE', 'AIML', 'CYS', 'ECE', 'EEE', 'ME', 'CV', 'BT', 'CH'
] as const

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'M.Tech', 'PhD'] as const

export const SKILL_CATEGORIES = [
  'Programming', 'Web Development', 'Mobile Development', 'AI/ML', 'Data Science',
  'Cloud/DevOps', 'Cybersecurity', 'UI/UX Design', 'Graphics/Video', 'Technical Writing',
  'Public Speaking', 'Event Management', 'Leadership', 'Research', 'Other'
] as const

export const ROLE_LABELS: Record<Role, string> = {
  guest: 'Guest',
  member: 'Member',
  core: 'Core Team',
  admin: 'Admin'
}

export const ROLE_BADGE_VARIANTS: Record<Role, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  guest: 'default',
  member: 'secondary',
  core: 'outline',
  admin: 'destructive'
}

export const STATUS_LABELS: Record<MemberStatus, string> = {
  pending: 'Pending Review',
  approved: 'Active Member',
  rejected: 'Not Approved'
}

export const STATUS_BADGE_VARIANTS: Record<MemberStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'default',
  approved: 'secondary',
  rejected: 'destructive'
}

export const CATEGORY_LABELS: Record<AnnouncementCategory, string> = {
  general: 'General',
  event: 'Event',
  workshop: 'Workshop',
  meeting: 'Meeting',
  deadline: 'Deadline',
  opportunity: 'Opportunity',
  celebration: 'Celebration',
  maintenance: 'Maintenance'
}

export const CATEGORY_COLORS: Record<AnnouncementCategory, string> = {
  general: 'var(--g-blue)',
  event: 'var(--g-red)',
  workshop: 'var(--g-yellow)',
  meeting: 'var(--g-green)',
  deadline: 'var(--g-red)',
  opportunity: 'var(--g-blue)',
  celebration: 'var(--g-yellow)',
  maintenance: 'var(--muted-foreground)'
}

export const PRIORITY_LABELS: Record<Announcement['priority'], string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
  urgent: 'Urgent'
}

export const PRIORITY_BADGE_VARIANTS: Record<Announcement['priority'], 'default' | 'secondary' | 'outline' | 'destructive'> = {
  low: 'default',
  normal: 'secondary',
  high: 'outline',
  urgent: 'destructive'
}