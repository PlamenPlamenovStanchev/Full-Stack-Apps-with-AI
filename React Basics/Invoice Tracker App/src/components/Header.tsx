import { PlusCircle, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  onCreate: () => void
}

export function Header({ onCreate }: HeaderProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
    >
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 text-white p-2 rounded-xl">
          <FileText size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-slate-500 text-sm">Manage and track your payments</p>
        </div>
      </div>
      
      <button 
        onClick={onCreate}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-all active:scale-95 shadow-sm shadow-indigo-200"
      >
        <PlusCircle size={20} />
        New Invoice
      </button>
    </motion.header>
  )
}
