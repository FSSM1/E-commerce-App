// src/components/AverageRating.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const AverageRating = ({ averageRating }) => {
  return (
    <Box>
      <Typography variant="h6">
        Average Rating: {averageRating.toFixed(1)}⭐
      </Typography>
    </Box>
  );
};

export default AverageRating;
