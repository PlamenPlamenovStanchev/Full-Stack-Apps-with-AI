import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Product, ProductCategory, Currency, Supplier } from '../../data/types'
import { SupplierSelector } from './SupplierSelector'

interface ProductModalProps {
  isOpen: boolean
  product: Product | null
  categories: ProductCategory[]
  currencies: Currency[]
  suppliers: Supplier[]
  onClose: () => void
  onSave: (product: Product) => void
}

export function ProductModal({
  isOpen,
  product,
  categories,
  currencies,
  suppliers,
  onClose,
  onSave,
}: ProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    currencyId: currencies[0]?.id || '',
    unit: '',
    supplierId: 'self',
    categoryId: categories[0]?.id || '',
  })
  const [isSupplierSelectorOpen, setIsSupplierSelectorOpen] = useState(false)

  useEffect(() => {
    if (product) {
      const { id, ...rest } = product
      setFormData(rest)
    } else {
      setFormData({
        name: '',
        price: 0,
        currencyId: currencies[0]?.id || '',
        unit: '',
        supplierId: 'self',
        categoryId: categories[0]?.id || '',
      })
    }
  }, [product, isOpen, categories, currencies])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: product?.id || `prod_${Date.now()}`,
      ...formData,
    }
    onSave(newProduct)
  }

  const selectedSupplier = formData.supplierId === 'self'
    ? { name: 'Internal' }
    : suppliers.find(s => s.id === formData.supplierId)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-lg max-w-lg w-full"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold">{product ? 'Edit Product' : 'Add Product'}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Landing Page Package"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Currency</label>
                <select
                  value={formData.currencyId}
                  onChange={(e) => setFormData({ ...formData, currencyId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  {currencies.map(currency => (
                    <option key={currency.id} value={currency.id}>
                      {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g., project, hour"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Supplier</label>
              <button
                type="button"
                onClick={() => setIsSupplierSelectorOpen(true)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-left bg-white hover:bg-slate-50 transition-colors text-slate-700"
              >
                {selectedSupplier?.name || 'Select Supplier'}
              </button>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                {product ? 'Update' : 'Add'} Product
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <SupplierSelector
        isOpen={isSupplierSelectorOpen}
        suppliers={suppliers}
        selectedSupplierId={formData.supplierId}
        onSelect={(supplierId) => setFormData({ ...formData, supplierId })}
        onClose={() => setIsSupplierSelectorOpen(false)}
      />
    </>
  )
}
