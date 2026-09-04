import { useState } from "react";
import { PatientContext } from "./PatientContext";

export default function PatientProvider({ children }) {
  const [section, setSection] = useState("home");

  return (
    <PatientContext.Provider value={{ section, setSection }}>
      {children}
    </PatientContext.Provider>
  );
}