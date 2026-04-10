import { Edit2, Trash2 } from 'lucide-react'
import { Ticket, Event, Attendee } from '../data/types'
import './TicketList.css'

interface TicketListProps {
  tickets: Ticket[]
  events: Event[]
  attendees: Attendee[]
  onEdit: (ticket: Ticket) => void
  onDelete: (id: string, eventTitle: string, attendeeName: string) => void
}

export default function TicketList({
  tickets,
  events,
  attendees,
  onEdit,
  onDelete,
}: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎫</div>
        <h3>No Tickets Yet</h3>
        <p>Add your first ticket to get started!</p>
      </div>
    )
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'badge-paid'
      case 'pending':
        return 'badge-pending'
      case 'cancelled':
        return 'badge-cancelled'
      default:
        return 'badge-pending'
    }
  }

  return (
    <div className="ticket-table-container">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Attendee</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const event = events.find(e => e.id === ticket.event)
            const attendee = attendees.find(a => a.id === ticket.attendee)

            return (
              <tr key={ticket.id} className="animate-slide-in-right">
                <td>
                  <span className="ticket-event">{event?.title || 'Unknown Event'}</span>
                </td>
                <td>
                  <span className="ticket-attendee">{attendee?.name || 'Unknown Attendee'}</span>
                </td>
                <td>
                  <span className="ticket-price">${ticket.price.toFixed(2)}</span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(ticket)}
                      title="Edit ticket"
                      aria-label="Edit ticket"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDelete(
                          ticket.id,
                          event?.title || 'Unknown',
                          attendee?.name || 'Unknown'
                        )
                      }
                      title="Delete ticket"
                      aria-label="Delete ticket"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
