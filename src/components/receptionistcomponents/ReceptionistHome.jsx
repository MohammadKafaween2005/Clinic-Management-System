import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistHome({ setSelectedPatientId }) {
  const { setSection } = useContext(ReceptionistContext);

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [appointmentsResponse, patientsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/appointments"),
          axios.get("http://localhost:5000/api/patients"),
        ]);

        setAppointments(appointmentsResponse.data);

        setPatients(patientsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const now = new Date();

  const today =
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}`;

  const displayDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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

  const getStatusClass = (status) => {
    if (status === "Checked In") {
      return "checked";
    }

    if (status === "Completed") {
      return "completed";
    }

    if (status === "Cancelled") {
      return "cancelled";
    }

    return "scheduled";
  };

  const todayAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = appointment.appointment_date?.split("T")[0];

      return appointmentDate === today;
    })
    .sort((a, b) => a.appointment_time.localeCompare(b.appointment_time));

  const filteredAppointments = todayAppointments.filter((appointment) => {
    const fullName = `${appointment.first_name || ""} ${
      appointment.last_name || ""
    }`.toLowerCase();

    const reason = (appointment.reason || "").toLowerCase();

    const searchValue = search.toLowerCase();

    return fullName.includes(searchValue) || reason.includes(searchValue);
  });

  const waiting = todayAppointments.filter(
    (appointment) => appointment.status === "Checked In",
  ).length;

  const completed = todayAppointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const cancelled = todayAppointments.filter(
    (appointment) => appointment.status === "Cancelled",
  ).length;

  const remaining = todayAppointments.filter(
    (appointment) => appointment.status === "Scheduled",
  ).length;

  const handleCheckIn = async (appointment) => {
    if (appointment.status !== "Scheduled") {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${appointment.appointment_id}`,
        {
          patient_id: appointment.patient_id,

          doctor_id: appointment.doctor_id,

          appointment_date: appointment.appointment_date.split("T")[0],

          appointment_time: appointment.appointment_time,

          duration_minutes: appointment.duration_minutes || 30,

          reason: appointment.reason,

          status: "Checked In",
        },
      );

      setAppointments((previousAppointments) =>
        previousAppointments.map((item) =>
          item.appointment_id === appointment.appointment_id
            ? {
                ...item,
                ...response.data,

                first_name: item.first_name,

                last_name: item.last_name,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.error || "Could not check in patient.");
    }
  };

  const handleCancel = async (appointment) => {
    if (appointment.status === "Cancelled") {
      return;
    }

    const confirmed = window.confirm(
      `Cancel the appointment for ${appointment.first_name} ${appointment.last_name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${appointment.appointment_id}/cancel`,
      );

      setAppointments((previousAppointments) =>
        previousAppointments.map((item) =>
          item.appointment_id === appointment.appointment_id
            ? {
                ...item,
                status: "Cancelled",
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.error || "Could not cancel appointment.");
    }
  };

  const recentPatients = [...patients]
    .sort((a, b) => b.patient_id - a.patient_id)
    .slice(0, 4);

  return (
    <section className="receptionist-home">
      {/* TOP AREA */}

      <div className="receptionist-home-top">
        <div>
          <p className="receptionist-date">{displayDate}</p>

          <h2>{todayAppointments.length} appointments today</h2>
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
          <strong>{waiting}</strong>
          <p>Waiting</p>
        </div>

        <div className="summary-chip completed">
          <span>●</span>
          <strong>{completed}</strong>
          <p>Completed</p>
        </div>

        <div className="summary-chip cancelled">
          <span>●</span>
          <strong>{cancelled}</strong>
          <p>Cancelled</p>
        </div>

        <div className="summary-chip remaining">
          <span>●</span>
          <strong>{remaining}</strong>
          <p>Remaining</p>
        </div>
      </div>

      {/* APPOINTMENTS */}

      <div className="receptionist-home-card">
        <div className="schedule-card-top">
          <div className="patient-search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="home-link-button"
            onClick={() => setSection("appointments")}
          >
            Full schedule →
          </button>
        </div>

        <div className="receptionist-appointment-list">
          {loading ? (
            <p>Loading appointments...</p>
          ) : filteredAppointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                className="receptionist-home-appointment"
                key={appointment.appointment_id}
              >
                {/* TIME */}

                <div className="home-appointment-time">
                  <strong>{formatTime(appointment.appointment_time)}</strong>

                  <span>
                    {appointment.duration_minutes || 30}
                    min
                  </span>
                </div>

                {/* AVATAR */}

                <div className="home-appointment-avatar">
                  {getInitials(appointment.first_name, appointment.last_name)}
                </div>

                {/* PATIENT */}

                <div className="home-appointment-info">
                  <strong>
                    {appointment.first_name} {appointment.last_name}
                  </strong>

                  <span>{appointment.reason || "No reason provided"}</span>
                </div>

                {/* STATUS */}

                <div className="home-appointment-status-container">
                  <span
                    className={`home-appointment-status ${getStatusClass(
                      appointment.status,
                    )}`}
                  >
                    ● {appointment.status}
                  </span>
                </div>

                {/* ACTIONS */}

                <div className="home-appointment-actions">
                  <button
                    type="button"
                    className="home-cancel-button"
                    disabled={
                      appointment.status === "Cancelled" ||
                      appointment.status === "Completed"
                    }
                    onClick={() => handleCancel(appointment)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="home-checkin-button"
                    disabled={appointment.status !== "Scheduled"}
                    onClick={() => handleCheckIn(appointment)}
                  >
                    Check In
                  </button>

                  <button
                    type="button"
                    className="home-view-button"
                    onClick={() => {
                      setSelectedPatientId(appointment.patient_id);

                      setSection("patientProfile");
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          )}
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
          {recentPatients.map((patient) => (
            <div className="recent-patient-item" key={patient.patient_id}>
              <div className="recent-patient-avatar">
                {getInitials(patient.first_name, patient.last_name)}
              </div>

              <div className="recent-patient-info">
                <strong>
                  {patient.first_name} {patient.last_name}
                </strong>

                <span>{patient.phone || "No phone"}</span>
              </div>

              <span className="recent-patient-date">
                P-
                {String(patient.patient_id).padStart(4, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
