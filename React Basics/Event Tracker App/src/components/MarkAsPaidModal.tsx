import { X, Calendar, CreditCard } from 'lucide-react'
import { PaymentMethodType } from '../data/types'
import { useState } from 'react'
import { toast } from 'sonner'
import './MarkAsPaidModal.css'

interface MarkAsPaidModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (date: string, method: PaymentMethodType) => void
  ticketId?: string
}

const PAYMENT_METHODS: { value: PaymentMethodType; label: string; icon: string }[] = [
  { value: 'bank', label: 'Bank Transfer', icon: '🏦' },
  { value: 'card', label: 'Credit Card', icon: '💳' },
  { value: 'cash', label: 'Cash', icon: '💵' },
]

export default function MarkAsPaidModal({
  isOpen,
  onClose,
  onConfirm,
  ticketId,
}: MarkAsPaidModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('card')
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    if (!selectedDate) {
      toast.error('Please select a payment date')
      return
    }

    setLoading(true)
    try {
      onConfirm(selectedDate, selectedMethod)
      setLoading(false)
      onClose()
    } catch (error) {
      setLoading(false)
      toast.error('Failed to mark ticket as paid')
    }
  }

  const handleClose = () => {
    setSelectedDate(new Date().toISOString().split('T')[0])
    setSelectedMethod('card')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="mark-paid-overlay">
      <div className="mark-paid-modal">
        <div className="modal-header">
          <h2 className="modal-title">Mark Ticket as Paid</h2>
          <button className="close-btn" onClick={handleClose} title="Close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {ticketId && <p className="ticket-id-text">Ticket ID: {ticketId}</p>}

          <div className="form-group">
            <label htmlFor="payment-date" className="form-label">
              <Calendar size={18} />
              <span>Payment Date</span>
            </label>
            <input
              id="payment-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <CreditCard size={18} />
              <span>Payment Method</span>
            </label>
            <div className="payment-methods">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.value}
                  className={`method-btn ${selectedMethod === method.value ? 'active' : ''}`}
                  onClick={() => setSelectedMethod(method.value)}
                  type="button"
                >
                  <span className="method-icon">{method.icon}</span>
                  <span className="method-label">{method.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={loading || !selectedDate}
          >
            {loading ? 'Processing...' : 'Mark as Paid'}
          </button>
        </div>
      </div>
    </div>
  )
}
