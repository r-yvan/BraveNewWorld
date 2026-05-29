// User and Auth types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: Date
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: Date
}

// Dashboard types
export interface Metric {
  id: string
  label: string
  value: number | string
  change: number
  unit?: string
  icon?: string
}

export interface ActivityItem {
  id: string
  type: 'user_signup' | 'conversion' | 'feature_launch' | 'system_update'
  title: string
  description: string
  timestamp: Date
  user?: User
}

export interface PricingTier {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  highlighted?: boolean
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
