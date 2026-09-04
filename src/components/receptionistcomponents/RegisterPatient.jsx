import { useContext, useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email,
      bloodType,
      allergies,
    };

    console.log(newPatient);

    setSection("patients");
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

        <p>
          Create a new patient profile for the clinic.
        </p>
      </div>

      <form
        className="register-patient-form-card"
        onSubmit={handleSubmit}
      >

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


        <div className="register-patient-form-actions">

          <button
            type="button"
            className="register-patient-cancel"
            onClick={() => setSection("patients")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="register-patient-submit"
          >
            Register Patient
          </button>

        </div>

      </form>

    </section>
  );
}