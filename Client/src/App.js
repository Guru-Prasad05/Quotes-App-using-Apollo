import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import {routes }from "./Routes"

function App() {
  const element=useRoutes(routes)
  return (
    <div>
      <NavBar />
      {element}
    </div>
  );
}

export default App;
