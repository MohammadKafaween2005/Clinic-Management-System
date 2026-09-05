import { useState } from "react";
import axios from "axios";

export default function Register({ setRegister }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/register", {
        full_name: fullName,
        email: email,
        password: password,
      });

      setMessage("Account created successfully.");

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setRegister(false);
      }, 1000);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("An account with this email already exists.");
      } else {
        setError(error.response?.data?.error || "Could not create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form-section">
      <div className="login-form-container">
        <h2>Create account</h2>

        <p className="login-subtitle">Register as a new patient</p>

        <form className="login-form" onSubmit={handleRegister}>
          <div className="login-field">
            <label htmlFor="name">Full name</label>

            <input
              type="text"
              id="name"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-email">Email address</label>

            <input
              type="email"
              id="register-email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-password">Password</label>

            <input
              type="password"
              id="register-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="confirm-password">Confirm password</label>

            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          {message && <p className="login-success">{message}</p>}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="register-text">
          Already have an account?{" "}
          <button
            type="button"
            className="register-link"
            onClick={() => setRegister(false)}
          >
            Sign in
          </button>
        </p>
      </div>
    </section>
  );
}
