import './Home.css';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Your Health is Our Priority</h1>
          <p className="hero-subtitle">Providing comprehensive medical care with compassion and expertise</p>
          <button className="btn btn-appointment">Book an Appointment</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-4">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Expert Doctors</h3>
              <p>Highly qualified and experienced medical professionals dedicated to your care</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Advanced Technology</h3>
              <p>State-of-the-art medical equipment for accurate diagnosis and treatment</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💙</div>
              <h3>Patient Care</h3>
              <p>Compassionate and personalized healthcare tailored to your needs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>24/7 Availability</h3>
              <p>Round-the-clock emergency services and telemedicine consultation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Multiple Locations</h3>
              <p>Conveniently located clinics across the city for easy access</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Certified Quality</h3>
              <p>ISO certified with highest standards of medical practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="services-preview py-4">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="grid grid-2">
            <div className="service-item">
              <div className="service-icon">🏥</div>
              <h3>General Consultation</h3>
              <p>Comprehensive health check-ups and general medical consultations</p>
            </div>
            <div className="service-item">
              <div className="service-icon">❤️</div>
              <h3>Cardiology</h3>
              <p>Advanced cardiac care including diagnostics and treatment</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🦷</div>
              <h3>Dental Care</h3>
              <p>Complete dental solutions for your oral health</p>
            </div>
            <div className="service-item">
              <div className="service-icon">👁️</div>
              <h3>Ophthalmology</h3>
              <p>Eye care services and vision correction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta py-4">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p>Schedule your appointment today and take the first step towards better health</p>
          <button className="btn">Contact Us</button>
        </div>
      </section>
    </div>
  );
}
