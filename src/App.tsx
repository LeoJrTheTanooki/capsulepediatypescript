import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import DexFetchComponent from "./components/DexFetchComponent";

function App() {
  const [queryHook, setQueryHook] = useState<string>("");
  const [queryLinkHook, setQueryLinkHook] = useState<string>("");

  return (
    <div className=" flex flex-col h-screen h-">
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
      <nav className="bg-gradient-to-b from- from-neutral-500 to-black to-40% text-white mt-2 border-t-2 border-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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
        <p className="m-1">Version 0.3</p>
        </div>
      </nav>
    </div>
  );
}

export default App;
