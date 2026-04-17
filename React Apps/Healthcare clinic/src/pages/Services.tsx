import './Services.css';

export default function Services() {
  const services = [
    {
      icon: '🏥',
      title: 'General Consultation',
      description: 'Comprehensive health check-ups and general medical consultations with our experienced doctors.',
      features: ['Physical examination', 'Health assessment', 'Medical advice', 'Prescription services']
    },
    {
      icon: '❤️',
      title: 'Cardiology',
      description: 'Advanced cardiac care including diagnostics, treatment, and preventive heart health services.',
      features: ['ECG testing', 'Echocardiography', 'Stress testing', 'Cardiac rehabilitation']
    },
    {
      icon: '🦷',
      title: 'Dental Care',
      description: 'Complete dental solutions for your oral health including cleaning, restoration, and cosmetic services.',
      features: ['Teeth cleaning', 'Root canal treatment', 'Teeth whitening', 'Dental implants']
    },
    {
      icon: '👁️',
      title: 'Ophthalmology',
      description: 'Professional eye care services including vision correction and treatment of eye conditions.',
      features: ['Eye examination', 'Glasses prescription', 'Contact lenses', 'Cataract surgery']
    },
    {
      icon: '🧠',
      title: 'Neurology',
      description: 'Expert neurological care for brain and nervous system conditions.',
      features: ['Neurological assessment', 'EEG testing', 'Migraine treatment', 'Sleep disorders']
    },
    {
      icon: '👶',
      title: 'Pediatrics',
      description: 'Specialized medical care for infants, children, and adolescents.',
      features: ['Immunizations', 'Growth monitoring', 'Developmental screening', 'Pediatric treatment']
    },
    {
      icon: '💪',
      title: 'Physical Therapy',
      description: 'Rehabilitation and physical therapy to improve mobility and reduce pain.',
      features: ['Pain management', 'Sports injuries', 'Post-surgery rehabilitation', 'Exercise programs']
    },
    {
      icon: '🔬',
      title: 'Laboratory Services',
      description: 'Advanced diagnostic laboratory testing with quick and accurate results.',
      features: ['Blood tests', 'Pathology testing', 'COVID-19 testing', 'Allergy testing']
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Providing comprehensive medical care across multiple specialties</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-4">
        <div className="container">
          <div className="grid grid-2">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-header">
                  <span className="service-icon-large">{service.icon}</span>
                  <h3>{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                <div className="service-features">
                  <h4>Features:</h4>
                  <ul>
                    {service.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn btn-outline btn-sm">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="appointment-cta py-4">
        <div className="container text-center">
          <h2>Need Professional Medical Care?</h2>
          <p>Book an appointment with our specialists today</p>
          <button className="btn btn-sm">Book Appointment</button>
        </div>
      </section>
    </div>
  );
}
