'use client'

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Send, MessageSquare, MessageCircleMore, ExternalLink,
  Loader2, Copy, Check, Hash, Users, Shield
} from 'lucide-react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import type { ChatMessage } from '@/lib/member'
import { getEventChat, saveEventChat, addChatMessage, addWhatsAppLinkMessage } from '@/lib/events'
import { useAuth } from '@/components/auth'

interface EventChatProps {
  eventId: string
  eventTitle: string
  whatsappUrl?: string
  canManage?: boolean
  onLoaded?: () => void
}

export function EventChat({ eventId, eventTitle, whatsappUrl, canManage = false, onLoaded }: EventChatProps) {
  const { member } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [whatsappLink, setWhatsAppLink] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onLoaded?.()
  }, [onLoaded])

  useEffect(() => {
    const chat = getEventChat(eventId)
    setMessages(chat.messages)
    scrollToBottom()
  }, [eventId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSend = async (e: FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !member || isSending) return

    setIsSending(true)
    const msg = addChatMessage(eventId, {
      eventId,
      authorId: member.id,
      authorName: member.name,
      authorAvatar: member.avatar,
      body: newMessage.trim(),
      type: 'text'
    })
    setMessages(prev => [...prev, msg])
    setNewMessage('')
    setIsSending(false)
  }

  const handleWhatsAppCreate = () => {
    if (!whatsappUrl) {
      const link = prompt('Enter WhatsApp group invite link:')
      if (link) {
        setWhatsAppLink(link)
        const msg = addWhatsAppLinkMessage(eventId, member!.id, member!.name, member.avatar)
        setMessages(prev => [...prev, msg])
        // In production, this would update the event data
      }
    } else {
      setShowWhatsApp(true)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(whatsappUrl || whatsappLink)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="size-5 text-primary" />
            <div>
              <h3 className="font-medium">Event Chat</h3>
              <p className="text-xs text-muted-foreground">{messages.length} messages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {whatsappUrl && (
              <Button variant="outline" size="sm" onClick={() => window.open(whatsappUrl, '_blank')}>
                <ExternalLink className="size-3.5 mr-1" /> Open in WhatsApp
              </Button>
            )}
            {canManage && !whatsappUrl && (
              <Button variant="outline" size="sm" onClick={handleWhatsAppCreate}>
                <Hash className="size-3.5 mr-1" /> Create WhatsApp Group
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-4" role="log" aria-live="polite" aria-label="Event chat messages">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircleMore className="size-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No messages yet. Be the first to say hi!</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex gap-3 animate-fade-in',
                    msg.authorId === member?.id ? 'flex-row-reverse' : 'flex-row'
                  )}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {msg.authorAvatar && (
                    <img
                      src={msg.authorAvatar}
                      alt=""
                      className="flex-shrink-0 size-8 rounded-full object-cover"
                    />
                  )}
                  {!msg.authorAvatar && (
                    <div className="flex-shrink-0 size-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {msg.authorName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className={cn(
                    'flex-1 max-w-[70%]',
                    msg.authorId === member?.id ? 'text-right' : 'text-left'
                  )}>
                    {msg.type === 'whatsapp-link' ? (
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-2 text-green-400 mb-1">
                          <CheckCircle2 className="size-4" />
                          <span className="font-medium">WhatsApp group created</span>
                        </div>
                        <p className="text-xs text-green-400/80">
                          {whatsappUrl ? 'Click to open' : 'A WhatsApp group link has been shared'}
                        </p>
                        {whatsappUrl && (
                          <Button variant="outline" size="sm" className="mt-2" onClick={() => window.open(whatsappUrl, '_blank')}>
                            <ExternalLink className="size-3.5 mr-1" /> Open WhatsApp
                          </Button>
                        )}
                      </div>
                    ) : msg.type === 'system' ? (
                      <p className="text-xs text-center text-muted-foreground/70 py-2">{msg.body}</p>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{msg.authorName}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(parseISO(msg.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <div
                          className={cn(
                            'inline-block px-4 py-2 rounded-2xl text-sm',
                            msg.authorId === member?.id
                              ? 'bg-primary text-primary-foreground rounded-tr-sm'
                              : 'bg-muted text-foreground rounded-tl-sm'
                          )}
                        >
                          {msg.body}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {member && (
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message…"
                disabled={isSending}
                maxLength={2000}
                aria-label="Chat message"
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim() || isSending}>
                {isSending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </Button>
            </form>
          </div>
        )}

        {!member && (
          <div className="p-4 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              <a href="/join" className="underline hover:text-foreground">Join the club</a> to participate in the chat.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}