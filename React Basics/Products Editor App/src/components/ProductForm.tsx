import { useState } from 'react'
import toast from 'react-hot-toast'
import { ProductInput } from '../types/Product'
import ImageUploadField from './ImageUploadField'
import './ProductForm.css'

interface ProductFormProps {
  onAddProduct: (product: ProductInput) => void
}

export default function ProductForm({ onAddProduct }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    photoUrl: '',
    price: '',
    currency: 'USD',
    unit: 'piece',
    description: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhotoUrlChange = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      photoUrl: url,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('❌ Please enter a product name')
      return
    }

    if (!formData.price || Number(formData.price) <= 0) {
      toast.error('❌ Please enter a valid price')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      onAddProduct({
        name: formData.name.trim(),
        photoUrl: formData.photoUrl.trim(),
        price: Number(formData.price),
        currency: formData.currency,
        unit: formData.unit,
        description: formData.description.trim(),
      })

      toast.success('✅ Product added successfully!')

      setFormData({
        name: '',
        photoUrl: '',
        price: '',
        currency: 'USD',
        unit: 'piece',
        description: '',
      })

      setIsSubmitting(false)
    }, 300)
  }

  return (
    <div className="form-container fade-in">
      <div className="form-header">
        <h4>
          <i className="bi bi-plus-circle-fill me-2"></i>Add New Product
        </h4>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <div className="input-group">
            <i className="bi bi-tag-fill"></i>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              maxLength={100}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <ImageUploadField
            photoUrl={formData.photoUrl}
            onPhotoUrlChange={handlePhotoUrlChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <div className="input-group">
              <i className="bi bi-currency-dollar"></i>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <div className="input-group">
              <i className="bi bi-coin"></i>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="form-control"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="RUB">RUB (₽)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="unit">Unit of Measurement *</label>
          <div className="input-group">
            <i className="bi bi-rulers"></i>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="form-control"
            >
              <option value="piece">Piece</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="lb">Pound (lb)</option>
              <option value="liter">Liter (L)</option>
              <option value="gallon">Gallon (gal)</option>
              <option value="meter">Meter (m)</option>
              <option value="inch">Inch (in)</option>
              <option value="hour">Hour (h)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <div className="input-group">
            <i className="bi bi-chat-left-text-fill"></i>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description (optional)"
              maxLength={300}
              rows={3}
              className="form-control"
            ></textarea>
          </div>
          <small className="text-muted">{formData.description.length}/300</small>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-submit w-100"
        >
          {isSubmitting ? (
            <>
              <i className="bi bi-hourglass-split pulse me-2"></i>Adding...
            </>
          ) : (
            <>
              <i className="bi bi-plus-lg me-2"></i>Add Product
            </>
          )}
        </button>
      </form>
    </div>
  )
}
