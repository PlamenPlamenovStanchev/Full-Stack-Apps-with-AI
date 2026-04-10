import { motion } from 'framer-motion'
import { Edit2, Trash2 } from 'lucide-react'
import { Supplier } from '../../data/types'

interface SuppliersTableProps {
  suppliers: Supplier[]
  onEditClick: (supplier: Supplier) => void
  onDeleteClick: (supplierId: string) => void
}

export function SuppliersTable({ suppliers, onEditClick, onDeleteClick }: SuppliersTableProps) {
  const handleDeleteClick = (supplierId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDeleteClick(supplierId)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Name</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Contact Person</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Email</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Phone</th>
              <th className="px-6 py-3 text-center font-medium text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No suppliers found. Add your first supplier.
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{supplier.name}</td>
                  <td className="px-6 py-4 text-slate-600">{supplier.contactPerson}</td>
                  <td className="px-6 py-4 text-slate-600">{supplier.email}</td>
                  <td className="px-6 py-4 text-slate-600">{supplier.phone}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditClick(supplier)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(supplier.id, supplier.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
