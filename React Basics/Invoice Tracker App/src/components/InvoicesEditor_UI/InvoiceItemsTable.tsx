import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { InvoiceItem, Product } from '../../data/types'

interface InvoiceItemsTableProps {
  items: InvoiceItem[]
  products: Product[]
  onAddItem: () => void
  onEditItem: (item: InvoiceItem) => void
  onDeleteItem: (item: InvoiceItem) => void
}

export function InvoiceItemsTable({
  items,
  products,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: InvoiceItemsTableProps) {
  const getProductName = (productId: string): string => {
    const product = products.find(p => p.id === productId)
    return product?.name || 'Unknown'
  }

  const subtotal = items.reduce((sum, item) => sum + item.valueWithVat, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Invoice Items</h3>
        <button
          onClick={onAddItem}
          className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {items.length > 0 ? (
        <>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                    Product
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                    Qty
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                    Price
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                    VAT %
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                    Total
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {getProductName(item.productId)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-right">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-right">
                      ${item.salePrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-right">
                      {item.vatRate.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 text-right">
                      ${item.valueWithVat.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEditItem(item)}
                          className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit item"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteItem(item)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotal */}
          <div className="flex justify-end">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 w-64">
              <div className="text-sm text-slate-600 mb-1">Subtotal</div>
              <div className="text-2xl font-bold text-slate-900">
                ${subtotal.toFixed(2)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 border border-slate-200 rounded-lg bg-slate-50">
          <p className="text-slate-500 mb-4">No items yet. Add one to start.</p>
          <button
            onClick={onAddItem}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Add First Item
          </button>
        </div>
      )}
    </motion.div>
  )
}
