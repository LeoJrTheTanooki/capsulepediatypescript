import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import UnovaDexComponent from "./components/UnovaDexComponent";

function App() {
  const [queryHook, setQueryHook] = useState("");

  return (
    <div className=" flex flex-col h-screen">
      <NavbarComponent query={queryHook} setQuery={setQueryHook} />
      <UnovaDexComponent query={queryHook} setQuery={setQueryHook} />
      <div className="flex flex-wrap justify-between bg-white mt-auto">
        <div className="flex w-full">
          <p className="m-1">
            API provided by{" "}
            <a
              className=" text-blue-700 font-semibold"
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PokeAPI
            </a>
          </p>
          <p className="m-1">Version 0.1</p>
        </div>
        <p className="bg-white m-1">Features to come: Better formatted text, List of Pokemon as landing page, Gen 5 search limit, Multiple generation styles, Favorites</p>
      </div>
    </div>
  );
}

export default App;
