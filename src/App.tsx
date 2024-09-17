import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import UnovaDexComponent from "./components/UnovaDexComponent";

function App() {

    const [queryHook, setQueryHook] = useState('')

    useEffect(() => {
      
    console.log(queryHook)
    }, [queryHook])
    

  return (
    <>
      <NavbarComponent query={queryHook} setQuery={setQueryHook} />
      <UnovaDexComponent query={queryHook} setQuery={setQueryHook}/>
    </>
  );
}

export default App;
