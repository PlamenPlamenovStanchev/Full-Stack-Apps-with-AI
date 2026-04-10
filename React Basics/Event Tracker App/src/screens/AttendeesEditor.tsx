import { useState } from 'react'
import { Plus } from 'lucide-react'
import AttendeeForm from '../components/AttendeeForm'
import AttendeeList from '../components/AttendeeList'
import { useData } from '../data/DataContext'
import { Attendee } from '../data/types'
import { toast } from 'sonner'
import './AttendeesEditor.css'

export default function AttendeesEditor() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | undefined>()
  const { attendees, deleteAttendee } = useData()

  const handleAddClick = () => {
    setSelectedAttendee(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (attendee: Attendee) => {
    setSelectedAttendee(attendee)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedAttendee(undefined)
  }

  const handleDeleteClick = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`
    )

    if (confirmed) {
      const success = deleteAttendee(id)
      if (success) {
        toast.success(`${name} deleted successfully! 🗑️`)
      } else {
        toast.error('Failed to delete attendee')
      }
    }
  }

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2 className="screen-title">Attendees</h2>
        <p className="screen-subtitle">
          Manage event attendees and registrations
        </p>
      </div>

      <button className="add-attendee-btn" onClick={handleAddClick}>
        <Plus size={20} />
        <span>Add Attendee</span>
      </button>

      <AttendeeList
        attendees={attendees}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <AttendeeForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        attendee={selectedAttendee}
      />
    </div>
  )
}
