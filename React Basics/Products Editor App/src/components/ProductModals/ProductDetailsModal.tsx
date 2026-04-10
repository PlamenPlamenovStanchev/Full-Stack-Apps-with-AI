import { Product } from '../../types/Product'
import './ProductDetailsModal.css'

interface ProductDetailsModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: ProductDetailsModalProps) {
  if (!isOpen || !product) return null

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="product-details-modal">
        <div className="modal-header">
          <h4>Product Details</h4>
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="modal-body">
          {product.photoUrl && (
            <div className="details-image-wrapper">
              <img
                src={product.photoUrl}
                alt={product.name}
                className="details-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'
                }}
              />
            </div>
          )}

          <div className="details-content">
            <h3 className="product-title">{product.name}</h3>

            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">
                  <i className="bi bi-currency-dollar"></i> Price
                </span>
                <span className="detail-value">
                  {product.currency} {product.price.toFixed(2)}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <i className="bi bi-rulers"></i> Unit
                </span>
                <span className="detail-value">{product.unit}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <i className="bi bi-hash"></i> ID
                </span>
                <span className="detail-value">{product.id}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <i className="bi bi-calendar"></i> Added
                </span>
                <span className="detail-value">
                  {new Date(parseInt(product.id)).toLocaleDateString()}
                </span>
              </div>
            </div>

            {product.description && (
              <div className="description-section">
                <h5>Description</h5>
                <p>{product.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          {onEdit && (
            <button className="btn btn-primary" onClick={onEdit}>
              <i className="bi bi-pencil-square me-1"></i>Edit
            </button>
          )}
          {onDelete && (
            <button className="btn btn-danger" onClick={onDelete}>
              <i className="bi bi-trash me-1"></i>Delete
            </button>
          )}
        </div>
      </div>
    </>
  )
}
