import React, { useContext } from "react";
import Movie from "./movie";
import { v4 as uuid } from "uuid";
import { Grid } from "@mui/material";
import { moviesContext } from "./contexts/MoviesContext";

const Movies = () => {
  const { movies, getIdFormMovie } = useContext(moviesContext);

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={1}
      style={{ width: "90%", margin: "0 auto 40px auto" }}
    >
      {movies ? (
        movies.map((m) => (
          <Movie
            key={uuid()}
            backdrop_path={m.backdrop_path}
            original_title={m.original_title}
            overview={m.overview}
            vote_average={m.vote_average}
            release_date={m.release_date}
            add={m.add}
            id={m.id}
            tooot={getIdFormMovie}
          ></Movie>
        ))
      ) : (
        <div>Loading</div>
      )}
    </Grid>
  );
};

export default Movies;
