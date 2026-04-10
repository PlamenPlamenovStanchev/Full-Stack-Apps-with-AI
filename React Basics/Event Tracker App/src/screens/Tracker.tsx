import { useState } from 'react'
import { useData } from '../data/DataContext'
import { TicketPayment } from '../data/types'
import TrackerTicketList from '../components/TrackerTicketList'
import MarkAsPaidModal from '../components/MarkAsPaidModal'
import MarkAsUnpaidModal from '../components/MarkAsUnpaidModal'
import { toast } from 'sonner'
import './Tracker.css'

export default function Tracker() {
  const {
    tickets,
    events,
    attendees,
    ticketPayments,
    addTicketPayment,
    deleteTicketPayment,
    deleteTicket,
  } = useData()

  const [paidModalOpen, setPaidModalOpen] = useState(false)
  const [unpaidModalOpen, setUnpaidModalOpen] = useState(false)
  const [selectedTicketId, setSelectedTicketId] = useState<string | undefined>()

  const handleMarkAsPaid = (ticketId: string) => {
    setSelectedTicketId(ticketId)
    setPaidModalOpen(true)
  }

  const handleConfirmMarkAsPaid = (date: string, method: string) => {
    if (!selectedTicketId) return

    try {
      // Check if payment already exists
      const existingPayment = ticketPayments.find(p => p.ticket === selectedTicketId)

      if (existingPayment) {
        toast.error('This ticket is already marked as paid')
        return
      }

      const payment: TicketPayment = {
        ticket: selectedTicketId,
        datePaid: date,
        paymentMethod: method as 'bank' | 'card' | 'cash',
      }

      addTicketPayment(payment)
      toast.success('Ticket marked as paid! 💰')
      setSelectedTicketId(undefined)
    } catch (error) {
      toast.error('Failed to mark ticket as paid')
    }
  }

  const handleMarkAsUnpaid = (ticketId: string) => {
    setSelectedTicketId(ticketId)
    setUnpaidModalOpen(true)
  }

  const handleConfirmMarkAsUnpaid = () => {
    if (!selectedTicketId) return

    try {
      const success = deleteTicketPayment(selectedTicketId)
      if (success) {
        toast.success('Ticket marked as unpaid! ✏️')
      } else {
        toast.error('Payment not found')
      }
      setSelectedTicketId(undefined)
    } catch (error) {
      toast.error('Failed to mark ticket as unpaid')
    }
  }

  const handleDeleteTicket = (ticketId: string, eventTitle: string, attendeeName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the ticket for ${attendeeName} at ${eventTitle}?\n\nThis will also remove any payment record for this ticket.\nThis action cannot be undone.`
    )

    if (confirmed) {
      try {
        const success = deleteTicket(ticketId)
        if (success) {
          toast.success('Ticket deleted successfully! 🗑️')
        } else {
          toast.error('Failed to delete ticket')
        }
      } catch (error) {
        toast.error('Failed to delete ticket')
      }
    }
  }

  const stats = {
    totalTickets: tickets.length,
    totalRevenue: tickets
      .filter(t => ticketPayments.some(p => p.ticket === t.id))
      .reduce((sum, t) => sum + t.price, 0),
    paidTickets: ticketPayments.length,
    unpaidTickets: tickets.length - ticketPayments.length,
  }

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2 className="screen-title">Payment Tracker</h2>
        <p className="screen-subtitle">Track and manage ticket payments</p>
      </div>

      <div className="tracker-dashboard">
        <div className="dashboard-card">
          <div className="card-value">{stats.totalTickets}</div>
          <div className="card-label">Total Tickets</div>
        </div>
        <div className="dashboard-card">
          <div className="card-value paid">{stats.paidTickets}</div>
          <div className="card-label">Paid Tickets</div>
        </div>
        <div className="dashboard-card">
          <div className="card-value unpaid">{stats.unpaidTickets}</div>
          <div className="card-label">Unpaid Tickets</div>
        </div>
        <div className="dashboard-card revenue">
          <div className="card-value">${stats.totalRevenue.toFixed(2)}</div>
          <div className="card-label">Total Revenue</div>
        </div>
      </div>

      <div className="tracker-content">
        <TrackerTicketList
          tickets={tickets}
          events={events}
          attendees={attendees}
          payments={ticketPayments}
          onMarkAsPaid={handleMarkAsPaid}
          onMarkAsUnpaid={handleMarkAsUnpaid}
          onDelete={handleDeleteTicket}
        />
      </div>

      <MarkAsPaidModal
        isOpen={paidModalOpen}
        onClose={() => {
          setPaidModalOpen(false)
          setSelectedTicketId(undefined)
        }}
        onConfirm={handleConfirmMarkAsPaid}
        ticketId={selectedTicketId}
      />

      <MarkAsUnpaidModal
        isOpen={unpaidModalOpen}
        onClose={() => {
          setUnpaidModalOpen(false)
          setSelectedTicketId(undefined)
        }}
        onConfirm={handleConfirmMarkAsUnpaid}
        ticketId={selectedTicketId}
      />
    </div>
  )
}
