import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistAppointments({ setSelectedPatientId }) {
  const { setSection } = useContext(ReceptionistContext);

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/appointments",
      );

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  const formatDate = (date) => {
    if (!date) return "";

    return date.split("T")[0];
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const getStatusClass = (status) => {
    if (status === "Checked In") {
      return "checked-in";
    }

    if (status === "Completed") {
      return "completed";
    }

    if (status === "Cancelled") {
      return "cancelled";
    }

    if (status === "No Show") {
      return "no-show";
    }

    return "scheduled";
  };

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
          appointment_date: formatDate(appointment.appointment_date),
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
    if (
      appointment.status === "Cancelled" ||
      appointment.status === "Completed"
    ) {
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

  const filteredAppointments = appointments.filter((appointment) => {
    const fullName = `${appointment.first_name || ""} ${
      appointment.last_name || ""
    }`.toLowerCase();

    const reason = (appointment.reason || "").toLowerCase();

    const patientId = `P-${String(appointment.patient_id).padStart(
      4,
      "0",
    )}`.toLowerCase();

    const searchValue = search.toLowerCase();

    const matchesSearch =
      fullName.includes(searchValue) ||
      reason.includes(searchValue) ||
      patientId.includes(searchValue);

    const matchesDate =
      !selectedDate ||
      formatDate(appointment.appointment_date) === selectedDate;

    const matchesStatus =
      statusFilter === "All" || appointment.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <section className="receptionist-appointments-section">
      <div className="receptionist-appointments-toolbar">
        <input
          type="text"
          className="receptionist-appointments-search"
          placeholder="Search patient or reason..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          className="receptionist-appointments-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select
          className="receptionist-appointments-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Checked In">Checked In</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="No Show">No Show</option>
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
        {[
          "All",
          "Scheduled",
          "Checked In",
          "Completed",
          "Cancelled",
          "No Show",
        ].map((status) => (
          <button
            type="button"
            key={status}
            className={`receptionist-appointment-filter ${
              statusFilter === status ? "active" : ""
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="receptionist-appointments-card">
        <div className="receptionist-appointments-card-title">
          <h2>
            Appointments <span>({filteredAppointments.length})</span>
          </h2>
        </div>

        <div className="receptionist-appointments-table-header">
          <span>TIME</span>
          <span>PATIENT</span>
          <span>REASON FOR VISIT</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>

        {loading ? (
          <p>Loading appointments...</p>
        ) : filteredAppointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              className="receptionist-appointments-row"
              key={appointment.appointment_id}
            >
              <div className="receptionist-appointments-time">
                <strong>{formatTime(appointment.appointment_time)}</strong>

                <span>{formatDate(appointment.appointment_date)}</span>
              </div>

              <div className="receptionist-appointments-patient">
                <div className="receptionist-appointments-avatar">
                  {getInitials(appointment.first_name, appointment.last_name)}
                </div>

                <div>
                  <h3>
                    {appointment.first_name} {appointment.last_name}
                  </h3>

                  <p>
                    P-
                    {String(appointment.patient_id).padStart(4, "0")}
                  </p>
                </div>
              </div>

              <div className="receptionist-appointments-reason">
                {appointment.reason || "No reason provided"}
              </div>

              <div>
                <span
                  className={`receptionist-appointments-status ${getStatusClass(
                    appointment.status,
                  )}`}
                >
                  ● {appointment.status}
                </span>
              </div>

              <div className="receptionist-appointments-actions">
                <button
                  type="button"
                  className="receptionist-appointment-cancel"
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
                  className="receptionist-appointment-checkin"
                  disabled={appointment.status !== "Scheduled"}
                  onClick={() => handleCheckIn(appointment)}
                >
                  Check In
                </button>

                <button
                  type="button"
                  className="receptionist-appointment-view"
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
    </section>
  );
}
