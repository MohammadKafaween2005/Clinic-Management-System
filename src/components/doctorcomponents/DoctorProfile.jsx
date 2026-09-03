export default function DoctorProfile() {
  return (
    <section className="doctor-profile-section">
      <div className="doctor-profile-card">
        
        <div className="doctor-profile-top">
          <div className="doctor-profile-avatar">
            HK
          </div>

          <div>
            <h2>Dr. Hani Kafaween</h2>
            <p>Doctor</p>
          </div>
        </div>

        <div className="doctor-profile-info-grid">
          
          <div className="doctor-profile-info-box">
            <span className="doctor-profile-info-label">
              Email
            </span>

            <span className="doctor-profile-info-value">
              doctor@hanikafaweenclinic.com
            </span>
          </div>

          <div className="doctor-profile-info-box">
            <span className="doctor-profile-info-label">
              Phone
            </span>

            <span className="doctor-profile-info-value">
              +962 799191974
            </span>
          </div>

          <div className="doctor-profile-info-box">
            <span className="doctor-profile-info-label">
              Clinic
            </span>

            <span className="doctor-profile-info-value">
              Dr. Hani Kafaween Clinic
            </span>
          </div>

          <div className="doctor-profile-info-box">
            <span className="doctor-profile-info-label">
              Status
            </span>

            <span className="doctor-profile-info-value">
              Active
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}