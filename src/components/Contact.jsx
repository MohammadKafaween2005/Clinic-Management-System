import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="contact-page" id="contact">
      <div className="contact-left">
        <p className="contact-label">FIND US</p>
        <h1 className="contact-title">Visit the clinic</h1>

        <div className="contact-details">
          <div className="contact-info">
            <span className="contact-info-label">Address</span>
            <span className="contact-info-value">Ibn Khaldoun St., Amman</span>
          </div>

          <div className="contact-info">
            <span className="contact-info-label">Phone</span>
            <span className="contact-info-value">+962 799191974</span>
          </div>

          <div className="contact-info">
            <span className="contact-info-label">Email</span>
            <span className="contact-info-value">DummyData.com</span>
          </div>
        </div>
      </div>

      <div className="contact-right">
        <p className="contact-label">HOURS</p>
        <h1 className="contact-title">When we're open</h1>

        <div className="opening-hours">
          <div className="hours-row">
            <span>Sunday - Thursday</span>
            <span className="hours-open">8:00 AM - 6:00 PM</span>
          </div>

          <div className="hours-row">
            <span>Saturday</span>
            <span className="hours-open">9:00 AM - 1:00 PM</span>
          </div>

          <div className="hours-row">
            <span>Friday</span>
            <span className="hours-closed">Closed</span>
          </div>
        </div>

        <Link to="/BookAppointment" className="contact-book-button">
          Book an Appointment
        </Link>
      </div>
    </section>
  );
}
