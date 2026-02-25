'use client'

import { createContext, useContext, useState, useEffect, useSyncExternalStore, ReactNode } from 'react'

interface ThemeContextType {
  dark: boolean
  toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getServerSnapshot() {
  return false
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const dark = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === 'undefined') return false
      return document.documentElement.classList.contains('dark')
    },
    getServerSnapshot
  )

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      document.documentElement.classList.toggle('dark', saved === 'true')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    const newValue = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', newValue)
    localStorage.setItem('darkMode', String(newValue))
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
