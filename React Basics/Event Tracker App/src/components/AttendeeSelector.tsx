import { useState } from 'react'
import { Search } from 'lucide-react'
import { Attendee } from '../data/types'
import './AttendeeSelector.css'

interface AttendeeSelectorProps {
  attendees: Attendee[]
  onSelect: (attendee: Attendee) => void
  onClose: () => void
}

export default function AttendeeSelector({ attendees, onSelect, onClose }: AttendeeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="selector-overlay">
      <div className="selector-modal animate-fade-in">
        <div className="selector-header">
          <h2>Select Attendee</h2>
          <button
            type="button"
            className="close-selector-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="selector-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className="selector-list">
          {filteredAttendees.length === 0 ? (
            <div className="no-results">No attendees found</div>
          ) : (
            filteredAttendees.map((attendee) => (
              <button
                key={attendee.id}
                className="selector-item"
                onClick={() => {
                  onSelect(attendee)
                  onClose()
                }}
              >
                <div className="attendee-name">{attendee.name}</div>
                <div className="attendee-email">{attendee.email}</div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
