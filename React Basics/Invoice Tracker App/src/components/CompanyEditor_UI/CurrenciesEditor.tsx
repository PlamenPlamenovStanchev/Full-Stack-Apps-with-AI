import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Currency } from '../../data/types'
import { CurrencyModal } from './CurrencyModal'

interface CurrenciesEditorProps {
  currencies: Currency[]
  onAddCurrency: (currency: Currency) => void
  onEditCurrency: (currency: Currency) => void
  onDeleteCurrency: (currencyId: string) => void
}

export function CurrenciesEditor({
  currencies,
  onAddCurrency,
  onEditCurrency,
  onDeleteCurrency,
}: CurrenciesEditorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null)

  const handleAddClick = () => {
    setEditingCurrency(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (currency: Currency) => {
    setEditingCurrency(currency)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (currencyId: string) => {
    if (window.confirm('Are you sure you want to delete this currency?')) {
      onDeleteCurrency(currencyId)
    }
  }

  const handleSave = (currency: Currency) => {
    if (editingCurrency) {
      onEditCurrency(currency)
    } else {
      onAddCurrency(currency)
    }
    setIsModalOpen(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Currencies</h3>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} />
            Add Currency
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-slate-700">Name</th>
                <th className="px-6 py-3 text-left font-medium text-slate-700">Symbol</th>
                <th className="px-6 py-3 text-left font-medium text-slate-700">Description</th>
                <th className="px-6 py-3 text-center font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr key={currency.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{currency.name}</td>
                  <td className="px-6 py-4 text-slate-600">{currency.symbol}</td>
                  <td className="px-6 py-4 text-slate-600">{currency.description}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(currency)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(currency.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <CurrencyModal
        isOpen={isModalOpen}
        currency={editingCurrency}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  )
}
