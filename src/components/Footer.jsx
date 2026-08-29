import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-brand">
        <span className="footer-logo">HK</span>
        <span>Dr. Hani Kafaween Clinic</span>
      </div>

      <p className="footer-copy">
        © 2026 Dr. Hani Kafaween Clinic. All rights reserved.
      </p>

      <Link to="/Login" className="footer-login">
        Staff Login →
      </Link>

    </footer>
  );
}