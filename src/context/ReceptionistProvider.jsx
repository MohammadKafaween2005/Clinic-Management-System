import { useState } from "react";
import { ReceptionistContext } from "./ReceptionistContext";

export default function ReceptionistProvider({ children }) {
  const [section, setSection] = useState("home");

  return (
    <ReceptionistContext.Provider value={{ section, setSection }}>
      {children}
    </ReceptionistContext.Provider>
  );
}