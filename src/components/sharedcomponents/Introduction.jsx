import { Link } from "react-router-dom";
import DoctorImage from "../../assets/IMG1.png"
export default function Introduction() {
  return (
    <div className="intro">
      <div className="intro-left">
        <p className="welcome-new-patients"> ● Accepting New Patients </p>
        <h1 className="title">Your Health Deserves,</h1>
        <h1 className="title2">Personal Attention</h1>
        <p className="intro-para">
          At Dr. Hani Kafaween Clinic, we provide patient-centered medical care
          focused on prevention, diagnosis, and ongoing support for your health
          and well-being.
        </p>
        <div className="intro-buttonandlearnmore">
          <Link to="/BookAppointment" className="intro-button">
            Book an Appointment
          </Link>
          <a href="#services" className="intro-learnmore">
            Learn more about the clinic →
          </a>
          {/* LINK TO SERVICES COMP */}
        </div>
        <div className="intro-counter">
          <div className="stat">
            <span className="stat-number">25+</span>
            <span className="stat-text">Years Experience</span>
          </div>

          <div className="stat">
            <span className="stat-number">10000+</span>
            <span className="stat-text">Patients</span>
          </div>

          <div className="stat">
            <span className="stat-number">95%</span>
            <span className="stat-text">Satisfaction</span>
          </div>
        </div>
      </div>
      <div className="intro-right">
        <img src={DoctorImage} alt="Doc Image" />
      </div>
    </div>
  );
}
