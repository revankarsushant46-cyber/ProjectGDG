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
import { Loader2, User, Mail, Link2, Camera, CheckCircle2, AlertCircle, GitFork as GithubIcon, Link2 as LinkedinIcon } from 'lucide-react'
import { BRANCHES, YEARS, SKILL_CATEGORIES, MemberProfile, SkillEntry, SkillLevel, MemberStatus } from '@/lib/member'
import { useAuth } from '@/components/auth'

const SKILL_LEVELS: { value: SkillLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
]

const initialSkills: SkillEntry[] = [
  { name: '', level: 'beginner' }
]

export function RegisterForm() {
  const router = useRouter()
  const { login } = useAuth()

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    year: '',
    branch: '',
    usn: '',
    email: '',
    phone: '',
    skills: initialSkills,
    interests: '',
    github: '',
    linkedin: '',
    avatar: '' as string
  })

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required'
      if (!formData.year) newErrors.year = 'Year is required'
      if (!formData.branch) newErrors.branch = 'Branch is required'
      if (!formData.usn.trim()) newErrors.usn = 'USN is required'
      else if (!/^[0-9A-Z]{8,12}$/i.test(formData.usn.replace(/\s/g, ''))) {
        newErrors.usn = 'USN must be 8-12 alphanumeric characters'
      }
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits'
    }

    if (currentStep === 2) {
      const validSkills = formData.skills.filter(s => s.name.trim())
      if (validSkills.length === 0) newErrors.skills = 'Add at least one skill'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSkillChange = (index: number, field: 'name' | 'level', value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((s, i) => i === index ? { ...s, [field]: value } : s)
    }))
  }

  const addSkill = () => {
    setFormData(prev => ({ ...prev, skills: [...prev.skills, { name: '', level: 'beginner' }] }))
  }

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, avatar: 'Image must be under 2MB' }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result as string }))
      setErrors(prev => { const { avatar, ...rest } = prev; return rest })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateStep(step)) return

    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsSubmitting(true)
    setToast(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newMember: MemberProfile = {
        id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        name: formData.name.trim(),
        year: formData.year,
        branch: formData.branch,
        usn: formData.usn.trim().toUpperCase(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || undefined,
        skills: formData.skills.filter(s => s.name.trim()),
        interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean),
        github: formData.github.trim() || undefined,
        linkedin: formData.linkedin.trim() || undefined,
        avatar: formData.avatar || undefined,
        role: 'member',
        status: 'pending',
        joinedAt: new Date().toISOString()
      }

      // Store pending registration locally
      const pendingKey = 'gdg-pending-registrations'
      const existing = JSON.parse(localStorage.getItem(pendingKey) || '[]')
      existing.push(newMember)
      localStorage.setItem(pendingKey, JSON.stringify(existing))

      setToast({ type: 'success', message: 'Registration submitted! Your application is pending review by the core team.' })
      setFormData({
        name: '', year: '', branch: '', usn: '', email: '', phone: '',
        skills: initialSkills, interests: '', github: '', linkedin: '', avatar: ''
      })
      setStep(1)
    } catch {
      setToast({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-mono">STEP 1</span>
        <span className="hidden sm:inline">Basic Information</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="text-sm text-destructive" role="alert">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="usn">USN <span className="text-destructive">*</span></Label>
          <Input
            id="usn"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            placeholder="e.g., 1RV21CS001"
            aria-invalid={!!errors.usn}
            aria-describedby={errors.usn ? 'usn-error' : undefined}
          />
          {errors.usn && <p id="usn-error" className="text-sm text-destructive" role="alert">{errors.usn}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@rvce.edu.in"
              className="pl-10"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          {errors.email && <p id="email-error" className="text-sm text-destructive" role="alert">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p id="phone-error" className="text-sm text-destructive" role="alert">{errors.phone}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="year">Year <span className="text-destructive">*</span></Label>
          <Select value={formData.year} onValueChange={v => setFormData(prev => ({ ...prev, year: v }))}>
            <SelectTrigger id="year" aria-invalid={!!errors.year}>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.year && <p className="text-sm text-destructive" role="alert">{errors.year}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="branch">Branch <span className="text-destructive">*</span></Label>
          <Select value={formData.branch} onValueChange={v => setFormData(prev => ({ ...prev, branch: v }))}>
            <SelectTrigger id="branch" aria-invalid={!!errors.branch}>
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.branch && <p className="text-sm text-destructive" role="alert">{errors.branch}</p>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-mono">STEP 2</span>
        <span className="hidden sm:inline">Skills & Interests</span>
      </div>

      <div className="space-y-4">
        <Label>Technical Skills <span className="text-destructive">*</span></Label>
        <div className="space-y-3" id="skills-list" role="list" aria-label="Skills">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-3 items-start" role="listitem">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`skill-${index}`} className="text-sm font-medium">Skill #{index + 1}</Label>
                <Select
                  value={skill.name}
                  onValueChange={v => handleSkillChange(index, 'name', v)}
                >
                  <SelectTrigger id={`skill-${index}`}>
                    <SelectValue placeholder="Select or type a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 w-40 flex-shrink-0">
                <Label htmlFor={`level-${index}`} className="text-sm font-medium">Level</Label>
                <Select value={skill.level} onValueChange={v => handleSkillChange(index, 'level', v)}>
                  <SelectTrigger id={`level-${index}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_LEVELS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              {formData.skills.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive mt-8"
                  onClick={() => removeSkill(index)}
                  aria-label={`Remove skill ${index + 1}`}
                >
                  <AlertCircle className="size-4" />
                </Button>
              )}
            </div>
          ))}
          {formData.skills.length < 10 && (
            <Button type="button" variant="outline" className="w-full" onClick={addSkill}>
              <CheckCircle2 className="size-4 mr-2" /> Add another skill
            </Button>
          )}
        </div>

        {errors.skills && <p className="text-sm text-destructive" role="alert">{errors.skills}</p>}

        <div className="space-y-1.5">
          <Label htmlFor="interests">Interests (comma-separated)</Label>
          <Textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="e.g., Machine Learning, Hackathons, Open Source, Technical Writing"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            What domains excite you? Separate with commas.
          </p>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-mono">STEP 3</span>
        <span className="hidden sm:inline">Profile & Social</span>
      </div>

      <div className="space-y-4">
        <Label>Profile Picture (optional)</Label>
        <div className="flex items-center gap-4">
          <div className="relative">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Profile preview"
                className="size-20 rounded-full border border-border object-cover"
              />
            ) : (
              <div className="size-20 rounded-full border border-border bg-muted flex items-center justify-center">
                <User className="size-8 text-muted-foreground" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 cursor-pointer">
              <Camera className="size-5 bg-background border border-border rounded-full p-1" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="sr-only"
                aria-label="Upload profile picture"
              />
            </label>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Click camera to upload</p>
            <p className="text-xs text-muted-foreground">Max 2MB · JPG, PNG, WebP</p>
          </div>
        </div>
        {errors.avatar && <p className="text-sm text-destructive" role="alert">{errors.avatar}</p>}

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="github">GitHub (optional)</Label>
            <div className="relative">
              <GithubIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="github.com/username"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">Profile URL or username</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="linkedin">LinkedIn (optional)</Label>
            <div className="relative">
              <LinkedinIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/username"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">Profile URL or username</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>What happens next?</strong> Your application will be reviewed by the core team within 2–3 days.
          You will receive an email once your membership is approved. Until then, you can browse public content.
        </p>
      </div>
    </div>
  )

  const renderSteps = () => {
    switch (step) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
    }
  }

  return (
    <section className="py-16 sm:py-24" aria-labelledby="register-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {toast && (
          <div
            className={cn(
              'mb-6 p-4 rounded-lg border flex items-center gap-3 animate-slide-up',
              toast.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            )}
            role="alert"
          >
            {toast.type === 'success' ? <CheckCircle2 className="size-5 flex-shrink-0" /> : <AlertCircle className="size-5 flex-shrink-0" />}
            <p className="text-sm">{toast.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {([1, 2, 3] as const).map(s => (
                  <span
                    key={s}
                    className={cn(
                      'font-mono text-sm px-3 py-1.5 rounded transition-colors',
                      s < step
                        ? 'bg-primary text-primary-foreground'
                        : s === step
                        ? 'bg-secondary text-secondary-foreground font-medium'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          {renderSteps()}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <div className="flex gap-3 ml-auto">
              {step < 3 && (
                <Button type="submit" disabled={isSubmitting}>
                  Next
                </Button>
              )}
              {step === 3 && (
                <Button type="submit" disabled={isSubmitting} className="w-48">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already a member?{' '}
          <a href="/login" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Sign in
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
      `}</style>
    </section>
  )
}