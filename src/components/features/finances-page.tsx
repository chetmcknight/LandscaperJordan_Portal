'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DEMO_EXPENSES, DEMO_CLIENTS, DEMO_INVOICES, COLORS } from '@/lib/demo-data'

export function FinancesPage() {
  const expenses = DEMO_EXPENSES
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0)

  const income = DEMO_INVOICES.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const pending = DEMO_INVOICES.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0)
  const profit = income - totalExp

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Finances</h1>
        <p className="text-sm text-gray-500">February 2026</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500">Income</p>
          <p className="text-2xl font-bold text-green-600">${income.toLocaleString()}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500">Expenses</p>
          <p className="text-2xl font-bold text-red-600">${totalExp.toLocaleString()}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500">Net Profit</p>
          <p className="text-2xl font-bold" style={{ color: profit > 0 ? COLORS.success : COLORS.error }}>
            ${profit.toLocaleString()}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs mb-1 text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">${pending.toLocaleString()}</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold mb-4 text-gray-900">Recent Expenses</h3>
          <div className="space-y-3">
            {expenses.map((e) => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-sm text-gray-900">{e.description}</p>
                  <p className="text-xs text-gray-500">
                    {e.date} • {e.category}
                  </p>
                </div>
                <span className="font-semibold text-red-600">-${e.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-bold mb-4 text-gray-900">Revenue by Client</h3>
          <div className="space-y-3">
            {DEMO_CLIENTS.sort((a, b) => b.ltv - a.ltv)
              .slice(0, 5)
              .map((c) => (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">{c.name}</span>
                    <span className="text-sm font-semibold text-green-600">${c.ltv.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-full rounded-full" style={{ width: `${(c.ltv / 8000) * 100}%`, background: COLORS.success }} />
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
