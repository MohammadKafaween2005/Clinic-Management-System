import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

export default function NextPatientCard({ setSelectedPatientId }) {
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

  const now = new Date();

  const today =
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}`;

  const todayAppointments = appointments.filter((appointment) => {
    const appointmentDate = appointment.appointment_date?.split("T")[0];

    return appointmentDate === today;
  });

  const currentTime = new Date();

  const upcomingAppointments = appointments
    .filter((appointment) => {
      if (
        appointment.status !== "Scheduled" &&
        appointment.status !== "Checked In"
      ) {
        return false;
      }

      const date = appointment.appointment_date?.split("T")[0];

      if (!date || !appointment.appointment_time) {
        return false;
      }

      const appointmentDateTime = new Date(
        `${date}T${appointment.appointment_time}`,
      );

      return appointmentDateTime >= currentTime;
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

  const nextPatient = upcomingAppointments[0];

  const totalToday = todayAppointments.length;

  const waitingNow = todayAppointments.filter(
    (appointment) => appointment.status === "Checked In",
  ).length;

  const completed = todayAppointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

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
    const todayDate = new Date();

    let age = todayDate.getFullYear() - birthDate.getFullYear();

    const monthDifference = todayDate.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && todayDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleOpenRecord = () => {
    setSelectedPatientId(nextPatient.patient_id);
    setSection("record");
  };

  const handleStartConsultation = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${nextPatient.appointment_id}`,
        {
          patient_id: nextPatient.patient_id,
          doctor_id: nextPatient.doctor_id,
          appointment_date: nextPatient.appointment_date.split("T")[0],
          appointment_time: nextPatient.appointment_time,
          duration_minutes: nextPatient.duration_minutes || 30,
          reason: nextPatient.reason,
          status: "Completed",
        },
      );

      setAppointments((previousAppointments) =>
        previousAppointments.map((appointment) =>
          appointment.appointment_id === nextPatient.appointment_id
            ? {
                ...appointment,
                ...response.data,
                first_name: appointment.first_name,
                last_name: appointment.last_name,
                date_of_birth: appointment.date_of_birth,
              }
            : appointment,
        ),
      );

      setSelectedPatientId(nextPatient.patient_id);
      setSection("record");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.error || "Could not start consultation.");
    }
  };

  if (loading) {
    return (
      <div className="next-patient-card">
        <p>Loading next patient...</p>
      </div>
    );
  }

  if (!nextPatient) {
    return (
      <div className="next-patient-card">
        <div className="next-patient-top">
          <div>
            <p className="next-patient-label">NEXT PATIENT</p>
            <h2>No upcoming patients</h2>
          </div>
        </div>

        <div className="dashboard-stats">
          <div>
            <strong>{totalToday}</strong>
            <span>Total today</span>
          </div>

          <div>
            <strong>{waitingNow}</strong>
            <span>Waiting now</span>
          </div>

          <div>
            <strong>{completed}</strong>
            <span>Completed</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="next-patient-card">
      <div className="next-patient-top">
        <div>
          <p className="next-patient-label">NEXT PATIENT</p>

          <h2>
            {nextPatient.first_name} {nextPatient.last_name}
          </h2>

          <div className="next-patient-details">
            <span>{formatTime(nextPatient.appointment_time)}</span>

            <span>•</span>

            <span>{nextPatient.duration_minutes || 30} min</span>

            <span>•</span>

            <span>Age {calculateAge(nextPatient.date_of_birth)}</span>
          </div>
        </div>

        <span
          className={
            nextPatient.status === "Checked In"
              ? "patient-status checked-in"
              : "patient-status"
          }
        >
          ● {nextPatient.status}
        </span>
      </div>

      <div className="visit-reason-box">
        <span>Reason for Visit</span>

        <strong>{nextPatient.reason || "Not provided"}</strong>
      </div>

      <div className="next-patient-buttons">
        <button className="open-record-button" onClick={handleOpenRecord}>
          Open Patient Record
        </button>

        <button
          className="start-consultation-button"
          onClick={handleStartConsultation}
        >
          Start Consultation
        </button>
      </div>

      <div className="dashboard-stats">
        <div>
          <strong>{totalToday}</strong>
          <span>Total today</span>
        </div>

        <div>
          <strong>{waitingNow}</strong>
          <span>Waiting now</span>
        </div>

        <div>
          <strong>{completed}</strong>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}
