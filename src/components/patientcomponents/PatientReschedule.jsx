import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PatientContext } from "../../context/PatientContext";

export default function PatientReschedule({ appointment }) {
  const { setSection } = useContext(PatientContext);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  const [bookedTimes, setBookedTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const times = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const convertTimeTo24Hour = (time) => {
    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    hours = Number(hours);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${minutes}:00`;
  };

  const convertTimeTo12Hour = (time) => {
    if (!time) {
      return "";
    }

    const [hoursString, minutes] = time.split(":");

    let hours = Number(hoursString);

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
      hours = 12;
    }

    return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
  };

  const getSelectedDateString = () => {
    if (!selectedDate) {
      return null;
    }

    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      selectedDate,
    ).padStart(2, "0")}`;
  };

  // Load old appointment values
  useEffect(() => {
    if (!appointment) {
      return;
    }

    const oldDate = appointment.appointment_date.split("T")[0];

    const [oldYear, oldMonth, oldDay] = oldDate.split("-").map(Number);

    setCurrentDate(new Date(oldYear, oldMonth - 1, 1));

    setSelectedDate(oldDay);

    setSelectedTime(convertTimeTo12Hour(appointment.appointment_time));

    setReason(appointment.reason || "");
  }, [appointment]);

  // Get appointments already booked on selected day
  useEffect(() => {
    if (!selectedDate || !appointment) {
      return;
    }

    const fetchBookedTimes = async () => {
      try {
        setLoadingTimes(true);
        setError("");

        const appointmentDate = getSelectedDateString();

        const response = await axios.get(
          `http://localhost:5000/api/appointments/date/${appointmentDate}`,
        );

        const occupiedTimes = response.data
          .filter((item) => {
            if (item.status === "Cancelled") {
              return false;
            }

            // Do not count the appointment we are currently editing
            if (item.appointment_id === appointment.appointment_id) {
              return false;
            }

            return true;
          })
          .map((item) => item.appointment_time);

        setBookedTimes(occupiedTimes);
      } catch (error) {
        console.error(error);

        setError("Could not load available appointment times.");
      } finally {
        setLoadingTimes(false);
      }
    };

    fetchBookedTimes();
  }, [selectedDate, year, month, appointment]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));

    setSelectedDate(null);
    setSelectedTime("");
    setBookedTimes([]);
    setMessage("");
    setError("");
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));

    setSelectedDate(null);
    setSelectedTime("");
    setBookedTimes([]);
    setMessage("");
    setError("");
  };

  const isPastDate = (day) => {
    const dateToCheck = new Date(year, month, day);

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    dateToCheck.setHours(0, 0, 0, 0);

    return dateToCheck < today;
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !reason.trim()) {
      setError("Please select a date, time, and enter a reason.");
      return;
    }

    try {
      setError("");
      setMessage("");

      const appointmentDate = getSelectedDateString();

      const appointmentTime = convertTimeTo24Hour(selectedTime);

      await axios.put(
        `http://localhost:5000/api/appointments/${appointment.appointment_id}`,
        {
          patient_id: user.profile_id,
          doctor_id: appointment.doctor_id || 1,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          duration_minutes: appointment.duration_minutes || 30,
          reason: reason,
          status: "Scheduled",
        },
      );

      setMessage("Appointment rescheduled successfully.");

      setTimeout(() => {
        setSection("appointments");
      }, 1000);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("This time slot is already booked.");
      } else {
        setError(
          error.response?.data?.error || "Could not reschedule appointment.",
        );
      }
    }
  };

  if (!appointment) {
    return (
      <section className="patient-book-page">
        <div className="patient-book-wrapper">
          <p>No appointment selected.</p>

          <button type="button" onClick={() => setSection("appointments")}>
            Back to Appointments
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="patient-book-page">
      <div className="patient-book-wrapper">
        <div className="patient-book-heading">
          <h2>Reschedule Appointment</h2>

          <p>Choose a new date and time with Dr. Hani Kafaween</p>
        </div>

        <div className="patient-book-grid">
          {/* CALENDAR */}

          <div className="patient-calendar-card">
            <div className="patient-calendar-title">
              <strong>
                {monthName} {year}
              </strong>

              <div>
                <button type="button" onClick={goToPreviousMonth}>
                  ‹
                </button>

                <button type="button" onClick={goToNextMonth}>
                  ›
                </button>
              </div>
            </div>

            <div className="patient-calendar-days">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            <div className="patient-calendar-grid">
              {Array.from({ length: firstDayOfMonth }, (_, index) => (
                <span key={`empty-${index}`}></span>
              ))}

              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;

                const disabled = isPastDate(day);

                return (
                  <button
                    type="button"
                    key={day}
                    disabled={disabled}
                    className={
                      selectedDate === day
                        ? "patient-calendar-date selected"
                        : "patient-calendar-date"
                    }
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedTime("");
                      setMessage("");
                      setError("");
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="patient-book-right">
            <div className="patient-time-card">
              <h3>
                {selectedDate
                  ? `Available times for ${monthName} ${selectedDate}`
                  : "Select a date to see times"}
              </h3>

              {!selectedDate ? (
                <div className="patient-no-date">← Pick a date first</div>
              ) : loadingTimes ? (
                <div className="patient-no-date">
                  Loading available times...
                </div>
              ) : (
                <div className="patient-time-grid">
                  {times.map((time) => {
                    const databaseTime = convertTimeTo24Hour(time);

                    const booked = bookedTimes.some((bookedTime) =>
                      bookedTime.startsWith(databaseTime.slice(0, 5)),
                    );

                    return (
                      <button
                        type="button"
                        key={time}
                        disabled={booked}
                        className={
                          selectedTime === time
                            ? "patient-time-button selected"
                            : booked
                              ? "patient-time-button booked"
                              : "patient-time-button"
                        }
                        onClick={() => {
                          setSelectedTime(time);
                          setMessage("");
                          setError("");
                        }}
                      >
                        {time}

                        {booked && (
                          <span className="patient-time-booked-label">
                            Booked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="patient-reason-card">
              <label>Reason for Visit</label>

              <textarea
                maxLength="255"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or the reason for this appointment..."
              />

              <span className="patient-reason-count">{reason.length}/255</span>
            </div>

            {error && <div className="patient-book-message error">{error}</div>}

            {message && (
              <div className="patient-book-message success">{message}</div>
            )}

            <button
              type="button"
              className="patient-book-continue"
              disabled={
                !selectedDate || !selectedTime || !reason.trim() || loadingTimes
              }
              onClick={handleSubmit}
            >
              Save New Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
