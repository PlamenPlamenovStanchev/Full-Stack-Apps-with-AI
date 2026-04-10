import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { AppData, Invoice, InvoicePayment } from '../data/types'
import { store } from '../data/store'
import { InvoicePaymentTable } from './TrackerEditor_UI/InvoicePaymentTable'
import { MarkAsPaidModal } from './TrackerEditor_UI/MarkAsPaidModal'
import { MarkAsUnpaidModal } from './TrackerEditor_UI/MarkAsUnpaidModal'

export function TrackerEditor() {
  const [appData, setAppData] = useState<AppData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInvoiceForPaid, setSelectedInvoiceForPaid] = useState<Invoice | null>(null)
  const [selectedInvoiceForUnpaid, setSelectedInvoiceForUnpaid] = useState<Invoice | null>(null)
  const [isMarkAsPaidOpen, setIsMarkAsPaidOpen] = useState(false)
  const [isMarkAsUnpaidOpen, setIsMarkAsUnpaidOpen] = useState(false)

  useEffect(() => {
    const data = store.getData()
    setAppData(data)
  }, [])

  if (!appData) return null

  const handleMarkAsPaid = (invoice: Invoice) => {
    setSelectedInvoiceForPaid(invoice)
    setIsMarkAsPaidOpen(true)
  }

  const handleConfirmMarkAsPaid = (paymentDate: string, paymentMethodId: string) => {
    if (!selectedInvoiceForPaid) return

    // Check if payment already exists
    const existingPayment = appData.invoicePayments.find(
      p => p.invoiceId === selectedInvoiceForPaid.id
    )

    let updatedPayments: InvoicePayment[]

    if (existingPayment) {
      // Update existing payment
      updatedPayments = appData.invoicePayments.map(p =>
        p.id === existingPayment.id
          ? {
              ...p,
              datePaid: paymentDate,
              paymentMethodId,
              amount: selectedInvoiceForPaid.totalAmount,
            }
          : p
      )
    } else {
      // Create new payment
      const newPayment: InvoicePayment = {
        id: `pay-${Date.now()}`,
        invoiceId: selectedInvoiceForPaid.id,
        datePaid: paymentDate,
        paymentMethodId,
        amount: selectedInvoiceForPaid.totalAmount,
      }
      updatedPayments = [...appData.invoicePayments, newPayment]
    }

    const updated = {
      ...appData,
      invoicePayments: updatedPayments,
    }
    setAppData(updated)
    store.saveData(updated)
    setIsMarkAsPaidOpen(false)
    setSelectedInvoiceForPaid(null)
    toast.success('Invoice marked as paid!')
  }

  const handleMarkAsUnpaid = (invoice: Invoice) => {
    setSelectedInvoiceForUnpaid(invoice)
    setIsMarkAsUnpaidOpen(true)
  }

  const handleConfirmMarkAsUnpaid = () => {
    if (!selectedInvoiceForUnpaid) return

    const updatedPayments = appData.invoicePayments.filter(
      p => p.invoiceId !== selectedInvoiceForUnpaid.id
    )

    const updated = {
      ...appData,
      invoicePayments: updatedPayments,
    }
    setAppData(updated)
    store.saveData(updated)
    setIsMarkAsUnpaidOpen(false)
    setSelectedInvoiceForUnpaid(null)
    toast.success('Invoice marked as unpaid!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payment Tracker</h1>
        <p className="text-slate-600 mt-1">Track invoice payments and manage payment records</p>
      </div>

      {/* Payment Table */}
      <InvoicePaymentTable
        invoices={appData.invoices}
        payments={appData.invoicePayments}
        appData={appData}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onMarkAsPaid={handleMarkAsPaid}
        onMarkAsUnpaid={handleMarkAsUnpaid}
      />

      {/* Mark as Paid Modal */}
      <MarkAsPaidModal
        isOpen={isMarkAsPaidOpen}
        invoice={selectedInvoiceForPaid}
        appData={appData}
        onConfirm={handleConfirmMarkAsPaid}
        onClose={() => {
          setIsMarkAsPaidOpen(false)
          setSelectedInvoiceForPaid(null)
        }}
      />

      {/* Mark as Unpaid Modal */}
      <MarkAsUnpaidModal
        isOpen={isMarkAsUnpaidOpen}
        invoice={selectedInvoiceForUnpaid}
        onConfirm={handleConfirmMarkAsUnpaid}
        onClose={() => {
          setIsMarkAsUnpaidOpen(false)
          setSelectedInvoiceForUnpaid(null)
        }}
      />
    </motion.div>
  )
}

