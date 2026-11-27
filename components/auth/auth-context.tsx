'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import type { MemberProfile, Role, MemberStatus } from '@/lib/member'

interface AuthContextType {
  member: MemberProfile | null
  isLoading: boolean
  login: (member: MemberProfile) => void
  logout: () => void
  updateProfile: (updates: Partial<MemberProfile>) => void
  hasRole: (roles: Role[]) => boolean
  isCore: boolean
  isMember: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'gdg-member-profile'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<MemberProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.status === 'approved') {
          setMember(parsed)
        }
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback((newMember: MemberProfile) => {
    setMember(newMember)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMember))
  }, [])

  const logout = useCallback(() => {
    setMember(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const updateProfile = useCallback((updates: Partial<MemberProfile>) => {
    setMember(prev => {
      if (!prev) return prev
      const updated = { ...prev, ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const hasRole = useCallback((roles: Role[]) => {
    if (!member) return false
    return roles.includes(member.role)
  }, [member])

  const isCore = useMemo(() => hasRole(['core', 'admin']), [hasRole])
  const isMember = useMemo(() => hasRole(['member', 'core', 'admin']), [hasRole])

  const value = useMemo(() => ({
    member,
    isLoading,
    login,
    logout,
    updateProfile,
    hasRole,
    isCore,
    isMember
  }), [member, isLoading, login, logout, updateProfile, hasRole, isCore, isMember])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}