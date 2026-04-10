import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Invoice, InvoiceItem, Client, AppData, Product } from '../../data/types'
import { ClientSelectorModal } from './ClientSelectorModal'
import { InvoiceItemsTable } from './InvoiceItemsTable'
import { InvoiceItemModal } from './InvoiceItemModal'
import { ProductSelectorModal } from './ProductSelectorModal'

interface InvoiceModalProps {
  isOpen: boolean
  appData: AppData
  editingInvoice: Invoice | null
  onSave: (invoice: Invoice) => void
  onClose: () => void
}

export function InvoiceModal({ isOpen, appData, editingInvoice, onSave, onClose }: InvoiceModalProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
  const [notes, setNotes] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [isClientSelectorOpen, setIsClientSelectorOpen] = useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InvoiceItem | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false)

  useEffect(() => {
    if (editingInvoice) {
      setSelectedClient(editingInvoice.recipient)
      setInvoiceItems(editingInvoice.items)
      setNotes('')
      setDueDate(editingInvoice.dueDate)
    } else {
      setSelectedClient(null)
      setInvoiceItems([])
      setNotes('')
      setDueDate(new Date().toISOString().split('T')[0])
    }
  }, [editingInvoice])

  const amountSubtotal = invoiceItems.reduce((sum, item) => sum + item.valueWithoutVat, 0)
  const vatAmount = invoiceItems.reduce((sum, item) => sum + item.vatValue, 0)
  const totalAmount = amountSubtotal + vatAmount

  const handleSave = () => {
    if (!selectedClient) {
      alert('Please select a client')
      return
    }
    if (invoiceItems.length === 0) {
      alert('Please add at least one item')
      return
    }
    const companyProfile = appData.companyProfile
    if (!companyProfile) {
      alert('Please set up your company profile first')
      return
    }

    const invoice: Invoice = {
      id: editingInvoice?.id || `INV-${Date.now()}`,
      date: editingInvoice?.date || new Date().toISOString().split('T')[0],
      dueDate,
      issuer: companyProfile,
      recipient: selectedClient,
      items: invoiceItems,
      amountSubtotal,
      vatAmount,
      totalAmount,
      status: editingInvoice?.status || 'draft',
    }

    onSave(invoice)
  }

  const handleAddItem = () => {
    setEditingItem(null)
    setSelectedProduct(null)
    setIsItemModalOpen(true)
  }

  const handleEditItem = (item: InvoiceItem) => {
    const product = appData.products.find(p => p.id === item.productId)
    setSelectedProduct(product || null)
    setEditingItem(item)
    setIsItemModalOpen(true)
  }

  const handleDeleteItem = (item: InvoiceItem) => {
    if (window.confirm('Delete this item?')) {
      setInvoiceItems(invoiceItems.filter(i => i.id !== item.id))
    }
  }

  const handleSaveItem = (item: InvoiceItem) => {
    if (editingItem) {
      setInvoiceItems(invoiceItems.map(i => (i.id === item.id ? item : i)))
    } else {
      setInvoiceItems([...invoiceItems, item])
    }
    setIsItemModalOpen(false)
    setEditingItem(null)
    setSelectedProduct(null)
  }

  const getClientName = (client: Client | null): string => {
    if (!client) return 'No client selected'
    return client.name
  }

  if (!isOpen) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 border border-slate-100 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingInvoice ? 'Edit Invoice' : 'New Invoice'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Client Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Client *
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900">
                  {getClientName(selectedClient)}
                </div>
                <button
                  onClick={() => setIsClientSelectorOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                >
                  Select Client
                </button>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Invoice Items Table */}
            <InvoiceItemsTable
              items={invoiceItems}
              products={appData.products}
              onAddItem={handleAddItem}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-end gap-4">
                <div>
                  <p className="text-sm text-slate-600">Subtotal:</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${amountSubtotal.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">VAT:</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${vatAmount.toFixed(2)}
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-lg px-4 py-2 border border-indigo-200">
                  <p className="text-sm text-indigo-700 font-medium">Total:</p>
                  <p className="text-2xl font-bold text-indigo-900">
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Add any notes for this invoice..."
              />
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-slate-100 bg-slate-50 sticky bottom-0">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Nested Modals */}
      <ClientSelectorModal
        isOpen={isClientSelectorOpen}
        clients={appData.clients}
        onSelect={setSelectedClient}
        onClose={() => setIsClientSelectorOpen(false)}
      />

      <ProductSelectorModal
        isOpen={isProductSelectorOpen}
        products={appData.products}
        categories={appData.categories}
        onSelect={setSelectedProduct}
        onClose={() => setIsProductSelectorOpen(false)}
      />

      <InvoiceItemModal
        isOpen={isItemModalOpen}
        products={appData.products}
        editingItem={editingItem}
        selectedProduct={selectedProduct}
        onSelectProduct={() => setIsProductSelectorOpen(true)}
        onSave={handleSaveItem}
        onClose={() => {
          setIsItemModalOpen(false)
          setEditingItem(null)
          setSelectedProduct(null)
        }}
      />
    </>
  )
}
