import { useContext } from "react";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistAppointments() {
  const { setSection } = useContext(ReceptionistContext);

  const appointments = [
    {
      time: "08:30 AM",
      date: "2026-08-14",
      initials: "RN",
      name: "Robert Nguyen",
      patientId: "P-0003",
      reason: "Blood pressure follow-up",
      status: "Checked In",
      statusClass: "checked-in",
    },
    {
      time: "09:00 AM",
      date: "2026-08-14",
      initials: "JT",
      name: "James Thornton",
      patientId: "P-0001",
      reason: "Annual health check",
      status: "Completed",
      statusClass: "completed",
    },
    {
      time: "10:00 AM",
      date: "2026-08-14",
      initials: "AC",
      name: "Amelia Chen",
      patientId: "P-0002",
      reason: "Skin rash assessment",
      status: "Scheduled",
      statusClass: "scheduled",
    },
    {
      time: "11:00 AM",
      date: "2026-08-14",
      initials: "PS",
      name: "Priya Sharma",
      patientId: "P-0004",
      reason: "Mental health review",
      status: "Scheduled",
      statusClass: "scheduled",
    },
    {
      time: "01:30 PM",
      date: "2026-08-14",
      initials: "SW",
      name: "Sophie Williams",
      patientId: "P-0006",
      reason: "Routine check-up",
      status: "Scheduled",
      statusClass: "scheduled",
    },
    {
      time: "02:30 PM",
      date: "2026-08-14",
      initials: "DO",
      name: "David Okafor",
      patientId: "P-0005",
      reason: "Diabetes management",
      status: "Cancelled",
      statusClass: "cancelled",
    },
  ];

  return (
    <section className="receptionist-appointments-section">
      <div className="receptionist-appointments-toolbar">
        <input
          type="text"
          className="receptionist-appointments-search"
          placeholder="Search patient or reason..."
        />

        <input
          type="date"
          className="receptionist-appointments-date"
          defaultValue="2026-08-14"
        />

        <select className="receptionist-appointments-select">
          <option>All</option>
          <option>Scheduled</option>
          <option>Checked In</option>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>No Show</option>
        </select>

        <button
          type="button"
          className="receptionist-new-appointment-button"
          onClick={() => setSection("newAppointment")}
        >
          + New Appointment
        </button>
      </div>

      <div className="receptionist-appointment-filters">
        <button className="receptionist-appointment-filter active">All</button>

        <button className="receptionist-appointment-filter">Scheduled</button>

        <button className="receptionist-appointment-filter">Checked In</button>

        <button className="receptionist-appointment-filter">Completed</button>

        <button className="receptionist-appointment-filter">Cancelled</button>

        <button className="receptionist-appointment-filter">No Show</button>
      </div>

      <div className="receptionist-appointments-card">
        <div className="receptionist-appointments-card-title">
          <h2>
            Appointments <span>({appointments.length})</span>
          </h2>
        </div>

        <div className="receptionist-appointments-table-header">
          <span>TIME</span>
          <span>PATIENT</span>
          <span>REASON FOR VISIT</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>

        {appointments.map((appointment, index) => (
          <div className="receptionist-appointments-row" key={index}>
            <div className="receptionist-appointments-time">
              <strong>{appointment.time}</strong>
              <span>{appointment.date}</span>
            </div>

            <div className="receptionist-appointments-patient">
              <div className="receptionist-appointments-avatar">
                {appointment.initials}
              </div>

              <div>
                <h3>{appointment.name}</h3>
                <p>{appointment.patientId}</p>
              </div>
            </div>

            <div className="receptionist-appointments-reason">
              {appointment.reason}
            </div>

            <div>
              <span
                className={`receptionist-appointments-status ${appointment.statusClass}`}
              >
                ● {appointment.status}
              </span>
            </div>

            <div className="receptionist-appointments-actions">
              <button type="button" className="receptionist-appointment-cancel">
                Cancel
              </button>

              <button
                type="button"
                className="receptionist-appointment-checkin"
              >
                Check In
              </button>

              <button
                type="button"
                className="receptionist-appointment-view"
                onClick={() => setSection("patientProfile")}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
