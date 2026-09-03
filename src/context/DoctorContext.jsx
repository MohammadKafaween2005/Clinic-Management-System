import { createContext, useState } from "react";

export const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  const [section, setSection] = useState("home");

  return (
    <DoctorContext.Provider value={{ section, setSection }}>
      {children}
    </DoctorContext.Provider>
  );
}