'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/ui/icon'
import { useToast } from '@/components/providers/toast-provider'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      style={{ background: checked ? '#2D6A4F' : '#9CA3AF' }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  )
}

export function SettingsPage() {
  const [dark, setDark] = useState(false)
  const { show } = useToast()

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and preferences</p>
      </div>

      <Card>
        <h3 className="font-semibold mb-4 text-gray-900">Appearance</h3>
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium text-gray-900">Dark Mode</p>
            <p className="text-xs text-gray-500">Switch between light and dark theme</p>
          </div>
          <Toggle checked={dark} onChange={setDark} />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4 text-gray-900">Business Settings</h3>
        <div className="space-y-4">
          <Input label="Business Name" defaultValue="Landscaper Jordan" />
          <Input label="Phone" defaultValue="(206) 555-0123" />
          <Input label="Email" defaultValue="jordan@landscaperjordan.com" />
          <Button
            variant="primary"
            onClick={() => show({ title: 'Saved', message: 'Settings updated successfully', type: 'success' })}
          >
            Save Changes
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4 text-gray-900">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: 'Job reminders', desc: 'Get notified before scheduled jobs' },
            { label: 'Invoice payments', desc: 'Alert when invoices are paid' },
            { label: 'Crew updates', desc: 'When crew starts/finishes jobs' },
            { label: 'Client messages', desc: 'New messages from clients' },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm text-gray-900">{n.label}</p>
                <p className="text-xs text-gray-500">{n.desc}</p>
              </div>
              <Toggle checked={true} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4 text-gray-900">About</h3>
        <p className="text-sm text-gray-500">Landscaper Jordan Portal v4.1 SaaS</p>
        <p className="text-xs mt-1 text-gray-400">Built with Next.js + Supabase</p>
      </Card>
    </div>
  )
}
