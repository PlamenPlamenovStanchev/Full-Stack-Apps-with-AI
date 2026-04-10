import { Event } from '../data/types'
import EventCard from './EventCard'
import { InboxIcon } from 'lucide-react'
import './EventList.css'

interface EventListProps {
  events: Event[]
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  onUpdate: (id: string, event: Partial<Event>) => void
}

export default function EventList({
  events,
  onDelete,
  onToggle,
  onUpdate,
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <InboxIcon size={48} />
        </div>
        <h3 className="empty-title">No events yet</h3>
        <p className="empty-text">Create your first event to get started!</p>
      </div>
    )
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
