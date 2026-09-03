import { useState, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorViewRecord() {
  const [recordTab, setRecordTab] = useState("overview");
  const [showAddRecord, setShowAddRecord] = useState(false);

  const { setSection } = useContext(DoctorContext);

  return (
    <section className="doctor-record-page">

      <button
        className="record-back-button"
        onClick={() => setSection("patients")}
      >
        ← Back to Patients
      </button>


      <div className="record-profile-card">

        <div className="record-profile-top">

          <div className="record-patient-main">

            <div className="record-avatar">
              JT
            </div>

            <div>
              <h2>James Thornton</h2>

              <p>
                P-0001 · Male · Born 1982-03-15
              </p>
            </div>

          </div>


          <button
            className="record-add-button"
            onClick={() => setShowAddRecord(true)}
          >
            + Add Record
          </button>

        </div>


        <div className="record-contact-grid">

          <div className="record-info-box">
            <span>Phone</span>
            <strong>(02) 8123 4567</strong>
          </div>

          <div className="record-info-box">
            <span>Email</span>
            <strong>j.thornton@email.com</strong>
          </div>

          <div className="record-info-box">
            <span>Blood Type</span>
            <strong>A+</strong>
          </div>

          <div className="record-info-box">
            <span>Allergies</span>
            <strong>Penicillin</strong>
          </div>

        </div>


        <div className="record-allergy-alert">
          ⚠ Allergy alert: Penicillin
        </div>


        <div className="record-tabs">

          <button
            className={`record-tab ${
              recordTab === "overview" ? "active" : ""
            }`}
            onClick={() => setRecordTab("overview")}
          >
            Overview
          </button>


          <button
            className={`record-tab ${
              recordTab === "appointments" ? "active" : ""
            }`}
            onClick={() => setRecordTab("appointments")}
          >
            Appointments
          </button>


          <button
            className={`record-tab ${
              recordTab === "history" ? "active" : ""
            }`}
            onClick={() => setRecordTab("history")}
          >
            Medical History
          </button>

        </div>

      </div>


      {/* ADD RECORD FORM */}

      {showAddRecord && (
        <div className="new-medical-record-card">

          <h3>New Medical Record</h3>


          <div className="new-record-top">

            <div className="new-record-field">

              <label>
                Diagnosis
              </label>

              <input
                type="text"
                placeholder="Primary diagnosis"
              />

            </div>


            <div className="new-record-field">

              <label>
                Treatment
              </label>

              <input
                type="text"
                placeholder="Medications or treatment plan"
              />

            </div>

          </div>


          <div className="new-record-field">

            <label>
              Doctor Notes
            </label>

            <textarea
              placeholder="Clinical observations, instructions, follow-up plan..."
            ></textarea>

          </div>


          <div className="new-record-buttons">

            <button
              type="button"
              className="new-record-cancel"
              onClick={() => setShowAddRecord(false)}
            >
              Cancel
            </button>


            <button
              type="button"
              className="new-record-save"
            >
              Save Record
            </button>

          </div>

        </div>
      )}


      {/* OVERVIEW */}

      {recordTab === "overview" && (
        <div className="record-bottom-grid">

          <div className="record-details-card">

            <h3>
              Patient Details
            </h3>


            <div className="record-details-grid">

              <div className="record-detail-box">
                <span>Age</span>
                <strong>42 years</strong>
              </div>


              <div className="record-detail-box">
                <span>Date of Birth</span>
                <strong>1982-03-15</strong>
              </div>


              <div className="record-detail-box">
                <span>Gender</span>
                <strong>Male</strong>
              </div>


              <div className="record-detail-box">
                <span>Blood Type</span>
                <strong>A+</strong>
              </div>


              <div className="record-detail-box">
                <span>Last Visit</span>
                <strong>2026-07-28</strong>
              </div>


              <div className="record-detail-box">
                <span>Next Appointment</span>
                <strong>2026-08-16</strong>
              </div>

            </div>

          </div>


          <div className="record-side-column">

            <div className="record-next-card">

              <span>
                Next Appointment
              </span>

              <strong>
                2026-08-16
              </strong>

              <p>
                Prescription renewal · 15 min
              </p>

            </div>


            <div className="record-allergies-card">

              <span>
                ⚠ Known Allergies
              </span>

              <strong>
                Penicillin
              </strong>

            </div>

          </div>

        </div>
      )}


      {/* APPOINTMENTS */}

      {recordTab === "appointments" && (
        <div className="patient-record-appointments">

          <div className="patient-record-appointment">

            <div className="patient-record-time">
              09a
            </div>


            <div className="patient-record-appointment-info">

              <h3>
                Annual health check
              </h3>

              <p>
                2026-08-14 · 09:00 AM · 30 min
              </p>

            </div>


            <span className="patient-record-status completed">
              ● Completed
            </span>

          </div>


          <div className="patient-record-appointment">

            <div className="patient-record-time">
              10a
            </div>


            <div className="patient-record-appointment-info">

              <h3>
                Prescription renewal
              </h3>

              <p>
                2026-08-16 · 10:30 AM · 15 min
              </p>

            </div>


            <span className="patient-record-status scheduled">
              ● Scheduled
            </span>

          </div>

        </div>
      )}


      {/* MEDICAL HISTORY */}

      {recordTab === "history" && (
        <div className="medical-history-section">

          <div className="medical-record-card">

            <div className="medical-record-header">

              <div>

                <h3>
                  Type 2 Diabetes - well controlled
                </h3>

                <p>
                  2026-07-28 · Dr. Hani Kafaween
                </p>

              </div>


              <button className="medical-record-edit">
                Edit
              </button>

            </div>


            <div className="medical-record-content">

              <div className="medical-record-treatment">

                <span>
                  TREATMENT
                </span>

                <p>
                  Metformin 1000mg BD, HbA1c target &lt;7%
                </p>

              </div>


              <div className="medical-record-notes">

                <span>
                  DOCTOR NOTES
                </span>

                <p>
                  HbA1c 6.8%. Patient managing diet well.
                  Continue current management. Annual eye exam due.
                </p>

              </div>

            </div>

          </div>


          <div className="medical-record-card">

            <div className="medical-record-header">

              <div>

                <h3>
                  Hypertension
                </h3>

                <p>
                  2026-06-12 · Dr. Hani Kafaween
                </p>

              </div>


              <button className="medical-record-edit">
                Edit
              </button>

            </div>


            <div className="medical-record-content">

              <div className="medical-record-treatment">

                <span>
                  TREATMENT
                </span>

                <p>
                  Continue blood pressure medication and monitoring.
                </p>

              </div>


              <div className="medical-record-notes">

                <span>
                  DOCTOR NOTES
                </span>

                <p>
                  Blood pressure stable. Continue home monitoring
                  and review during next appointment.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}