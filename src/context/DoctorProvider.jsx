import { useState } from "react";
import { DoctorContext } from "./DoctorContext";

export default function DoctorProvider({ children }) {
  const [section, setSection] = useState("home");

  return (
    <DoctorContext.Provider value={{ section, setSection }}>
      {children}
    </DoctorContext.Provider>
  );
}