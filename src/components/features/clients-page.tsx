'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { DEMO_CLIENTS, COLORS } from '@/lib/demo-data'

export function ClientsPage() {
  const [search, setSearch] = useState('')
  const [viewClient, setViewClient] = useState<typeof DEMO_CLIENTS[0] | null>(null)

  const filtered = DEMO_CLIENTS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500">{DEMO_CLIENTS.length} active clients</p>
        </div>
        <Button icon={<Icon name="plus" size={16} />}>Add Client</Button>
      </div>

      <div className="relative">
        <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-gray-50 border border-gray-200"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <Card key={client.id} hover onClick={() => setViewClient(client)} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start gap-3">
              <Avatar name={client.name} color={client.status === 'overdue' ? COLORS.error : COLORS.primary} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate text-gray-900">{client.name}</h3>
                  {client.status === 'overdue' && <Badge color={COLORS.error} variant="light">Overdue</Badge>}
                </div>
                <p className="text-xs truncate text-gray-500">{client.address}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">LTV: ${client.ltv.toLocaleString()}</span>
                  {client.balance > 0 && <span className="text-xs font-semibold text-red-500">${client.balance} due</span>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {viewClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setViewClient(null)}>
          <div className="relative w-full max-w-lg rounded-2xl shadow-2xl bg-white max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white">
              <h2 className="text-lg font-bold text-gray-900">{viewClient.name}</h2>
              <button onClick={() => setViewClient(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <Icon name="x" size={20} />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar name={viewClient.name} size="lg" color={viewClient.status === 'overdue' ? COLORS.error : COLORS.primary} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{viewClient.name}</h3>
                    {viewClient.status === 'overdue' && <Badge color={COLORS.error}>Overdue</Badge>}
                  </div>
                  <p className="text-sm text-gray-500">Client since {viewClient.since}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                  <p className="text-xs mb-1 text-gray-500">Lifetime Value</p>
                  <p className="text-xl font-bold text-green-600">${viewClient.ltv.toLocaleString()}</p>
                </Card>
                <Card className="text-center">
                  <p className="text-xs mb-1 text-gray-500">Outstanding</p>
                  <p className="text-xl font-bold" style={{ color: viewClient.balance > 0 ? COLORS.error : '#9CA3AF' }}>
                    ${viewClient.balance}
                  </p>
                </Card>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">Contact</h4>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📞 {viewClient.phone}</p>
                  <p>📧 {viewClient.email}</p>
                  <p>📍 {viewClient.address}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">Notes</h4>
                <p className="text-sm text-gray-500">{viewClient.notes}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                <p className="text-xs font-semibold text-red-600">Sensitive Notes</p>
                <p className="text-sm mt-1 text-gray-900">{viewClient.sensitive_notes}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" className="flex-1" icon={<Icon name="phone" size={16} />}>
                  Call
                </Button>
                <Button variant="secondary" className="flex-1" icon={<Icon name="file-text" size={16} />}>
                  Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
