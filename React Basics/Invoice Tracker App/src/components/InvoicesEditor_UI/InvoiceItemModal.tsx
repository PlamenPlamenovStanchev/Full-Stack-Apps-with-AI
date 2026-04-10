import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { InvoiceItem, Product } from '../../data/types'

interface InvoiceItemModalProps {
  isOpen: boolean
  products: Product[]
  editingItem: InvoiceItem | null
  selectedProduct: Product | null
  onSelectProduct: () => void
  onSave: (item: InvoiceItem) => void
  onClose: () => void
}

export function InvoiceItemModal({
  isOpen,
  products,
  editingItem,
  selectedProduct,
  onSelectProduct,
  onSave,
  onClose,
}: InvoiceItemModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [salePrice, setSalePrice] = useState(0)
  const [vatRate, setVatRate] = useState(0)

  useEffect(() => {
    if (editingItem) {
      setQuantity(editingItem.quantity)
      setSalePrice(editingItem.salePrice)
      setVatRate(editingItem.vatRate)
    } else if (selectedProduct) {
      setQuantity(1)
      setSalePrice(selectedProduct.price)
      setVatRate(0)
    } else {
      setQuantity(1)
      setSalePrice(0)
      setVatRate(0)
    }
  }, [editingItem, selectedProduct])

  const getProductName = (productId: string): string => {
    const product = products.find(p => p.id === productId)
    return product?.name || 'Unknown'
  }

  const valueWithoutVat = quantity * salePrice
  const vatValue = valueWithoutVat * (vatRate / 100)
  const valueWithVat = valueWithoutVat + vatValue

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingItem ? 'Edit Item' : 'Add Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product
            </label>
            {selectedProduct || editingItem ? (
              <div className="flex items-center justify-between">
                <p className="text-slate-900 font-medium">
                  {selectedProduct ? selectedProduct.name : getProductName(editingItem!.productId)}
                </p>
                {!editingItem && (
                  <button
                    onClick={onSelectProduct}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
                  >
                    Change
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onSelectProduct}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors font-medium"
              >
                Select Product
              </button>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Sale Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sale Price (without VAT)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-slate-600">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={salePrice}
                onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* VAT Rate */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              VAT Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={vatRate}
              onChange={(e) => setVatRate(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Value With VAT */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total (with VAT)</p>
            <p className="text-2xl font-bold text-slate-900">${valueWithVat.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!selectedProduct && !editingItem) {
                alert('Please select a product')
                return
              }
              const item: InvoiceItem = {
                id: editingItem?.id || `item-${Date.now()}`,
                productId: selectedProduct?.id || editingItem!.productId,
                quantity,
                salePrice,
                valueWithoutVat,
                vatRate,
                vatValue,
                valueWithVat,
              }
              onSave(item)
              onClose()
            }}
            disabled={!selectedProduct && !editingItem}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
