'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/ui/icon'
import { ROLES } from '@/lib/demo-data'

interface LoginProps {
  onLogin: (role: string) => void
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('jordan@landscaperjordan.com')
  const [password, setPassword] = useState('demo123')
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('owner')

  const handleLogin = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    onLogin(role)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-green-700">
            <span className="text-3xl">🌿</span>
          </div>
          <h1 className="text-2xl font-black mb-1 text-gray-900">Landscaper Jordan</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>
        <Card className="p-6">
          <div className="flex gap-2 mb-6">
            {Object.entries(ROLES).map(([key, r]) => (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  role === key ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  background: role === key ? r.color : '#F3F4F6',
                  color: role === key ? 'white' : '#9CA3AF',
                  ringColor: r.color,
                }}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <Input label="Email" value={email} onChange={setEmail} icon={<Icon name="mail" size={16} />} />
            <Input label="Password" type="password" value={password} onChange={setPassword} icon={<Icon name="check" size={16} />} />
          </div>
          <Button onClick={handleLogin} className="w-full mt-6" disabled={loading}>
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </Button>
          <p className="text-center text-xs mt-4 text-gray-400">Demo: Click any role, then Sign In</p>
        </Card>
      </div>
    </div>
  )
}
