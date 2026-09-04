import { useState } from "react";

export default function PatientBookAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  const availableDates = [
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

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

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    const appointment = {
      date: `2026-08-${String(selectedDate).padStart(2, "0")}`,
      time: selectedTime,
      reason,
    };

    console.log("Appointment:", appointment);
  };

  return (
    <section className="patient-book-page">
      <div className="patient-book-wrapper">
        <div className="patient-book-heading">
          <h2>Book an Appointment</h2>
          <p>Choose a date and time with Dr. Hani Kafaween</p>
        </div>

        <div className="patient-book-grid">
          {/* CALENDAR */}
          <div className="patient-calendar-card">
            <div className="patient-calendar-title">
              <strong>August 2026</strong>

              <div>
                <button type="button">‹</button>
                <button type="button">›</button>
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
              {/* August 1, 2026 is Saturday */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {Array.from({ length: 31 }, (_, index) => {
                const day = index + 1;
                const disabled = !availableDates.includes(day);

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
                  ? `Available times for August ${selectedDate}`
                  : "Select a date to see times"}
              </h3>

              {!selectedDate ? (
                <div className="patient-no-date">← Pick a date first</div>
              ) : (
                <div className="patient-time-grid">
                  {times.map((time) => (
                    <button
                      type="button"
                      key={time}
                      className={
                        selectedTime === time
                          ? "patient-time-button selected"
                          : "patient-time-button"
                      }
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="patient-reason-card">
              <label>Reason for Visit</label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or the reason for this appointment..."
              />
            </div>

            <button
              type="button"
              className="patient-book-continue"
              disabled={!selectedDate || !selectedTime}
              onClick={handleSubmit}
            >
              {selectedDate && selectedTime
                ? "Book Appointment"
                : "Select a date and time to continue"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
