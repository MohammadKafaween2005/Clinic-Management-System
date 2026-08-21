import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="Logo">
        <span className="Logo-HK">HK</span>
        <span>Dr.Hani Kafaween Clinic</span>
      </div>

      <div className="mid-sec">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Services">Services</Link>
        <Link to="/Contact">Contact</Link>
      </div>

      <div className="right-sec">
        <span><Link to="/Login">Login</Link></span>
       <span className="BookAppointment"> <Link to="/BookAppointment">Book Appointment</Link> </span>
      </div>

    </nav>
  );
}