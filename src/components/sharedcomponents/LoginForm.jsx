export default function LoginForm({ setRegister }) {
  return (
    <section className="login-form-section">
      <div className="login-form-container">
        <h2>Sign in</h2>

        <p className="login-subtitle">Enter your credentials to continue</p>

        <form className="login-form">
          <div className="login-field">
            <label htmlFor="email">Email address</label>

            <input type="email" id="email" placeholder="you@example.com" />
          </div>

          <div className="login-field">
            <div className="password-heading">
              <label htmlFor="password">Password</label>

              <a href="#">Forgot password?</a>
            </div>

            <div className="password-input-wrapper">
              <input type="password" id="password" placeholder="••••••••" />

              <button type="button" className="password-toggle">
                ◉
              </button>
            </div>
          </div>

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
