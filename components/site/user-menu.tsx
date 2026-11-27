'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  User, Settings, LogOut, Shield, Award, MessageSquare,
  GitFork as GithubIcon, Link2 as LinkedinIcon, Mail, Bell, ChevronDown
} from 'lucide-react'
import { useAuth } from '@/components/auth'
import { ROLE_LABELS, ROLE_BADGE_VARIANTS } from '@/lib/member'

export function UserMenu() {
  const { member, logout, isCore, isMember, isLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (isLoading || !member) return null

  const initials = member.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 rounded-full p-0"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Profile menu"
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src={member.avatar} alt={member.name} className="rounded-full" />
          <AvatarFallback className="rounded-full bg-primary/20 text-primary text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="absolute bottom-1 right-1 size-3 text-muted-foreground pointer-events-none" />
      </Button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 top-full mt-2 w-64 origin-top-right rounded-xl border border-border bg-popover shadow-lg p-2 animate-slide-down z-50"
          )}
          role="menu"
        >
          <div className="px-2 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-primary/20 text-primary">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground truncate">{member.email || member.usn}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={ROLE_BADGE_VARIANTS[member.role]}>
                <Shield className="size-3 mr-1" /> {ROLE_LABELS[member.role]}
              </Badge>
              {member.status === 'pending' && (
                <Badge variant="default"><Award className="size-3 mr-1" /> Pending</Badge>
              )}
            </div>
          </div>

          <nav className="py-1" aria-label="Profile actions">
            {isMember && (
              <>
                <Link
                  href="/events"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare className="size-4" /> My Events
                </Link>
                <Link
                  href="/announcements"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <Bell className="size-4" /> Announcements
                </Link>
              </>
            )}

            {isCore && (
              <>
                <Separator className="my-1" />
                <Link
                  href="/admin/announcements"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="size-4" /> Create Announcement
                </Link>
                <Link
                  href="/admin/events"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <Award className="size-4" /> Manage Events
                </Link>
              </>
            )}

            <Separator className="my-1" />

            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <User className="size-4" /> Profile Settings
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="size-4" /> Preferences
            </Link>

            <Separator className="my-1" />

            {member.github && (
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
                role="menuitem"
              >
                <GithubIcon className="size-4" /> GitHub
              </a>
            )}
            {member.linkedin && (
              <a
                href={`https://linkedin.com/in/${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
                role="menuitem"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            )}

            <Separator className="my-1" />

            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="flex w-full items-center gap-3 px-3 py-2 text-sm text-destructive rounded-lg hover:bg-accent transition-colors"
              role="menuitem"
            >
              <LogOut className="size-4" /> Sign Out
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}