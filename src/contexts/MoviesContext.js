import React, { createContext } from "react";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
export const moviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/results")
      .then((res) => setMovies(res.data));
  }, []);
  // const getId = (id) => {
  //    tooot(id);
  // };
  const getIdFormMovie = (id) => {
    let newMovies = movies.filter((m) => +m.id !== +id);
    setMovies(newMovies);
    axios.delete("http://localhost:3000/results/" + id);
  };
  // const DeleteByID = () => {
  //   // props.Deleted(props.id);
  // };

  const addMovie = useCallback(
    (userData) => {
      setMovies([
        ...movies,
        {
          ...userData,
          id: userData.id,
          backdrop_path: userData.backdrop_path,
          original_title: userData.original_title,
          overview: userData.overview,
          vote_average: userData.vote_average,
          add: userData.add,
        },
      ]);
    },
    [movies]
  );

  return (
    <moviesContext.Provider
      value={{ movies, getIdFormMovie, addMovie, setMovies }}
    >
      {children}
    </moviesContext.Provider>
  );
};

export default MoviesContextProvider;
