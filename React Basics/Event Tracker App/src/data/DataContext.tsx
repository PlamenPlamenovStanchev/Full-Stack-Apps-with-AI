import React, { createContext, useContext, useState, useCallback } from 'react'
import { Event, Attendee, Venue, Ticket, TicketPayment, AppSettings } from './types'
import * as storage from './storage'

interface DataContextType {
  // Events
  events: Event[]
  addEvent: (event: Omit<Event, 'id'>) => Event
  updateEvent: (id: string, updates: Partial<Event>) => void
  deleteEvent: (id: string) => boolean

  // Attendees
  attendees: Attendee[]
  addAttendee: (attendee: Omit<Attendee, 'id'>) => Attendee
  updateAttendee: (id: string, updates: Partial<Attendee>) => void
  deleteAttendee: (id: string) => boolean

  // Venues
  venues: Venue[]
  addVenue: (venue: Omit<Venue, 'id'>) => Venue
  updateVenue: (id: string, updates: Partial<Venue>) => void
  deleteVenue: (id: string) => boolean

  // Tickets
  tickets: Ticket[]
  addTicket: (ticket: Omit<Ticket, 'id'>) => Ticket
  updateTicket: (id: string, updates: Partial<Ticket>) => void
  deleteTicket: (id: string) => boolean
  getTicketsByEvent: (eventId: string) => Ticket[]
  getTicketsByAttendee: (attendeeId: string) => Ticket[]

  // Ticket Payments
  ticketPayments: TicketPayment[]
  addTicketPayment: (payment: TicketPayment) => TicketPayment
  updateTicketPayment: (ticketId: string, updates: Partial<TicketPayment>) => void
  deleteTicketPayment: (ticketId: string) => boolean

  // Settings
  appSettings: AppSettings
  updateAppSettings: (settings: Partial<AppSettings>) => void

  // Statistics
  getEventStats: () => {
    totalEvents: number
    totalTickets: number
    paidTickets: number
    pendingTickets: number
    cancelledTickets: number
    totalRevenue: number
  }

  // Data management
  refreshData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>(storage.getEvents)
  const [attendees, setAttendees] = useState<Attendee[]>(storage.getAttendees)
  const [venues, setVenues] = useState<Venue[]>(storage.getVenues)
  const [tickets, setTickets] = useState<Ticket[]>(storage.getTickets)
  const [ticketPayments, setTicketPayments] = useState<TicketPayment[]>(storage.getTicketPayments)
  const [appSettings, setAppSettings] = useState<AppSettings>(storage.getAppSettings)

  const refreshData = useCallback(() => {
    setEvents(storage.getEvents())
    setAttendees(storage.getAttendees())
    setVenues(storage.getVenues())
    setTickets(storage.getTickets())
    setTicketPayments(storage.getTicketPayments())
    setAppSettings(storage.getAppSettings())
  }, [])

  // ============ Events ============

  const addEvent = useCallback((event: Omit<Event, 'id'>) => {
    const newEvent = storage.addEvent(event)
    setEvents(prev => [...prev, newEvent])
    return newEvent
  }, [])

  const updateEvent = useCallback((id: string, updates: Partial<Event>) => {
    const updated = storage.updateEvent(id, updates)
    if (updated) {
      setEvents(prev => prev.map(e => e.id === id ? updated : e))
    }
  }, [])

  const deleteEvent = useCallback((id: string) => {
    const success = storage.deleteEvent(id)
    if (success) {
      setEvents(prev => prev.filter(e => e.id !== id))
    }
    return success
  }, [])

  // ============ Attendees ============

  const addAttendee = useCallback((attendee: Omit<Attendee, 'id'>) => {
    const newAttendee = storage.addAttendee(attendee)
    setAttendees(prev => [...prev, newAttendee])
    return newAttendee
  }, [])

  const updateAttendee = useCallback((id: string, updates: Partial<Attendee>) => {
    const updated = storage.updateAttendee(id, updates)
    if (updated) {
      setAttendees(prev => prev.map(a => a.id === id ? updated : a))
    }
  }, [])

