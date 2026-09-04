export default function PatientProfile() {
  return (
    <section className="patient-profile-section">
      <div className="patient-profile-card">
        <div className="patient-profile-top">
          <div className="patient-profile-avatar">JT</div>

          <div>
            <h2>James Thornton</h2>
            <p>Patient</p>
          </div>
        </div>

        <div className="patient-profile-info-grid">
          <div className="patient-profile-info-box">
            <span className="patient-profile-info-label">Email</span>
            <strong className="patient-profile-info-value">
              j.thornton@email.com
            </strong>
          </div>

          <div className="patient-profile-info-box">
            <span className="patient-profile-info-label">Phone</span>
            <strong className="patient-profile-info-value">
              (02) 8123 4567
            </strong>
          </div>

          <div className="patient-profile-info-box">
            <span className="patient-profile-info-label">Date of Birth</span>
            <strong className="patient-profile-info-value">1982-03-15</strong>
          </div>

          <div className="patient-profile-info-box">
            <span className="patient-profile-info-label">Gender</span>
            <strong className="patient-profile-info-value">Male</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
