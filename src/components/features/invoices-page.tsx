'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { DEMO_INVOICES, DEMO_CLIENTS, COLORS } from '@/lib/demo-data'
import { useToast } from '@/components/providers/toast-provider'

export function InvoicesPage() {
  const { show } = useToast()
  const [filter, setFilter] = useState('all')

  const invoices = DEMO_INVOICES
  const filtered = filter === 'all' ? invoices : invoices.filter((i) => i.status === filter)

  const totalPending = invoices.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0)
  const totalOverdue = invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.amount, 0)
  const paidThisMonth = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0)

  const statusColors: Record<string, string> = {
    paid: COLORS.success,
    unpaid: COLORS.warning,
    overdue: COLORS.error,
  }

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500">{invoices.length} total invoices</p>
        </div>
        <Button icon={<Icon name="plus" size={16} />} onClick={() => show({ title: 'Create Invoice', message: 'Invoice form coming soon', type: 'info' })}>
          New Invoice
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500">Total Outstanding</p>
          <p className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500">Overdue</p>
          <p className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500">Paid This Month</p>
          <p className="text-2xl font-bold text-green-600">${paidThisMonth.toLocaleString()}</p>
        </Card>
      </div>

      <div className="flex gap-2">
        {['all', 'unpaid', 'overdue', 'paid'].map((f) => (
          <Button key={f} variant={filter === f ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Invoice</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Due</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => {
                const client = DEMO_CLIENTS.find((c) => c.id === inv.client_id)
                return (
                  <tr key={inv.id} className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-900">{inv.invoice_number}</td>
                    <td className="py-3 px-4 text-gray-500">{client?.name}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">${inv.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge color={statusColors[inv.status]} variant="light">
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{inv.due_date}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Icon name="eye" size={14} />}
                        onClick={() => show({ title: inv.invoice_number, message: `Status: ${inv.status}`, type: 'info' })}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
