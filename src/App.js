import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import PokeList from "./pages/PokeList";
import Pokemon from "./pages/Pokemon.jsx";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* path back to the display of all the pokemon */}
          <Route path="/" element={<PokeList />} />
          {/* for every pokemon the :pokemonName takes it all */}
          <Route path="/:pokemonName/:index" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
