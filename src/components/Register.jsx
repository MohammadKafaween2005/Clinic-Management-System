export default function Register({ setRegister }) {
  return (
    <section className="login-form-section">
      <div className="login-form-container">
        <h2>Create account</h2>

        <p className="login-subtitle">
          Register as a new patient
        </p>

        <form className="login-form">
          <div className="login-field">
            <label htmlFor="name">Full name</label>

            <input
              type="text"
              id="name"
              placeholder="Your full name"
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-email">
              Email address
            </label>

            <input
              type="email"
              id="register-email"
              placeholder="you@example.com"
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-password">
              Password
            </label>

            <input
              type="password"
              id="register-password"
              placeholder="••••••••"
            />
          </div>

          <div className="login-field">
            <label htmlFor="confirm-password">
              Confirm password
            </label>

            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Create account
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