import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorSchedule({ setSelectedPatientId }) {
  const { setSection } = useContext(DoctorContext);

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [editingAppointment, setEditingAppointment] = useState(null);
  const [error, setError] = useState("");

  const [editForm, setEditForm] = useState({
    appointment_date: "",
    appointment_time: "",
    reason: "",
    status: "",
  });

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

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setError("");

    setEditForm({
      appointment_date: formatDate(appointment.appointment_date),
      appointment_time: appointment.appointment_time?.slice(0, 5) || "",
      reason: appointment.reason || "",
      status: appointment.status || "Scheduled",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    setError("");

    if (!editForm.appointment_date || !editForm.appointment_time) {
      setError("Date and time are required.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${editingAppointment.appointment_id}`,
        {
          patient_id: editingAppointment.patient_id,
          doctor_id: editingAppointment.doctor_id,
          appointment_date: editForm.appointment_date,
          appointment_time: editForm.appointment_time,
          duration_minutes: editingAppointment.duration_minutes || 30,
          reason: editForm.reason,
          status: editForm.status,
        },
      );

      /*
        The PUT route may only return the appointment table data
        without first_name / last_name.

        So keep the patient information from the old object.
      */
      setAppointments((previousAppointments) =>
        previousAppointments.map((appointment) =>
          appointment.appointment_id === editingAppointment.appointment_id
            ? {
                ...appointment,
                ...response.data,
                first_name: appointment.first_name,
                last_name: appointment.last_name,
              }
            : appointment,
        ),
      );

      setEditingAppointment(null);
      setError("");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("That appointment time is already booked.");
      } else {
        setError(
          error.response?.data?.error || "Could not update appointment.",
        );
      }
    }
  };

  const handleCancelAppointment = async (appointment) => {
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

  const filteredAppointments = appointments.filter((appointment) => {
    const fullName = `${appointment.first_name || ""} ${
      appointment.last_name || ""
    }`.toLowerCase();

    const reason = (appointment.reason || "").toLowerCase();

    const searchValue = search.toLowerCase();

    const matchesSearch =
      fullName.includes(searchValue) || reason.includes(searchValue);

    const matchesDate =
      !selectedDate ||
      formatDate(appointment.appointment_date) === selectedDate;

    const matchesStatus =
      statusFilter === "All" || appointment.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <section className="doctor-schedule-section">
      <div className="schedule-toolbar">
        <input
          type="text"
          className="schedule-search"
          placeholder="Search patient or reason..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          className="schedule-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select
          className="schedule-select"
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
      </div>

      <div className="schedule-filters">
        {[
          "All",
          "Scheduled",
          "Checked In",
          "Completed",
          "Cancelled",
          "No Show",
        ].map((status) => (
          <button
            key={status}
            type="button"
            className={
              statusFilter === status
                ? "schedule-filter active"
                : "schedule-filter"
            }
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* EDIT APPOINTMENT FORM */}

      {editingAppointment && (
        <div className="appointment-edit-card">
          <div className="appointment-edit-heading">
            <div>
              <h2>Edit Appointment</h2>

              <p>
                {editingAppointment.first_name} {editingAppointment.last_name}
              </p>
            </div>
          </div>

          <form className="appointment-edit-form" onSubmit={handleSaveEdit}>
            <div className="appointment-edit-grid">
              <div className="appointment-edit-field">
                <label>Date</label>

                <input
                  type="date"
                  name="appointment_date"
                  value={editForm.appointment_date}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="appointment-edit-field">
                <label>Time</label>

                <input
                  type="time"
                  name="appointment_time"
                  value={editForm.appointment_time}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="appointment-edit-field">
                <label>Status</label>

                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                >
                  <option value="Scheduled">Scheduled</option>

                  <option value="Checked In">Checked In</option>

                  <option value="Completed">Completed</option>

                  <option value="Cancelled">Cancelled</option>

                  <option value="No Show">No Show</option>
                </select>
              </div>

              <div className="appointment-edit-field">
                <label>Reason for Visit</label>

                <input
                  type="text"
                  name="reason"
                  value={editForm.reason}
                  onChange={handleEditChange}
                  maxLength="255"
                />
              </div>
            </div>

            {error && <p className="appointment-edit-error">{error}</p>}

            <div className="appointment-edit-actions">
              <button
                type="button"
                className="appointment-edit-cancel"
                onClick={() => {
                  setEditingAppointment(null);
                  setError("");
                }}
              >
                Cancel
              </button>

              <button type="submit" className="appointment-edit-save">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="appointments-card">
        <div className="appointments-card-header">
          <h2>
            Appointments <span>({filteredAppointments.length})</span>
          </h2>
        </div>

        <div className="appointments-table-header">
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
            <div className="appointment-row" key={appointment.appointment_id}>
              <div className="appointment-time">
                <strong>{formatTime(appointment.appointment_time)}</strong>

                <span>{formatDate(appointment.appointment_date)}</span>
              </div>

              <div className="appointment-patient">
                <div className="appointment-avatar">
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

              <span className="appointment-reason">
                {appointment.reason || "No reason provided"}
              </span>

              <div>
                <span
                  className={`appointment-status ${appointment.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="appointment-actions">
                <button
                  type="button"
                  className="appointment-record-button"
                  onClick={() => {
                    setSelectedPatientId(appointment.patient_id);

                    setSection("record");
                  }}
                >
                  View Record
                </button>

                <button
                  type="button"
                  className="appointment-edit-button"
                  title="Edit appointment"
                  onClick={() => handleEdit(appointment)}
                >
                  ✎
                </button>

                <button
                  type="button"
                  className="appointment-delete-button"
                  title="Cancel appointment"
                  disabled={appointment.status === "Cancelled"}
                  onClick={() => handleCancelAppointment(appointment)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
