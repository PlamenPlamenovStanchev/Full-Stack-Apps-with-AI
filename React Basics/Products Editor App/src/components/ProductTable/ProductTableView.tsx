import { Product } from '../../types/Product'
import './ProductTableView.css'

interface ProductTableViewProps {
  products: Product[]
  onView?: (product: Product) => void
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
}

export default function ProductTableView({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductTableViewProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <i className="bi bi-inbox"></i>
        <p>No products to display</p>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="product-cell">
                  {product.photoUrl && (
                    <img
                      src={product.photoUrl}
                      alt={product.name}
                      className="product-thumb"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/40x40?text=No'
                      }}
                    />
                  )}
                  <div>
                    <strong>{product.name}</strong>
                  </div>
                </div>
              </td>
              <td>
                <span className="description-preview">{product.description || '-'}</span>
              </td>
              <td>
                <span className="price-badge">
                  {product.currency} {product.price.toFixed(2)}
                </span>
              </td>
              <td>{product.unit}</td>
              <td>
                <div className="action-buttons">
                  {onView && (
                    <button
                      className="action-btn view-btn"
                      onClick={() => onView(product)}
                      title="View"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  )}
                  {onEdit && (
                    <button
                      className="action-btn edit-btn"
                      onClick={() => onEdit(product)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="action-btn delete-btn"
                      onClick={() => onDelete(product)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
