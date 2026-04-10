import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Attendee } from '../data/types'
import { useData } from '../data/DataContext'
import { toast } from 'sonner'
import './AttendeeForm.css'

interface AttendeeFormProps {
  isOpen: boolean
  onClose: () => void
  attendee?: Attendee
}

export default function AttendeeForm({ isOpen, onClose, attendee }: AttendeeFormProps) {
  const { addAttendee, updateAttendee } = useData()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  // Initialize form when attendee changes or modal opens
  useEffect(() => {
    if (attendee) {
      setFormData({
        name: attendee.name,
        email: attendee.email,
        phone: attendee.phone,
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
      })
    }
  }, [attendee, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    if (attendee) {
      // Edit mode
      updateAttendee(attendee.id, formData)
      toast.success('Attendee updated successfully! ✏️')
    } else {
      // Add mode
      addAttendee(formData)
      toast.success('Attendee added successfully! 🎉')
    }

    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="attendee-form-overlay">
      <div className="attendee-form-modal animate-fade-in">
        <div className="form-header">
          <h2 className="form-title">
            {attendee ? 'Edit Attendee' : 'Add New Attendee'}
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
              Full Name <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone <span className="required">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="+1-555-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {attendee ? 'Update Attendee' : 'Add Attendee'}
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
