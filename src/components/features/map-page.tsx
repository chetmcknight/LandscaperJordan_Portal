'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { DEMO_JOBS, COLORS } from '@/lib/demo-data'

export function MapPage() {
  const jobs = DEMO_JOBS.filter((j) => j.status === 'in-progress' || j.status === 'scheduled')
  const totalDistance = 12.4

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Route Map</h1>
          <p className="text-sm text-gray-500">{jobs.length} stops • {totalDistance} miles</p>
        </div>
        <Button variant="secondary" icon={<Icon name="navigation" size={16} />}>
          Start Navigation
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[400px] flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Icon name="map-pin" size={48} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Map view</p>
              <p className="text-xs text-gray-400">{jobs.length} stops from Jordan's Shop</p>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold mb-3 text-gray-900">Route Order</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-green-700">
                  H
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Jordan's Shop</p>
                  <p className="text-xs text-gray-500">Start</p>
                </div>
              </div>
              {jobs.map((job, i) => (
                <div key={job.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-blue-500">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{job.type}</p>
                    <p className="text-xs text-gray-500">{job.scheduled_time}</p>
                  </div>
                  <Icon name="chevron-right" size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Distance</span>
              <span className="font-bold text-gray-900">{totalDistance} mi</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">Est. Time</span>
              <span className="font-bold text-gray-900">45 min</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
