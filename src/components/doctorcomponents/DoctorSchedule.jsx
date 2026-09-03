import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
export default function DoctorSchedule() {
  const { setSection } = useContext(DoctorContext);

  const appointments = [
    {
      time: "08:30 AM",
      date: "2026-08-14",
      initials: "RN",
      patient: "Robert Nguyen",
      id: "P-0003",
      reason: "Blood pressure follow-up",
      status: "Checked In",
    },
    {
      time: "09:00 AM",
      date: "2026-08-14",
      initials: "JT",
      patient: "James Thornton",
      id: "P-0001",
      reason: "Annual health check",
      status: "Completed",
    },
    {
      time: "10:00 AM",
      date: "2026-08-14",
      initials: "AC",
      patient: "Amelia Chen",
      id: "P-0002",
      reason: "Skin rash assessment",
      status: "Scheduled",
    },
    {
      time: "11:00 AM",
      date: "2026-08-14",
      initials: "PS",
      patient: "Priya Sharma",
      id: "P-0004",
      reason: "Mental health review",
      status: "Scheduled",
    },
    {
      time: "01:30 PM",
      date: "2026-08-14",
      initials: "SW",
      patient: "Sophie Williams",
      id: "P-0006",
      reason: "Routine check-up",
      status: "Scheduled",
    },
    {
      time: "02:30 PM",
      date: "2026-08-14",
      initials: "DO",
      patient: "David Okafor",
      id: "P-0005",
      reason: "Diabetes management",
      status: "Cancelled",
    },
  ];

  return (
    <section className="doctor-schedule-section">
      <div className="schedule-toolbar">
        <input
          type="text"
          className="schedule-search"
          placeholder="Search patient or reason..."
        />

        <input
          type="date"
          className="schedule-date"
          defaultValue="2026-08-14"
        />

        <select className="schedule-select">
          <option>All</option>
          <option>Scheduled</option>
          <option>Checked In</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="schedule-filters">
        <button className="schedule-filter active">All</button>
        <button className="schedule-filter">Scheduled</button>
        <button className="schedule-filter">Checked In</button>
        <button className="schedule-filter">Completed</button>
        <button className="schedule-filter">Cancelled</button>
        <button className="schedule-filter">No Show</button>
      </div>

      <div className="appointments-card">
        <div className="appointments-card-header">
          <h2>
            Appointments <span>({appointments.length})</span>
          </h2>
        </div>

        <div className="appointments-table-header">
          <span>TIME</span>
          <span>PATIENT</span>
          <span>REASON FOR VISIT</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>

        {appointments.map((appointment) => (
          <div
            className="appointment-row"
            key={`${appointment.id}-${appointment.time}`}
          >
            <div className="appointment-time">
              <strong>{appointment.time}</strong>
              <span>{appointment.date}</span>
            </div>

            <div className="appointment-patient">
              <div className="appointment-avatar">{appointment.initials}</div>

              <div>
                <h3>{appointment.patient}</h3>
                <p>{appointment.id}</p>
              </div>
            </div>

            <span className="appointment-reason">{appointment.reason}</span>

            <div>
              <span
                className={`appointment-status ${appointment.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {appointment.status}
              </span>
            </div>

            <div className="appointment-actions">
              <button
                type="button"
                className="appointment-record-button"
                onClick={() => setSection("record")}
              >
                View Record
              </button>

              <button
                type="button"
                className="appointment-edit-button"
                title="Edit appointment"
              >
                ✎
              </button>

              <button
                type="button"
                className="appointment-delete-button"
                title="Delete appointment"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
