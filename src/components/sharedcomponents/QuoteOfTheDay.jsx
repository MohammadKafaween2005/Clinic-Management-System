import axios from "axios";
import { useEffect, useState } from "react";

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/quotes/random")
      .then((response) => {
        setQuote(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Could not load quote.");
      });
  }, []);

  if (error) {
    return <p>Could not load quote.</p>;
  }

  if (!quote) {
    return <p>Loading quote...</p>;
  }

  return (
    <section className="quote-section">
      <p className="services-label">QUOTE OF THE DAY</p>

      <h2>"{quote.quote}"</h2>

      <p>- {quote.author}</p>
    </section>
  );
}
