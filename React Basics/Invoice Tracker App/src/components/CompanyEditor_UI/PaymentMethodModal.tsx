import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { PaymentMethod } from '../../data/types'

interface PaymentMethodModalProps {
  isOpen: boolean
  paymentMethod: PaymentMethod | null
  onClose: () => void
  onSave: (method: PaymentMethod) => void
}

export function PaymentMethodModal({ isOpen, paymentMethod, onClose, onSave }: PaymentMethodModalProps) {
  const [formData, setFormData] = useState<Omit<PaymentMethod, 'id'>>({
    name: '',
    description: '',
  })

  useEffect(() => {
    if (paymentMethod) {
      const { id, ...rest } = paymentMethod
      setFormData(rest)
    } else {
      setFormData({ name: '', description: '' })
    }
  }, [paymentMethod, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMethod: PaymentMethod = {
      id: paymentMethod?.id || `pm_${Date.now()}`,
      ...formData,
    }
    onSave(newMethod)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-lg max-w-lg w-full"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold">{paymentMethod ? 'Edit Payment Method' : 'Add Payment Method'}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Payment Method Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Bank Transfer, Credit Card"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Direct transfer to checking account"
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              {paymentMethod ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
