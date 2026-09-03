import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorPatients() {
  const { setSection } = useContext(DoctorContext);

  const patients = [
    {
      initials: "JT",
      name: "James Thornton",
      id: "P-0001",
      email: "j.thornton@email.com",
      age: 42,
      phone: "(02) 8123 4567",
      lastVisit: "2026-07-28",
      nextAppointment: "2026-08-16",
    },
    {
      initials: "AC",
      name: "Amelia Chen",
      id: "P-0002",
      email: "amelia.chen@email.com",
      age: 31,
      phone: "(02) 8234 5678",
      lastVisit: "2026-08-05",
      nextAppointment: "2026-08-20",
    },
    {
      initials: "RN",
      name: "Robert Nguyen",
      id: "P-0003",
      email: "r.nguyen@email.com",
      age: 58,
      phone: "(02) 8345 6789",
      lastVisit: "2026-08-10",
      nextAppointment: "2026-08-14",
    },
    {
      initials: "PS",
      name: "Priya Sharma",
      id: "P-0004",
      email: "priya.s@email.com",
      age: 27,
      phone: "(02) 8456 7890",
      lastVisit: "2026-07-15",
      nextAppointment: "2026-08-22",
    },
    {
      initials: "DO",
      name: "David Okafor",
      id: "P-0005",
      email: "d.okafor@email.com",
      age: 45,
      phone: "(02) 8567 8901",
      lastVisit: "2026-08-01",
      nextAppointment: "2026-08-28",
    },
    {
      initials: "SW",
      name: "Sophie Williams",
      id: "P-0006",
      email: "sophie.w@email.com",
      age: 36,
      phone: "(02) 8678 9012",
      lastVisit: "2026-08-12",
      nextAppointment: "2026-09-02",
    },
  ];

  return (
    <section className="doctor-patients-section">

      <div className="patients-toolbar">

        <input
          type="text"
          placeholder="Search by name, ID, or phone..."
          className="patients-search"
        />

        <button className="add-patient-button">
          + Add Patient
        </button>

      </div>


      <div className="patients-card">

        <div className="patients-card-header">

          <h2>
            Patients <span>({patients.length})</span>
          </h2>

        </div>


        <div className="patients-table-header">

          <span>PATIENT</span>
          <span>AGE</span>
          <span>PHONE</span>
          <span>LAST VISIT</span>
          <span>NEXT APPOINTMENT</span>
          <span>ACTIONS</span>

        </div>


        {patients.map((patient) => (

          <div
            className="patient-row"
            key={patient.id}
          >

            <div className="patient-main">

              <div className="patient-avatar">
                {patient.initials}
              </div>

              <div>

                <h3>
                  {patient.name}
                </h3>

                <p>
                  {patient.id} · {patient.email}
                </p>

              </div>

            </div>


            <span className="patient-cell">
              {patient.age}
            </span>


            <span className="patient-cell">
              {patient.phone}
            </span>


            <span className="patient-cell">
              {patient.lastVisit}
            </span>


            <span className="patient-next">
              {patient.nextAppointment}
            </span>


            <div className="patient-actions">

              <button
                type="button"
                className="patient-record-button"
                onClick={() => setSection("record")}
              >
                View Record
              </button>


              <button
                type="button"
                className="patient-edit-button"
                title="Edit patient"
              >
                ✎
              </button>


              <button
                type="button"
                className="patient-delete-button"
                title="Delete patient"
              >
                🗑
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}