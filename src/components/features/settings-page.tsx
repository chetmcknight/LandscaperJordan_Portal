'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/ui/icon'
import { useToast } from '@/components/providers/toast-provider'
import { useTheme } from '@/components/providers/theme-provider'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      style={{ background: checked ? '#2D6A4F' : '#9CA3AF' }}
      role="switch"
      aria-checked={checked}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  )
}

export function SettingsPage() {
  const { dark, toggleDark } = useTheme()
  const { show } = useToast()

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      <Card>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Appearance</h3>
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
          </div>
          <Toggle checked={dark} onChange={toggleDark} />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Business Settings</h3>
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
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: 'Job reminders', desc: 'Get notified before scheduled jobs' },
            { label: 'Invoice payments', desc: 'Alert when invoices are paid' },
            { label: 'Crew updates', desc: 'When crew starts/finishes jobs' },
            { label: 'Client messages', desc: 'New messages from clients' },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm text-gray-900 dark:text-white">{n.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{n.desc}</p>
              </div>
              <Toggle checked={true} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">About</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Landscaper Jordan Portal v4.1 SaaS</p>
        <p className="text-xs mt-1 text-gray-400">Built with Next.js + Supabase</p>
      </Card>
    </div>
  )
}
