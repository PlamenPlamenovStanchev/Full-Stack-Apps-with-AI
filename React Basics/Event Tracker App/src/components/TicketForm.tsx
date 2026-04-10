import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Ticket, Event, Attendee, TicketStatus } from '../data/types'
import { useData } from '../data/DataContext'
import EventSelector from './EventSelector'
import AttendeeSelector from './AttendeeSelector'
import { toast } from 'sonner'
import './TicketForm.css'

interface TicketFormProps {
  isOpen: boolean
  onClose: () => void
  ticket?: Ticket
}

export default function TicketForm({ isOpen, onClose, ticket }: TicketFormProps) {
  const { addTicket, updateTicket, events, attendees, venues, tickets } = useData()
  const [showEventSelector, setShowEventSelector] = useState(false)
  const [showAttendeeSelector, setShowAttendeeSelector] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null)
  const [formData, setFormData] = useState({
    price: '',
    status: 'pending' as TicketStatus,
  })
  const [capacityError, setCapacityError] = useState('')

  // Initialize form when ticket changes or modal opens
  useEffect(() => {
    if (ticket) {
      const ticketEvent = events.find(e => e.id === ticket.event)
      const ticketAttendee = attendees.find(a => a.id === ticket.attendee)
      setSelectedEvent(ticketEvent || null)
      setSelectedAttendee(ticketAttendee || null)
      setFormData({
        price: ticket.price.toString(),
        status: ticket.status,
      })
    } else {
      setSelectedEvent(null)
      setSelectedAttendee(null)
      setFormData({
        price: '',
        status: 'pending',
      })
    }
    setCapacityError('')
  }, [ticket, isOpen, events, attendees])

  // Check capacity when event changes
  useEffect(() => {
    if (selectedEvent && !ticket) {
      const venue = venues.find(v => v.id === selectedEvent.id.replace('e', 'v'))
      const eventTickets = tickets.filter(t => t.event === selectedEvent.id && t.status !== 'cancelled')
      
      if (venue && eventTickets.length >= venue.capacity) {
        setCapacityError(`Venue is at full capacity (${venue.capacity}/${venue.capacity})`)
      } else if (venue) {
        setCapacityError('')
      }
    }
  }, [selectedEvent, ticket, venues, tickets])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!selectedEvent || !selectedAttendee || !formData.price.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    // Validate price is a positive number
    const price = parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      toast.error('Price must be a positive number')
      return
    }

    // Check capacity for new tickets
    if (!ticket) {
      const venue = venues.find(v => v.id === selectedEvent.id.replace('e', 'v'))
      const eventTickets = tickets.filter(
        t => t.event === selectedEvent.id && t.status !== 'cancelled'
      )

      if (venue && eventTickets.length >= venue.capacity) {
        toast.error('Cannot add ticket: venue is at full capacity')
        return
      }
    }

    if (ticket) {
      // Edit mode
      updateTicket(ticket.id, {
        event: selectedEvent.id,
        attendee: selectedAttendee.id,
        price,
        status: formData.status,
      })
      toast.success('Ticket updated successfully! ✏️')
    } else {
      // Add mode
      addTicket({
        event: selectedEvent.id,
        attendee: selectedAttendee.id,
        price,
        status: formData.status,
      })
      toast.success('Ticket added successfully! 🎉')
    }

    handleClose()
  }

  const handleClose = () => {
    setSelectedEvent(null)
    setSelectedAttendee(null)
    setFormData({
      price: '',
      status: 'pending',
    })
    setCapacityError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="ticket-form-overlay">
        <div className="ticket-form-modal animate-fade-in">
          <div className="form-header">
            <h2 className="form-title">
              {ticket ? 'Edit Ticket' : 'Add New Ticket'}
            </h2>
            <button
              type="button"
              className="close-btn"
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="form-body">
            <div className="form-group">
              <label className="form-label">
                Event <span className="required">*</span>
              </label>
              <button
                type="button"
                className="selector-btn"
                onClick={() => setShowEventSelector(true)}
              >
                {selectedEvent ? (
                  <div className="selected-item">
                    <div className="item-title">{selectedEvent.title}</div>
                    <div className="item-subtitle">{selectedEvent.date}</div>
                  </div>
                ) : (
                  'Select an event...'
                )}
              </button>
              {capacityError && <div className="error-text">{capacityError}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Attendee <span className="required">*</span>
              </label>
              <button
                type="button"
                className="selector-btn"
                onClick={() => setShowAttendeeSelector(true)}
              >
                {selectedAttendee ? (
                  <div className="selected-item">
                    <div className="item-title">{selectedAttendee.name}</div>
                    <div className="item-subtitle">{selectedAttendee.email}</div>
                  </div>
                ) : (
                  'Select an attendee...'
                )}
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price <span className="required">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  className="form-input"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">
                  Status <span className="required">*</span>
                </label>
                <select
                  id="status"
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as TicketStatus })}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={capacityError && !ticket ? true : false}
              >
                {ticket ? 'Update Ticket' : 'Add Ticket'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <EventSelector
        events={events}
        onSelect={setSelectedEvent}
        onClose={() => setShowEventSelector(false)}
      />
      {showEventSelector && (
        <div style={{ display: 'none' }} /> /* Placeholder to maintain structure */
      )}

      <AttendeeSelector
        attendees={attendees}
        onSelect={setSelectedAttendee}
        onClose={() => setShowAttendeeSelector(false)}
      />
      {showAttendeeSelector && (
        <div style={{ display: 'none' }} /> /* Placeholder to maintain structure */
      )}
    </>
  )
}
