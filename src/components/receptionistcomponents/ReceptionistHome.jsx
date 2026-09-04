import { useContext } from "react";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistHome() {
  const { setSection } = useContext(ReceptionistContext);

  const appointments = [
    {
      time: "08:30 AM",
      duration: "20min",
      initials: "RN",
      name: "Robert Nguyen",
      reason: "Blood pressure follow-up",
      status: "Checked In",
      statusClass: "checked",
    },
    {
      time: "09:00 AM",
      duration: "30min",
      initials: "JT",
      name: "James Thornton",
      reason: "Annual health check",
      status: "Completed",
      statusClass: "completed",
    },
    {
      time: "10:00 AM",
      duration: "20min",
      initials: "AC",
      name: "Amelia Chen",
      reason: "Skin rash assessment",
      status: "Scheduled",
      statusClass: "scheduled",
    },
    {
      time: "11:00 AM",
      duration: "40min",
      initials: "PS",
      name: "Priya Sharma",
      reason: "Mental health review",
      status: "Scheduled",
      statusClass: "scheduled",
    },
    {
      time: "01:30 PM",
      duration: "20min",
      initials: "SW",
      name: "Sophie Williams",
      reason: "Routine check-up",
      status: "Scheduled",
      statusClass: "scheduled",
    },
    {
      time: "02:30 PM",
      duration: "30min",
      initials: "DO",
      name: "David Okafor",
      reason: "Diabetes management",
      status: "Cancelled",
      statusClass: "cancelled",
    },
  ];

  const recentPatients = [
    {
      initials: "JT",
      name: "James Thornton",
      phone: "(02) 8123 4567",
      date: "2026-08-16",
    },
    {
      initials: "AC",
      name: "Amelia Chen",
      phone: "(02) 8234 5678",
      date: "2026-08-20",
    },
    {
      initials: "RN",
      name: "Robert Nguyen",
      phone: "(02) 8345 6789",
      date: "2026-08-14",
    },
    {
      initials: "PS",
      name: "Priya Sharma",
      phone: "(02) 8456 7890",
      date: "2026-08-22",
    },
  ];

  return (
    <section className="receptionist-home">
      {/* TOP AREA */}
      <div className="receptionist-home-top">
        <div>
          <p className="receptionist-date">Thursday, August 14 · 2026</p>

          <h2>6 appointments today</h2>
        </div>

        <div className="receptionist-home-actions">
          <button
            className="new-appointment-button"
            onClick={() => setSection("newAppointment")}
          >
            + New Appointment
          </button>

          <button
            className="register-patient-button"
            onClick={() => setSection("register")}
          >
            Register Patient
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="appointment-summary">
        <div className="summary-chip waiting">
          <span>●</span>
          <strong>1</strong>
          <p>Waiting</p>
        </div>

        <div className="summary-chip completed">
          <span>●</span>
          <strong>1</strong>
          <p>Completed</p>
        </div>

        <div className="summary-chip cancelled">
          <span>●</span>
          <strong>1</strong>
          <p>Cancelled</p>
        </div>

        <div className="summary-chip remaining">
          <span>●</span>
          <strong>4</strong>
          <p>Remaining</p>
        </div>
      </div>

      {/* APPOINTMENTS */}
      <div className="receptionist-home-card">
        <div className="schedule-card-top">
          <div className="patient-search-box">
            <span>⌕</span>

            <input type="text" placeholder="Search patient..." />
          </div>

          <button
            className="home-link-button"
            onClick={() => setSection("appointments")}
          >
            Full schedule →
          </button>
        </div>

        <div className="receptionist-appointment-list">
          {appointments.map((appointment, index) => (
            <div className="receptionist-home-appointment" key={index}>
              {/* TIME */}
              <div className="home-appointment-time">
                <strong>{appointment.time}</strong>

                <span>{appointment.duration}</span>
              </div>

              {/* AVATAR */}
              <div className="home-appointment-avatar">
                {appointment.initials}
              </div>

              {/* PATIENT */}
              <div className="home-appointment-info">
                <strong>{appointment.name}</strong>

                <span>{appointment.reason}</span>
              </div>

              {/* STATUS */}
              <div className="home-appointment-status-container">
                <span
                  className={`home-appointment-status ${appointment.statusClass}`}
                >
                  ● {appointment.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="home-appointment-actions">
                <button type="button" className="home-cancel-button">
                  Cancel
                </button>

                <button type="button" className="home-checkin-button">
                  Check In
                </button>

                <button
                  type="button"
                  className="home-view-button"
                  onClick={() => setSection("patientProfile")}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT PATIENTS */}
      <div className="recent-patients-card">
        <div className="recent-patients-header">
          <h3>Recent Patients</h3>

          <button
            className="home-link-button"
            onClick={() => setSection("patients")}
          >
            All patients →
          </button>
        </div>

        <div className="recent-patients-grid">
          {recentPatients.map((patient, index) => (
            <div className="recent-patient-item" key={index}>
              <div className="recent-patient-avatar">{patient.initials}</div>

              <div className="recent-patient-info">
                <strong>{patient.name}</strong>

                <span>{patient.phone}</span>
              </div>

              <span className="recent-patient-date">{patient.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
