import { Calendar, InboxIcon } from 'lucide-react'
import './Header.css'

interface HeaderProps {
  eventsCount: number
}

export default function Header({ eventsCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-icon-wrapper">
            <Calendar size={32} className="header-icon" />
          </div>
          <h1 className="header-title">Event Tracker</h1>
        </div>
        <div className="header-stats">
          <div className="stat-badge">
            <InboxIcon size={18} />
            <span>{eventsCount} Events</span>
          </div>
        </div>
      </div>
    </header>
  )
}
