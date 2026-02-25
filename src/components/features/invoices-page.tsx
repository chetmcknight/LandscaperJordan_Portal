'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { DEMO_INVOICES, DEMO_CLIENTS, COLORS } from '@/lib/demo-data'
import { useToast } from '@/components/providers/toast-provider'

interface InvoiceModalProps {
  invoice: typeof DEMO_INVOICES[0]
  client: typeof DEMO_CLIENTS[0]
  onClose: () => void
}

function InvoiceModal({ invoice, client, onClose }: InvoiceModalProps) {
  const { show } = useToast()

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invoice ${invoice.invoice_number}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .title { font-size: 32px; font-weight: bold; color: #2D6A4F; }
            .invoice-info { text-align: right; }
            .client-info { margin-bottom: 40px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f5f5f5; }
            .total { font-size: 24px; font-weight: bold; text-align: right; margin-top: 20px; }
            .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .status.paid { background: #dcfce7; color: #16a34a; }
            .status.unpaid { background: #fef3c7; color: #d97706; }
            .status.overdue { background: #fee2e2; color: #dc2626; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">🌿 Landscaper Jordan</div>
              <p>123 Garden Way<br/>Seattle, WA 98101<br/>(206) 555-0123</p>
            </div>
            <div class="invoice-info">
              <div class="title">INVOICE</div>
              <p><strong>${invoice.invoice_number}</strong></p>
              <p>Issue Date: ${invoice.issue_date}</p>
              <p>Due Date: ${invoice.due_date}</p>
              <p><span class="status ${invoice.status}">${invoice.status.toUpperCase()}</span></p>
            </div>
          </div>
          <div class="client-info">
            <h3>Bill To:</h3>
            <p><strong>${client.name}</strong></p>
            <p>${client.address}</p>
            <p>${client.email}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Professional Landscaping Services</td>
                <td>$${invoice.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            Total: $${invoice.amount.toFixed(2)}
          </div>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Thank you for your business!</p>
            <p>Payment is due within 7 days. Please make checks payable to Landscaper Jordan.</p>
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.invoice_number} from Landscaper Jordan`)
    const body = encodeURIComponent(`Dear ${client.name},\n\nPlease find attached invoice ${invoice.invoice_number} for $${invoice.amount.toFixed(2)}.\n\nDue Date: ${invoice.due_date}\n\nThank you for your business!\n\nBest regards,\nLandscaper Jordan`)
    window.open(`mailto:${client.email}?subject=${subject}&body=${body}`)
    show({ title: 'Email Opened', message: `Opening email to ${client.email}`, type: 'info' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-2xl shadow-2xl bg-white dark:bg-gray-800 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Invoice {invoice.invoice_number}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
              <p className="font-semibold text-gray-900 dark:text-white">{client.name}</p>
            </div>
            <Badge color={COLORS[invoice.status as keyof typeof COLORS] || COLORS.warning} variant="light">
              {invoice.status}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Issue Date</p>
              <p className="font-medium text-gray-900 dark:text-white">{invoice.issue_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
              <p className="font-medium text-gray-900 dark:text-white">{invoice.due_date}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-600 dark:text-gray-300">Total Amount</span>
              <span className="text-2xl font-bold text-green-700 dark:text-green-400">${invoice.amount.toFixed(2)}</span>
            </div>
          </div>

          {invoice.status === 'paid' && (
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <p className="text-sm text-green-700 dark:text-green-400">
                Paid on {invoice.paid_at} via {invoice.payment_method}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="primary" className="flex-1" icon={<Icon name="bell" size={16} />} onClick={handlePrint}>
              Print
            </Button>
            <Button variant="secondary" className="flex-1" icon={<Icon name="mail" size={16} />} onClick={handleEmail}>
              Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InvoicesPage() {
  const { show } = useToast()
  const [filter, setFilter] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState<typeof DEMO_INVOICES[0] | null>(null)

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

  const selectedClient = selectedInvoice ? DEMO_CLIENTS.find((c) => c.id === selectedInvoice.client_id) : null

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Invoices</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{invoices.length} total invoices</p>
        </div>
        <Button icon={<Icon name="plus" size={16} />} onClick={() => show({ title: 'Create Invoice', message: 'Invoice form coming soon', type: 'info' })}>
          New Invoice
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Total Outstanding</p>
          <p className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Overdue</p>
          <p className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Paid This Month</p>
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
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Invoice</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Due</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => {
                const client = DEMO_CLIENTS.find((c) => c.id === inv.client_id)
                return (
                  <tr key={inv.id} className="border-b dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{inv.invoice_number}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{client?.name}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">${inv.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge color={statusColors[inv.status]} variant="light">
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{inv.due_date}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Icon name="eye" size={14} />}
                        onClick={() => setSelectedInvoice(inv)}
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

      {selectedInvoice && selectedClient && (
        <InvoiceModal
          invoice={selectedInvoice}
          client={selectedClient}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  )
}
