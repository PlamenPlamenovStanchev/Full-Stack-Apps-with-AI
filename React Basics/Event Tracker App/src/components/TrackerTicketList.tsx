import { Edit2, Trash2, Search } from 'lucide-react'
import { Ticket, Event, Attendee, TicketPayment } from '../data/types'
import { useState, useMemo } from 'react'
import './TrackerTicketList.css'

interface TrackerTicketListProps {
  tickets: Ticket[]
  events: Event[]
  attendees: Attendee[]
  payments: TicketPayment[]
  onMarkAsPaid: (ticketId: string) => void
  onMarkAsUnpaid: (ticketId: string) => void
  onDelete: (ticketId: string, eventTitle: string, attendeeName: string) => void
}

export default function TrackerTicketList({
  tickets,
  events,
  attendees,
  payments,
  onMarkAsPaid,
  onMarkAsUnpaid,
  onDelete,
}: TrackerTicketListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const getEventTitle = (eventId: string) => {
    return events.find(e => e.id === eventId)?.title || 'Unknown Event'
  }

  const getAttendeeName = (attendeeId: string) => {
    return attendees.find(a => a.id === attendeeId)?.name || 'Unknown Attendee'
  }

  const getPaymentInfo = (ticketId: string) => {
    return payments.find(p => p.ticket === ticketId)
  }

  const filteredTickets = useMemo(() => {
    if (!searchQuery.trim()) return tickets

    const query = searchQuery.toLowerCase()
    return tickets.filter(ticket => {
      const eventTitle = getEventTitle(ticket.event).toLowerCase()
      const attendeeName = getAttendeeName(ticket.attendee).toLowerCase()
      const payment = getPaymentInfo(ticket.id)
      const paymentMethod = payment?.paymentMethod.toLowerCase() || ''

      return (
        eventTitle.includes(query) ||
        attendeeName.includes(query) ||
        ticket.id.toLowerCase().includes(query) ||
        paymentMethod.includes(query)
      )
    })
  }, [tickets, searchQuery])

  const stats = {
    total: tickets.length,
    paid: tickets.filter(t => payments.some(p => p.ticket === t.id)).length,
    unpaid: tickets.filter(t => !payments.some(p => p.ticket === t.id)).length,
  }

  if (tickets.length === 0) {
    return (
      <div className="empty-tracker">
        <div className="empty-icon">🎫</div>
        <h3 className="empty-title">No Tickets Yet</h3>
        <p className="empty-text">Create tickets in the Tickets tab to start tracking payments.</p>
      </div>
    )
  }

  return (
    <div className="tracker-list-container">
      <div className="tracker-stats">
        <div className="stat">
          <span className="stat-label">Total</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Paid</span>
          <span className="stat-value paid">{stats.paid}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Unpaid</span>
          <span className="stat-value unpaid">{stats.unpaid}</span>
        </div>
      </div>

      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search by event, attendee, ticket ID, or payment method..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-wrapper">
        <table className="tracker-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Attendee</th>
              <th>Price</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => {
              const payment = getPaymentInfo(ticket.id)
              const isPaid = !!payment
              const eventTitle = getEventTitle(ticket.event)
              const attendeeName = getAttendeeName(ticket.attendee)

              return (
                <tr key={ticket.id} className={isPaid ? 'paid-row' : 'unpaid-row'}>
                  <td className="event-cell">
                    <span className="event-title">{eventTitle}</span>
                    <span className="ticket-id">ID: {ticket.id}</span>
                  </td>
                  <td>{attendeeName}</td>
                  <td className="price-cell">${ticket.price.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${isPaid ? 'badge-paid' : 'badge-unpaid'}`}>
                      {isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td>{payment?.datePaid ? new Date(payment.datePaid).toLocaleDateString() : '—'}</td>
                  <td>{payment?.paymentMethod ? payment.paymentMethod.toUpperCase() : '—'}</td>
                  <td className="actions-cell">
                    <div className="actions-group">
                      {!isPaid ? (
                        <button
                          className="action-btn mark-paid-btn"
                          onClick={() => onMarkAsPaid(ticket.id)}
                          title="Mark as Paid"
                        >
                          <Edit2 size={16} />
                          <span className="action-label">Mark Paid</span>
                        </button>
                      ) : (
                        <button
                          className="action-btn mark-unpaid-btn"
                          onClick={() => onMarkAsUnpaid(ticket.id)}
                          title="Mark as Unpaid"
                        >
                          <Edit2 size={16} />
                          <span className="action-label">Unmark</span>
                        </button>
                      )}
                      <button
                        className="action-btn delete-btn"
                        onClick={() => onDelete(ticket.id, eventTitle, attendeeName)}
                        title="Delete Ticket"
                      >
                        <Trash2 size={16} />
                        <span className="action-label">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filteredTickets.length === 0 && searchQuery && (
        <div className="no-results">
          <p>No tickets found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}
