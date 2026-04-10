import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Supplier } from '../../data/types'

interface SupplierSelectorProps {
  isOpen: boolean
  suppliers: Supplier[]
  selectedSupplierId: string
  onSelect: (supplierId: string) => void
  onClose: () => void
}

export function SupplierSelector({ isOpen, suppliers, selectedSupplierId, onSelect, onClose }: SupplierSelectorProps) {
  const [search, setSearch] = useState('')

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.contactPerson.toLowerCase().includes(search.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-lg max-w-lg w-full"
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Select Supplier</h2>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {/* Internal option */}
          <button
            onClick={() => {
              onSelect('self')
              onClose()
            }}
            className={`w-full text-left px-6 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 ${
              selectedSupplierId === 'self' ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
            }`}
          >
            <p className="font-medium text-slate-800">Internal</p>
            <p className="text-sm text-slate-500">Use your own company</p>
          </button>

          {/* Suppliers list */}
          {filteredSuppliers.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-500">
              No suppliers found.
            </div>
          ) : (
            filteredSuppliers.map((supplier) => (
              <button
                key={supplier.id}
                onClick={() => {
                  onSelect(supplier.id)
                  onClose()
                }}
                className={`w-full text-left px-6 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 ${
                  selectedSupplierId === supplier.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
                }`}
              >
                <p className="font-medium text-slate-800">{supplier.name}</p>
                <p className="text-sm text-slate-500">{supplier.contactPerson} • {supplier.email}</p>
              </button>
            ))
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}
