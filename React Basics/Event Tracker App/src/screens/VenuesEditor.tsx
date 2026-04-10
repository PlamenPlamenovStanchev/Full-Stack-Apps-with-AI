import { useState } from 'react'
import { Plus } from 'lucide-react'
import VenueForm from '../components/VenueForm'
import VenueList from '../components/VenueList'
import { useData } from '../data/DataContext'
import { Venue } from '../data/types'
import { toast } from 'sonner'
import './VenuesEditor.css'

export default function VenuesEditor() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState<Venue | undefined>()
  const { venues, deleteVenue } = useData()

  const handleAddClick = () => {
    setSelectedVenue(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (venue: Venue) => {
    setSelectedVenue(venue)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedVenue(undefined)
  }

  const handleDeleteClick = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`
    )

    if (confirmed) {
      const success = deleteVenue(id)
      if (success) {
        toast.success(`${name} deleted successfully! 🗑️`)
      } else {
        toast.error('Failed to delete venue')
      }
    }
  }

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2 className="screen-title">Venues</h2>
        <p className="screen-subtitle">
          Manage event venues and locations
        </p>
      </div>

      <button className="add-venue-btn" onClick={handleAddClick}>
        <Plus size={20} />
        <span>Add Venue</span>
      </button>

      <VenueList
        venues={venues}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <VenueForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        venue={selectedVenue}
      />
    </div>
  )
}
