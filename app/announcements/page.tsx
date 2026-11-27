'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Plus, Filter, ChevronDown, Bell, Calendar, BookOpen, Users,
  Target, Megaphone, PartyPopper, Wrench, Tag
} from 'lucide-react'
import type { Announcement, AnnouncementCategory } from '@/lib/member'
import {
  ANNOUNCEMENTS, getAnnouncements
} from '@/lib/announcements'
import { AnnouncementList, AnnouncementForm } from '@/components/announcements'
import {
  CATEGORY_LABELS, CATEGORY_COLORS,
  PRIORITY_LABELS, PRIORITY_BADGE_VARIANTS
} from '@/lib/member'
import { useAuth } from '@/components/auth'
import { Reveal, SectionLabel } from '@/components/motion/reveal'

const CATEGORY_ICONS: Record<AnnouncementCategory, React.ComponentType<{ className?: string }>> = {
  general: Bell,
  event: Calendar,
  workshop: BookOpen,
  meeting: Users,
  deadline: Target,
  opportunity: Megaphone,
  celebration: PartyPopper,
  maintenance: Wrench
}

const ALL_CATEGORIES: { value: AnnouncementCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'all', label: 'All', icon: Tag },
  { value: 'general', label: 'General', icon: Bell },
  { value: 'event', label: 'Events', icon: Calendar },
  { value: 'workshop', label: 'Workshops', icon: BookOpen },
  { value: 'meeting', label: 'Meetings', icon: Users },
  { value: 'deadline', label: 'Deadlines', icon: Target },
  { value: 'opportunity', label: 'Opportunities', icon: Megaphone },
  { value: 'celebration', label: 'Celebrations', icon: PartyPopper },
  { value: 'maintenance', label: 'Maintenance', icon: Wrench }
]

export default function AnnouncementsPage() {
  const { member, isCore } = useAuth()
  const [category, setCategory] = useState<AnnouncementCategory | 'all'>('all')
  const [showForm, setShowForm] = useState(false)
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null)

  const filteredAnnouncements = getAnnouncements({ category: category === 'all' ? undefined : category })
  const canManage = isCore

  const handleSubmit = async (data: Omit<Announcement, 'id' | 'createdAt' | 'authorId' | 'authorName' | 'authorRole'>) => {
    const newAnn: Announcement = {
      ...data,
      id: `ann-${Date.now()}`,
      authorId: member?.id || 'unknown',
      authorName: member?.name || 'Unknown',
      authorRole: member?.role || 'member',
      createdAt: new Date().toISOString(),
      attachments: data.attachments
    }
    const existing = JSON.parse(localStorage.getItem('gdg-announcements') || '[]')
    existing.unshift(newAnn)
    localStorage.setItem('gdg-announcements', JSON.stringify(existing))
    setShowForm(false)
    setEditingAnn(null)
  }

  const handleEdit = (ann: Announcement) => {
    setEditingAnn(ann)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this announcement? This cannot be undone.')) {
      const existing = JSON.parse(localStorage.getItem('gdg-announcements') || '[]')
      const updated = existing.filter((a: Announcement) => a.id !== id)
      localStorage.setItem('gdg-announcements', JSON.stringify(updated))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-background"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
        <Reveal y={20} delay={0.1}>
          <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <SectionLabel index="01">Announcements</SectionLabel>
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Club Announcements
              </h1>
              <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
                Stay updated with the latest news, events, and opportunities from GDG on Campus RVCE.
              </p>
            </div>

            {canManage && (
              <Button onClick={() => { setEditingAnn(null); setShowForm(true); }} className="gap-2">
                <Plus className="size-4" /> New Announcement
              </Button>
            )}
          </header>
        </Reveal>

        <Reveal y={20} delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={category} onValueChange={setCategory} className="w-full sm:w-56">
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {ALL_CATEGORIES.map(c => (
                  <SelectItem key={c.value} value={c.value}>
                    <div className="flex items-center gap-2">
                      <c.icon className="size-4" style={{ color: c.value === 'all' ? 'inherit' : CATEGORY_COLORS[c.value as AnnouncementCategory] }} />
                      {c.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2">
              {['urgent', 'high', 'normal', 'low'].map(p => (
                <Badge
                  key={p}
                  variant={PRIORITY_BADGE_VARIANTS[p as Announcement['priority']]}
                  className={cn(
                    'gap-1 px-2.5 py-1',
                    category === 'all' ? '' : 'opacity-50'
                  )}
                >
                  {PRIORITY_LABELS[p as Announcement['priority']]}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal y={20} delay={0.2}>
          <AnnouncementList
            announcements={filteredAnnouncements}
            onEdit={canManage ? handleEdit : undefined}
            onDelete={canManage ? handleDelete : undefined}
            canManage={canManage}
            emptyMessage={category !== 'all' ? `No ${CATEGORY_LABELS[category as AnnouncementCategory].toLowerCase()} announcements.` : 'No announcements yet.'}
          />
        </Reveal>

        {member?.status === 'pending' && (
          <Reveal y={20} delay={0.25}>
            <div className="mt-8 p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 text-center">
              <p className="text-sm text-yellow-400">
                Your membership is <strong>pending approval</strong>. Once approved, you will be able to see all announcements and participate in events.
              </p>
            </div>
          </Reveal>
        )}

        {member?.status === 'guest' && (
          <Reveal y={20} delay={0.25}>
            <div className="mt-8 p-4 rounded-lg border border-border bg-card text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Join the club</strong> to access member-only announcements, event volunteering, and community chat.
              </p>
              <a href="/join" className="mt-3 inline-block">
                <Button>Apply for Membership</Button>
              </a>
            </div>
          </Reveal>
        )}

        {showForm && (
          <Reveal y={20} delay={0.1}>
            <AnnouncementForm
              initialData={editingAnn || undefined}
              onSubmit={handleSubmit}
              onCancel={() => { setShowForm(false); setEditingAnn(null); }}
              isEditing={!!editingAnn}
            />
          </Reveal>
        )}
      </div>
    </motion.div>
  )
}