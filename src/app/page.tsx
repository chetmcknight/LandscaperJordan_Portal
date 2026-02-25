'use client'

import { useState, useEffect } from 'react'
import { ToastProvider } from '@/components/providers/toast-provider'
import { Sidebar } from '@/components/layout/sidebar'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Dashboard } from '@/components/features/dashboard'
import { JobsPage } from '@/components/features/jobs-page'
import { ClientsPage } from '@/components/features/clients-page'
import { WorkersPage } from '@/components/features/workers-page'
import { CalendarPage } from '@/components/features/calendar-page'
import { InvoicesPage } from '@/components/features/invoices-page'
import { FinancesPage } from '@/components/features/finances-page'
import { MapPage } from '@/components/features/map-page'
import { SettingsPage } from '@/components/features/settings-page'
import { Login } from '@/components/features/login-page'
import { ROLES } from '@/lib/demo-data'

export default function Home() {
  const [screen, setScreen] = useState<'login' | 'app'>('login')
  const [page, setPage] = useState('dashboard')
  const [role, setRole] = useState<string>('owner')
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const navigate = (p: string) => setPage(p)

  const handleLogin = (r: string) => {
    setRole(r)
    setScreen('app')
  }

  const handleLogout = () => {
    setScreen('login')
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard navigate={navigate} role={role} />
      case 'jobs':
        return <JobsPage />
      case 'clients':
        return <ClientsPage />
      case 'workers':
        return <WorkersPage />
      case 'calendar':
        return <CalendarPage />
      case 'invoices':
        return <InvoicesPage />
      case 'finances':
        return <FinancesPage />
      case 'map':
        return <MapPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <Dashboard navigate={navigate} role={role} />
    }
  }

  return (
    <ToastProvider>
      {screen === 'login' ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
          {!online && (
            <div className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-white bg-red-500 animate-pulse">
              📵 Offline — changes sync when reconnected
            </div>
          )}
          <div className="md:hidden flex items-center justify-between px-4 py-3 flex-shrink-0 bg-white border-b">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-700">
                <span className="text-base">🌿</span>
              </div>
              <span className="font-black text-sm text-gray-900">Landscaper Jordan</span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: ROLES[role as keyof typeof ROLES].color + '20', color: ROLES[role as keyof typeof ROLES].color }}
              >
                {ROLES[role as keyof typeof ROLES].emoji} {ROLES[role as keyof typeof ROLES].label}
              </span>
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <Sidebar page={page} navigate={navigate} role={role} onLogout={handleLogout} />
            <div className="flex-1 flex flex-col overflow-hidden">{renderPage()}</div>
          </div>
          <BottomNav page={page} navigate={navigate} />
        </div>
      )}
    </ToastProvider>
  )
}
