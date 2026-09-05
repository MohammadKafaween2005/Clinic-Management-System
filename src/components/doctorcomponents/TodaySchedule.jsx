import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { DoctorContext } from "../../context/DoctorContext";

export default function TodaySchedule() {
  const { setSection } = useContext(DoctorContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const todayAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = appointment.appointment_date?.split("T")[0];

      return appointmentDate === todayString;
    })
    .sort((a, b) => a.appointment_time.localeCompare(b.appointment_time));

  const formatTime = (time) => {
    if (!time) return "";

    const [hoursString, minutes] = time.split(":");

    let hours = Number(hoursString);

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
      hours = 12;
    }

    return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="today-schedule-card">
      <div className="dashboard-card-heading">
        <div>
          <h2>Today's Schedule</h2>
          <p>{formattedDate}</p>
        </div>

        <button
          className="dashboard-text-button"
          onClick={() => setSection("schedule")}
        >
          View all →
        </button>
      </div>

      <div className="today-schedule-list">
        {loading ? (
          <p>Loading today's appointments...</p>
        ) : todayAppointments.length === 0 ? (
          <p>No appointments scheduled for today.</p>
        ) : (
          todayAppointments.map((appointment) => (
            <div
              className="today-schedule-row"
              key={appointment.appointment_id}
            >
              <span className="today-time">
                {formatTime(appointment.appointment_time)}
              </span>

              <div className="today-patient-avatar">
                {getInitials(appointment.first_name, appointment.last_name)}
              </div>

              <div className="today-patient-info">
                <h3>
                  {appointment.first_name} {appointment.last_name}
                </h3>

                <p>{appointment.reason || "No reason provided"}</p>
              </div>

              <span
                className={`dashboard-status ${appointment.status
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                ● {appointment.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
