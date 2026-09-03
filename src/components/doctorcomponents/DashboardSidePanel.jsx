import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
export default function DashboardSidePanel() {
  const { setSection } = useContext(DoctorContext);
  return (
    <div className="dashboard-side-panel">
      <div className="recent-records-card">
        <h2>Recent Medical Records</h2>

        <div className="record-row">
          <div>
            <h3>Robert Nguyen</h3>
            <p>Stage 2 Hypertension</p>
          </div>

          <span>2026-08-10</span>
        </div>

        <div className="record-row">
          <div>
            <h3>Robert Nguyen</h3>
            <p>Hypertension (monitoring)</p>
          </div>

          <span>2026-07-01</span>
        </div>

        <div className="record-row">
          <div>
            <h3>James Thornton</h3>
            <p>Type 2 Diabetes – well controlled</p>
          </div>

          <span>2026-07-28</span>
        </div>
      </div>

      <div className="your-patients-card">
        <h2>Your Patients</h2>

        <div className="dashboard-patient-row">
          <span className="today-patient-avatar">JT</span>

          <div>
            <h3>James Thornton</h3>
            <p>Next: 2026-08-16</p>
          </div>

          <span>›</span>
        </div>

        <div className="dashboard-patient-row">
          <span className="today-patient-avatar">AC</span>

          <div>
            <h3>Amelia Chen</h3>
            <p>Next: 2026-08-20</p>
          </div>

          <span>›</span>
        </div>

        <div className="dashboard-patient-row">
          <span className="today-patient-avatar">RN</span>

          <div>
            <h3>Robert Nguyen</h3>
            <p>Next: 2026-08-14</p>
          </div>

          <span>›</span>
        </div>

        <button className="view-all-patients-button"
          onClick= {() => setSection("patients")} >
          View all patients →
        </button>
      </div>
    </div>
  );
}
