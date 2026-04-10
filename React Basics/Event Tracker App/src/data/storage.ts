import { AppData, Event, Attendee, Venue, Ticket, TicketPayment, AppSettings } from './types'
import { generateSampleData } from './sampleData'

const STORAGE_KEY = 'event-tracker-app-data'

/**
 * Initialize localStorage with sample data if empty
 */
function initializeStorage(): void {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const sampleData = generateSampleData()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData))
  }
}

/**
 * Load all app data from localStorage
 */
export function loadAppData(): AppData {
  initializeStorage()
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) {
    throw new Error('Failed to load app data')
  }
  return JSON.parse(data) as AppData
}

/**
 * Save all app data to localStorage
 */
function saveAppData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ============ Events ============

export function getEvents(): Event[] {
  const data = loadAppData()
  return data.events
}

export function getEventById(id: string): Event | undefined {
  const data = loadAppData()
  return data.events.find(e => e.id === id)
}

export function addEvent(event: Omit<Event, 'id'>): Event {
  const data = loadAppData()
  const newEvent: Event = {
    ...event,
    id: `e${Date.now()}`,
  }
  data.events.push(newEvent)
  saveAppData(data)
  return newEvent
}

export function updateEvent(id: string, updates: Partial<Event>): Event | undefined {
  const data = loadAppData()
  const eventIndex = data.events.findIndex(e => e.id === id)
  if (eventIndex === -1) return undefined

  const updatedEvent = { ...data.events[eventIndex], ...updates }
  data.events[eventIndex] = updatedEvent
  saveAppData(data)
  return updatedEvent
}

export function deleteEvent(id: string): boolean {
  const data = loadAppData()
  const initialLength = data.events.length
  data.events = data.events.filter(e => e.id !== id)

  if (data.events.length < initialLength) {
    saveAppData(data)
    return true
  }
  return false
}

// ============ Attendees ============

export function getAttendees(): Attendee[] {
  const data = loadAppData()
  return data.attendees
}

export function getAttendeeById(id: string): Attendee | undefined {
  const data = loadAppData()
  return data.attendees.find(a => a.id === id)
}

export function addAttendee(attendee: Omit<Attendee, 'id'>): Attendee {
  const data = loadAppData()
  const newAttendee: Attendee = {
    ...attendee,
    id: `a${Date.now()}`,
  }
  data.attendees.push(newAttendee)
  saveAppData(data)
  return newAttendee
}

export function updateAttendee(id: string, updates: Partial<Attendee>): Attendee | undefined {
  const data = loadAppData()
  const attendeeIndex = data.attendees.findIndex(a => a.id === id)
  if (attendeeIndex === -1) return undefined

  const updatedAttendee = { ...data.attendees[attendeeIndex], ...updates }
  data.attendees[attendeeIndex] = updatedAttendee
  saveAppData(data)
  return updatedAttendee
}

export function deleteAttendee(id: string): boolean {
  const data = loadAppData()
  const initialLength = data.attendees.length
  data.attendees = data.attendees.filter(a => a.id !== id)

  if (data.attendees.length < initialLength) {
    saveAppData(data)
    return true
  }
  return false
}

// ============ Venues ============

export function getVenues(): Venue[] {
  const data = loadAppData()
  return data.venues
}

export function getVenueById(id: string): Venue | undefined {
  const data = loadAppData()
  return data.venues.find(v => v.id === id)
}

export function addVenue(venue: Omit<Venue, 'id'>): Venue {
  const data = loadAppData()
  const newVenue: Venue = {
    ...venue,
    id: `v${Date.now()}`,
  }
  data.venues.push(newVenue)
  saveAppData(data)
  return newVenue
}

export function updateVenue(id: string, updates: Partial<Venue>): Venue | undefined {
  const data = loadAppData()
  const venueIndex = data.venues.findIndex(v => v.id === id)
  if (venueIndex === -1) return undefined

  const updatedVenue = { ...data.venues[venueIndex], ...updates }
  data.venues[venueIndex] = updatedVenue
  saveAppData(data)
  return updatedVenue
}

export function deleteVenue(id: string): boolean {
  const data = loadAppData()
  const initialLength = data.venues.length
  data.venues = data.venues.filter(v => v.id !== id)

  if (data.venues.length < initialLength) {
    saveAppData(data)
    return true
  }
  return false
}

