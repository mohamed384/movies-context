import { React, useState, useContext } from "react";
import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { moviesContext } from "./contexts/MoviesContext";
import Button from "@mui/material/Button";
import axios from "axios";
const Add = () => {
  const [imgSrc, setimgSrc] = useState("images/placehold.png");
  const navigate = useNavigate();
  const { addMovie } = useContext(moviesContext);

  const [data, setData] = useState({
    original_title: "",
    overview: "",
    vote_average: "",
    backdrop_path: "",
    release_date: "",
    id: 0,
    add: "Add",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(file);

    fReader.onloadend = () => {
      setimgSrc(fReader.result);
      setData({ ...data, backdrop_path: fReader.result });
    };
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, id: Math.floor(Math.random() * 10000) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(data);
    axios.post("http://localhost:3000/results", data);
    setData({
      original_title: "",
      overview: "",
      vote_average: "",
      backdrop_path: "",
      release_date: "",
      id: 0,
      add: "",
    });
    navigate("/");
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
          Add Movie
        </Button>
      </Col>
    </Form>
  );
};

export default Add;
