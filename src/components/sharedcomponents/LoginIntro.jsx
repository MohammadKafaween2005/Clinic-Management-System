import { Link } from "react-router-dom";

export default function LoginIntro() {
  return (
    <section className="login-intro">

      <Link to="/" className="login-back">
        ← Back to website
      </Link>

      <div className="login-brand">
        <span className="login-logo">HK</span>
        <span>Dr. Hani Kafaween Clinic</span>
      </div>

      <div className="login-intro-text">
        <h1>Welcome back.</h1>

        <p>
          Securely access your appointments, medical records,
          and clinic services.
        </p>
      </div>

      <div className="login-quote">
        <p className="quote-text">
          "Your health and comfort are at the centre of everything we do."
        </p>

        <h3>Dr. Hani Kafaween</h3>
        <p className="quote-role">General Practice & Family Medicine</p>
      </div>

    </section>
  );
}