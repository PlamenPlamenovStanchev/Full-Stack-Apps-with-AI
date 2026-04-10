import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import { store } from '../data/store'
import { AppData, Product, ProductCategory, Supplier } from '../data/types'
import { ProductsTabNav } from './ProductsEditor_UI/ProductsTabNav'
import { ProductsTable } from './ProductsEditor_UI/ProductsTable'
import { ProductModal } from './ProductsEditor_UI/ProductModal'
import { CategoriesTable } from './ProductsEditor_UI/CategoriesTable'
import { CategoryModal } from './ProductsEditor_UI/CategoryModal'
import { SuppliersTable } from './ProductsEditor_UI/SuppliersTable'
import { SupplierModal } from './ProductsEditor_UI/SupplierModal'

type TabType = 'products' | 'categories' | 'suppliers'

export function ProductsEditor() {
  const [appData, setAppData] = useState<AppData | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('products')
  
  // Products states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  // Categories states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null)
  
  // Suppliers states
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)

  useEffect(() => {
    const data = store.getData()
    setAppData(data)
  }, [])

  if (!appData) return null

  // ===== PRODUCTS HANDLERS =====
  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsProductModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsProductModalOpen(true)
  }

  const handleDeleteProduct = (productId: string) => {
    const updated = {
      ...appData,
      products: appData.products.filter(p => p.id !== productId)
    }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Product deleted!')
  }

  const handleSaveProduct = (product: Product) => {
    let updated: AppData

    if (editingProduct) {
      updated = {
        ...appData,
        products: appData.products.map(p => p.id === product.id ? product : p)
      }
      toast.success('Product updated!')
    } else {
      updated = {
        ...appData,
        products: [...appData.products, product]
      }
      toast.success('Product added!')
    }

    setAppData(updated)
    store.saveData(updated)
    setIsProductModalOpen(false)
  }

  // ===== CATEGORIES HANDLERS =====
  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsCategoryModalOpen(true)
  }

  const handleEditCategory = (category: ProductCategory) => {
    setEditingCategory(category)
    setIsCategoryModalOpen(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    const updated = {
      ...appData,
      categories: appData.categories.filter(c => c.id !== categoryId)
    }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Category deleted!')
  }

  const handleSaveCategory = (category: ProductCategory) => {
    let updated: AppData

    if (editingCategory) {
      updated = {
        ...appData,
        categories: appData.categories.map(c => c.id === category.id ? category : c)
      }
      toast.success('Category updated!')
    } else {
      updated = {
        ...appData,
        categories: [...appData.categories, category]
      }
      toast.success('Category added!')
    }

    setAppData(updated)
    store.saveData(updated)
    setIsCategoryModalOpen(false)
  }

  // ===== SUPPLIERS HANDLERS =====
  const handleAddSupplier = () => {
    setEditingSupplier(null)
    setIsSupplierModalOpen(true)
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier)
    setIsSupplierModalOpen(true)
  }

  const handleDeleteSupplier = (supplierId: string) => {
    const updated = {
      ...appData,
      suppliers: appData.suppliers.filter(s => s.id !== supplierId)
    }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Supplier deleted!')
  }

  const handleSaveSupplier = (supplier: Supplier) => {
    let updated: AppData

    if (editingSupplier) {
      updated = {
        ...appData,
        suppliers: appData.suppliers.map(s => s.id === supplier.id ? supplier : s)
      }
      toast.success('Supplier updated!')
    } else {
      updated = {
        ...appData,
        suppliers: [...appData.suppliers, supplier]
      }
      toast.success('Supplier added!')
    }

    setAppData(updated)
    store.saveData(updated)
    setIsSupplierModalOpen(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <ProductsTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <motion.div
          key="products"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Products</h3>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
          <ProductsTable
            products={appData.products}
            currencies={appData.currencies}
            suppliers={appData.suppliers}
            onEditClick={handleEditProduct}
            onDeleteClick={handleDeleteProduct}
          />
        </motion.div>
      )}

      {/* CATEGORIES TAB */}
      {activeTab === 'categories' && (
        <motion.div
          key="categories"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Categories</h3>
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              Add Category
            </button>
          </div>
          <CategoriesTable
            categories={appData.categories}
            onEditClick={handleEditCategory}
            onDeleteClick={handleDeleteCategory}
          />
        </motion.div>
      )}

      {/* SUPPLIERS TAB */}
      {activeTab === 'suppliers' && (
        <motion.div
          key="suppliers"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Suppliers</h3>
            <button
              onClick={handleAddSupplier}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              Add Supplier
            </button>
          </div>
          <SuppliersTable
            suppliers={appData.suppliers}
            onEditClick={handleEditSupplier}
            onDeleteClick={handleDeleteSupplier}
          />
        </motion.div>
      )}

      {/* MODALS */}
      <ProductModal
        isOpen={isProductModalOpen}
        product={editingProduct}
        categories={appData.categories}
        currencies={appData.currencies}
        suppliers={appData.suppliers}
        onClose={() => {
          setIsProductModalOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSaveProduct}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        category={editingCategory}
        onClose={() => {
          setIsCategoryModalOpen(false)
          setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
      />

      <SupplierModal
        isOpen={isSupplierModalOpen}
        supplier={editingSupplier}
        onClose={() => {
          setIsSupplierModalOpen(false)
          setEditingSupplier(null)
        }}
        onSave={handleSaveSupplier}
      />
    </motion.div>
  )
}
