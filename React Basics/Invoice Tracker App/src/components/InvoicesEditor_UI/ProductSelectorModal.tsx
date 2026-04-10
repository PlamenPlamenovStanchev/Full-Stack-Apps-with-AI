import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { X, Search } from 'lucide-react'
import { Product, ProductCategory } from '../../data/types'

interface ProductSelectorModalProps {
  isOpen: boolean
  products: Product[]
  categories: ProductCategory[]
  onSelect: (product: Product) => void
  onClose: () => void
}

export function ProductSelectorModal({ isOpen, products, categories, onSelect, onClose }: ProductSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products

    const term = searchTerm.toLowerCase()
    return products.filter((product) =>
      product.name.toLowerCase().includes(term)
    )
  }, [searchTerm, products])

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((c: ProductCategory) => c.id === categoryId)
    return category?.name || 'Unknown'
  }

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
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-96 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Select Product</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-64">
          {filteredProducts.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    onSelect(product)
                    onClose()
                    setSearchTerm('')
                  }}
                  className="w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors focus:outline-none focus:bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-sm text-slate-500">{getCategoryName(product.categoryId)}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-slate-900">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">per unit</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No products found
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
