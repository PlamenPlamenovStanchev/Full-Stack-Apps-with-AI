import { motion } from 'framer-motion'
import { X, Building2, User } from 'lucide-react'

interface ClientTypeSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (type: 'company' | 'person') => void
}

export function ClientTypeSelector({ isOpen, onClose, onSelect }: ClientTypeSelectorProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold">Select Client Type</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={() => {
              onSelect('company')
              onClose()
            }}
            className="w-full p-4 border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 rounded-lg transition-all flex items-center gap-3 text-left"
          >
            <Building2 size={28} className="text-indigo-600" />
            <div>
              <p className="font-semibold text-slate-800">Company</p>
              <p className="text-sm text-slate-500">For business clients</p>
            </div>
          </button>

          <button
            onClick={() => {
              onSelect('person')
              onClose()
            }}
            className="w-full p-4 border-2 border-slate-200 hover:border-green-600 hover:bg-green-50 rounded-lg transition-all flex items-center gap-3 text-left"
          >
            <User size={28} className="text-green-600" />
            <div>
              <p className="font-semibold text-slate-800">Person</p>
              <p className="text-sm text-slate-500">For individual clients</p>
            </div>
          </button>
        </div>

        <div className="flex gap-3 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}