  const deleteAttendee = useCallback((id: string) => {
    const success = storage.deleteAttendee(id)
    if (success) {
      setAttendees(prev => prev.filter(a => a.id !== id))
      // Clear attendee reference from tickets (data consistency)
      const affectedTickets = tickets.filter(t => t.attendee === id)
      affectedTickets.forEach(ticket => {
        storage.updateTicket(ticket.id, { attendee: '' })
      })
      setTickets(prev => prev.map(t => 
        t.attendee === id ? { ...t, attendee: '' } : t
      ))
    }
    return success
  }, [tickets])

  // ============ Venues ============

  const addVenue = useCallback((venue: Omit<Venue, 'id'>) => {
    const newVenue = storage.addVenue(venue)
    setVenues(prev => [...prev, newVenue])
    return newVenue
  }, [])

  const updateVenue = useCallback((id: string, updates: Partial<Venue>) => {
    const updated = storage.updateVenue(id, updates)
    if (updated) {
      setVenues(prev => prev.map(v => v.id === id ? updated : v))
    }
  }, [])

  const deleteVenue = useCallback((id: string) => {
    const success = storage.deleteVenue(id)
    if (success) {
      setVenues(prev => prev.filter(v => v.id !== id))
    }
    return success
  }, [])

  // ============ Tickets ============

  const addTicket = useCallback((ticket: Omit<Ticket, 'id'>) => {
    const newTicket = storage.addTicket(ticket)
    setTickets(prev => [...prev, newTicket])
    return newTicket
  }, [])

  const updateTicket = useCallback((id: string, updates: Partial<Ticket>) => {
    const updated = storage.updateTicket(id, updates)
    if (updated) {
      setTickets(prev => prev.map(t => t.id === id ? updated : t))
    }
  }, [])

  const deleteTicket = useCallback((id: string) => {
    const success = storage.deleteTicket(id)
    if (success) {
      setTickets(prev => prev.filter(t => t.id !== id))
      // Delete associated payment (data consistency)
      const paymentDeleted = storage.deleteTicketPayment(id)
      if (paymentDeleted) {
        setTicketPayments(prev => prev.filter(tp => tp.ticket !== id))
      }
    }
    return success
  }, [])

  const getTicketsByEvent = useCallback((eventId: string) => {
    return storage.getTicketsByEvent(eventId)
  }, [])

  const getTicketsByAttendee = useCallback((attendeeId: string) => {
    return storage.getTicketsByAttendee(attendeeId)
  }, [])

  // ============ Ticket Payments ============

  const addTicketPayment = useCallback((payment: TicketPayment) => {
    const newPayment = storage.addTicketPayment(payment)
    setTicketPayments(prev => [...prev, newPayment])
    return newPayment
  }, [])

  const updateTicketPayment = useCallback((ticketId: string, updates: Partial<TicketPayment>) => {
    const updated = storage.updateTicketPayment(ticketId, updates)
    if (updated) {
      setTicketPayments(prev => prev.map(tp => tp.ticket === ticketId ? updated : tp))
    }
  }, [])

  const deleteTicketPayment = useCallback((ticketId: string) => {
    const success = storage.deleteTicketPayment(ticketId)
    if (success) {
      setTicketPayments(prev => prev.filter(tp => tp.ticket !== ticketId))
    }
    return success
  }, [])

  // ============ Settings ============

  const updateAppSettings = useCallback((settings: Partial<AppSettings>) => {
    const updated = storage.updateAppSettings(settings)
    setAppSettings(updated)
  }, [])

  // ============ Statistics ============

  const getEventStats = useCallback(() => {
    return storage.getEventStats()
  }, [])

  const value: DataContextType = {
    // Events
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    // Attendees
    attendees,
    addAttendee,
    updateAttendee,
    deleteAttendee,
    // Venues
    venues,
    addVenue,
    updateVenue,
    deleteVenue,
    // Tickets
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketsByEvent,
    getTicketsByAttendee,
    // Ticket Payments
    ticketPayments,
    addTicketPayment,
    updateTicketPayment,
    deleteTicketPayment,
    // Settings
    appSettings,
    updateAppSettings,
    // Statistics
    getEventStats,
    // Data management
    refreshData,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData(): DataContextType {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
