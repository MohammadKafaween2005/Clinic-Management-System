import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LoginForm({ setRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      
      if (user.role === "doctor") {
        navigate("/Doctor");
      } else if (user.role === "receptionist") {
        navigate("/Receptionist");
      } else if (user.role === "patient") {
        navigate("/Patient");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Could not login");
    }
  };

  return (
    <section className="login-form-section">
      <div className="login-form-container">
        <h2>Sign in</h2>

        <p className="login-subtitle">Enter your credentials to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email address</label>

            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <div className="password-heading">
              <label htmlFor="password">Password</label>

              <a href="#">Forgot password?</a>
            </div>

            <div className="password-input-wrapper">
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="button" className="password-toggle">
                ◉
              </button>
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">
            Sign in
          </button>
        </form>

        <p className="register-text">
          New patient?{" "}
          <button
            type="button"
            className="register-link"
            onClick={() => setRegister(true)}
          >
            Register here
          </button>
        </p>
      </div>
    </section>
  );
}
