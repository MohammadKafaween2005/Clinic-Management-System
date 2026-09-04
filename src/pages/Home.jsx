import Introduction from "../components/sharedcomponents/Introduction";
import Services from "../components/sharedcomponents/Services";
import About from "../components/sharedcomponents/About";
import Contact from "../components/sharedcomponents/Contact";
import ClinicLocation from "../components/sharedcomponents/ClinicLocation";

export default function Home() {
  return (
    <>
      <Introduction />
      <Services />
      <About />
      <Contact />
      <ClinicLocation />
    </>
  );
}
