import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function NewAppointment() {
  const { setSection } = useContext(ReceptionistContext);

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [reason, setReason] = useState("");

  const [patients, setPatients] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);

  const [loadingPatients, setLoadingPatients] = useState(true);
  const [booking, setBooking] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const availableTimes = [
    {
      display: "08:30 AM",
      value: "08:30",
    },
    {
      display: "09:00 AM",
      value: "09:00",
    },
    {
      display: "09:30 AM",
      value: "09:30",
    },
    {
      display: "10:00 AM",
      value: "10:00",
    },
    {
      display: "10:30 AM",
      value: "10:30",
    },
    {
      display: "11:00 AM",
      value: "11:00",
    },
    {
      display: "11:30 AM",
      value: "11:30",
    },
    {
      display: "01:00 PM",
      value: "13:00",
    },
    {
      display: "01:30 PM",
      value: "13:30",
    },
    {
      display: "02:00 PM",
      value: "14:00",
    },
    {
      display: "02:30 PM",
      value: "14:30",
    },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoadingPatients(true);

        const response = await axios.get("http://localhost:5000/api/patients");

        setPatients(response.data);
      } catch (error) {
        console.error(error);
        setError("Could not load patients.");
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  const formatSelectedDate = () => {
    if (!selectedDate) {
      return "";
    }

    const month = String(currentMonth + 1).padStart(2, "0");
    const day = String(selectedDate).padStart(2, "0");

    return `${currentYear}-${month}-${day}`;
  };

  useEffect(() => {
    if (!selectedDate) {
      setBookedTimes([]);
      return;
    }

    const fetchBookedTimes = async () => {
      try {
        const month = String(currentMonth + 1).padStart(2, "0");
        const day = String(selectedDate).padStart(2, "0");

        const date = `${currentYear}-${month}-${day}`;

        const response = await axios.get(
          `http://localhost:5000/api/appointments/date/${date}`,
        );

        const occupiedTimes = response.data
          .filter((appointment) => appointment.status !== "Cancelled")
          .map((appointment) => appointment.appointment_time.slice(0, 5));

        setBookedTimes(occupiedTimes);
      } catch (error) {
        console.error(error);
        setBookedTimes([]);
      }
    };

    fetchBookedTimes();
  }, [selectedDate, currentMonth, currentYear]);

  const getDaysInMonth = () => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  const buildCalendarDays = () => {
    const blankDays = Array(getFirstDayOfMonth()).fill("");

    const monthDays = Array.from(
      {
        length: getDaysInMonth(),
      },
      (_, index) => index + 1,
    );

    return [...blankDays, ...monthDays];
  };

  const days = buildCalendarDays();

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  );

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }

    setSelectedDate(null);
    setSelectedTime("");
    setBookedTimes([]);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }

    setSelectedDate(null);
    setSelectedTime("");
    setBookedTimes([]);
  };

  const isPastDate = (day) => {
    if (!day) {
      return true;
    }

    const date = new Date(currentYear, currentMonth, day);

    date.setHours(0, 0, 0, 0);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return date < currentDate;
  };

  const handleBookAppointment = async () => {
    if (
      !selectedPatientId ||
      !selectedDate ||
      !selectedTime ||
      !reason.trim()
    ) {
      setError("Please select a patient, date, time, and reason.");

      return;
    }

    try {
      setBooking(true);
      setError("");
      setMessage("");

      const appointmentDate = formatSelectedDate();

      await axios.post("http://localhost:5000/api/appointments", {
        patient_id: Number(selectedPatientId),
        appointment_date: appointmentDate,
        appointment_time: selectedTime,
        reason: reason.trim(),
      });

      setMessage("Appointment booked successfully.");

      setTimeout(() => {
        setSection("appointments");
      }, 700);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("That appointment time is already booked.");

        if (!bookedTimes.includes(selectedTime)) {
          setBookedTimes((previous) => [...previous, selectedTime]);
        }

        setSelectedTime("");
      } else {
        setError(error.response?.data?.error || "Could not book appointment.");
      }
    } finally {
      setBooking(false);
    }
  };

  return (
    <section className="new-appointment-page">
      <div className="new-appointment-heading">
        <h2>Book an Appointment</h2>

        <p>Choose a patient, date and time with Dr. Hani Kafaween</p>
      </div>

      {/* PATIENT */}

      <div className="appointment-patient-card">
        <h3>Select Patient</h3>

        <select
          className="appointment-patient-select"
          value={selectedPatientId}
          onChange={(e) => {
            setSelectedPatientId(e.target.value);
            setError("");
          }}
          disabled={loadingPatients}
        >
          <option value="">
            {loadingPatients ? "Loading patients..." : "Select a patient"}
          </option>

          {patients.map((patient) => (
            <option key={patient.patient_id} value={patient.patient_id}>
              P-
              {String(patient.patient_id).padStart(4, "0")} -{" "}
              {patient.first_name} {patient.last_name}
            </option>
          ))}
        </select>
      </div>

      <div className="new-appointment-layout">
        {/* CALENDAR */}

        <div className="appointment-calendar-card">
          <div className="calendar-header">
            <strong>{monthName}</strong>

            <div className="calendar-arrows">
              <button type="button" onClick={goToPreviousMonth}>
                ‹
              </button>

              <button type="button" onClick={goToNextMonth}>
                ›
              </button>
            </div>
          </div>

          <div className="calendar-weekdays">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          <div className="calendar-days">
            {days.map((day, index) => {
              const disabled = !day || isPastDate(day);

              return (
                <button
                  key={index}
                  type="button"
                  disabled={disabled}
                  className={
                    Number(day) === selectedDate
                      ? "calendar-day selected"
                      : "calendar-day"
                  }
                  onClick={() => {
                    setSelectedDate(Number(day));
                    setSelectedTime("");
                    setError("");
                    setMessage("");
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="appointment-booking-side">
          <div className="appointment-times-card">
            <h3>
              {selectedDate
                ? `Available times for ${formatSelectedDate()}`
                : "Select a date to see times"}
            </h3>

            {selectedDate ? (
              <div className="appointment-time-options">
                {availableTimes.map((time) => {
                  const booked = bookedTimes.includes(time.value);

                  return (
                    <button
                      key={time.value}
                      type="button"
                      disabled={booked}
                      className={
                        selectedTime === time.value
                          ? "appointment-time-option active"
                          : "appointment-time-option"
                      }
                      onClick={() => {
                        setSelectedTime(time.value);
                        setError("");
                      }}
                    >
                      {booked ? `${time.display} - Booked` : time.display}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="no-date-message">← Pick a date first</p>
            )}
          </div>

          <div className="appointment-reason-card">
            <h3>Reason for Visit</h3>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe the symptoms or the reason for this appointment..."
              maxLength="255"
            />
          </div>

          {error && <p className="appointment-booking-error">{error}</p>}

          {message && <p className="appointment-booking-success">{message}</p>}

          <button
            type="button"
            className="appointment-confirm-button"
            disabled={
              !selectedPatientId ||
              !selectedDate ||
              !selectedTime ||
              !reason.trim() ||
              booking
            }
            onClick={handleBookAppointment}
          >
            {booking
              ? "Booking..."
              : !selectedPatientId
                ? "Select a patient to continue"
                : !selectedDate || !selectedTime
                  ? "Select a date and time to continue"
                  : "Book Appointment"}
          </button>
        </div>
      </div>
    </section>
  );
}
