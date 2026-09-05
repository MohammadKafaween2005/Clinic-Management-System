import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Receptionist from "./pages/Receptionist";
import Navbar from "./components/sharedcomponents/Navbar";
import Footer from "./components/sharedcomponents/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import BookAppointment from "./pages/BookAppointment";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import ProtectedRoute from "./components/sharedcomponents/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Doctor"
          element={
            <ProtectedRoute allowedRole="doctor">
              <Doctor />
            </ProtectedRoute>
          }
        />{" "}
        <Route path="/Receptionist" element={<Receptionist />} />
        <Route
          path="/Patient"
          element={
            <ProtectedRoute allowedRole="patient">
              <Patient />
            </ProtectedRoute>
          }
        />{" "}
        <Route path="/BookAppointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
