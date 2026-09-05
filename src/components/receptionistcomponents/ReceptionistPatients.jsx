import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistPatients({ setSelectedPatientId }) {
  const { setSection } = useContext(ReceptionistContext);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [search, setSearch] = useState("");

  const [editingPatient, setEditingPatient] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    blood_type: "",
    allergies: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [patientsResponse, appointmentsResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/patients"),

        axios.get("http://localhost:5000/api/appointments"),
      ]);

      setPatients(patientsResponse.data);
      setAppointments(appointmentsResponse.data);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.error || "Could not load patients.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return date.split("T")[0];
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
      return "N/A";
    }

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

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";

    const last = lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const getPatientAppointments = (patientId) => {
    return appointments.filter(
      (appointment) => appointment.patient_id === patientId,
    );
  };

  const getLastVisit = (patientId) => {
    const patientAppointments = getPatientAppointments(patientId);

    const completed = patientAppointments
      .filter((appointment) => appointment.status === "Completed")
      .sort((a, b) => {
        const dateA = new Date(
          `${formatDate(a.appointment_date)}T${a.appointment_time}`,
        );

        const dateB = new Date(
          `${formatDate(b.appointment_date)}T${b.appointment_time}`,
        );

        return dateB - dateA;
      });

    if (completed.length === 0) {
      return "None";
    }

    return formatDate(completed[0].appointment_date);
  };

  const getNextAppointment = (patientId) => {
    const patientAppointments = getPatientAppointments(patientId);

    const now = new Date();

    const upcoming = patientAppointments
      .filter((appointment) => {
        if (
          appointment.status === "Cancelled" ||
          appointment.status === "Completed" ||
          appointment.status === "No Show"
        ) {
          return false;
        }

        const appointmentDate = new Date(
          `${formatDate(
            appointment.appointment_date,
          )}T${appointment.appointment_time}`,
        );

        return appointmentDate >= now;
      })
      .sort((a, b) => {
        const dateA = new Date(
          `${formatDate(a.appointment_date)}T${a.appointment_time}`,
        );

        const dateB = new Date(
          `${formatDate(b.appointment_date)}T${b.appointment_time}`,
        );

        return dateA - dateB;
      });

    if (upcoming.length === 0) {
      return "None";
    }

    return formatDate(upcoming[0].appointment_date);
  };

  const openEditForm = (patient) => {
    setEditingPatient(patient);

    setFormData({
      first_name: patient.first_name || "",
      last_name: patient.last_name || "",
      date_of_birth: formatDate(patient.date_of_birth),
      gender: patient.gender || "",
      phone: patient.phone || "",
      email: patient.email || "",
      blood_type: patient.blood_type || "",
      allergies: patient.allergies || "",
    });

    setError("");
    setMessage("");
  };

  const closeEditForm = () => {
    setEditingPatient(null);

    setError("");
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdatePatient = async (e) => {
    e.preventDefault();

    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError("First name and last name are required.");

      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await axios.put(
        `http://localhost:5000/api/patients/${editingPatient.patient_id}`,
        {
          first_name: formData.first_name.trim(),

          last_name: formData.last_name.trim(),

          date_of_birth: formData.date_of_birth || null,

          gender: formData.gender || null,

          phone: formData.phone || null,

          email: formData.email || null,

          blood_type: formData.blood_type || null,

          allergies: formData.allergies || null,
        },
      );

      setPatients((previousPatients) =>
        previousPatients.map((patient) =>
          patient.patient_id === editingPatient.patient_id
            ? response.data
            : patient,
        ),
      );

      setMessage("Patient updated successfully.");

      setEditingPatient(null);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("That email is already being used by another patient.");
      } else {
        setError(error.response?.data?.error || "Could not update patient.");
      }
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.first_name || ""} ${
      patient.last_name || ""
    }`.toLowerCase();

    const id = `P-${String(patient.patient_id).padStart(4, "0")}`.toLowerCase();

    const phone = (patient.phone || "").toLowerCase();

    const email = (patient.email || "").toLowerCase();

    const searchValue = search.toLowerCase();

    return (
      fullName.includes(searchValue) ||
      id.includes(searchValue) ||
      phone.includes(searchValue) ||
      email.includes(searchValue)
    );
  });

  return (
    <section className="receptionist-patients-section">
      <div className="receptionist-patients-toolbar">
        <input
          type="text"
          className="receptionist-patients-search"
          placeholder="Search by name, ID, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="button"
          className="receptionist-register-patient-button"
          onClick={() => setSection("register")}
        >
          + Register Patient
        </button>
      </div>

      {error && <p className="receptionist-patient-error">{error}</p>}

      {message && <p className="receptionist-patient-success">{message}</p>}

      {/* EDIT PATIENT */}

      {editingPatient && (
        <form
          className="receptionist-patient-edit-card"
          onSubmit={handleUpdatePatient}
        >
          <div className="receptionist-patient-edit-header">
            <h2>Edit Patient</h2>

            <button type="button" onClick={closeEditForm}>
              ✕
            </button>
          </div>

          <div className="receptionist-patient-edit-grid">
            <div>
              <label>First Name</label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Last Name</label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Date of Birth</label>

              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Blood Type</label>

              <select
                name="blood_type"
                value={formData.blood_type}
                onChange={handleChange}
              >
                <option value="">Select blood type</option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>

                <option value="B+">B+</option>
                <option value="B-">B-</option>

                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>

                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label>Allergies</label>

              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="receptionist-patient-edit-actions">
            <button type="button" onClick={closeEditForm}>
              Cancel
            </button>

            <button type="submit">Save Changes</button>
          </div>
        </form>
      )}

      <div className="receptionist-patients-card">
        <div className="receptionist-patients-card-header">
          <h2>
            Patients <span>({filteredPatients.length})</span>
          </h2>

          <p>Administrative view only · No medical records</p>
        </div>

        <div className="receptionist-patients-table-header">
          <span>PATIENT</span>
          <span>AGE</span>
          <span>PHONE</span>
          <span>LAST VISIT</span>
          <span>NEXT APPOINTMENT</span>
          <span>ACTIONS</span>
        </div>

        {loading ? (
          <p>Loading patients...</p>
        ) : filteredPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          filteredPatients.map((patient) => (
            <div className="receptionist-patient-row" key={patient.patient_id}>
              <div className="receptionist-patient-main">
                <div className="receptionist-patient-avatar">
                  {getInitials(patient.first_name, patient.last_name)}
                </div>

                <div>
                  <h3>
                    {patient.first_name} {patient.last_name}
                  </h3>

                  <p>
                    P-
                    {String(patient.patient_id).padStart(4, "0")}
                    {" · "}
                    {patient.email || "No email"}
                  </p>
                </div>
              </div>

              <span className="receptionist-patient-cell">
                {calculateAge(patient.date_of_birth)}
              </span>

              <span className="receptionist-patient-cell">
                {patient.phone || "Not provided"}
              </span>

              <span className="receptionist-patient-cell">
                {getLastVisit(patient.patient_id)}
              </span>

              <span className="receptionist-patient-next">
                {getNextAppointment(patient.patient_id)}
              </span>

              <div className="receptionist-patient-actions">
                <button
                  type="button"
                  className="receptionist-patient-view"
                  onClick={() => {
                    setSelectedPatientId(patient.patient_id);

                    setSection("patientProfile");
                  }}
                >
                  View
                </button>

                <button
                  type="button"
                  className="receptionist-patient-edit"
                  onClick={() => openEditForm(patient)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
