'use client'

import { formatDistanceToNow, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Pin, Clock, AlertTriangle, Calendar, Tag, ExternalLink,
  ChevronDown, ChevronUp, MoreHorizontal, Edit, Trash2,
  Paperclip, Bell, Megaphone, PartyPopper, Wrench, BookOpen,
  Users, Target, Archive
} from 'lucide-react'
import type { Announcement, AnnouncementCategory } from '@/lib/member'
import {
  CATEGORY_LABELS, CATEGORY_COLORS,
  PRIORITY_LABELS, PRIORITY_BADGE_VARIANTS
} from '@/lib/member'
import { useAuth } from '@/components/auth'

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

interface AnnouncementCardProps {
  announcement: Announcement
  onEdit?: (ann: Announcement) => void
  onDelete?: (id: string) => void
  canManage?: boolean
}

export function AnnouncementCard({
  announcement,
  onEdit,
  onDelete,
  canManage = false
}: AnnouncementCardProps) {
  const { member } = useAuth()
  const isAuthor = member?.id === announcement.authorId
  const canManageAnn = canManage || isAuthor

  const CategoryIcon = CATEGORY_ICONS[announcement.category]
  const timeAgo = formatDistanceToNow(parseISO(announcement.createdAt), { addSuffix: true })

  return (
    <article
      className={cn(
        'relative p-5 sm:p-6 rounded-xl border transition-all',
        announcement.pinned
          ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/10'
          : 'bg-card border-border hover:border-primary/20'
      )}
      style={{ borderLeftWidth: 4, borderLeftColor: CATEGORY_COLORS[announcement.category] }}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'flex-shrink-0 size-10 rounded-lg flex items-center justify-center',
          `text-[${CATEGORY_COLORS[announcement.category]}] bg-[${CATEGORY_COLORS[announcement.category]}]/10`
        )}>
          <CategoryIcon className="size-5" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant={PRIORITY_BADGE_VARIANTS[announcement.priority]} className="text-xs">
                  {PRIORITY_LABELS[announcement.priority]}
                </Badge>
                <Badge variant="outline" className="text-xs gap-1" style={{ borderColor: CATEGORY_COLORS[announcement.category], color: CATEGORY_COLORS[announcement.category] }}>
                  <Tag className="size-3" /> {CATEGORY_LABELS[announcement.category]}
                </Badge>
                {announcement.pinned && (
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Pin className="size-3" /> Pinned
                  </Badge>
                )}
              </div>

              <h3 className="font-display text-lg font-bold tracking-tight text-balance">
                {announcement.title}
              </h3>

              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {timeAgo}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" /> {new Date(announcement.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  {announcement.authorName} · {announcement.authorRole}
                </span>
              </div>
            </div>

            {canManageAnn && (
              <div className="relative flex-shrink-0">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="size-4" />
                </Button>
                <div className="absolute right-0 top-full mt-1 w-40 rounded-md border border-border bg-popover p-1 shadow-lg z-10 animate-slide-down">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(announcement)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded"
                    >
                      <Edit className="size-4" /> Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(announcement.id)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent rounded"
                    >
                      <Trash2 className="size-4" /> Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{announcement.body}</p>

          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {announcement.attachments.map((att, i) => (
                <a
                  key={i}
                  href={att.url}
                  target={att.type === 'link' ? '_blank' : undefined}
                  rel={att.type === 'link' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
                >
                  <Paperclip className="size-3.5" />
                  {att.name}
                  {att.type === 'link' && <ExternalLink className="size-3" />}
                </a>
              ))}
            </div>
          )}

          {announcement.expiresAt && (
            <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="size-3" />
              Expires {new Date(announcement.expiresAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

interface AnnouncementListProps {
  announcements: Announcement[]
  onEdit?: (ann: Announcement) => void
  onDelete?: (id: string) => void
  canManage?: boolean
  emptyMessage?: string
}

export function AnnouncementList({
  announcements,
  onEdit,
  onDelete,
  canManage = false,
  emptyMessage = 'No announcements yet. Check back soon!'
}: AnnouncementListProps) {
  if (announcements.length === 0) {
    return (
      <div className="py-12 text-center">
        <Archive className="size-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)] max-h-[600px]">
      <div className="space-y-4 p-1 pr-2">
        {announcements.map((ann, i) => (
          <AnnouncementCard
            key={ann.id}
            announcement={ann}
            onEdit={onEdit}
            onDelete={onDelete}
            canManage={canManage}
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </ScrollArea>
  )
}