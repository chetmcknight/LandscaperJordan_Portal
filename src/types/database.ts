export interface Business {
  id: string
  name: string
  owner_id: string
  phone: string | null
  email: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  business_id: string
  name: string
  phone: string | null
  email: string | null
  address: string | null
  status: 'active' | 'overdue' | 'inactive'
  ltv: number
  balance: number
  next_job: string | null
  since: string | null
  notes: string | null
  sensitive_notes: string | null
  created_at: string
  updated_at: string
}

export interface Worker {
  id: string
  business_id: string
  name: string
  role: string | null
  phone: string | null
  color: string
  hours_today: number
  hours_week: number
  pay_rate: number | null
  tax_type: 'W-2' | '1099'
  ssn: string | null
  ein: string | null
  ytd_wages: number
  status: 'active' | 'break' | 'idle' | 'inactive'
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  business_id: string
  client_id: string | null
  type: string
  address: string | null
  lat: number | null
  lng: number | null
  status: 'scheduled' | 'in-progress' | 'completed' | 'paused'
  scheduled_date: string | null
  scheduled_time: string | null
  price: number
  notes: string | null
  sensitive_notes: string | null
  created_at: string
  updated_at: string
}

export interface JobChecklistItem {
  id: string
  job_id: string
  text: string
  done: boolean
  created_at: string
}

export interface JobAssignment {
  job_id: string
  worker_id: string
}

export interface Invoice {
  id: string
  business_id: string
  client_id: string | null
  invoice_number: string
  amount: number
  status: 'unpaid' | 'paid' | 'overdue'
  issue_date: string | null
  due_date: string | null
  paid_at: string | null
  payment_method: string | null
  created_at: string
  updated_at: string
}

export interface Expense {
  id: string
  business_id: string
  date: string
  category: string
  amount: number
  description: string | null
  deductible: boolean
  created_at: string
  updated_at: string
}

// Extended types with relations
export interface JobWithDetails extends Job {
  client?: Client
  workers?: Worker[]
  checklist?: JobChecklistItem[]
}

export interface ClientWithJobs extends Client {
  jobs?: Job[]
  invoices?: Invoice[]
}

export type UserRole = 'owner' | 'worker' | 'client'

export interface User {
  id: string
  email: string
  role: UserRole
  business_id?: string
}
