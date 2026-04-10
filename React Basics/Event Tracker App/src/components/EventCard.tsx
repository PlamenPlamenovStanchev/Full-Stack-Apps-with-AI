import { useState } from 'react'
import { Trash2, Edit2, CheckCircle2, Circle, Clock, Tag, AlertCircle } from 'lucide-react'
import { Event } from '../data/types'
import { toast } from 'sonner'
import './EventCard.css'

interface EventCardProps {
  event: Event
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  onUpdate: (id: string, event: Partial<Event>) => void
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    work: '#3b82f6',
    personal: '#8b5cf6',
    meeting: '#10b981',
    deadline: '#ef4444',
    other: '#6b7280',
  }
  return colors[category] || colors.other
}

const getPriorityIcon = (priority: string) => {
  const icons: Record<string, JSX.Element> = {
    low: <AlertCircle size={16} style={{ color: '#10b981' }} />,
    medium: <AlertCircle size={16} style={{ color: '#f59e0b' }} />,
    high: <AlertCircle size={16} style={{ color: '#ef4444' }} />,
  }
  return icons[priority] || icons.medium
}

export default function EventCard({
  event,
  onDelete,
  onToggle,
  onUpdate,
}: EventCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(event.title)
  const [editDescription, setEditDescription] = useState(event.description)

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      toast.error('Title cannot be empty')
      return
    }

    onUpdate(event.id, {
      title: editTitle,
      description: editDescription,
    })

    toast.success('Event updated! ✏️')
    setIsEditing(false)
  }

  const handleDeleteClick = () => {
    onDelete(event.id)
    toast.success('Event deleted! 🗑️')
  }

  return (
    <div
      className={`event-card ${event.completed ? 'completed' : ''} animate-slide-in-right`}
      style={
        !event.completed
          ? {
              borderLeftColor: getCategoryColor(event.category),
            }
          : undefined
      }
    >
      <div className="event-card-header">
        <div className="event-checkbox">
          <button
            className="checkbox-btn"
            onClick={() => onToggle(event.id)}
            title={event.completed ? 'Mark as pending' : 'Mark as completed'}
          >
            {event.completed ? (
              <CheckCircle2 size={24} className="icon-checked" />
            ) : (
              <Circle size={24} className="icon-unchecked" />
            )}
          </button>
        </div>

        <div className="event-main-content" style={{ flex: 1 }}>
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="event-title-input"
              autoFocus
            />
          ) : (
            <h3 className={`event-title ${event.completed ? 'line-through' : ''}`}>
              {event.title}
            </h3>
          )}

          {event.description && (
            <>
              {isEditing ? (
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="event-description-input"
                  rows={2}
                />
              ) : (
                <p className={`event-description ${event.completed ? 'line-through' : ''}`}>
                  {event.description}
                </p>
              )}
            </>
          )}

          <div className="event-meta">
            <div className="meta-item">
              <Clock size={16} />
              <span>
                {event.date} at {event.time}
              </span>
            </div>

            <div className="meta-item" style={{ color: getCategoryColor(event.category) }}>
              <Tag size={16} />
              <span>{event.category}</span>
            </div>

            <div className="meta-item">
              {getPriorityIcon(event.priority)}
              <span className={`priority-${event.priority}`}>{event.priority}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="event-actions">
        {isEditing ? (
          <>
            <button className="action-btn save-btn" onClick={handleSaveEdit}>
              Save
            </button>
            <button
              className="action-btn cancel-btn"
              onClick={() => {
                setIsEditing(false)
                setEditTitle(event.title)
                setEditDescription(event.description)
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="action-btn edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit event"
            >
              <Edit2 size={18} />
            </button>
            <button
              className="action-btn delete-btn"
              onClick={handleDeleteClick}
              title="Delete event"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
