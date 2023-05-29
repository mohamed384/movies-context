import { Grid } from "@mui/material";
import ImgMediaCard from "./cardMovie.jsx";
const Movie = ({
  backdrop_path,
  original_title,
  overview,
  id,
  tooot,
  vote_average,
  release_date,
  add,
}) => {
  const getId = (id) => {
    tooot(id);
  };
  return (
    <Grid item sm={6} xs={12} md={4} style={{ textAlign: "center" }}>
      <ImgMediaCard
        backdrop_path={backdrop_path}
        original_title={original_title}
        overview={overview}
        vote_average={vote_average}
        release_date={release_date}
        add={add}
        id={id}
        Deleted={getId}
      ></ImgMediaCard>
    </Grid>
  );
};

export default Movie;
