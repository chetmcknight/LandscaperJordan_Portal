'use client'

import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  variant?: 'solid' | 'light' | 'outline'
}

function Badge({ className, color = '#3B82F6', variant = 'solid', children, ...props }: BadgeProps) {
  const variants = {
    solid: { bg: color, color: 'white' },
    light: { bg: color + '20', color: color },
    outline: { bg: 'transparent', border: `1px solid ${color}`, color: color },
  }
  return (
    <span
      className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', className)}
      style={variants[variant]}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
