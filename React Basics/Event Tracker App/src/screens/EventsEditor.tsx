import { useState } from 'react'
import EventForm from '../components/EventForm'
import EventList from '../components/EventList'
import { useData } from '../data/DataContext'
import './EventsEditor.css'

export default function EventsEditor() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const { events, deleteEvent, updateEvent } = useData()

  const filteredEvents = events.filter(e => {
    if (filter === 'completed') return e.completed
    if (filter === 'pending') return !e.completed
    return true
  })

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2 className="screen-title">Events</h2>
        <p className="screen-subtitle">Create and manage your events</p>
      </div>

      <EventForm />

      <div className="filter-section">
        <span className="filter-label">Filter:</span>
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Events ({events.length})
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({events.filter(e => !e.completed).length})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({events.filter(e => e.completed).length})
        </button>
      </div>

      <EventList
        events={filteredEvents}
        onDelete={deleteEvent}
        onToggle={(id) => updateEvent(id, { completed: true })}
        onUpdate={updateEvent}
      />
    </div>
  )
}
