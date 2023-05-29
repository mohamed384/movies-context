import { React, useState, useContext, useEffect } from "react";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { moviesContext } from "./contexts/MoviesContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgSrc, setimgSrc] = useState("images/placehold.png");
  const imgPath = "https://image.tmdb.org/t/p/w500/";

  const { movies, setMovies } = useContext(moviesContext);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const currentMovie = movies.find((movie) => {
      return +movie.id === +id;
    });
    setimgSrc(
      !currentMovie?.add
        ? imgPath + currentMovie?.backdrop_path
        : currentMovie?.backdrop_path
    );
    setMovieDetails(currentMovie);
  }, [id, movies]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(file);

    fReader.onloadend = () => {
      setimgSrc(fReader.result);
      setMovieDetails({ ...movieDetails, backdrop_path: fReader.result });
    };
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails({
      ...movieDetails,
      [name]: value,
      id: Math.floor(Math.random() * 10000),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3000/results/" + +id, movieDetails).then(() => {
      axios
        .get("http://localhost:3000/results")
        .then((res) => setMovies(res.data));
      navigate("/");
    });
  };
  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        width: "90%",
        margin: "50px auto",
      }}
    >
      <Row>
        <Col
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={imgSrc} alt="" width="500" height={280} />
        </Col>
        <Col md={12} style={{ textAlign: "center", marginTop: "10px" }}>
          <input type="file" onChange={(e) => handleImageUpload(e)} />
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="original_title">Title</Label>
            <Input
              id="original_title"
              name="original_title"
              placeholder="Movie title"
              type="text"
              onChange={handleChange}
              value={movieDetails?.original_title}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="overview">Overview</Label>
            <Input
              id="overview"
              name="overview"
              placeholder="Movie overview"
              type="text"
              onChange={handleChange}
              value={movieDetails?.overview}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="d-flex align-items-center">
        <Col md={6}>
          <FormGroup>
            <Label for="vote_average">Rating</Label>
            <Input
              id="vote_average"
              name="vote_average"
              type="text"
              placeholder="Movie Rating"
              onChange={handleChange}
              value={movieDetails?.vote_average}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="release_date">Release date</Label>
            <Input
              id="release_date"
              name="release_date"
              type="text"
              placeholder="Release date"
              onChange={handleChange}
              value={movieDetails?.release_date}
            />
          </FormGroup>
        </Col>
      </Row>
      <Col className=" d-flex justify-content-center" md={12}>
        <Button
          type="submit"
          variant="contained"
          style={{ marginRight: "5px", width: "150px" }}
          color="info"
        >
          Update Movie
        </Button>
      </Col>
    </Form>
  );
};

export default Update;
