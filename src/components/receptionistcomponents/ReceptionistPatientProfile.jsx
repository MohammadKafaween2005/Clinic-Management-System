import { useContext, useState } from "react";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistPatientProfile() {
  const { setSection } = useContext(ReceptionistContext);

  const [tab, setTab] = useState("overview");

  return (
    <section className="receptionist-patient-profile">
      <button
        type="button"
        className="receptionist-profile-back"
        onClick={() => setSection("patients")}
      >
        ← Back to Patients
      </button>

      {/* PATIENT TOP CARD */}

      <div className="receptionist-profile-card">
        <div className="receptionist-profile-top">
          <div className="receptionist-profile-avatar">JT</div>

          <div className="receptionist-profile-main">
            <h2>James Thornton</h2>

            <p>P-0001 · Male · Born 1982-03-15</p>
          </div>
        </div>

        {/* CONTACT INFORMATION */}

        <div className="receptionist-profile-contact-grid">
          <div className="receptionist-profile-info-box">
            <span>Phone</span>
            <strong>(02) 8123 4567</strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span>Email</span>
            <strong>j.thornton@email.com</strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span>Blood Type</span>
            <strong>A+</strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span>Allergies</span>
            <strong>Penicillin</strong>
          </div>
        </div>

        {/* ALLERGY */}

        <div className="receptionist-profile-allergy">
          ⚠ Allergy alert: Penicillin
        </div>

        {/* TABS */}

        <div className="receptionist-profile-tabs">
          <button
            type="button"
            className={`receptionist-profile-tab ${
              tab === "overview" ? "active" : ""
            }`}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>

          <button
            type="button"
            className={`receptionist-profile-tab ${
              tab === "appointments" ? "active" : ""
            }`}
            onClick={() => setTab("appointments")}
          >
            Appointments
          </button>
        </div>
      </div>

      {/* OVERVIEW */}

      {tab === "overview" && (
        <div className="receptionist-profile-bottom">
          <div className="receptionist-profile-details-card">
            <h3>Patient Details</h3>

            <div className="receptionist-profile-details-grid">
              <div className="receptionist-profile-detail">
                <span>Age</span>
                <strong>42 years</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Date of Birth</span>
                <strong>1982-03-15</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Gender</span>
                <strong>Male</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Blood Type</span>
                <strong>A+</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Last Visit</span>
                <strong>2026-07-28</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Next Appointment</span>
                <strong>2026-08-16</strong>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="receptionist-profile-side">
            <div className="receptionist-profile-next">
              <span>Next Appointment</span>

              <strong>2026-08-16</strong>

              <p>Prescription renewal · 15 min</p>
            </div>

            <div className="receptionist-profile-allergies-card">
              <span>⚠ Known Allergies</span>

              <strong>Penicillin</strong>
            </div>
          </div>
        </div>
      )}

      {/* APPOINTMENTS TAB */}

      {tab === "appointments" && (
        <div className="receptionist-profile-appointments">
          <div className="receptionist-profile-appointment">
            <div>
              <h3>Prescription renewal</h3>

              <p>2026-08-16 · 10:30 AM · 15 min</p>
            </div>

            <span className="receptionist-profile-appointment-status scheduled">
              ● Scheduled
            </span>
          </div>

          <div className="receptionist-profile-appointment">
            <div>
              <h3>Annual health check</h3>

              <p>2026-07-28 · 09:00 AM · 30 min</p>
            </div>

            <span className="receptionist-profile-appointment-status completed">
              ● Completed
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
