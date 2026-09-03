import { useContext } from "react";

import { DoctorContext } from "../../context/DoctorContext";

export default function TodaySchedule() {
  const { setSection } = useContext(DoctorContext);

  const appointments = [
    {
      time: "08:30",
      initials: "RN",
      name: "Robert Nguyen",
      reason: "Blood pressure follow-up",
      status: "Checked In",
    },
    {
      time: "09:00",
      initials: "JT",
      name: "James Thornton",
      reason: "Annual health check",
      status: "Completed",
    },
    {
      time: "10:00",
      initials: "AC",
      name: "Amelia Chen",
      reason: "Skin rash assessment",
      status: "Scheduled",
    },
    {
      time: "11:00",
      initials: "PS",
      name: "Priya Sharma",
      reason: "Mental health review",
      status: "Scheduled",
    },
  ];

  return (
    <div className="today-schedule-card">

      <div className="dashboard-card-heading">

        <div>
          <h2>Today's Schedule</h2>
          <p>Thursday, August 14 · 2026</p>
        </div>

        <button
          className="dashboard-text-button"
          onClick={() => setSection("schedule")}
        >
          View all →
        </button>

      </div>


      <div className="today-schedule-list">

        {appointments.map((appointment) => (
          <div
            className="today-schedule-row"
            key={appointment.time}
          >

            <span className="today-time">
              {appointment.time}
            </span>


            <div className="today-patient-avatar">
              {appointment.initials}
            </div>


            <div className="today-patient-info">
              <h3>{appointment.name}</h3>
              <p>{appointment.reason}</p>
            </div>


            <span
              className={`dashboard-status ${appointment.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              ● {appointment.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}