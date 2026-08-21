import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="Logo">
        <span className="Logo-HK">HK</span>
        <span>Dr.Hani Kafaween Clinic</span>
      </div>

      <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <div className="mid-sec">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Services">Services</Link>
          <Link to="/Contact">Contact</Link>
        </div>

        <div className="right-sec">
          <Link to="/Login">Login</Link>

          <span className="BookAppointment">
            <Link to="/BookAppointment">Book Appointment</Link>
          </span>
        </div>
      </div>
    </nav>
  );
}
