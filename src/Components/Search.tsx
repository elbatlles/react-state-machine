import React, { useState } from "react";
import "./Search.css";

export const Search = ({ send, state }: any) => {
  const [flight, setFlight] = useState("");

  const handleSelectChange = (event: any) => {
    setFlight(event.target.value);
  };

  const options = state.context.countries;
  const goToPassengers = () => {
    console.log(flight);
    send("CONTINUE", { selectedCountry: flight });
  };
  return (
    <div className="Search">
      <p className="Search-title title">Busca tu destino</p>
      <select
        id="country"
        className="Search-select"
        value={flight}
        onChange={handleSelectChange}
      >
        <option value="" disabled defaultValue={0}>
          Escoge un país
        </option>
        {options.map((option: any) => (
          <option value={option.name.common} key={option.name.common}>
            {option.name.common}
          </option>
        ))}
      </select>
      <button
        onClick={goToPassengers}
        disabled={flight === ""}
        className="Search-continue button"
      >
        Continuar
      </button>
    </div>
  );
};
