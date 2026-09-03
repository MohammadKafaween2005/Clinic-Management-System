import { useContext } from "react";

import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorHeader() {
  const { section } = useContext(DoctorContext);

  const titles = {
    home: "Dashboard",
    schedule: "Schedule",
    patients: "Patients",
    profile: "Profile",
  };

  const currentTitle = titles[section];

  return (
    <header className="doctor-header">

      <div className="doctor-header-left">

        <p className="doctor-breadcrumb">
          Doctor <span>›</span> <strong>{currentTitle}</strong>
        </p>

        <h1>{currentTitle}</h1>

      </div>


      <div className="doctor-header-right">

        <button className="doctor-notification">
          ♧
        </button>

        <div className="doctor-avatar">
          HK
        </div>

      </div>

    </header>
  );
}