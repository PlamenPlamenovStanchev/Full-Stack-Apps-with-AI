import { useState } from 'react'
import toast from 'react-hot-toast'
import { useProducts } from '../hooks/useProducts'
import { Product, ProductInput } from '../types/Product'
import ProductForm from './ProductForm'
import StatsPanel from './StatsPanel'
import SearchBar from './SearchBar'
import ViewToggle from './ViewToggle'
import { ProductDetailsModal, EditProductModal } from './ProductModals'
import ProductTableView from './ProductTableView'
import ConfirmDialog from './ConfirmDialog'
import './ProductsList.css'

export default function ProductsList() {
  const { products, isLoading, addProduct, updateProduct, deleteProduct } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = (productInput: ProductInput) => {
    addProduct(productInput)
  }

  const handleEditProduct = (id: string, productInput: ProductInput) => {
    const updated = updateProduct(id, productInput)
    if (updated) {
      toast.success(`✅ Product "${updated.name}" updated successfully!`)
      setEditingProduct(null)
    } else {
      toast.error('❌ Failed to update product')
    }
  }

  const handleDeleteProduct = (id: string) => {
    const product = products.find((p) => p.id === id)
    if (deleteProduct(id)) {
      toast.success(`🗑️ Product "${product?.name}" deleted successfully!`)
    } else {
      toast.error('❌ Failed to delete product')
    }
    setDeleteConfirmId(null)
  }

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="products-container fade-in">
      {/* Stats Panel */}
      <StatsPanel products={products} />

      <div className="row">
        <div className="col-lg-4">
          <ProductForm onAddProduct={handleAddProduct} />
        </div>

        <div className="col-lg-8">
          {/* Search and View Controls */}
          <div className="controls-bar">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
            <ViewToggle currentView={viewMode} onChange={setViewMode} />
          </div>

          {/* Results info */}
          <div className="results-info">
            <span>
              Showing <strong>{filteredProducts.length}</strong> of{' '}
              <strong>{products.length}</strong> products
            </span>
          </div>

          {/* Products Display */}
          {viewMode === 'grid' ? (
            <div className="products-grid">
              {filteredProducts.length === 0 ? (
                <div className="no-products text-center py-5">
                  <i className="bi bi-inbox"></i>
                  <p>
                    {products.length === 0
                      ? 'No products yet. Add one to get started!'
                      : 'No products match your search.'}
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="product-card slide-in-right">
                    {product.photoUrl && (
                      <div className="product-image-wrapper">
                        <img
                          src={product.photoUrl}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://via.placeholder.com/400x300?text=No+Image'
                          }}
                        />
                      </div>
                    )}

                    <div className="product-content">
                      <div className="product-header">
                        <h5 className="product-name">{product.name}</h5>
                      </div>

                      <p className="product-description text-muted">
                        {product.description}
                      </p>

                      <div className="product-info">
                        <div className="info-item">
                          <i className="bi bi-tag-fill text-primary"></i>
                          <span>
                            {product.currency} {product.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="info-item">
                          <i className="bi bi-box-fill text-success"></i>
                          <span>per {product.unit}</span>
                        </div>
                      </div>

                      <div className="product-actions">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <i className="bi bi-eye me-1"></i>View
                        </button>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => setEditingProduct(product)}
                        >
                          <i className="bi bi-pencil me-1"></i>Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setDeleteConfirmId(product.id)}
                        >
                          <i className="bi bi-trash me-1"></i>Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <ProductTableView
              products={filteredProducts}
              onView={(product) => setSelectedProduct(product)}
              onEdit={(product) => setEditingProduct(product)}
              onDelete={(product) => setDeleteConfirmId(product.id)}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleEditProduct}
      />

      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        title="Delete Product"
        message={`Are you sure you want to delete this product? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={() => {
          if (deleteConfirmId) {
            handleDeleteProduct(deleteConfirmId)
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  )
}