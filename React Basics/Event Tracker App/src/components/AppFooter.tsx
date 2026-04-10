import './AppFooter.css'

export default function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-title">Event Management</h4>
          <p className="footer-text">Manage your events, attendees, venues, and tickets all in one place.</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#events">Events</a></li>
            <li><a href="#attendees">Attendees</a></li>
            <li><a href="#venues">Venues</a></li>
            <li><a href="#tickets">Tickets</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Support</h4>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">&copy; {currentYear} Event Management App. All rights reserved.</p>
      </div>
    </footer>
  )
}
