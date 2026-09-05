import { useState } from "react";

import LoginIntro from "../components/sharedcomponents/LoginIntro";
import LoginForm from "../components/sharedcomponents/LoginForm";
import Register from "../components/sharedcomponents/Register";

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
