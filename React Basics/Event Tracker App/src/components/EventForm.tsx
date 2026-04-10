import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useData } from '../data/DataContext'
import { EventCategory, EventPriority } from '../data/types'
import { toast } from 'sonner'
import './EventForm.css'

export default function EventForm() {
  const [isOpen, setIsOpen] = useState(false)
  const { addEvent } = useData()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    category: 'personal' as EventCategory,
    priority: 'medium' as EventPriority,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields')
      return
    }

    addEvent({
      ...formData,
      completed: false,
    })

    toast.success('Event added successfully! 🎉')

    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      category: 'personal',
      priority: 'medium',
    })

    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      category: 'personal',
      priority: 'medium',
    })
  }

  return (
    <div className="event-form-container">
      {!isOpen ? (
        <button
          className="add-event-btn"
          onClick={() => setIsOpen(true)}
        >
          <Plus size={20} />
          <span>Add New Event</span>
        </button>
      ) : (
        <form className="event-form animate-fade-in" onSubmit={handleSubmit}>
          <h2 className="form-title">Create New Event</h2>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Event Title <span className="required">*</span>
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-textarea"
              placeholder="Enter event description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Date <span className="required">*</span>
              </label>
              <input
                id="date"
                type="date"
                className="form-input"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time" className="form-label">
                Time <span className="required">*</span>
              </label>
              <input
                id="time"
                type="time"
                className="form-input"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as EventPriority })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Event
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
