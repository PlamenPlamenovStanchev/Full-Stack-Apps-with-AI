import { useState } from 'react';
import './Contacts.css';

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const locations = [
    {
      icon: '🏥',
      name: 'Main Clinic',
      address: '123 Medical Center Road, Healthcare City',
      phone: '+1 (555) 123-4567',
      email: 'info@healthcareclinic.com',
      hours: 'Mon-Fri: 8 AM - 8 PM, Sat-Sun: 10 AM - 6 PM'
    },
    {
      icon: '🏢',
      name: 'Downtown Branch',
      address: '456 Business Plaza, Suite 200, Healthcare City',
      phone: '+1 (555) 234-5678',
      email: 'downtown@healthcareclinic.com',
      hours: 'Mon-Fri: 9 AM - 9 PM, Sat: 10 AM - 4 PM'
    },
    {
      icon: '🏥',
      name: 'Westside Clinic',
      address: '789 Health Street, West District, Healthcare City',
      phone: '+1 (555) 345-6789',
      email: 'westside@healthcareclinic.com',
      hours: 'Mon-Sun: 10 AM - 7 PM'
    }
  ];

  const services = [
    { icon: '☎️', title: 'Phone', description: 'Call us anytime for urgent care', value: '+1 (555) 123-4567' },
    { icon: '📧', title: 'Email', description: 'Send us your inquiries', value: 'info@healthcareclinic.com' },
    { icon: '💬', title: 'Chat', description: '24/7 live chat support', value: 'Available on our website' },
    { icon: '🚑', title: 'Emergency', description: 'Emergency ambulance service', value: '+1 (555) 999-9999' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help and answer any questions you have</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info py-4">
        <div className="container">
          <div className="grid grid-2">
            {services.map((service, index) => (
              <div className="info-card" key={index}>
                <span className="info-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <strong>{service.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Locations */}
      <section className="contact-section py-4">
        <div className="container">
          <div className="contact-wrapper">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                {submitted && (
                  <div className="success-message">
                    ✓ Thank you! Your message has been sent successfully.
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Book an Appointment</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-submit">Send Message</button>
              </form>
            </div>

            {/* Locations */}
            <div className="locations-wrapper">
              <h2>Our Locations</h2>
              <div className="locations-grid">
                {locations.map((location, index) => (
                  <div className="location-card" key={index}>
                    <div className="location-icon">{location.icon}</div>
                    <h3>{location.name}</h3>
                    <p className="location-detail">
                      📍 {location.address}
                    </p>
                    <p className="location-detail">
                      ☎️ {location.phone}
                    </p>
                    <p className="location-detail">
                      📧 {location.email}
                    </p>
                    <p className="location-detail location-hours">
                      🕐 {location.hours}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-placeholder">
          <div className="map-content">
            <div className="map-icon">🗺️</div>
            <h3>Map Coming Soon</h3>
            <p>Interactive map with all our clinic locations will be displayed here</p>
          </div>
        </div>
      </section>
    </div>
  );
}
