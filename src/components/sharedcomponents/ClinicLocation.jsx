export default function ClinicLocation() {
  return (
    <section className="clinic-location">

      <div className="location-heading">
        <p className="location-label">LOCATION</p>
        <h2>Find our clinic</h2>
        <p>
          Conveniently located and easy to reach. Use the map below to plan
          your visit.
        </p>
      </div>

      <div className="map-container">
        <iframe
          title="Clinic Location"
          src="https://www.google.com/maps?q=Amman+Jordan&output=embed"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>

      <div className="location-details">

        <div>
          <span className="location-small-label">CLINIC</span>
          <h3>Dr. Hani Kafaween Clinic</h3>
        </div>

        <div>
          <span className="location-small-label">ADDRESS</span>
          <p>Ibn Khaldoun St., Amman</p>
        </div>

        <a
          href="https://maps.app.goo.gl/8Ucxbz4vqAzEZoK46"
          target="_blank"
          rel="noreferrer"
          className="directions-button"
        >
          Get Directions →
        </a>

      </div>

    </section>
  );
}