// ============ Tickets ============

export function getTickets(): Ticket[] {
  const data = loadAppData()
  return data.tickets
}

export function getTicketById(id: string): Ticket | undefined {
  const data = loadAppData()
  return data.tickets.find(t => t.id === id)
}

export function getTicketsByEvent(eventId: string): Ticket[] {
  const data = loadAppData()
  return data.tickets.filter(t => t.event === eventId)
}

export function getTicketsByAttendee(attendeeId: string): Ticket[] {
  const data = loadAppData()
  return data.tickets.filter(t => t.attendee === attendeeId)
}

export function addTicket(ticket: Omit<Ticket, 'id'>): Ticket {
  const data = loadAppData()
  const newTicket: Ticket = {
    ...ticket,
    id: `t${Date.now()}`,
  }
  data.tickets.push(newTicket)
  saveAppData(data)
  return newTicket
}

export function updateTicket(id: string, updates: Partial<Ticket>): Ticket | undefined {
  const data = loadAppData()
  const ticketIndex = data.tickets.findIndex(t => t.id === id)
  if (ticketIndex === -1) return undefined

  const updatedTicket = { ...data.tickets[ticketIndex], ...updates }
  data.tickets[ticketIndex] = updatedTicket
  saveAppData(data)
  return updatedTicket
}

export function deleteTicket(id: string): boolean {
  const data = loadAppData()
  const initialLength = data.tickets.length
  data.tickets = data.tickets.filter(t => t.id !== id)

  if (data.tickets.length < initialLength) {
    saveAppData(data)
    return true
  }
  return false
}

// ============ Ticket Payments ============

export function getTicketPayments(): TicketPayment[] {
  const data = loadAppData()
  return data.ticketPayments
}

export function getTicketPaymentByTicketId(ticketId: string): TicketPayment | undefined {
  const data = loadAppData()
  return data.ticketPayments.find(tp => tp.ticket === ticketId)
}

export function addTicketPayment(payment: TicketPayment): TicketPayment {
  const data = loadAppData()
  data.ticketPayments.push(payment)
  saveAppData(data)
  return payment
}

export function updateTicketPayment(ticketId: string, updates: Partial<TicketPayment>): TicketPayment | undefined {
  const data = loadAppData()
  const paymentIndex = data.ticketPayments.findIndex(tp => tp.ticket === ticketId)
  if (paymentIndex === -1) return undefined

  const updatedPayment = { ...data.ticketPayments[paymentIndex], ...updates }
  data.ticketPayments[paymentIndex] = updatedPayment
  saveAppData(data)
  return updatedPayment
}

export function deleteTicketPayment(ticketId: string): boolean {
  const data = loadAppData()
  const initialLength = data.ticketPayments.length
  data.ticketPayments = data.ticketPayments.filter(tp => tp.ticket !== ticketId)

  if (data.ticketPayments.length < initialLength) {
    saveAppData(data)
    return true
  }
  return false
}

// ============ Settings ============

export function getAppSettings(): AppSettings {
  const data = loadAppData()
  return data.appSettings
}

export function updateAppSettings(settings: Partial<AppSettings>): AppSettings {
  const data = loadAppData()
  data.appSettings = { ...data.appSettings, ...settings }
  saveAppData(data)
  return data.appSettings
}

// ============ Statistics ============

export function getEventStats() {
  const events = getEvents()
  const tickets = getTickets()
  const ticketPayments = getTicketPayments()

  return {
    totalEvents: events.length,
    totalTickets: tickets.length,
    paidTickets: tickets.filter(t => t.status === 'paid').length,
    pendingTickets: tickets.filter(t => t.status === 'pending').length,
    cancelledTickets: tickets.filter(t => t.status === 'cancelled').length,
    totalRevenue: ticketPayments.reduce((sum, payment) => {
      const ticket = tickets.find(t => t.id === payment.ticket)
      return sum + (ticket ? ticket.price : 0)
    }, 0),
  }
}

// ============ Reset Data ============

/**
 * Reset all data to sample data (useful for development/debugging)
 */
export function resetToSampleData(): void {
  const sampleData = generateSampleData()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData))
}

/**
 * Clear all data from localStorage
 */
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY)
}
