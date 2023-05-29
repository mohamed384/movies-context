import "./App.css";
import Movies from "./movies";
// import { Suspense, lazy } from "react";

import ResponsiveAppBar from "./appBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./Add";
import MoviesContextProvider from "./contexts/MoviesContext";
import UserDetails from "./UserDetails";
import Update from "./update";

function App() {
  return (
    <div className="App">
      <MoviesContextProvider>
        <BrowserRouter>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Routes>
            <Route index element={<Movies></Movies>}></Route>
            <Route path="add" element={<Add></Add>}></Route>
            <Route path=":id" element={<UserDetails></UserDetails>}></Route>
            <Route path="update/:id" element={<Update></Update>}></Route>
          </Routes>
        </BrowserRouter>
      </MoviesContextProvider>
    </div>
  );
}

export default App;
