import { useState } from 'react'
import { Plus } from 'lucide-react'
import TicketForm from '../components/TicketForm'
import TicketList from '../components/TicketList'
import { useData } from '../data/DataContext'
import { Ticket } from '../data/types'
import { toast } from 'sonner'
import './TicketsEditor.css'

export default function TicketsEditor() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>()
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid' | 'cancelled'>('all')
  const { tickets, deleteTicket, events, attendees } = useData()

  const filteredTickets = tickets.filter(t => {
    if (filterStatus === 'all') return true
    return t.status === filterStatus
  })

  const handleAddClick = () => {
    setSelectedTicket(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedTicket(undefined)
  }

  const handleDeleteClick = (id: string, eventTitle: string, attendeeName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the ticket for ${attendeeName} at ${eventTitle}?\n\nThis action cannot be undone.`
    )

    if (confirmed) {
      const success = deleteTicket(id)
      if (success) {
        toast.success('Ticket deleted successfully! 🗑️')
      } else {
        toast.error('Failed to delete ticket')
      }
    }
  }

  const stats = {
    total: tickets.length,
    paid: tickets.filter(t => t.status === 'paid').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length,
  }

  const totalRevenue = tickets
    .filter(t => t.status === 'paid')
    .reduce((sum, t) => sum + t.price, 0)

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2 className="screen-title">Tickets</h2>
        <p className="screen-subtitle">
          Manage event tickets and pricing
        </p>
      </div>

      <div className="tickets-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tickets</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.paid}</div>
          <div className="stat-label">Paid</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalRevenue.toFixed(2)}</div>
          <div className="stat-label">Revenue</div>
        </div>
      </div>

      <div className="tickets-header">
        <button className="add-ticket-btn" onClick={handleAddClick}>
          <Plus size={20} />
          <span>Add Ticket</span>
        </button>

        <div className="filter-section">
          <span className="filter-label">Filter:</span>
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({stats.total})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'paid' ? 'active' : ''}`}
            onClick={() => setFilterStatus('paid')}
          >
            Paid ({stats.paid})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilterStatus('cancelled')}
          >
            Cancelled ({stats.cancelled})
          </button>
        </div>
      </div>

      <TicketList
        tickets={filteredTickets}
        events={events}
        attendees={attendees}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <TicketForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        ticket={selectedTicket}
      />
    </div>
  )
}
