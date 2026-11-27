'use client'

import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users, UserPlus, UserCheck, UserX, Clock, MessageSquare,
  Send, MoreVertical, Edit, Trash2, CheckCircle2, XCircle,
  Loader2, ExternalLink, Copy, Check, X
} from 'lucide-react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import type { EventVolunteerRole, VolunteerApplication } from '@/lib/member'
import { getVolunteerRoles, getVolunteerApplications, applyForVolunteerRole, updateApplicationStatus } from '@/lib/events'
import { useAuth } from '@/components/auth'

interface VolunteerRoleCardProps {
  role: EventVolunteerRole
  eventId: string
  myApplication?: VolunteerApplication
  onApply: (roleId: string) => void
  onCancel: (applicationId: string) => void
  canManage: boolean
  applications: VolunteerApplication[]
  onAccept: (applicationId: string) => void
  onReject: (applicationId: string) => void
}

export function VolunteerRoleCard({
  role,
  eventId,
  myApplication,
  onApply,
  onCancel,
  canManage,
  applications,
  onAccept,
  onReject
}: VolunteerRoleCardProps) {
  const { member } = useAuth()
  const isVolunteer = applications.some(a => a.memberId === member?.id && a.status === 'accepted')
  const isPending = myApplication?.status === 'pending'
  const isAccepted = myApplication?.status === 'accepted'
  const isRejected = myApplication?.status === 'rejected'
  const filled = role.currentVolunteers.length
  const isFull = filled >= role.maxVolunteers

  return (
    <Card className={cn(
      'border-border/50',
      isAccepted && 'ring-1 ring-green-500/30 bg-green-500/5',
      isPending && 'ring-1 ring-yellow-500/30 bg-yellow-500/5',
      isRejected && 'ring-1 ring-red-500/30 bg-red-500/5'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="font-display text-lg">{role.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant={isFull ? 'destructive' : 'outline'} className="gap-1">
              <Users className="size-3" />
              {filled}/{role.maxVolunteers}
            </Badge>
            {isAccepted && <Badge variant="secondary" className="gap-1"><UserCheck className="size-3" /> Accepted</Badge>}
            {isPending && <Badge variant="default" className="gap-1"><Clock className="size-3" /> Pending</Badge>}
            {isRejected && <Badge variant="destructive" className="gap-1"><XCircle className="size-3" /> Declined</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {role.skillsPreferred && role.skillsPreferred.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {role.skillsPreferred.map(s => (
              <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
            ))}
          </div>
        )}

        {!canManage && member && (
          <div className="flex items-center gap-3">
            {isAccepted ? (
              <Button variant="outline" size="sm" onClick={() => onCancel(myApplication!.id)} disabled={!myApplication}>
                <UserX className="size-4 mr-1" /> Withdraw
              </Button>
            ) : isPending ? (
              <Button variant="outline" size="sm" onClick={() => onCancel(myApplication!.id)} disabled={!myApplication}>
                <XCircle className="size-4 mr-1" /> Cancel Application
              </Button>
            ) : isRejected ? (
              <span className="text-sm text-muted-foreground">Application was not accepted</span>
            ) : isFull ? (
              <Button variant="outline" size="sm" disabled>
                <Users className="size-4 mr-1" /> Full
              </Button>
            ) : (
              <Button size="sm" onClick={() => onApply(role.id)}>
                <UserPlus className="size-4 mr-1" /> Volunteer
              </Button>
            )}
          </div>
        )}

        {canManage && applications.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium mb-3">Applications ({applications.length})</h4>
            <div className="space-y-2">
              {applications.map(app => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{app.memberId.slice(-2).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{app.memberId}</p>
                      <p className="text-xs text-muted-foreground">{formatDistanceToNow(parseISO(app.appliedAt), { addSuffix: true })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.status === 'pending' && (
                      <>
                        <Button size="sm" variant="secondary" onClick={() => onAccept(app.id)}>
                          <Check className="size-3 mr-1" /> Accept
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => onReject(app.id)}>
                          <X className="size-3 mr-1" /> Reject
                        </Button>
                      </>
                    )}
                    {app.status === 'accepted' && (
                      <Badge variant="secondary" className="gap-1"><UserCheck className="size-3" /> Accepted</Badge>
                    )}
                    {app.status === 'rejected' && (
                      <Badge variant="destructive" className="gap-1"><XCircle className="size-3" /> Rejected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface VolunteerSectionProps {
  eventId: string
  canManage: boolean
}

export function VolunteerSection({ eventId, canManage, onLoaded }: VolunteerSectionProps & { onLoaded?: () => void }) {
  const { member } = useAuth()
  const roles = getVolunteerRoles(eventId)
  const allApplications = getVolunteerApplications(eventId)
  const myApplications = member ? allApplications.filter(a => a.memberId === member.id) : []

  useEffect(() => {
    onLoaded?.()
  }, [onLoaded])

  const handleApply = (roleId: string) => {
    if (!member) return
    const existing = myApplications.find(a => a.roleId === roleId)
    if (existing) return
    applyForVolunteerRole({
      eventId,
      memberId: member.id,
      roleId,
      note: ''
    })
  }

  const handleCancel = (applicationId: string) => {
    updateApplicationStatus(applicationId, 'rejected')
  }

  const handleAccept = (applicationId: string) => {
    updateApplicationStatus(applicationId, 'accepted')
  }

  const handleReject = (applicationId: string) => {
    updateApplicationStatus(applicationId, 'rejected')
  }

  if (roles.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="size-12 mx-auto text-muted-foreground/50 mb-3" />
        <h3 className="font-medium mb-1">No volunteer roles yet</h3>
        <p className="text-sm text-muted-foreground">
          {canManage ? 'Create volunteer roles when editing this event.' : 'Volunteer roles will appear here when the core team sets them up.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-bold">Volunteer Roles</h3>
      <p className="text-sm text-muted-foreground">
        Help make this event happen. Sign up for a role that matches your skills.
      </p>
      <div className="space-y-3" role="list" aria-label="Volunteer roles">
        {roles.map(role => {
          const roleApplications = allApplications.filter(a => a.roleId === role.id)
          const myApp = myApplications.find(a => a.roleId === role.id)
          return (
            <VolunteerRoleCard
              key={role.id}
              role={role}
              eventId={eventId}
              myApplication={myApp}
              onApply={handleApply}
              onCancel={handleCancel}
              canManage={canManage}
              applications={roleApplications}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          )
        })}
      </div>
    </div>
  )
}