import React, { useState } from "react";
import "./Passengers.css";

export const Passengers = ({ state, send }: any) => {
  const [value, changeValue] = useState("");

  const onChangeInput = (e: any) => {
    changeValue(e.target.value);
  };

  const submit = (e: any) => {
    e.preventDefault();
    send("ADD", { newPassenger: value });
    changeValue("");
  };
  const goToTicket = () => {
    send("DONE");
  };
  const passengers = state.context.passengers;

  return (
    <form onSubmit={submit} className="Passengers">
      <p className="Passengers-title title">
        Agrega a las personas que van a volar ✈️
      </p>
      {passengers?.map((person: any, idx: any) => (
        <p className="text" key={`person-${idx}`}>
          {person}
        </p>
      ))}
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Escribe el nombre completo"
        required
        value={value}
        onChange={onChangeInput}
      />
      <div className="Passengers-buttons">
        <button className="Passengers-add button-secondary" type="submit">
          Agregar Pasajero
        </button>
        <button
          onClick={goToTicket}
          className="Passenger-pay button"
          type="button"
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};
