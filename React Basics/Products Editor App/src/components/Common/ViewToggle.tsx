import './ViewToggle.css'

interface ViewToggleProps {
  currentView: 'grid' | 'list'
  onChange: (view: 'grid' | 'list') => void
}

export default function ViewToggle({ currentView, onChange }: ViewToggleProps) {
  return (
    <div className="view-toggle">
      <button
        className={`view-btn ${currentView === 'grid' ? 'active' : ''}`}
        onClick={() => onChange('grid')}
        title="Grid view"
      >
        <i className="bi bi-grid-3x3-gap"></i>
      </button>
      <button
        className={`view-btn ${currentView === 'list' ? 'active' : ''}`}
        onClick={() => onChange('list')}
        title="List view"
      >
        <i className="bi bi-list-ul"></i>
      </button>
    </div>
  )
}
