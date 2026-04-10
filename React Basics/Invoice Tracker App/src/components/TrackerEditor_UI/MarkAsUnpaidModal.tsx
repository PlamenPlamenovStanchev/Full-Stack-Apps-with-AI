import { motion } from 'framer-motion'
import { X, AlertCircle } from 'lucide-react'
import { Invoice } from '../../data/types'

interface MarkAsUnpaidModalProps {
  isOpen: boolean
  invoice: Invoice | null
  onConfirm: () => void
  onClose: () => void
}

export function MarkAsUnpaidModal({ isOpen, invoice, onConfirm, onClose }: MarkAsUnpaidModalProps) {
  if (!isOpen || !invoice) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Mark as Unpaid</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Alert */}
          <div className="flex gap-3 bg-amber-50 rounded-lg p-4 border border-amber-100">
            <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900">
                Are you sure you want to mark this invoice as unpaid?
              </p>
              <p className="text-sm text-amber-700 mt-1">
                This will remove the payment record for this invoice.
              </p>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Invoice</p>
            <p className="text-lg font-semibold text-slate-900">{invoice.id}</p>
            <p className="text-sm text-slate-600 mt-2">{invoice.recipient.name}</p>
            <p className="text-lg font-bold text-slate-900 mt-2">
              ${invoice.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Mark as Unpaid
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
