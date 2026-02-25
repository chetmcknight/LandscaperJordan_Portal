'use client'

import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-4',
        hover && 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all duration-150',
        'bg-white border border-gray-100',
        className
      )}
      {...props}
    />
  )
}

export { Card }
