export default function Services() {
  return (
    <section className="services-section" id="services">
      <p className="services-label">SERVICES</p>

      <h2 className="services-title">
        Comprehensive clinical services
      </h2>

      <div className="services-grid">

        <div className="service-card">
          <span className="service-icon">🩺</span>
          <h3>General Consultations</h3>
          <p>
            Evidence-based care tailored to your individual needs and health goals.
          </p>
        </div>

        <div className="service-card">
          <span className="service-icon">💊</span>
          <h3>Chronic Disease Management</h3>
          <p>
            Ongoing support and treatment plans for long-term health conditions.
          </p>
        </div>

        <div className="service-card">
          <span className="service-icon">🔬</span>
          <h3>Preventive Health Checks</h3>
          <p>
            Routine health assessments focused on prevention and early detection.
          </p>
        </div>

        <div className="service-card">
          <span className="service-icon">🧠</span>
          <h3>Mental Health Support</h3>
          <p>
            Supportive consultations focused on emotional and psychological well-being.
          </p>
        </div>

        <div className="service-card">
          <span className="service-icon">👩‍⚕️</span>
          <h3>Women's Health</h3>
          <p>
            Personalised care addressing women's health needs across different stages of life.
          </p>
        </div>

        <div className="service-card">
          <span className="service-icon">💉</span>
          <h3>Immunisations</h3>
          <p>
            Vaccination services based on individual health needs and recommended schedules.
          </p>
        </div>

      </div>
    </section>
  );
}