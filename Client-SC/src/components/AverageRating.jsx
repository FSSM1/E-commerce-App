// src/components/AverageRating.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const AverageRating = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(0);

  // Fetch the average rating for the product
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reviews/product/${productId}`
        );
        const reviews = response.data;
        if (reviews.length > 0) {
          const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          setAverageRating(totalRating / reviews.length);
        }
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [productId]);

  return (
    <Box>
      <Typography variant="h6">
        Average Rating: {averageRating.toFixed(1)}
      </Typography>
    </Box>
  );
};

export default AverageRating;
