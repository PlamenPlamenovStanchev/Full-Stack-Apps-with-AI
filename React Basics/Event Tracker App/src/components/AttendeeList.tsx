import { Mail, Phone, Edit2, Trash2 } from 'lucide-react'
import { Attendee } from '../data/types'
import './AttendeeList.css'

interface AttendeeListProps {
  attendees: Attendee[]
  onEdit: (attendee: Attendee) => void
  onDelete: (id: string, name: string) => void
}

export default function AttendeeList({ attendees, onEdit, onDelete }: AttendeeListProps) {
  if (attendees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No Attendees Yet</h3>
        <p>Add your first attendee to get started!</p>
      </div>
    )
  }

  return (
    <div className="attendee-table-container">
      <table className="attendee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id} className="animate-slide-in-right">
              <td>
                <span className="attendee-name">{attendee.name}</span>
              </td>
              <td>
                <span className="attendee-contact">
                  <Mail size={16} />
                  {attendee.email}
                </span>
              </td>
              <td>
                <span className="attendee-contact">
                  <Phone size={16} />
                  {attendee.phone}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(attendee)}
                    title="Edit attendee"
                    aria-label={`Edit ${attendee.name}`}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(attendee.id, attendee.name)}
                    title="Delete attendee"
                    aria-label={`Delete ${attendee.name}`}
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
