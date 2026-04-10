import { useState } from 'react'
import { Search } from 'lucide-react'
import { Event } from '../data/types'
import './EventSelector.css'

interface EventSelectorProps {
  events: Event[]
  onSelect: (event: Event) => void
  onClose: () => void
}

export default function EventSelector({ events, onSelect, onClose }: EventSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.date.includes(searchTerm)
  )

  return (
    <div className="selector-overlay">
      <div className="selector-modal animate-fade-in">
        <div className="selector-header">
          <h2>Select Event</h2>
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
            placeholder="Search by title or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className="selector-list">
          {filteredEvents.length === 0 ? (
            <div className="no-results">No events found</div>
          ) : (
            filteredEvents.map((event) => (
              <button
                key={event.id}
                className="selector-item"
                onClick={() => {
                  onSelect(event)
                  onClose()
                }}
              >
                <div className="event-title">{event.title}</div>
                <div className="event-date">{event.date} at {event.time}</div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
