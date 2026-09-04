export default function ReceptionistProfile() {
  return (
    <section className="receptionist-profile-section">

      <div className="receptionist-profile-card">

        {/* TOP */}

        <div className="receptionist-profile-top">

          <div className="receptionist-profile-avatar">
            E
          </div>

          <div>
            <h2>Elham</h2>
            <p>Receptionist</p>
          </div>

        </div>


        {/* INFORMATION */}

        <div className="receptionist-profile-info-grid">

          <div className="receptionist-profile-info-box">
            <span className="receptionist-profile-info-label">
              Email
            </span>

            <strong className="receptionist-profile-info-value">
              reception@drhanikafaweenclinic.com
            </strong>
          </div>


          <div className="receptionist-profile-info-box">
            <span className="receptionist-profile-info-label">
              Phone
            </span>

            <strong className="receptionist-profile-info-value">
              (02) 9876 5432
            </strong>
          </div>


          <div className="receptionist-profile-info-box">
            <span className="receptionist-profile-info-label">
              Clinic
            </span>

            <strong className="receptionist-profile-info-value">
              Dr. Hani Kafaween Clinic
            </strong>
          </div>


          <div className="receptionist-profile-info-box">
            <span className="receptionist-profile-info-label">
              Status
            </span>

            <strong className="receptionist-profile-info-value">
              Active
            </strong>
          </div>

        </div>

      </div>

    </section>
  );
}