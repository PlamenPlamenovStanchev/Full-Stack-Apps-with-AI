import './About.css';

export default function About() {
  const team = [
    { name: 'Dr. James Wilson', role: 'Chief Medical Officer', icon: '👨‍⚕️' },
    { name: 'Dr. Emily Thompson', role: 'Head of Cardiology', icon: '👩‍⚕️' },
    { name: 'Dr. Michael Chen', role: 'Neurology Specialist', icon: '👨‍⚕️' },
    { name: 'Dr. Sarah Johnson', role: 'Ophthalmology Expert', icon: '👩‍⚕️' }
  ];

  const milestones = [
    { year: '2010', achievement: 'Clinic Founded' },
    { year: '2015', achievement: 'Expanded to 3 Locations' },
    { year: '2018', achievement: 'Introduced Telemedicine' },
    { year: '2022', achievement: 'ISO 9001 Certified' },
    { year: '2024', achievement: 'Advanced Cardiology Department' }
  ];

  const values = [
    { icon: '❤️', title: 'Patient Care', description: 'We prioritize patient well-being and satisfaction above all else' },
    { icon: '🔬', title: 'Excellence', description: 'Committed to providing highest quality medical services' },
    { icon: '🤝', title: 'Compassion', description: 'Treating patients with empathy and understanding' },
    { icon: '🌱', title: 'Growth', description: 'Continuously improving and innovating our services' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>About Healthcare Clinic</h1>
          <p>Leading the way in comprehensive healthcare services</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-4">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                To provide accessible, affordable, and high-quality healthcare services to our patients,
                enhancing their quality of life through compassionate care and medical excellence.
              </p>
              <p>
                We are dedicated to combining cutting-edge medical technology with a patient-centered approach,
                ensuring every individual receives personalized and compassionate treatment.
              </p>
            </div>
            <div className="mission-image">
              <div className="mission-icon">🏥</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-4">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid grid-2">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-4">
        <div className="container">
          <h2 className="section-title">Our Medical Team</h2>
          <div className="grid grid-2">
            {team.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-avatar">{member.icon}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-4">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>{milestone.year}</h4>
                  <p>{milestone.achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-4">
        <div className="container">
          <div className="grid grid-4">
            <div className="stat-card">
              <div className="stat-number">15K+</div>
              <p>Happy Patients</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <p>Medical Professionals</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <p>Services Available</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">14</div>
              <p>Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
