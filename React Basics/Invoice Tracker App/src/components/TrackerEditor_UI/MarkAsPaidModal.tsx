import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Invoice, AppData } from '../../data/types'

interface MarkAsPaidModalProps {
  isOpen: boolean
  invoice: Invoice | null
  appData: AppData
  onConfirm: (paymentDate: string, paymentMethodId: string) => void
  onClose: () => void
}

export function MarkAsPaidModal({ isOpen, invoice, appData, onConfirm, onClose }: MarkAsPaidModalProps) {
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentMethodId, setPaymentMethodId] = useState(appData.paymentMethods[0]?.id || '')

  if (!isOpen || !invoice) return null

  const handleConfirm = () => {
    if (!paymentMethodId) {
      alert('Please select a payment method')
      return
    }
    onConfirm(paymentDate, paymentMethodId)
    setPaymentDate(new Date().toISOString().split('T')[0])
    setPaymentMethodId(appData.paymentMethods[0]?.id || '')
  }

  const handleClose = () => {
    setPaymentDate(new Date().toISOString().split('T')[0])
    setPaymentMethodId(appData.paymentMethods[0]?.id || '')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Mark as Paid</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Invoice Info */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Invoice</p>
            <p className="text-lg font-semibold text-slate-900">{invoice.id}</p>
            <p className="text-sm text-slate-600 mt-2">{invoice.recipient.name}</p>
            <p className="text-lg font-bold text-slate-900 mt-2">
              ${invoice.totalAmount.toFixed(2)}
            </p>
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Payment Date *
            </label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Payment Method *
            </label>
            <select
              value={paymentMethodId}
              onChange={(e) => setPaymentMethodId(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select a payment method...</option>
              {appData.paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-slate-100 bg-slate-50">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Confirm Payment
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
