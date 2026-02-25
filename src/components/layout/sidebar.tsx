'use client'

import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { ROLES } from '@/lib/demo-data'

interface SidebarProps {
  page: string
  navigate: (page: string) => void
  role: string
  onLogout: () => void
}

const navItems = [
  { id: 'dashboard', icon: 'home', label: 'Dashboard' },
  { id: 'jobs', icon: 'briefcase', label: 'Jobs' },
  { id: 'clients', icon: 'users', label: 'Clients' },
  { id: 'calendar', icon: 'calendar', label: 'Calendar' },
  { id: 'workers', icon: 'users', label: 'Crew', roles: ['owner'] },
  { id: 'map', icon: 'map-pin', label: 'Route' },
  { id: 'invoices', icon: 'file-text', label: 'Invoices' },
  { id: 'finances', icon: 'dollar', label: 'Finances', roles: ['owner'] },
  { id: 'settings', icon: 'settings', label: 'Settings' },
]

export function Sidebar({ page, navigate, role, onLogout }: SidebarProps) {
  const items = navItems.filter((i) => !i.roles || i.roles.includes(role))

  return (
    <aside className="hidden md:flex flex-col w-64 border-r h-full bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-700">
            <span className="text-xl">🌿</span>
          </div>
          <div>
            <h1 className="font-black text-sm text-gray-900 dark:text-white">Landscaper Jordan</h1>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: ROLES[role as keyof typeof ROLES].color + '20', color: ROLES[role as keyof typeof ROLES].color }}
            >
              {ROLES[role as keyof typeof ROLES].emoji} {ROLES[role as keyof typeof ROLES].label}
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
              page === item.id ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            )}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t dark:border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Icon name="log-out" size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
