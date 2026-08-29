import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import BookAppointment from "./pages/BookAppointment";

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

        <Route path="/BookAppointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
