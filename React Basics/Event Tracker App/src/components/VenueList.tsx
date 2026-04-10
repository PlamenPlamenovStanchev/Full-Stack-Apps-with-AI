import { MapPin, Users, Edit2, Trash2 } from 'lucide-react'
import { Venue } from '../data/types'
import './VenueList.css'

interface VenueListProps {
  venues: Venue[]
  onEdit: (venue: Venue) => void
  onDelete: (id: string, name: string) => void
}

export default function VenueList({ venues, onEdit, onDelete }: VenueListProps) {
  if (venues.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📍</div>
        <h3>No Venues Yet</h3>
        <p>Add your first venue to get started!</p>
      </div>
    )
  }

  return (
    <div className="venue-table-container">
      <table className="venue-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="animate-slide-in-right">
              <td>
                <span className="venue-name">
                  <MapPin size={16} />
                  {venue.name}
                </span>
              </td>
              <td>
                <span className="venue-address">{venue.address}</span>
              </td>
              <td>
                <span className="venue-capacity">
                  <Users size={16} />
                  {venue.capacity.toLocaleString()} guests
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(venue)}
                    title="Edit venue"
                    aria-label={`Edit ${venue.name}`}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(venue.id, venue.name)}
                    title="Delete venue"
                    aria-label={`Delete ${venue.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
