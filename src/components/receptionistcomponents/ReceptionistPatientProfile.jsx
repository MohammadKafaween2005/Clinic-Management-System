import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistPatientProfile({ patientId }) {
  const { setSection } = useContext(ReceptionistContext);

  const [tab, setTab] = useState("overview");
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [patientResponse, appointmentsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/patients/${patientId}`),
          axios.get(
            `http://localhost:5000/api/appointments/patient/${patientId}`,
          ),
        ]);

        setPatient(patientResponse.data);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.error || "Could not load patient profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (date) => {
    if (!date) return "None";

    return date.split("T")[0];
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

  const completedAppointments = appointments
    .filter((appointment) => appointment.status === "Completed")
    .sort(
      (a, b) => new Date(b.appointment_date) - new Date(a.appointment_date),
    );

  const upcomingAppointments = appointments
    .filter((appointment) => {
      if (
        appointment.status === "Cancelled" ||
        appointment.status === "Completed" ||
        appointment.status === "No Show"
      ) {
        return false;
      }

      const appointmentDateTime = new Date(
        `${formatDate(appointment.appointment_date)}T${
          appointment.appointment_time
        }`,
      );

      return appointmentDateTime >= new Date();
    })
    .sort((a, b) => {
      const dateA = new Date(
        `${formatDate(a.appointment_date)}T${a.appointment_time}`,
      );

      const dateB = new Date(
        `${formatDate(b.appointment_date)}T${b.appointment_time}`,
      );

      return dateA - dateB;
    });

  const lastVisit = completedAppointments[0] || null;

  const nextAppointment = upcomingAppointments[0] || null;

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(
      `${formatDate(a.appointment_date)}T${a.appointment_time}`,
    );

    const dateB = new Date(
      `${formatDate(b.appointment_date)}T${b.appointment_time}`,
    );

    return dateB - dateA;
  });

  const getStatusClass = (status) => {
    return status.toLowerCase().replaceAll(" ", "-");
  };

  if (loading) {
    return (
      <section className="receptionist-patient-profile">
        <p>Loading patient profile...</p>
      </section>
    );
  }

  if (!patientId) {
    return (
      <section className="receptionist-patient-profile">
        <button
          type="button"
          className="receptionist-profile-back"
          onClick={() => setSection("patients")}
        >
          ← Back to Patients
        </button>

        <p>Please select a patient first.</p>
      </section>
    );
  }

  if (error || !patient) {
    return (
      <section className="receptionist-patient-profile">
        <button
          type="button"
          className="receptionist-profile-back"
          onClick={() => setSection("patients")}
        >
          ← Back to Patients
        </button>

        <p>{error || "Patient not found."}</p>
      </section>
    );
  }

  return (
    <section className="receptionist-patient-profile">
      <button
        type="button"
        className="receptionist-profile-back"
        onClick={() => setSection("patients")}
      >
        ← Back to Patients
      </button>

      {/* PATIENT TOP CARD */}

      <div className="receptionist-profile-card">
        <div className="receptionist-profile-top">
          <div className="receptionist-profile-avatar">
            {getInitials(patient.first_name, patient.last_name)}
          </div>

          <div className="receptionist-profile-main">
            <h2>
              {patient.first_name} {patient.last_name}
            </h2>

            <p>
              P-
              {String(patient.patient_id).padStart(4, "0")}
              {" · "}
              {patient.gender || "Not specified"}
              {" · "}
              Born {formatDate(patient.date_of_birth)}
            </p>
          </div>
        </div>

        {/* CONTACT INFORMATION */}

        <div className="receptionist-profile-contact-grid">
          <div className="receptionist-profile-info-box">
            <span>Phone</span>

            <strong>{patient.phone || "Not provided"}</strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span>Email</span>

            <strong>{patient.email || "Not provided"}</strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span>Blood Type</span>

            <strong>{patient.blood_type || "Not provided"}</strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span>Allergies</span>

            <strong>{patient.allergies || "None"}</strong>
          </div>
        </div>

        {/* ALLERGY */}

        {patient.allergies && (
          <div className="receptionist-profile-allergy">
            ⚠ Allergy alert: {patient.allergies}
          </div>
        )}

        {/* TABS */}

        <div className="receptionist-profile-tabs">
          <button
            type="button"
            className={`receptionist-profile-tab ${
              tab === "overview" ? "active" : ""
            }`}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>

          <button
            type="button"
            className={`receptionist-profile-tab ${
              tab === "appointments" ? "active" : ""
            }`}
            onClick={() => setTab("appointments")}
          >
            Appointments
          </button>
        </div>
      </div>

      {/* OVERVIEW */}

      {tab === "overview" && (
        <div className="receptionist-profile-bottom">
          <div className="receptionist-profile-details-card">
            <h3>Patient Details</h3>

            <div className="receptionist-profile-details-grid">
              <div className="receptionist-profile-detail">
                <span>Age</span>

                <strong>{calculateAge(patient.date_of_birth)} years</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Date of Birth</span>

                <strong>{formatDate(patient.date_of_birth)}</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Gender</span>

                <strong>{patient.gender || "Not provided"}</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Blood Type</span>

                <strong>{patient.blood_type || "Not provided"}</strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Last Visit</span>

                <strong>
                  {lastVisit ? formatDate(lastVisit.appointment_date) : "None"}
                </strong>
              </div>

              <div className="receptionist-profile-detail">
                <span>Next Appointment</span>

                <strong>
                  {nextAppointment
                    ? formatDate(nextAppointment.appointment_date)
                    : "None"}
                </strong>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="receptionist-profile-side">
            <div className="receptionist-profile-next">
              <span>Next Appointment</span>

              {nextAppointment ? (
                <>
                  <strong>
                    {formatDate(nextAppointment.appointment_date)}
                  </strong>

                  <p>
                    {nextAppointment.reason || "No reason provided"}
                    {" · "}
                    {nextAppointment.duration_minutes || 30} min
                  </p>
                </>
              ) : (
                <strong>No upcoming appointment</strong>
              )}
            </div>

            <div className="receptionist-profile-allergies-card">
              <span>⚠ Known Allergies</span>

              <strong>{patient.allergies || "None"}</strong>
            </div>
          </div>
        </div>
      )}

      {/* APPOINTMENTS TAB */}

      {tab === "appointments" && (
        <div className="receptionist-profile-appointments">
          {sortedAppointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            sortedAppointments.map((appointment) => (
              <div
                className="receptionist-profile-appointment"
                key={appointment.appointment_id}
              >
                <div>
                  <h3>{appointment.reason || "No reason provided"}</h3>

                  <p>
                    {formatDate(appointment.appointment_date)}
                    {" · "}
                    {formatTime(appointment.appointment_time)}
                    {" · "}
                    {appointment.duration_minutes || 30} min
                  </p>
                </div>

                <span
                  className={`receptionist-profile-appointment-status ${getStatusClass(
                    appointment.status,
                  )}`}
                >
                  ● {appointment.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
