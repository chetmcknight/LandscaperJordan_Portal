'use client'

import { Icon } from '@/components/ui/icon'

interface BottomNavProps {
  page: string
  navigate: (page: string) => void
}

const items = [
  { id: 'dashboard', icon: 'home', label: 'Home' },
  { id: 'jobs', icon: 'briefcase', label: 'Jobs' },
  { id: 'clients', icon: 'users', label: 'Clients' },
  { id: 'calendar', icon: 'calendar', label: 'Calendar' },
  { id: 'more', icon: 'settings', label: 'More' },
]

export function BottomNav({ page, navigate }: BottomNavProps) {
  return (
    <nav className="md:hidden flex items-center justify-around py-2 border-t bg-white">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => navigate(item.id === 'more' ? 'settings' : item.id)}
          className="flex flex-col items-center gap-1 px-3 py-1"
        >
          <Icon
            name={item.icon}
            size={20}
            className={page === item.id ? 'text-green-700' : 'text-gray-400'}
          />
          <span
            className="text-[10px] font-medium"
            style={{ color: page === item.id ? '#2D6A4F' : '#9CA3AF' }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
