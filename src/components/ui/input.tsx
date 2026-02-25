'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && <label className="text-xs font-semibold text-gray-500">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-green-500',
              'bg-gray-50 border border-gray-200 text-gray-900',
              error && 'border-red-500',
              icon && 'pl-10'
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
