'use client'

import {
  Home,
  Briefcase,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Settings,
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FileText,
  CreditCard,
  Menu,
  X,
  Check,
  Bell,
  Sun,
  Moon,
  Navigation,
  AlertTriangle,
  Info,
  MoreVertical,
  Eye,
  Mail,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: Home,
  briefcase: Briefcase,
  users: Users,
  calendar: Calendar,
  'map-pin': MapPin,
  dollar: DollarSign,
  settings: Settings,
  plus: Plus,
  search: Search,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'log-out': LogOut,
  'file-text': FileText,
  'credit-card': CreditCard,
  menu: Menu,
  x: X,
  check: Check,
  bell: Bell,
  sun: Sun,
  moon: Moon,
  navigation: Navigation,
  'alert-triangle': AlertTriangle,
  info: Info,
  'more-vertical': MoreVertical,
  eye: Eye,
  mail: Mail,
}

interface IconProps {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 18, className = '' }: IconProps) {
  const IconComponent = iconMap[name]
  if (!IconComponent) return null
  return <IconComponent size={size} className={className} />
}
