import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

export default function DashboardSidePanel() {
  const { setSection } = useContext(DoctorContext);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Get all patients
        const patientsResponse = await axios.get(
          "http://localhost:5000/api/patients",
        );

        const patientData = patientsResponse.data;

        setPatients(patientData);

        // Get all appointments
        const appointmentsResponse = await axios.get(
          "http://localhost:5000/api/appointments",
        );

        setAppointments(appointmentsResponse.data);

        // Get medical records for every patient
        const recordRequests = patientData.map((patient) =>
          axios.get(
            `http://localhost:5000/api/medical-records/patient/${patient.patient_id}`,
          ),
        );

        const recordResponses = await Promise.all(recordRequests);

        const allRecords = recordResponses.flatMap((response) => response.data);

        setMedicalRecords(allRecords);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString("en-CA");
  };

  // Sort newest medical records first
  const recentRecords = [...medicalRecords]
    .sort((a, b) => new Date(b.record_date) - new Date(a.record_date))
    .slice(0, 3);

  // Find next appointment for a patient
  const getNextAppointment = (patientId) => {
    const now = new Date();

    const upcomingAppointments = appointments
      .filter((appointment) => {
        if (appointment.patient_id !== patientId) {
          return false;
        }

        if (
          appointment.status === "Cancelled" ||
          appointment.status === "Completed" ||
          appointment.status === "No Show"
        ) {
          return false;
        }

        const appointmentDateTime = new Date(
          `${appointment.appointment_date.split("T")[0]}T${
            appointment.appointment_time
          }`,
        );

        return appointmentDateTime >= now;
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

    return upcomingAppointments[0];
  };

  if (loading) {
    return (
      <div className="dashboard-side-panel">
        <div className="recent-records-card">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-side-panel">
      {/* RECENT MEDICAL RECORDS */}

      <div className="recent-records-card">
        <h2>Recent Medical Records</h2>

        {recentRecords.length === 0 ? (
          <p>No medical records found.</p>
        ) : (
          recentRecords.map((record) => (
            <div className="record-row" key={record.record_id}>
              <div>
                <h3>
                  {record.first_name} {record.last_name}
                </h3>

                <p>{record.diagnosis || "No diagnosis provided"}</p>
              </div>

              <span>{formatDate(record.record_date)}</span>
            </div>
          ))
        )}
      </div>

      {/* YOUR PATIENTS */}

      <div className="your-patients-card">
        <h2>Your Patients</h2>

        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          patients.slice(0, 3).map((patient) => {
            const nextAppointment = getNextAppointment(patient.patient_id);

            return (
              <div className="dashboard-patient-row" key={patient.patient_id}>
                <span className="today-patient-avatar">
                  {getInitials(patient.first_name, patient.last_name)}
                </span>

                <div>
                  <h3>
                    {patient.first_name} {patient.last_name}
                  </h3>

                  <p>
                    {nextAppointment
                      ? `Next: ${formatDate(nextAppointment.appointment_date)}`
                      : "No upcoming appointment"}
                  </p>
                </div>

                <span>›</span>
              </div>
            );
          })
        )}

        <button
          className="view-all-patients-button"
          onClick={() => setSection("patients")}
        >
          View all patients →
        </button>
      </div>
    </div>
  );
}
