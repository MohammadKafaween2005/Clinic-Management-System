import { useState } from "react";

import LoginIntro from "../components/LoginIntro";
import LoginForm from "../components/LoginForm";
import Register from "../components/Register";

export default function Login() {
  const [register, setRegister] = useState(false);

  return (
    <main className="login-page">
      <LoginIntro />

      {register ? (
        <Register setRegister={setRegister} />
      ) : (
        <LoginForm setRegister={setRegister} />
      )}
    </main>
  );
}