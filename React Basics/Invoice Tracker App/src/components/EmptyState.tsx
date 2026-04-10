import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  onCreate: () => void
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-12 flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="bg-indigo-50 p-6 rounded-full text-indigo-300 mb-6">
        <FileText size={64} strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-slate-800">No invoices found</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        Get started by creating your first invoice. Keep track of all your upcoming and completed payments in one place.
      </p>
      <button 
        onClick={onCreate}
        className="flex items-center gap-2 bg-white border-2 border-indigo-100 hover:border-indigo-600 hover:text-indigo-600 px-6 py-3 rounded-full font-medium text-slate-700 transition-all active:scale-95 shadow-sm"
      >
        Create an invoice
      </button>
    </motion.div>
  )
}
