import './Header.css'

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <i className="bi bi-box-seam"></i>
          </div>
          <div>
            <h1 className="app-title">Products Editor</h1>
            <p className="app-subtitle">Manage your inventory efficiently</p>
          </div>
        </div>

        <nav className="header-nav">
          <button className="nav-btn" title="Settings">
            <i className="bi bi-gear-fill"></i>
          </button>
          <button className="nav-btn" title="Help">
            <i className="bi bi-question-circle-fill"></i>
          </button>
          <button className="nav-btn" title="Notifications">
            <i className="bi bi-bell-fill"></i>
          </button>
        </nav>
      </div>
    </header>
  )
}
