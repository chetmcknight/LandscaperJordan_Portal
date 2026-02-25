'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { DEMO_JOBS, DEMO_WORKERS, DEMO_CLIENTS, DEMO_INVOICES, COLORS, ROLES } from '@/lib/demo-data'
import { useToast } from '@/components/providers/toast-provider'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function NewJobModal({ onClose }: { onClose: () => void }) {
  const { show } = useToast()
  const [clientName, setClientName] = useState('')
  const [address, setAddress] = useState('')
  const [type, setType] = useState('Lawn Mowing')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    show({ title: 'Job Created', message: `New ${type} job for ${clientName} created!`, type: 'success' })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white dark:bg-gray-800 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">New Job</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <Input label="Client Name" value={clientName} onChange={setClientName} placeholder="Enter client name" />
          <Input label="Address" value={address} onChange={setAddress} placeholder="Job address" />
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Job Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full mt-1 px-4 py-2.5 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <option>Lawn Mowing</option>
              <option>Mulching</option>
              <option>Tree Trimming</option>
              <option>Seasonal Cleanup</option>
              <option>Irrigation</option>
              <option>Cleanup</option>
            </select>
          </div>
          <Input label="Price ($)" type="number" value={price} onChange={setPrice} placeholder="0" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" value={date} onChange={setDate} />
            <Input label="Time" type="time" value={time} onChange={setTime} />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions..." className="w-full mt-1 px-4 py-2.5 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" rows={3} />
          </div>
          <Button variant="primary" className="w-full" onClick={handleSubmit}>Create Job</Button>
        </div>
      </div>
    </div>
  )
}

function AddClientModal({ onClose }: { onClose: () => void }) {
  const { show } = useToast()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    show({ title: 'Client Added', message: `${name} has been added to your clients!`, type: 'success' })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white dark:bg-gray-800 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add Client</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <Input label="Client Name" value={name} onChange={setName} placeholder="Full name or business" />
          <Input label="Phone" type="tel" value={phone} onChange={setPhone} placeholder="(555) 123-4567" />
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="client@email.com" />
          <Input label="Address" value={address} onChange={setAddress} placeholder="Service address" />
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Gate codes, pets, preferences..." className="w-full mt-1 px-4 py-2.5 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" rows={3} />
          </div>
          <Button variant="primary" className="w-full" onClick={handleSubmit}>Add Client</Button>
        </div>
      </div>
    </div>
  )
}

function CreateInvoiceModal({ onClose }: { onClose: () => void }) {
  const { show } = useToast()
  const [clientId, setClientId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const selectedClient = DEMO_CLIENTS.find(c => c.id === clientId)

  const handleSubmit = () => {
    show({ title: 'Invoice Created', message: `Invoice for ${selectedClient?.name || 'client'} created!`, type: 'success' })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white dark:bg-gray-800 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Create Invoice</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Client</label>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full mt-1 px-4 py-2.5 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <option value="">Select a client</option>
              {DEMO_CLIENTS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <Input label="Amount ($)" type="number" value={amount} onChange={setAmount} placeholder="0.00" />
          <Input label="Description" value={description} onChange={setDescription} placeholder="Service description" />
          <Input label="Due Date" type="date" value={dueDate} onChange={setDueDate} />
          <Button variant="primary" className="w-full" onClick={handleSubmit}>Create Invoice</Button>
        </div>
      </div>
    </div>
  )
}

export function Dashboard({ navigate, role }: { navigate: (page: string) => void; role: string }) {
  const { show } = useToast()
  const [greeting, setGreeting] = useState(getGreeting())
  const [showNewJob, setShowNewJob] = useState(false)
  const [showAddClient, setShowAddClient] = useState(false)
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)

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
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">{greeting}, Jordan! 👋</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Here's what's happening today</p>
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className="text-xs mt-1" style={{ color: s.color }}>
              {s.sub}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 dark:text-white">Today's Schedule</h2>
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
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{client?.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
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
                        <span className="text-xs font-semibold text-green-700 dark:text-green-400">${job.price}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Crew Status</h2>
          <Card>
            <div className="space-y-3">
              {DEMO_WORKERS.map((w) => (
                <div key={w.id} className="flex items-center gap-3">
                  <Avatar name={w.name} size="sm" color={w.color} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate text-gray-900 dark:text-white">{w.name}</h4>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          w.status === 'active' ? 'bg-green-500' : w.status === 'break' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {w.role} • {w.hours_today}h today
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h4 className="font-semibold text-sm mb-3 text-gray-900 dark:text-white">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" icon={<Icon name="plus" size={14} />} onClick={() => setShowNewJob(true)}>
                New Job
              </Button>
              <Button variant="secondary" size="sm" icon={<Icon name="users" size={14} />} onClick={() => setShowAddClient(true)}>
                Add Client
              </Button>
              <Button variant="secondary" size="sm" icon={<Icon name="file-text" size={14} />} onClick={() => setShowCreateInvoice(true)}>
                Invoice
              </Button>
              <Button variant="secondary" size="sm" icon={<Icon name="navigation" size={14} />} onClick={() => navigate('map')}>
                Route
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {showNewJob && <NewJobModal onClose={() => setShowNewJob(false)} />}
      {showAddClient && <AddClientModal onClose={() => setShowAddClient(false)} />}
      {showCreateInvoice && <CreateInvoiceModal onClose={() => setShowCreateInvoice(false)} />}
    </div>
  )
}
