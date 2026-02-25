'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { DEMO_JOBS, COLORS } from '@/lib/demo-data'

export function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const month = date.toLocaleString('default', { month: 'long', year: 'numeric' })

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const getJobsForDay = (day: number) => {
    return DEMO_JOBS.filter((j) => {
      return j.scheduled_date === 'Today' || j.scheduled_date === 'Feb 21' || j.scheduled_date === 'Feb 28'
    })
  }

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-500">{month}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Icon name="chevron-left" size={16} />}
            onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}
          />
          <Button variant="secondary" size="sm" onClick={() => setDate(new Date())}>
            Today
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Icon name="chevron-right" size={16} />}
            onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => (
          <div key={d} className="text-center text-xs font-semibold py-2 text-gray-500">
            {d}
          </div>
        ))}
        {Array(firstDay)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
        {Array(daysInMonth)
          .fill(null)
          .map((_, i) => {
            const day = i + 1
            const jobs = getJobsForDay(day)
            const isToday = day === new Date().getDate() && date.getMonth() === new Date().getMonth()
            return (
              <div
                key={day}
                className={`min-h-[80px] p-2 rounded-lg border ${isToday ? 'ring-2' : ''}`}
                style={{
                  background: isToday ? '#D8F3DC' : 'white',
                  borderColor: isToday ? COLORS.primary : '#E5E7EB',
                }}
              >
                <span className="text-sm font-semibold" style={{ color: isToday ? COLORS.primary : '#111827' }}>
                  {day}
                </span>
                {jobs.slice(0, 2).map((j) => (
                  <div
                    key={j.id}
                    className="mt-1 px-1.5 py-0.5 rounded text-[10px] truncate"
                    style={{ background: COLORS.primary + '20', color: COLORS.primary }}
                  >
                    {j.scheduled_time?.split(' ')[0]} {j.type}
                  </div>
                ))}
                {jobs.length > 2 && <div className="text-[10px] mt-1 text-gray-400">+{jobs.length - 2} more</div>}
              </div>
            )
          })}
      </div>
    </div>
  )
}
