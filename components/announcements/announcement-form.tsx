'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Loader2, Calendar, Paperclip, Plus, Trash2 } from 'lucide-react'
import type { Announcement, AnnouncementCategory, Attachment } from '@/lib/member'
import {
  CATEGORY_LABELS, CATEGORY_COLORS,
  PRIORITY_LABELS, PRIORITY_BADGE_VARIANTS
} from '@/lib/member'
import { useAuth } from '@/components/auth'

interface AnnouncementFormProps {
  initialData?: Partial<Announcement>
  onSubmit: (data: Omit<Announcement, 'id' | 'createdAt' | 'authorId' | 'authorName' | 'authorRole'>) => Promise<void>
  onCancel: () => void
  isEditing?: boolean
}

export function AnnouncementForm({ initialData, onSubmit, onCancel, isEditing = false }: AnnouncementFormProps) {
  const router = useRouter()
  const { member } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [attachments, setAttachments] = useState<Attachment[]>([])

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    body: initialData?.body || '',
    category: (initialData?.category as AnnouncementCategory) || 'general',
    priority: initialData?.priority || 'normal',
    pinned: initialData?.pinned || false,
    expiresAt: initialData?.expiresAt ? initialData.expiresAt.split('T')[0] : '',
  })

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    else if (formData.title.length > 120) newErrors.title = 'Title must be 120 characters or less'
    if (!formData.body.trim()) newErrors.body = 'Content is required'
    else if (formData.body.length > 5000) newErrors.body = 'Content must be 5000 characters or less'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleAttachmentAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, attachment: 'File must be under 5MB' }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const newAtt: Attachment = {
        name: file.name,
        url: reader.result as string,
        type: file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'document' : 'document'
      }
      setAttachments(prev => [...prev, newAtt])
      setErrors(prev => { const { attachment, ...rest } = prev; return rest })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        ...formData,
        attachments: attachments.length > 0 ? attachments : undefined
      })
      router.refresh()
    } catch {
      setErrors({ submit: 'Failed to save. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl border border-border shadow-xl animate-slide-up">
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur z-10 rounded-t-2xl">
          <h2 id="form-title" className="font-display text-xl font-bold tracking-tight">
            {isEditing ? 'Edit Announcement' : 'Create Announcement'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Close">
            <X className="size-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Build with AI Workshop — Registrations Open!"
              maxLength={120}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && <p id="title-error" className="text-sm text-destructive" role="alert">{errors.title}</p>}
            <p className="text-xs text-muted-foreground">{formData.title.length}/120</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="body">Content <span className="text-destructive">*</span></Label>
            <Textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Write your announcement here. Use clear, concise language..."
              rows={8}
              maxLength={5000}
              aria-invalid={!!errors.body}
              aria-describedby={errors.body ? 'body-error' : undefined}
            />
            {errors.body && <p id="body-error" className="text-sm text-destructive" role="alert">{errors.body}</p>}
            <p className="text-xs text-muted-foreground text-right">{formData.body.length}/5000</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
              <Select value={formData.category} onValueChange={v => setFormData(prev => ({ ...prev, category: v as AnnouncementCategory }))}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key as AnnouncementCategory}>
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[key as AnnouncementCategory] }} />
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="priority">Priority <span className="text-destructive">*</span></Label>
              <Select value={formData.priority} onValueChange={v => setFormData(prev => ({ ...prev, priority: v as Announcement['priority'] }))}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key as Announcement['priority']}>
                      <Badge variant={PRIORITY_BADGE_VARIANTS[key as Announcement['priority']]} className="mr-2">{label}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="expiresAt">Expires On (optional)</Label>
              <Input
                id="expiresAt"
                name="expiresAt"
                type="date"
                value={formData.expiresAt}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="flex items-center gap-2"
              />
              <Calendar className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="pinned" name="pinned" checked={formData.pinned} onCheckedChange={v => setFormData(prev => ({ ...prev, pinned: v }))} />
              <Label htmlFor="pinned" className="cursor-pointer text-sm font-medium">Pin to top</Label>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Attachments (optional)</Label>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-border hover:bg-accent cursor-pointer">
                <Paperclip className="size-4" />
                <Plus className="size-4" /> Add File
                <input type="file" onChange={handleAttachmentAdd} className="sr-only" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md" />
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((att, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent text-accent-foreground rounded-full">
                    <Paperclip className="size-3.5" />
                    {att.name}
                    <button type="button" onClick={() => removeAttachment(i)} className="ml-1 hover:text-accent-foreground/70">
                      <Trash2 className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {errors.attachment && <p className="text-sm text-destructive" role="alert">{errors.attachment}</p>}
          </div>

          {errors.submit && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm" role="alert">
              {errors.submit}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-48">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving…
                </>
              ) : (
                isEditing ? 'Update' : 'Publish'
              )}
            </Button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: none; } }
        .animate-slide-up { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  )
}