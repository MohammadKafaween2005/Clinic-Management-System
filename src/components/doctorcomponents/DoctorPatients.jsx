import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorPatients({ setSelectedPatientId }) {
  const { setSection } = useContext(DoctorContext);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const patientsResponse = await axios.get(
          "http://localhost:5000/api/patients",
        );

        const appointmentsResponse = await axios.get(
          "http://localhost:5000/api/appointments",
        );

        setPatients(patientsResponse.data);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";

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

  const formatDate = (date) => {
    if (!date) {
      return "None";
    }

    return date.split("T")[0];
  };

  const getLastVisit = (patientId) => {
    const completedAppointments = appointments
      .filter(
        (appointment) =>
          appointment.patient_id === patientId &&
          appointment.status === "Completed",
      )
      .sort(
        (a, b) => new Date(b.appointment_date) - new Date(a.appointment_date),
      );

    return completedAppointments[0]?.appointment_date || null;
  };

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

        const date = appointment.appointment_date.split("T")[0];

        const appointmentDateTime = new Date(
          `${date}T${appointment.appointment_time}`,
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

    return upcomingAppointments[0]?.appointment_date || null;
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      phone: "",
      email: "",
      blood_type: "",
      allergies: "",
    });

    setEditingPatient(null);
    setShowForm(false);
    setError("");
  };

  const handleAddPatient = () => {
    setEditingPatient(null);

    setFormData({
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      phone: "",
      email: "",
      blood_type: "",
      allergies: "",
    });

    setError("");
    setShowForm(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);

    setFormData({
      first_name: patient.first_name || "",
      last_name: patient.last_name || "",
      date_of_birth: patient.date_of_birth
        ? patient.date_of_birth.split("T")[0]
        : "",
      gender: patient.gender || "",
      phone: patient.phone || "",
      email: patient.email || "",
      blood_type: patient.blood_type || "",
      allergies: patient.allergies || "",
    });

    setError("");
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSavePatient = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.first_name || !formData.last_name) {
      setError("First name and last name are required.");
      return;
    }

    try {
      if (editingPatient) {
        const response = await axios.put(
          `http://localhost:5000/api/patients/${editingPatient.patient_id}`,
          formData,
        );

        setPatients((previousPatients) =>
          previousPatients.map((patient) =>
            patient.patient_id === editingPatient.patient_id
              ? response.data
              : patient,
          ),
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/patients",
          formData,
        );

        setPatients((previousPatients) => [...previousPatients, response.data]);
      }

      resetForm();
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("A patient with this email already exists.");
      } else {
        setError(error.response?.data?.error || "Could not save patient.");
      }
    }
  };

  const handleDeletePatient = async (patient) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.first_name} ${patient.last_name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/patients/${patient.patient_id}`,
      );

      setPatients((previousPatients) =>
        previousPatients.filter(
          (item) => item.patient_id !== patient.patient_id,
        ),
      );

      setAppointments((previousAppointments) =>
        previousAppointments.filter(
          (appointment) => appointment.patient_id !== patient.patient_id,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.error || "Could not delete patient.");
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.first_name || ""} ${
      patient.last_name || ""
    }`.toLowerCase();

    const patientId = `P-${String(patient.patient_id).padStart(
      4,
      "0",
    )}`.toLowerCase();

    const phone = (patient.phone || "").toLowerCase();

    const searchValue = search.toLowerCase();

    return (
      fullName.includes(searchValue) ||
      patientId.includes(searchValue) ||
      phone.includes(searchValue)
    );
  });

  return (
    <section className="doctor-patients-section">
      <div className="patients-toolbar">
        <input
          type="text"
          placeholder="Search by name, ID, or phone..."
          className="patients-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="add-patient-button" onClick={handleAddPatient}>
          + Add Patient
        </button>
      </div>

      {/* ADD / EDIT PATIENT FORM */}

      {showForm && (
        <div className="patient-form-card">
          <div className="patient-form-header">
            <div>
              <h2>{editingPatient ? "Edit Patient" : "Add Patient"}</h2>

              <p>
                {editingPatient
                  ? "Update patient information"
                  : "Enter the new patient's information"}
              </p>
            </div>
          </div>

          <form className="patient-form" onSubmit={handleSavePatient}>
            <div className="patient-form-grid">
              <div className="patient-form-field">
                <label>First Name</label>

                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="patient-form-field">
                <label>Last Name</label>

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="patient-form-field">
                <label>Date of Birth</label>

                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                />
              </div>

              <div className="patient-form-field">
                <label>Gender</label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="patient-form-field">
                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="patient-form-field">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="patient-form-field">
                <label>Blood Type</label>

                <select
                  name="blood_type"
                  value={formData.blood_type}
                  onChange={handleInputChange}
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

              <div className="patient-form-field">
                <label>Allergies</label>

                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="None"
                />
              </div>
            </div>

            {error && <p className="patient-form-error">{error}</p>}

            <div className="patient-form-actions">
              <button
                type="button"
                className="patient-form-cancel"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button type="submit" className="patient-form-save">
                {editingPatient ? "Save Changes" : "Add Patient"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="patients-card">
        <div className="patients-card-header">
          <h2>
            Patients <span>({filteredPatients.length})</span>
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

        {loading ? (
          <p>Loading patients...</p>
        ) : filteredPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          filteredPatients.map((patient) => {
            const lastVisit = getLastVisit(patient.patient_id);

            const nextAppointment = getNextAppointment(patient.patient_id);

            return (
              <div className="patient-row" key={patient.patient_id}>
                <div className="patient-main">
                  <div className="patient-avatar">
                    {getInitials(patient.first_name, patient.last_name)}
                  </div>

                  <div>
                    <h3>
                      {patient.first_name} {patient.last_name}
                    </h3>

                    <p>
                      P-
                      {String(patient.patient_id).padStart(4, "0")} ·{" "}
                      {patient.email || "No email"}
                    </p>
                  </div>
                </div>

                <span className="patient-cell">
                  {calculateAge(patient.date_of_birth)}
                </span>

                <span className="patient-cell">
                  {patient.phone || "Not provided"}
                </span>

                <span className="patient-cell">{formatDate(lastVisit)}</span>

                <span className="patient-next">
                  {formatDate(nextAppointment)}
                </span>

                <div className="patient-actions">
                  <button
                    type="button"
                    className="patient-record-button"
                    onClick={() => {
                      setSelectedPatientId(patient.patient_id);

                      setSection("record");
                    }}
                  >
                    View Record
                  </button>

                  <button
                    type="button"
                    className="patient-edit-button"
                    title="Edit patient"
                    onClick={() => handleEditPatient(patient)}
                  >
                    ✎
                  </button>

                  <button
                    type="button"
                    className="patient-delete-button"
                    title="Delete patient"
                    onClick={() => handleDeletePatient(patient)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
