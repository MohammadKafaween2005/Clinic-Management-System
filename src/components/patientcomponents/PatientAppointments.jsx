import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PatientContext } from "../../context/PatientContext";

export default function PatientAppointments({ setSelectedAppointment }) {
  const { setSection } = useContext(PatientContext);

  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointments/patient/${user.profile_id}`,
        );

        setAppointments(response.data);
      } catch (error) {
        console.error(error);
        setError("Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user.profile_id]);

  const handleCancel = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
      );

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.appointment_id === appointmentId
            ? { ...appointment, status: "Cancelled" }
            : appointment,
        ),
      );
    } catch (error) {
      console.error(error);
      setError("Could not cancel appointment.");
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "upcoming") {
      return appointment.status === "Scheduled";
    }

    return appointment.status.toLowerCase() === filter;
  });

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
          {filteredAppointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                className="patient-appointment-card"
                key={appointment.appointment_id}
              >
                <div className="patient-appointment-card-top">
                  <div>
                    <span className="patient-appointment-card-date">
                      {formatDate(appointment.appointment_date)}
                    </span>

                    <h3>{formatTime(appointment.appointment_time)}</h3>

                    <span className="patient-appointment-duration">
                      {appointment.duration_minutes} min
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
                    <strong>
                      {appointment.doctor_name || "Dr. Hani Kafaween"}
                    </strong>
                  </div>
                </div>

                {appointment.status === "Scheduled" && (
                  <div className="patient-appointment-card-actions">
                    <button
                      type="button"
                      className="patient-appointment-reschedule"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setSection("reschedule");
                      }}
                    >
                      Reschedule
                    </button>

                    <button
                      type="button"
                      className="patient-appointment-cancel"
                      onClick={() => handleCancel(appointment.appointment_id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
