import { useState } from 'react'
import AppHeader from './components/AppHeader'
import EventsEditor from './screens/EventsEditor'
import AttendeesEditor from './screens/AttendeesEditor'
import VenuesEditor from './screens/VenuesEditor'
import TicketsEditor from './screens/TicketsEditor'
import Tracker from './screens/Tracker'
import AppFooter from './components/AppFooter'
import { DataProvider, useData } from './data/DataContext'
import './App.css'

type TabType = 'events' | 'attendees' | 'venues' | 'tickets' | 'tracker'

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('events')
  const { events } = useData()

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventsEditor />
      case 'attendees':
        return <AttendeesEditor />
      case 'venues':
        return <VenuesEditor />
      case 'tickets':
        return <TicketsEditor />
      case 'tracker':
        return <Tracker />
      default:
        return null
    }
  }

  return (
    <div className="app-layout">
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} eventsCount={events.length} />
      <main className="app-main">
        <div className="app-content">
          {renderContent()}
        </div>
      </main>
      <AppFooter />
    </div>
  )
}

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  )
}

export default App
