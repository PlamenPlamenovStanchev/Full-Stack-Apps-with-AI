import { motion } from 'framer-motion'
import { Edit2, Trash2, Eye } from 'lucide-react'
import { Invoice, AppData } from '../../data/types'

interface InvoicesTableProps {
  invoices: Invoice[]
  appData: AppData
  onView: (invoice: Invoice) => void
  onEdit: (invoice: Invoice) => void
  onDelete: (invoice: Invoice) => void
}

export function InvoicesTable({ invoices, appData, onView, onEdit, onDelete }: InvoicesTableProps) {
  const getClientName = (invoice: Invoice): string => {
    const client = invoice.recipient
    return client.type === 'company' ? client.name : client.name
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-slate-100 text-slate-700'
      case 'sent':
        return 'bg-blue-100 text-blue-700'
      case 'viewed':
        return 'bg-purple-100 text-purple-700'
      case 'paid':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Invoice #
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Client
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Total
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{getClientName(invoice)}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                  {appData.currencies[0]?.symbol || '$'}{invoice.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onView(invoice)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View invoice"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(invoice)}
                      className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit invoice"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(invoice)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete invoice"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invoices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No invoices yet. Create one to get started.</p>
        </div>
      )}
    </motion.div>
  )
}
