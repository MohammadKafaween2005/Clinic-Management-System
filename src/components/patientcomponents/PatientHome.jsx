import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PatientContext } from "../../context/PatientContext";

export default function PatientHome({ setSelectedAppointment }) {
  const { setSection } = useContext(PatientContext);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPatientHomeData = async () => {
      try {
        setError("");

        const profileResponse = await axios.get(
          `http://localhost:5000/api/profile/patient/${user.profile_id}`,
        );

        const appointmentsResponse = await axios.get(
          `http://localhost:5000/api/appointments/patient/${user.profile_id}`,
        );

        setPatient(profileResponse.data);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error(error);
        setError("Could not load patient dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientHomeData();
  }, [user.profile_id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) {
      return "";
    }

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const today = new Date();

  const todayText = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const upcomingAppointments = appointments
    .filter((appointment) => appointment.status === "Scheduled")
    .sort((a, b) => {
      const dateA = new Date(
        `${a.appointment_date.split("T")[0]}T${a.appointment_time}`,
      );

      const dateB = new Date(
        `${b.appointment_date.split("T")[0]}T${b.appointment_time}`,
      );

      return dateA - dateB;
    });

  const upcomingAppointment = upcomingAppointments[0];

  const completedAppointments = appointments
    .filter((appointment) => appointment.status === "Completed")
    .sort((a, b) => {
      const dateA = new Date(
        `${a.appointment_date.split("T")[0]}T${a.appointment_time}`,
      );

      const dateB = new Date(
        `${b.appointment_date.split("T")[0]}T${b.appointment_time}`,
      );

      return dateB - dateA;
    });

  const recentVisit = completedAppointments[0];

  const handleCancel = async () => {
    if (!upcomingAppointment) {
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${upcomingAppointment.appointment_id}/cancel`,
      );

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.appointment_id === upcomingAppointment.appointment_id
            ? {
                ...appointment,
                status: "Cancelled",
              }
            : appointment,
        ),
      );
    } catch (error) {
      console.error(error);
      setError("Could not cancel appointment.");
    }
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="patient-home">
      <div className="patient-home-container">
        <p className="patient-home-date">{todayText}</p>

        <h2 className="patient-home-greeting">
          Good morning, {patient.first_name}.
        </h2>

        {/* Upcoming Appointment */}

        {upcomingAppointment ? (
          <div className="patient-upcoming-card">
            <div className="patient-upcoming-top">
              <span className="patient-upcoming-label">
                UPCOMING APPOINTMENT
              </span>

              <span className="patient-status scheduled">
                ● {upcomingAppointment.status}
              </span>
            </div>

            <h2 className="patient-appointment-time">
              {formatTime(upcomingAppointment.appointment_time)}
            </h2>

            <p className="patient-appointment-date">
              {formatDate(upcomingAppointment.appointment_date)}
              {" · "}
              {upcomingAppointment.duration_minutes} min
            </p>

            <div className="patient-reason-box">
              <span>Reason for visit</span>
              <strong>
                {upcomingAppointment.reason || "General consultation"}
              </strong>
            </div>

            <div className="patient-doctor-box">
              <div className="patient-doctor-avatar">HK</div>

              <div>
                <strong>
                  {upcomingAppointment.doctor_name || "Dr. Hani Kafaween"}
                </strong>

                <p>General Practitioner & Family Medicine</p>
              </div>
            </div>

            <div className="patient-appointment-actions">
              <button
                type="button"
                className="patient-reschedule-button"
                onClick={() => {
                  setSelectedAppointment(upcomingAppointment);
                  setSection("reschedule");
                }}
              >
                Reschedule
              </button>

              <button
                type="button"
                className="patient-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="patient-upcoming-card">
            <div className="patient-upcoming-top">
              <span className="patient-upcoming-label">
                UPCOMING APPOINTMENT
              </span>
            </div>

            <h3>No upcoming appointments</h3>

            <p>You currently do not have a scheduled appointment.</p>
          </div>
        )}

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

          {recentVisit ? (
            <div className="patient-recent-card">
              <div className="patient-recent-left">
                <div className="patient-recent-icon">▢</div>

                <div>
                  <strong>{recentVisit.reason || "Clinic visit"}</strong>

                  <p>
                    {formatDate(recentVisit.appointment_date)} at{" "}
                    {formatTime(recentVisit.appointment_time)}
                  </p>
                </div>
              </div>

              <span className="patient-status completed">● Completed</span>
            </div>
          ) : (
            <div className="patient-recent-card">
              <div className="patient-recent-left">
                <div>
                  <strong>No recent visits</strong>
                  <p>Your completed appointments will appear here.</p>
                </div>
              </div>
            </div>
          )}
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
