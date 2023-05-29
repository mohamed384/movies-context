import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating({ rate }) {
  return (
    <Box>
      <Rating name="simple-controlled" value={rate / 2} readOnly />
    </Box>
  );
}
