import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

export default function NextPatientCard() {
  const { setSection } = useContext(DoctorContext);

  return (
    <div className="next-patient-card">

      <div className="next-patient-top">
        <div>
          <p className="next-patient-label">
            NEXT PATIENT
          </p>

          <h2>Robert Nguyen</h2>

          <div className="next-patient-details">
            <span>08:30 AM</span>
            <span>•</span>
            <span>20 min</span>
            <span>•</span>
            <span>Age 58</span>
          </div>
        </div>

        <span className="patient-status checked-in">
          ● Checked In
        </span>
      </div>


      <div className="visit-reason-box">
        <span>Reason for Visit</span>
        <strong>Blood pressure follow-up</strong>
      </div>


      <div className="next-patient-buttons">

        <button
          className="open-record-button"
          onClick={() => setSection("record")}
        >
          Open Patient Record
        </button>

        <button className="start-consultation-button">
          Start Consultation
        </button>

      </div>


      <div className="dashboard-stats">

        <div>
          <strong>6</strong>
          <span>Total today</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Waiting now</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Completed</span>
        </div>

      </div>

    </div>
  );
}