import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import DexFetchComponent from "./components/DexFetchComponent";

function App() {
  const [queryHook, setQueryHook] = useState<string>("");
  const [queryLinkHook, setQueryLinkHook] = useState<string>("");

  return (
    <div className=" flex flex-col h-screen">
      <NavbarComponent
        query={queryHook}
        setQuery={setQueryHook}
        queryLink={queryLinkHook}
        setQueryLink={setQueryLinkHook}
      />
      <DexFetchComponent
        query={queryHook}
        setQuery={setQueryHook}
        queryLink={queryLinkHook}
      />
      <div className="flex justify-between bg-white mt-auto">
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
        <p className="m-1">Version 0.25</p>
      </div>
    </div>
  );
}

export default App;
