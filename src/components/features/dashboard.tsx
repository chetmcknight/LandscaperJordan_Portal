'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { DEMO_JOBS, DEMO_WORKERS, DEMO_CLIENTS, DEMO_INVOICES, COLORS, ROLES } from '@/lib/demo-data'
import { useToast } from '@/components/providers/toast-provider'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard({ navigate, role }: { navigate: (page: string) => void; role: string }) {
  const { show } = useToast()
  const [greeting, setGreeting] = useState(getGreeting())

  useEffect(() => {
    const updateGreeting = () => setGreeting(getGreeting())
    updateGreeting()
    const interval = setInterval(updateGreeting, 60000)
    return () => clearInterval(interval)
  }, [])

  const todayJobs = DEMO_JOBS.filter((j) => j.scheduled_date === 'Today')
  const totalRevenue = DEMO_INVOICES.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const pendingRevenue = DEMO_INVOICES.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0)
  const activeWorkers = DEMO_WORKERS.filter((w) => w.status === 'active').length

  const stats = [
    {
      label: "Today's Jobs",
      value: todayJobs.length,
      icon: 'briefcase',
      color: COLORS.primary,
      sub: `${todayJobs.filter((j) => j.status === 'in-progress').length} in progress`,
    },
    {
      label: 'Active Crew',
      value: activeWorkers,
      icon: 'users',
      color: COLORS.info,
      sub: `${DEMO_WORKERS.length} total`,
    },
    {
      label: 'Revenue MTD',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: 'dollar',
      color: COLORS.success,
      sub: `+$${pendingRevenue.toLocaleString()} pending`,
    },
    {
      label: 'Clients',
      value: DEMO_CLIENTS.length,
      icon: 'users',
      color: COLORS.warning,
      sub: `${DEMO_CLIENTS.filter((c) => c.status === 'overdue').length} overdue`,
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{greeting}, Jordan! 👋</h1>
          <p className="text-sm text-gray-500">Here's what's happening today</p>
        </div>
        <Button variant="secondary" icon={<Icon name="bell" size={16} />}>
          <span className="hidden sm:inline">Notifications</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} hover className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: s.color + '20' }}
              >
                <Icon name={s.icon} size={20} style={{ color: s.color }} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{s.value}</h3>
            <p className="text-xs font-medium text-gray-500">{s.label}</p>
            <p className="text-xs mt-1" style={{ color: s.color }}>
              {s.sub}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Today's Schedule</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('jobs')}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {todayJobs.map((job, i) => {
              const client = DEMO_CLIENTS.find((c) => c.id === job.client_id)
              const jobWorkers = DEMO_WORKERS.filter((w) => ['w1', 'w2'].includes(w.id))
              const statusColors: Record<string, string> = {
                completed: COLORS.success,
                'in-progress': COLORS.info,
                scheduled: COLORS.warning,
              }
              return (
                <Card key={job.id} hover className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-bold"
                      style={{ background: statusColors[job.status] + '20' }}
                    >
                      <span style={{ color: COLORS.primary }}>{job.scheduled_time?.split(':')[0]}</span>
                      <span className="text-gray-400">{job.scheduled_time?.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">{client?.name}</h4>
                          <p className="text-xs text-gray-500">
                            {job.type} • {job.address}
                          </p>
                        </div>
                        <Badge color={statusColors[job.status]} variant="light">
                          {job.status === 'in-progress' ? 'In Progress' : job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex -space-x-2">
                          {jobWorkers.slice(0, 3).map((w) => (
                            <Avatar key={w.id} name={w.name} size="sm" color={w.color} />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-green-700">${job.price}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-gray-900">Crew Status</h2>
          <Card>
            <div className="space-y-3">
              {DEMO_WORKERS.map((w) => (
                <div key={w.id} className="flex items-center gap-3">
                  <Avatar name={w.name} size="sm" color={w.color} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate text-gray-900">{w.name}</h4>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          w.status === 'active' ? 'bg-green-500' : w.status === 'break' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {w.role} • {w.hours_today}h today
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h4 className="font-semibold text-sm mb-3 text-gray-900">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={<Icon name="plus" size={14} />}
                onClick={() => show({ title: 'New Job', message: 'Opening job form...', type: 'info' })}
              >
                New Job
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<Icon name="users" size={14} />}
                onClick={() => show({ title: 'Add Client', message: 'Opening client form...', type: 'info' })}
              >
                Add Client
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<Icon name="file-text" size={14} />}
                onClick={() => show({ title: 'Create Invoice', message: 'Opening invoice form...', type: 'info' })}
              >
                Invoice
              </Button>
              <Button variant="secondary" size="sm" icon={<Icon name="navigation" size={14} />} onClick={() => navigate('map')}>
                Route
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
