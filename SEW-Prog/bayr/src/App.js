import React from "react";
import Tabelle from "./components/Tabelle";
import Add from "./components/Add";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tabelle />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
