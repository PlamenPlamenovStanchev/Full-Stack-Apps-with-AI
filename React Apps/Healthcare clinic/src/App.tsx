import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Services from './pages/Services';
import News from './pages/News';
import NewsItem from './pages/NewsItem';
import About from './pages/About';
import Contacts from './pages/Contacts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsItem />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Healthcare Clinic</h3>
                <p>Providing comprehensive medical care with compassion and expertise.</p>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/services">Services</a></li>
                  <li><a href="/news">News</a></li>
                  <li><a href="/about">About</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Contact</h4>
                <p>📞 +1 (555) 123-4567</p>
                <p>📧 info@healthcareclinic.com</p>
                <p>📍 123 Medical Center Road</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Healthcare Clinic. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
