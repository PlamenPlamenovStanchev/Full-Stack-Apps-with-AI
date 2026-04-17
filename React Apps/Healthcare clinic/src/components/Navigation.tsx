import { Link } from 'react-router-dom';
import './Navigation.css';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <span className="brand-icon">🏥</span>
            <span className="brand-text">Healthcare Clinic</span>
          </Link>

          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link" onClick={closeMenu}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/news" className="nav-link" onClick={closeMenu}>
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacts" className="nav-link" onClick={closeMenu}>
                Contacts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
