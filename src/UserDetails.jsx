import React, { useContext, useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useParams } from "react-router-dom";
import { moviesContext } from "./contexts/MoviesContext";
import BasicRating from "./Rating";

const UserDetails = () => {
  const { movies } = useContext(moviesContext);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const imgPath = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    const currentMovie = movies.find((movie) => {
      return +movie.id === +id;
    });
    setMovieDetails(currentMovie);
  }, [id, movies]);

  if (!movieDetails) return <div>Loading</div>;
  return (
    <div style={{ width: "90%", margin: "40px auto", textAlign: "center" }}>
      <img
        src={
          !movieDetails.add
            ? imgPath + movieDetails.backdrop_path
            : movieDetails.backdrop_path
        }
        alt=""
        style={{ borderRadius: "10px" }}
      />
      <Table bordered className="mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>OverView</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{movieDetails.original_title}</td>
            <td>{movieDetails.overview}</td>
            <td>
              <BasicRating rate={movieDetails.vote_average}></BasicRating>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserDetails;
