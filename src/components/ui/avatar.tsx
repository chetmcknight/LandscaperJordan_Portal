'use client'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

export function Avatar({ name, size = 'md', color }: AvatarProps) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-xl',
  }
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white`}
      style={{ background: color || '#3B82F6' }}
    >
      {initials}
    </div>
  )
}
