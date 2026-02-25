'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { DEMO_JOBS, DEMO_WORKERS, DEMO_CLIENTS, COLORS } from '@/lib/demo-data'
import { useToast } from '@/components/providers/toast-provider'

export function JobsPage() {
  const { show } = useToast()
  const [filter, setFilter] = useState('all')

  const jobs = DEMO_JOBS
  const filtered = filter === 'all' ? jobs : jobs.filter((j) => j.status === filter)

  const statusColors: Record<string, string> = {
    scheduled: COLORS.info,
    'in-progress': COLORS.primary,
    completed: COLORS.success,
    paused: COLORS.warning,
  }

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Jobs</h1>
          <p className="text-sm text-gray-500">{jobs.length} total jobs</p>
        </div>
        <Button icon={<Icon name="plus" size={16} />} onClick={() => show({ title: 'New Job', message: 'Job creation coming soon', type: 'info' })}>
          New Job
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-gray-50 border border-gray-200"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={filter === 'all' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('all')}>
            All
          </Button>
          <Button variant={filter === 'scheduled' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('scheduled')}>
            Scheduled
          </Button>
          <Button variant={filter === 'in-progress' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('in-progress')}>
            Active
          </Button>
          <Button variant={filter === 'completed' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('completed')}>
            Done
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((job, i) => {
          const client = DEMO_CLIENTS.find((c) => c.id === job.client_id)
          const jobWorkers = DEMO_WORKERS.filter((w) => ['w1', 'w2'].includes(w.id))
          return (
            <Card key={job.id} hover className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: statusColors[job.status] + '20' }}
                >
                  {job.status === 'completed' ? '✅' : job.status === 'in-progress' ? '🔄' : '📅'}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{client?.name}</h3>
                      <p className="text-xs text-gray-500">
                        {job.type} • {job.address}
                      </p>
                    </div>
                    <Badge color={statusColors[job.status]} variant="light">
                      {job.status === 'in-progress' ? 'Active' : job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Icon name="calendar" size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {job.scheduled_date} at {job.scheduled_time}
                      </span>
                    </div>
                    <span className="font-bold text-green-700">${job.price}</span>
                  </div>
                  <div className="flex -space-x-2 mt-3">
                    {jobWorkers.map((w) => (
                      <Avatar key={w.id} name={w.name} size="sm" color={w.color} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
