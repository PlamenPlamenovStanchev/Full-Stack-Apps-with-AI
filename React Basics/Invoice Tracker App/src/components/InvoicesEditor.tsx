import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppData, Invoice } from '../data/types'
import { store } from '../data/store'
import { InvoicesTable } from './InvoicesEditor_UI/InvoicesTable'
import { InvoiceModal } from './InvoicesEditor_UI/InvoiceModal'

export function InvoicesEditor() {
  const [appData, setAppData] = useState<AppData | null>(null)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)

  useEffect(() => {
    const data = store.getData()
    setAppData(data)
  }, [])

  if (!appData) return null

  const handleAddInvoice = () => {
    setEditingInvoice(null)
    setIsInvoiceModalOpen(true)
  }

  const handleViewInvoice = (invoice: Invoice) => {
    // In a real app, you might navigate to a detail view or open a read-only modal
    console.log('View invoice:', invoice)
  }

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice)
    setIsInvoiceModalOpen(true)
  }

  const handleDeleteInvoice = (invoice: Invoice) => {
    if (window.confirm(`Delete invoice ${invoice.id}?`)) {
      const updated = {
        ...appData,
        invoices: appData.invoices.filter(i => i.id !== invoice.id),
      }
      setAppData(updated)
      store.saveData(updated)
      toast.success('Invoice deleted!')
    }
  }

  const handleSaveInvoice = (invoice: Invoice) => {
    let updated: AppData
    if (editingInvoice) {
      updated = {
        ...appData,
        invoices: appData.invoices.map(i => (i.id === invoice.id ? invoice : i)),
      }
      toast.success('Invoice updated!')
    } else {
      updated = {
        ...appData,
        invoices: [...appData.invoices, invoice],
      }
      toast.success('Invoice created!')
    }
    setAppData(updated)
    store.saveData(updated)
    setIsInvoiceModalOpen(false)
    setEditingInvoice(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
        <button
          onClick={handleAddInvoice}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Add Invoice
        </button>
      </div>

      {/* Invoices Table */}
      <InvoicesTable
        invoices={appData.invoices}
        appData={appData}
        onView={handleViewInvoice}
        onEdit={handleEditInvoice}
        onDelete={handleDeleteInvoice}
      />

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        appData={appData}
        editingInvoice={editingInvoice}
        onSave={handleSaveInvoice}
        onClose={() => {
          setIsInvoiceModalOpen(false)
          setEditingInvoice(null)
        }}
      />
    </motion.div>
  )
}
