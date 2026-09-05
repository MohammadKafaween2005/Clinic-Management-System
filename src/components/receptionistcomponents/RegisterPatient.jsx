import { useContext, useState } from "react";
import axios from "axios";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function RegisterPatient() {
  const { setSection } = useContext(ReceptionistContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      await axios.post("http://localhost:5000/api/patients", {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        date_of_birth: dateOfBirth || null,
        gender: gender || null,
        phone: phone.trim() || null,
        email: email.trim() || null,
        blood_type: bloodType || null,
        allergies: allergies.trim() || null,
      });

      setMessage("Patient registered successfully.");

      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setGender("");
      setPhone("");
      setEmail("");
      setBloodType("");
      setAllergies("");

      setTimeout(() => {
        setSection("patients");
      }, 700);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("A patient with this email already exists.");
      } else {
        setError(error.response?.data?.error || "Could not register patient.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="register-patient-page">
      <button
        type="button"
        className="register-patient-back"
        onClick={() => setSection("patients")}
      >
        ← Back
      </button>

      <div className="register-patient-heading">
        <h2>Register New Patient</h2>

        <p>Create a new patient profile for the clinic.</p>
      </div>

      <form className="register-patient-form-card" onSubmit={handleSubmit}>
        <div className="register-patient-grid">
          <div className="register-patient-field">
            <label>First Name</label>

            <input
              type="text"
              placeholder="James"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="register-patient-field">
            <label>Last Name</label>

            <input
              type="text"
              placeholder="Thornton"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="register-patient-field">
            <label>Date of Birth</label>

            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>

          <div className="register-patient-field">
            <label>Gender</label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="register-patient-field">
            <label>Phone</label>

            <input
              type="tel"
              placeholder="(02) 8123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="register-patient-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="patient@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-patient-field">
            <label>Blood Type</label>

            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            >
              <option value="">Select...</option>
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

          <div className="register-patient-field">
            <label>Known Allergies</label>

            <input
              type="text"
              placeholder="e.g. Penicillin, None known"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="register-patient-error">{error}</p>}

        {message && <p className="register-patient-success">{message}</p>}

        <div className="register-patient-form-actions">
          <button
            type="button"
            className="register-patient-cancel"
            onClick={() => setSection("patients")}
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="register-patient-submit"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register Patient"}
          </button>
        </div>
      </form>
    </section>
  );
}
