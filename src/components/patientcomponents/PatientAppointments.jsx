import { useContext, useState } from "react";
import { PatientContext } from "../../context/PatientContext";

export default function PatientAppointments() {
  const { setSection } = useContext(PatientContext);
  const [filter, setFilter] = useState("all");

  const appointments = [
    {
      id: 1,
      date: "2026-08-16",
      time: "10:30 AM",
      duration: "15 min",
      reason: "Prescription renewal",
      doctor: "Dr. Hani Kafaween",
      status: "Scheduled",
    },
    {
      id: 2,
      date: "2026-08-14",
      time: "09:00 AM",
      duration: "30 min",
      reason: "Annual health check",
      doctor: "Dr. Hani Kafaween",
      status: "Completed",
    },
    {
      id: 3,
      date: "2026-07-28",
      time: "11:00 AM",
      duration: "20 min",
      reason: "Routine follow-up",
      doctor: "Dr. Hani Kafaween",
      status: "Completed",
    },
    {
      id: 4,
      date: "2026-06-18",
      time: "01:30 PM",
      duration: "20 min",
      reason: "General consultation",
      doctor: "Dr. Hani Kafaween",
      status: "Cancelled",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "upcoming") {
      return appointment.status === "Scheduled";
    }

    return appointment.status.toLowerCase() === filter;
  });

  return (
    <section className="patient-appointments-section">
      <div className="patient-appointments-container">
        <div className="patient-appointments-top">
          <div>
            <h2>My Appointments</h2>
            <p>View and manage your clinic appointments.</p>
          </div>

          <button
            type="button"
            className="patient-new-appointment-button"
            onClick={() => setSection("bookAppointment")}
          >
            + Book Appointment
          </button>
        </div>

        <div className="patient-appointments-filters">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            className={filter === "upcoming" ? "active" : ""}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>

          <button
            type="button"
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

          <button
            type="button"
            className={filter === "cancelled" ? "active" : ""}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>

        <div className="patient-appointments-list">
          {filteredAppointments.map((appointment) => (
            <div className="patient-appointment-card" key={appointment.id}>
              <div className="patient-appointment-card-top">
                <div>
                  <span className="patient-appointment-card-date">
                    {appointment.date}
                  </span>

                  <h3>{appointment.time}</h3>

                  <span className="patient-appointment-duration">
                    {appointment.duration}
                  </span>
                </div>

                <span
                  className={`patient-appointment-status ${appointment.status.toLowerCase()}`}
                >
                  ● {appointment.status}
                </span>
              </div>

              <div className="patient-appointment-details">
                <div className="patient-appointment-detail-box">
                  <span>Reason for visit</span>
                  <strong>{appointment.reason}</strong>
                </div>

                <div className="patient-appointment-detail-box">
                  <span>Doctor</span>
                  <strong>{appointment.doctor}</strong>
                </div>
              </div>

              {appointment.status === "Scheduled" && (
                <div className="patient-appointment-card-actions">
                  <button
                    type="button"
                    className="patient-appointment-reschedule"
                    onClick={() => setSection("bookAppointment")}
                  >
                    Reschedule
                  </button>

                  <button type="button" className="patient-appointment-cancel">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
