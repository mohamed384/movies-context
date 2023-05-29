import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import BasicRating from "./Rating";

export default function ImgMediaCard({
  backdrop_path,
  original_title,
  vote_average,
  release_date,
  id,
  Deleted,
  add,
}) {
  const imgPath = "https://image.tmdb.org/t/p/w500/";
  const DeleteByID = () => {
    Deleted(id);
  };
  return (
    <Card>
      <CardMedia
        component="img"
        alt={original_title}
        height="240"
        image={!add ? imgPath + backdrop_path : backdrop_path}
      />
      <CardContent style={{ height: "120px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ maxHeight: "50.03px" }}
        >
          {original_title}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {release_date}
        </Typography>
        <BasicRating rate={vote_average}></BasicRating>
      </CardContent>
      <CardActions
        style={{
          margin: "5px auto 10px auto",
          width: "fit-content",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to={`/${id}`}>
          <Button
            variant="contained"
            style={{ padding: "5px", width: "60px" }}
            color="info"
          >
            Details
          </Button>
        </Link>
        <Link to={`/update/${id}`}>
          <Button
            variant="contained"
            style={{ padding: "5px", width: "60px", marginRight: "8px" }}
            color="success"
          >
            update
          </Button>
        </Link>
        <Button
          variant="contained"
          style={{ padding: "5px", width: "60px" }}
          color="error"
          onClick={DeleteByID}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
