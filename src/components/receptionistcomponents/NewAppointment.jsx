import { useState, useContext } from "react";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function NewAppointment() {
  const { setSection } = useContext(ReceptionistContext);

  const [selectedDate, setSelectedDate] = useState(14);
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  const days = [
    "", "", "", "", "", "", "1",
    "2", "3", "4", "5", "6", "7", "8",
    "9", "10", "11", "12", "13", "14", "15",
    "16", "17", "18", "19", "20", "21", "22",
    "23", "24", "25", "26", "27", "28", "29",
    "30", "31"
  ];

  const availableTimes = [
    "08:30 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:30 PM",
    "02:30 PM",
  ];

  return (
    <section className="new-appointment-page">

      <div className="new-appointment-heading">
        <h2>Book an Appointment</h2>

        <p>
          Choose a date and time with Dr. Hani Kafaween
        </p>
      </div>


      <div className="new-appointment-layout">

        {/* CALENDAR */}
        <div className="appointment-calendar-card">

          <div className="calendar-header">
            <strong>August 2026</strong>

            <div className="calendar-arrows">
              <button type="button">‹</button>
              <button type="button">›</button>
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

            {days.map((day, index) => (
              <button
                key={index}
                type="button"
                disabled={!day}
                className={
                  Number(day) === selectedDate
                    ? "calendar-day selected"
                    : "calendar-day"
                }
                onClick={() => {
                  setSelectedDate(Number(day));
                  setSelectedTime("");
                }}
              >
                {day}
              </button>
            ))}

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="appointment-booking-side">

          <div className="appointment-times-card">

            <h3>
              Select a date to see times
            </h3>

            {selectedDate ? (
              <div className="appointment-time-options">

                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={
                      selectedTime === time
                        ? "appointment-time-option active"
                        : "appointment-time-option"
                    }
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}

              </div>
            ) : (
              <p className="no-date-message">
                ← Pick a date first
              </p>
            )}

          </div>


          <div className="appointment-reason-card">

            <h3>
              Reason for Visit
            </h3>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe the symptoms or the reason for this appointment..."
            />

          </div>


          <button
            type="button"
            className="appointment-confirm-button"
            disabled={!selectedDate || !selectedTime || !reason.trim()}
            onClick={() => {
              alert("Appointment booked!");
              setSection("appointments");
            }}
          >
            {!selectedDate || !selectedTime
              ? "Select a date and time to continue"
              : "Book Appointment"}
          </button>

        </div>

      </div>

    </section>
  );
}