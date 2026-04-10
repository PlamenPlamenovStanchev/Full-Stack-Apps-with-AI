import { motion } from 'framer-motion'
import { Edit2, Trash2 } from 'lucide-react'
import { Product, Currency, Supplier } from '../../data/types'

interface ProductsTableProps {
  products: Product[]
  currencies: Currency[]
  suppliers: Supplier[]
  onEditClick: (product: Product) => void
  onDeleteClick: (productId: string) => void
}

export function ProductsTable({ products, currencies, suppliers, onEditClick, onDeleteClick }: ProductsTableProps) {
  const handleDeleteClick = (productId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDeleteClick(productId)
    }
  }

  const getCurrencySymbol = (currencyId: string) => {
    return currencies.find(c => c.id === currencyId)?.symbol || 'N/A'
  }

  const getSupplierName = (supplierId: string) => {
    if (supplierId === 'self') return 'Internal'
    return suppliers.find(s => s.id === supplierId)?.name || 'Unknown'
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
              <th className="px-6 py-3 text-left font-medium text-slate-700">Price</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Unit</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Supplier</th>
              <th className="px-6 py-3 text-center font-medium text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No products found. Add your first product.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{product.name}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {getCurrencySymbol(product.currencyId)}{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{product.unit}</td>
                  <td className="px-6 py-4 text-slate-600">{getSupplierName(product.supplierId)}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditClick(product)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id, product.name)}
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
