import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";

export default function PatientHome() {
  const { setSection } = useContext(PatientContext);

  return (
    <section className="patient-home">
      <div className="patient-home-container">
        <p className="patient-home-date">Thursday, 14 August 2026</p>

        <h2 className="patient-home-greeting">Good morning, James.</h2>

        {/* Upcoming Appointment */}

        <div className="patient-upcoming-card">
          <div className="patient-upcoming-top">
            <span className="patient-upcoming-label">UPCOMING APPOINTMENT</span>

            <span className="patient-status scheduled">● Scheduled</span>
          </div>

          <h2 className="patient-appointment-time">10:30 AM</h2>

          <p className="patient-appointment-date">2026-08-16 · 15 min</p>

          <div className="patient-reason-box">
            <span>Reason for visit</span>
            <strong>Prescription renewal</strong>
          </div>

          <div className="patient-doctor-box">
            <div className="patient-doctor-avatar">HK</div>

            <div>
              <strong>Dr. Hani Kafaween</strong>
              <p>General Practitioner & Family Medicine</p>
            </div>
          </div>

          <div className="patient-appointment-actions">
            <button
              type="button"
              className="patient-reschedule-button"
              onClick={() => setSection("bookAppointment")}
            >
              Reschedule
            </button>

            <button type="button" className="patient-cancel-button">
              Cancel
            </button>
          </div>
        </div>

        {/* Book New Appointment */}

        <button
          type="button"
          className="patient-book-new-card"
          onClick={() => setSection("bookAppointment")}
        >
          <div className="patient-book-new-icon">+</div>

          <div className="patient-book-new-text">
            <h3>Book a new appointment</h3>
            <p>Select a date and time with Dr. Hani Kafaween</p>
          </div>

          <span className="patient-book-new-arrow">›</span>
        </button>

        {/* Recent Visits */}

        <div className="patient-recent-section">
          <h3>Recent Visits</h3>

          <div className="patient-recent-card">
            <div className="patient-recent-left">
              <div className="patient-recent-icon">▢</div>

              <div>
                <strong>Annual health check</strong>
                <p>2026-08-14 at 09:00 AM</p>
              </div>
            </div>

            <span className="patient-status completed">● Completed</span>
          </div>
        </div>

        {/* Clinic Contact */}

        <div className="patient-clinic-card">
          <div className="patient-clinic-icon">☎</div>

          <div>
            <strong>Dr. Hani Kafaween Clinic</strong>
            <p>(02) 9876 5432 · Mon - Fri 8 AM - 6 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
