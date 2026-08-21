import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./components/Services"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./pages/Login"
import BookAppointment from "./pages/BookAppointment";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="Login" element={<Login />} />
          <Route path="/BookAppointment" element={<BookAppointment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
