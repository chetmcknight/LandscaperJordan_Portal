'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { DEMO_WORKERS, COLORS } from '@/lib/demo-data'
import { useToast } from '@/components/providers/toast-provider'

export function WorkersPage() {
  const { show } = useToast()
  const statusColors: Record<string, string> = {
    active: COLORS.success,
    break: COLORS.warning,
    idle: '#9CA3AF',
  }

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Crew</h1>
          <p className="text-sm text-gray-500">{DEMO_WORKERS.filter((w) => w.status === 'active').length} active workers</p>
        </div>
        <Button icon={<Icon name="plus" size={16} />} onClick={() => show({ title: 'Add Worker', message: 'Worker form coming soon', type: 'info' })}>
          Add Worker
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_WORKERS.map((w, i) => (
          <Card key={w.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start gap-4">
              <Avatar name={w.name} size="lg" color={w.color} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{w.name}</h3>
                  <span className="w-3 h-3 rounded-full" style={{ background: statusColors[w.status] }} />
                </div>
                <p className="text-xs text-gray-500">{w.role}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-gray-500">
                    Today: <b className="text-gray-900">{w.hours_today}h</b>
                  </span>
                  <span className="text-xs text-gray-500">
                    Week: <b className="text-gray-900">{w.hours_week}h</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Pay Rate</span>
                <span className="font-semibold text-gray-900">${w.pay_rate}/hr</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-500">YTD Wages</span>
                <span className="font-semibold text-green-600">${w.ytd_wages.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" size="sm" className="flex-1">
                View
              </Button>
              <Button variant="ghost" size="sm" icon={<Icon name="more-vertical" size={16} />} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
