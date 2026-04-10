import { X, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import './MarkAsUnpaidModal.css'

interface MarkAsUnpaidModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  ticketId?: string
}

export default function MarkAsUnpaidModal({
  isOpen,
  onClose,
  onConfirm,
  ticketId,
}: MarkAsUnpaidModalProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    setLoading(true)
    try {
      onConfirm()
      setLoading(false)
      onClose()
    } catch (error) {
      setLoading(false)
      toast.error('Failed to mark ticket as unpaid')
    }
  }

  if (!isOpen) return null

  return (
    <div className="unpaid-overlay">
      <div className="unpaid-modal">
        <div className="modal-header">
          <h2 className="modal-title">Mark as Unpaid?</h2>
          <button className="close-btn" onClick={onClose} title="Close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          <div className="warning-box">
            <AlertCircle size={32} />
            <p className="warning-text">
              Are you sure you want to mark this ticket as unpaid?
            </p>
            {ticketId && <p className="ticket-id-text">Ticket ID: {ticketId}</p>}
          </div>

          <p className="description">
            This will remove the payment record for this ticket and mark it as unpaid. You'll need to
            record the payment again to mark it as paid.
          </p>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Yes, Mark as Unpaid'}
          </button>
        </div>
      </div>
    </div>
  )
}
