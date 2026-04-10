// Event related types
export type EventCategory = 'personal' | 'work' | 'meeting' | 'deadline' | 'other'
export type EventPriority = 'low' | 'medium' | 'high'

export interface Event {
  id: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  category: EventCategory
  priority: EventPriority
  completed: boolean
}

// Attendee related types
export interface Attendee {
  id: string
  name: string
  email: string
  phone: string
}

// Venue related types
export interface Venue {
  id: string
  name: string
  address: string
  capacity: number
}

// Ticket related types
export type TicketStatus = 'pending' | 'paid' | 'cancelled'

export interface Ticket {
  id: string
  event: string // event id
  attendee: string // attendee id
  price: number
  status: TicketStatus
}

// Payment related types
export type PaymentMethodType = 'bank' | 'card' | 'cash'

export interface PaymentMethod {
  name: PaymentMethodType
  description: string
}

export interface TicketPayment {
  ticket: string // ticket id
  datePaid: string // ISO date string
  paymentMethod: PaymentMethodType
}

// Currency related types
export type CurrencyCode = 'EUR' | 'USD' | 'GBP'

export interface Currency {
  name: CurrencyCode
  description: string
  symbol: string
}

// Settings
export interface AppSettings {
  defaultCurrency: CurrencyCode
}

// Data store structure
export interface AppData {
  events: Event[]
  attendees: Attendee[]
  venues: Venue[]
  tickets: Ticket[]
  paymentMethods: PaymentMethod[]
  ticketPayments: TicketPayment[]
  currencies: Currency[]
  appSettings: AppSettings
}
