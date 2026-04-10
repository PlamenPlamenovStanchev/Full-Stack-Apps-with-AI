import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Venue } from '../data/types'
import { useData } from '../data/DataContext'
import { toast } from 'sonner'
import './VenueForm.css'

interface VenueFormProps {
  isOpen: boolean
  onClose: () => void
  venue?: Venue
}

export default function VenueForm({ isOpen, onClose, venue }: VenueFormProps) {
  const { addVenue, updateVenue } = useData()
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    capacity: '',
  })

  // Initialize form when venue changes or modal opens
  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name,
        address: venue.address,
        capacity: venue.capacity.toString(),
      })
    } else {
      setFormData({
        name: '',
        address: '',
        capacity: '',
      })
    }
  }, [venue, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name.trim() || !formData.address.trim() || !formData.capacity.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    // Validate capacity is a positive number
    const capacity = parseInt(formData.capacity, 10)
    if (isNaN(capacity) || capacity <= 0) {
      toast.error('Capacity must be a positive number')
      return
    }

    if (venue) {
      // Edit mode
      updateVenue(venue.id, {
        name: formData.name,
        address: formData.address,
        capacity,
      })
      toast.success('Venue updated successfully! ✏️')
    } else {
      // Add mode
      addVenue({
        name: formData.name,
        address: formData.address,
        capacity,
      })
      toast.success('Venue added successfully! 🎉')
    }

    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: '',
      address: '',
      capacity: '',
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="venue-form-overlay">
      <div className="venue-form-modal animate-fade-in">
        <div className="form-header">
          <h2 className="form-title">
            {venue ? 'Edit Venue' : 'Add New Venue'}
          </h2>
          <button
            type="button"
            className="close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Venue Name <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Grand Convention Center"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address <span className="required">*</span>
            </label>
            <input
              id="address"
              type="text"
              className="form-input"
              placeholder="123 Main Street, New York, NY 10001"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacity" className="form-label">
              Capacity <span className="required">*</span>
            </label>
            <input
              id="capacity"
              type="number"
              className="form-input"
              placeholder="1000"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              min="1"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {venue ? 'Update Venue' : 'Add Venue'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
