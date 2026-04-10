import { Event, Attendee, Venue, Ticket, PaymentMethod, TicketPayment, Currency, AppSettings, AppData } from './types'

// Sample venues
export const sampleVenues: Venue[] = [
  {
    id: 'v1',
    name: 'Grand Convention Center',
    address: '123 Main Street, New York, NY 10001',
    capacity: 5000,
  },
  {
    id: 'v2',
    name: 'Riverside Theater',
    address: '456 Park Avenue, Los Angeles, CA 90001',
    capacity: 1500,
  },
  {
    id: 'v3',
    name: 'Tech Hub Conference',
    address: '789 Silicon Valley Road, San Jose, CA 95110',
    capacity: 2000,
  },
  {
    id: 'v4',
    name: 'Sunset Beach Resort',
    address: '321 Ocean Drive, Miami, FL 33139',
    capacity: 3000,
  },
]

// Sample events
export const sampleEvents: Event[] = [
  {
    id: 'e1',
    title: 'Business Summit 2026',
    date: '2026-05-15',
    time: '09:00',
    category: 'work',
    priority: 'high',
    description: 'Annual business summit featuring keynote speakers from leading companies.',
    completed: false,
  },
  {
    id: 'e2',
    title: 'Tech Conference',
    date: '2026-06-20',
    time: '10:00',
    category: 'work',
    priority: 'high',
    description: 'Latest technology trends and innovations conference.',
    completed: false,
  },
  {
    id: 'e3',
    title: 'Music Festival',
    date: '2026-07-10',
    time: '14:00',
    category: 'personal',
    priority: 'medium',
    description: 'Summer music festival with live performances from world-renowned artists.',
    completed: false,
  },
  {
    id: 'e4',
    title: 'Art Exhibition',
    date: '2026-04-25',
    time: '11:00',
    category: 'personal',
    priority: 'low',
    description: 'Contemporary art exhibition showcasing works from emerging artists.',
    completed: false,
  },
]

// Sample attendees
export const sampleAttendees: Attendee[] = [
  {
    id: 'a1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1-555-0101',
  },
  {
    id: 'a2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1-555-0102',
  },
  {
    id: 'a3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1-555-0103',
  },
  {
    id: 'a4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1-555-0104',
  },
  {
    id: 'a5',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '+1-555-0105',
  },
  {
    id: 'a6',
    name: 'Jessica Anderson',
    email: 'jessica.anderson@example.com',
    phone: '+1-555-0106',
  },
]

// Sample tickets
export const sampleTickets: Ticket[] = [
  {
    id: 't1',
    event: 'e1',
    attendee: 'a1',
    price: 150.0,
    status: 'paid',
  },
  {
    id: 't2',
    event: 'e1',
    attendee: 'a2',
    price: 150.0,
    status: 'paid',
  },
  {
    id: 't3',
    event: 'e1',
    attendee: 'a3',
    price: 150.0,
    status: 'pending',
  },
  {
    id: 't4',
    event: 'e2',
    attendee: 'a1',
    price: 200.0,
    status: 'paid',
  },
  {
    id: 't5',
    event: 'e2',
    attendee: 'a4',
    price: 200.0,
    status: 'paid',
  },
  {
    id: 't6',
    event: 'e3',
    attendee: 'a5',
    price: 75.0,
    status: 'pending',
  },
  {
    id: 't7',
    event: 'e3',
    attendee: 'a6',
    price: 75.0,
    status: 'cancelled',
  },
  {
    id: 't8',
    event: 'e4',
    attendee: 'a2',
    price: 50.0,
    status: 'paid',
  },
]

// Sample payment methods
export const samplePaymentMethods: PaymentMethod[] = [
  {
    name: 'card',
    description: 'Credit/Debit Card',
  },
  {
    name: 'bank',
    description: 'Bank Transfer',
  },
  {
    name: 'cash',
    description: 'Cash Payment',
  },
]

// Sample ticket payments
export const sampleTicketPayments: TicketPayment[] = [
  {
    ticket: 't1',
    datePaid: '2026-04-01',
    paymentMethod: 'card',
  },
  {
    ticket: 't2',
    datePaid: '2026-04-02',
    paymentMethod: 'bank',
  },
  {
    ticket: 't4',
    datePaid: '2026-04-03',
    paymentMethod: 'card',
  },
  {
    ticket: 't5',
    datePaid: '2026-04-04',
    paymentMethod: 'card',
  },
  {
    ticket: 't8',
    datePaid: '2026-04-05',
    paymentMethod: 'cash',
  },
]

// Available currencies
export const sampleCurrencies: Currency[] = [
  {
    name: 'USD',
    description: 'US Dollar',
    symbol: '$',
  },
  {
    name: 'EUR',
    description: 'Euro',
    symbol: '€',
  },
  {
    name: 'GBP',
    description: 'British Pound',
    symbol: '£',
  },
]

// App settings
export const sampleAppSettings: AppSettings = {
  defaultCurrency: 'USD',
}

// Generate complete sample data
export function generateSampleData(): AppData {
  return {
    events: sampleEvents,
    attendees: sampleAttendees,
    venues: sampleVenues,
    tickets: sampleTickets,
    paymentMethods: samplePaymentMethods,
    ticketPayments: sampleTicketPayments,
    currencies: sampleCurrencies,
    appSettings: sampleAppSettings,
  }
}
