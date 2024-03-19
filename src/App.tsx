import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import UnovaDexComponent from "./components/UnovaDexComponent";
import { PokeApi } from "./Dataservices/DataServices";

function App() {

    // console.log(PokeApi("https://pokeapi.co/api/v2/pokemon/ditto"));
    

    

  return (
    <>
      <NavbarComponent />
      <UnovaDexComponent/>
    </>
  );
}

export default App;
