export default function About() {
  return (
    <section className="about-page">

      <div className="about-benefits">

        <div className="about-card">
          <span className="about-icon">🏥</span>
          <h3>Accessible Care</h3>
          <p>
            Patient-focused medical care designed to be accessible,
            convenient, and tailored to individual needs.
          </p>
        </div>

        <div className="about-card">
          <span className="about-icon">⏱️</span>
          <h3>Same Day</h3>
          <p>
            Same-day appointments may be available for patients requiring
            timely medical attention.
          </p>
        </div>

        <div className="about-card">
          <span className="about-icon">🔒</span>
          <h3>Private & Secure</h3>
          <p>
            Your medical information is handled with privacy,
            confidentiality, and professional care.
          </p>
        </div>

        <div className="about-card">
          <span className="about-icon">📞</span>
          <h3>Telehealth</h3>
          <p>
            Remote consultations may be available when appropriate
            and clinically suitable.
          </p>
        </div>

      </div>


      <div className="about-doctor">

        <p className="about-label">
          ABOUT THE DOCTOR
        </p>

        <h1 className="about-title">
          Trusted, personalised medical care
        </h1>

        <p className="about-description">
          Dr. Hani Kafaween is committed to providing comprehensive,
          patient-centered medical care for individuals and families.
          His approach focuses on understanding each patient's needs,
          providing clear medical guidance, and supporting long-term
          health and well-being.
        </p>

        <p className="about-description secondary">
          The clinic combines professional medical care with a welcoming
          and personal approach, helping patients make informed decisions
          about their health at every stage of life.
        </p>

        <div className="about-tags">
          <span>General Medicine</span>
          <span>Preventive Care</span>
          <span>Family Health</span>
          <span>Chronic Care</span>
        </div>

      </div>

    </section>
  );
}