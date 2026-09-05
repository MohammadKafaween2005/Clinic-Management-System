import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorViewRecord({ patientId }) {
  const [recordTab, setRecordTab] = useState("overview");
  const [showAddRecord, setShowAddRecord] = useState(false);

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { setSection } = useContext(DoctorContext);

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    const fetchPatientData = async () => {
      try {
        setLoading(true);
        setError("");

        const patientResponse = await axios.get(
          `http://localhost:5000/api/patients/${patientId}`,
        );

        const appointmentsResponse = await axios.get(
          `http://localhost:5000/api/appointments/patient/${patientId}`,
        );

        const recordsResponse = await axios.get(
          `http://localhost:5000/api/medical-records/patient/${patientId}`,
        );

        setPatient(patientResponse.data);
        setAppointments(appointmentsResponse.data);
        setMedicalRecords(recordsResponse.data);
      } catch (error) {
        console.error(error);
        setError("Could not load patient record.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const getInitials = () => {
    if (!patient) return "";

    const first = patient.first_name?.charAt(0) || "";
    const last = patient.last_name?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "Not provided";

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

  const completedAppointments = appointments
    .filter((appointment) => appointment.status === "Completed")
    .sort(
      (a, b) => new Date(b.appointment_date) - new Date(a.appointment_date),
    );

  const lastVisit = completedAppointments[0]?.appointment_date || null;

  const upcomingAppointments = appointments
    .filter((appointment) => {
      if (
        appointment.status === "Cancelled" ||
        appointment.status === "Completed" ||
        appointment.status === "No Show"
      ) {
        return false;
      }

      const date = appointment.appointment_date.split("T")[0];

      const appointmentDateTime = new Date(
        `${date}T${appointment.appointment_time}`,
      );

      return appointmentDateTime >= new Date();
    })
    .sort((a, b) => {
      const dateA = new Date(
        `${a.appointment_date.split("T")[0]}T${a.appointment_time}`,
      );

      const dateB = new Date(
        `${b.appointment_date.split("T")[0]}T${b.appointment_time}`,
      );

      return dateA - dateB;
    });

  const nextAppointment = upcomingAppointments[0] || null;

  const handleSaveRecord = async () => {
    setError("");
    setMessage("");

    if (!diagnosis.trim()) {
      setError("Diagnosis is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/medical-records",
        {
          patient_id: patientId,
          diagnosis,
          treatment,
          notes,
        },
      );

      setMedicalRecords((previousRecords) => [
        response.data,
        ...previousRecords,
      ]);

      setDiagnosis("");
      setTreatment("");
      setNotes("");

      setMessage("Medical record added successfully.");
      setShowAddRecord(false);

      setRecordTab("history");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.error || "Could not save medical record.");
    }
  };

  if (loading) {
    return (
      <section className="doctor-record-page">
        <p>Loading patient record...</p>
      </section>
    );
  }

  if (!patientId) {
    return (
      <section className="doctor-record-page">
        <button
          className="record-back-button"
          onClick={() => setSection("patients")}
        >
          ← Back to Patients
        </button>

        <p>No patient selected.</p>
      </section>
    );
  }

  if (error && !patient) {
    return (
      <section className="doctor-record-page">
        <button
          className="record-back-button"
          onClick={() => setSection("patients")}
        >
          ← Back to Patients
        </button>

        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="doctor-record-page">
      <button
        className="record-back-button"
        onClick={() => setSection("patients")}
      >
        ← Back to Patients
      </button>

      <div className="record-profile-card">
        <div className="record-profile-top">
          <div className="record-patient-main">
            <div className="record-avatar">{getInitials()}</div>

            <div>
              <h2>
                {patient.first_name} {patient.last_name}
              </h2>

              <p>
                P-
                {String(patient.patient_id).padStart(4, "0")} ·{" "}
                {patient.gender || "Not provided"} · Born{" "}
                {formatDate(patient.date_of_birth)}
              </p>
            </div>
          </div>

          <button
            className="record-add-button"
            onClick={() => {
              setShowAddRecord(true);
              setError("");
              setMessage("");
            }}
          >
            + Add Record
          </button>
        </div>

        <div className="record-contact-grid">
          <div className="record-info-box">
            <span>Phone</span>
            <strong>{patient.phone || "Not provided"}</strong>
          </div>

          <div className="record-info-box">
            <span>Email</span>
            <strong>{patient.email || "Not provided"}</strong>
          </div>

          <div className="record-info-box">
            <span>Blood Type</span>
            <strong>{patient.blood_type || "Not provided"}</strong>
          </div>

          <div className="record-info-box">
            <span>Allergies</span>
            <strong>{patient.allergies || "None reported"}</strong>
          </div>
        </div>

        {patient.allergies && (
          <div className="record-allergy-alert">
            ⚠ Allergy alert: {patient.allergies}
          </div>
        )}

        <div className="record-tabs">
          <button
            className={`record-tab ${recordTab === "overview" ? "active" : ""}`}
            onClick={() => setRecordTab("overview")}
          >
            Overview
          </button>

          <button
            className={`record-tab ${
              recordTab === "appointments" ? "active" : ""
            }`}
            onClick={() => setRecordTab("appointments")}
          >
            Appointments
          </button>

          <button
            className={`record-tab ${recordTab === "history" ? "active" : ""}`}
            onClick={() => setRecordTab("history")}
          >
            Medical History
          </button>
        </div>
      </div>

      {/* ADD RECORD FORM */}

      {showAddRecord && (
        <div className="new-medical-record-card">
          <h3>New Medical Record</h3>

          <div className="new-record-top">
            <div className="new-record-field">
              <label>Diagnosis</label>

              <input
                type="text"
                placeholder="Primary diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </div>

            <div className="new-record-field">
              <label>Treatment</label>

              <input
                type="text"
                placeholder="Medications or treatment plan"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
              />
            </div>
          </div>

          <div className="new-record-field">
            <label>Doctor Notes</label>

            <textarea
              placeholder="Clinical observations, instructions, follow-up plan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          {error && <p className="login-error">{error}</p>}

          {message && <p className="login-success">{message}</p>}

          <div className="new-record-buttons">
            <button
              type="button"
              className="new-record-cancel"
              onClick={() => {
                setShowAddRecord(false);
                setError("");
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              className="new-record-save"
              onClick={handleSaveRecord}
            >
              Save Record
            </button>
          </div>
        </div>
      )}

      {/* OVERVIEW */}

      {recordTab === "overview" && (
        <div className="record-bottom-grid">
          <div className="record-details-card">
            <h3>Patient Details</h3>

            <div className="record-details-grid">
              <div className="record-detail-box">
                <span>Age</span>
                <strong>{calculateAge(patient.date_of_birth)} years</strong>
              </div>

              <div className="record-detail-box">
                <span>Date of Birth</span>
                <strong>{formatDate(patient.date_of_birth)}</strong>
              </div>

              <div className="record-detail-box">
                <span>Gender</span>
                <strong>{patient.gender || "Not provided"}</strong>
              </div>

              <div className="record-detail-box">
                <span>Blood Type</span>
                <strong>{patient.blood_type || "Not provided"}</strong>
              </div>

              <div className="record-detail-box">
                <span>Last Visit</span>
                <strong>{lastVisit ? formatDate(lastVisit) : "None"}</strong>
              </div>

              <div className="record-detail-box">
                <span>Next Appointment</span>
                <strong>
                  {nextAppointment
                    ? formatDate(nextAppointment.appointment_date)
                    : "None"}
                </strong>
              </div>
            </div>
          </div>

          <div className="record-side-column">
            <div className="record-next-card">
              <span>Next Appointment</span>

              {nextAppointment ? (
                <>
                  <strong>
                    {formatDate(nextAppointment.appointment_date)}
                  </strong>

                  <p>
                    {nextAppointment.reason || "No reason provided"} ·{" "}
                    {nextAppointment.duration_minutes || 30} min
                  </p>
                </>
              ) : (
                <strong>No upcoming appointment</strong>
              )}
            </div>

            <div className="record-allergies-card">
              <span>⚠ Known Allergies</span>

              <strong>{patient.allergies || "None reported"}</strong>
            </div>
          </div>
        </div>
      )}

      {/* APPOINTMENTS */}

      {recordTab === "appointments" && (
        <div className="patient-record-appointments">
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            appointments.map((appointment) => (
              <div
                className="patient-record-appointment"
                key={appointment.appointment_id}
              >
                <div className="patient-record-time">
                  {formatTime(appointment.appointment_time)}
                </div>

                <div className="patient-record-appointment-info">
                  <h3>{appointment.reason || "No reason provided"}</h3>

                  <p>
                    {formatDate(appointment.appointment_date)} ·{" "}
                    {formatTime(appointment.appointment_time)} ·{" "}
                    {appointment.duration_minutes || 30} min
                  </p>
                </div>

                <span
                  className={`patient-record-status ${appointment.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  ● {appointment.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* MEDICAL HISTORY */}

      {recordTab === "history" && (
        <div className="medical-history-section">
          {medicalRecords.length === 0 ? (
            <p>No medical records found.</p>
          ) : (
            medicalRecords.map((record) => (
              <div className="medical-record-card" key={record.record_id}>
                <div className="medical-record-header">
                  <div>
                    <h3>{record.diagnosis}</h3>

                    <p>
                      {formatDate(record.record_date)} ·{" "}
                      {record.doctor_name || "Dr. Hani Kafaween"}
                    </p>
                  </div>

                  <button className="medical-record-edit">Edit</button>
                </div>

                <div className="medical-record-content">
                  <div className="medical-record-treatment">
                    <span>TREATMENT</span>

                    <p>{record.treatment || "No treatment recorded"}</p>
                  </div>

                  <div className="medical-record-notes">
                    <span>DOCTOR NOTES</span>

                    <p>{record.notes || "No notes recorded"}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
