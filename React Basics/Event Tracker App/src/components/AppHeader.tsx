import { Calendar, Users, MapPin, Ticket, LineChart } from 'lucide-react'
import './AppHeader.css'

type TabType = 'events' | 'attendees' | 'venues' | 'tickets' | 'tracker'

interface AppHeaderProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  eventsCount: number
}

const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
  { id: 'events', label: 'Events', icon: <Calendar size={20} /> },
  { id: 'attendees', label: 'Attendees', icon: <Users size={20} /> },
  { id: 'venues', label: 'Venues', icon: <MapPin size={20} /> },
  { id: 'tickets', label: 'Tickets', icon: <Ticket size={20} /> },
  { id: 'tracker', label: 'Tracker', icon: <LineChart size={20} /> },
]

export default function AppHeader({ activeTab, onTabChange, eventsCount }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-branding">
          <Calendar size={32} className="header-logo" />
          <h1 className="header-title">Event Management</h1>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Total Events</span>
            <span className="stat-value">{eventsCount}</span>
          </div>
        </div>
      </div>

      <nav className="header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            title={tab.label}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  )
}
