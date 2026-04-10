import { motion } from 'framer-motion'
import { CheckCircle, Clock, Search } from 'lucide-react'
import { Invoice, AppData, InvoicePayment } from '../../data/types'

interface InvoicePaymentTableProps {
  invoices: Invoice[]
  payments: InvoicePayment[]
  appData: AppData
  searchTerm: string
  onSearchChange: (term: string) => void
  onMarkAsPaid: (invoice: Invoice) => void
  onMarkAsUnpaid: (invoice: Invoice) => void
}

export function InvoicePaymentTable({
  invoices,
  payments,
  appData,
  searchTerm,
  onSearchChange,
  onMarkAsPaid,
  onMarkAsUnpaid,
}: InvoicePaymentTableProps) {
  const getPaymentForInvoice = (invoiceId: string): InvoicePayment | undefined => {
    return payments.find(p => p.invoiceId === invoiceId)
  }

  const getPaymentMethodName = (methodId: string): string => {
    const method = appData.paymentMethods.find(m => m.id === methodId)
    return method?.name || 'Unknown'
  }

  const getClientName = (invoice: Invoice): string => {
    return invoice.recipient.name
  }

  const isPaid = (invoiceId: string): boolean => {
    return !!getPaymentForInvoice(invoiceId)
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const term = searchTerm.toLowerCase()
    const clientName = getClientName(invoice).toLowerCase()
    return (
      invoice.id.toLowerCase().includes(term) ||
      clientName.includes(term)
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search by invoice # or client name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
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
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((invoice) => {
                const payment = getPaymentForInvoice(invoice.id)
                const paid = !!payment

                return (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {getClientName(invoice)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                      ${invoice.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {paid ? (
                          <>
                            <CheckCircle size={18} className="text-green-500" />
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              Paid
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock size={18} className="text-amber-500" />
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                              Unpaid
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {payment ? new Date(payment.datePaid).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {payment ? getPaymentMethodName(payment.paymentMethodId) : '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {paid ? (
                          <button
                            onClick={() => onMarkAsUnpaid(invoice)}
                            className="px-3 py-1 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Mark as unpaid"
                          >
                            Unpaid
                          </button>
                        ) : (
                          <button
                            onClick={() => onMarkAsPaid(invoice)}
                            className="px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Mark as paid"
                          >
                            Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">
              {searchTerm ? 'No invoices found matching your search.' : 'No invoices yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredInvoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-lg border border-slate-100 p-4">
            <p className="text-sm text-slate-600 mb-1">Total Invoices</p>
            <p className="text-2xl font-bold text-slate-900">{filteredInvoices.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg border border-green-100 p-4">
            <p className="text-sm text-green-700 font-medium mb-1">Paid</p>
            <p className="text-2xl font-bold text-green-900">
              {filteredInvoices.filter(inv => isPaid(inv.id)).length}
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg border border-amber-100 p-4">
            <p className="text-sm text-amber-700 font-medium mb-1">Unpaid</p>
            <p className="text-2xl font-bold text-amber-900">
              {filteredInvoices.filter(inv => !isPaid(inv.id)).length}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
