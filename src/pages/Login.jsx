import LoginIntro from "../components/LoginIntro";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <main className="login-page">
      <LoginIntro />
      <LoginForm />
    </main>
  );
}