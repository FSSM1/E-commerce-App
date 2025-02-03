// src/components/ProductReviews.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reviews/product/${productId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Customer Reviews</Typography>
      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        <Box sx={{ mt: 2 }}></Box>
      )}
    </Box>
  );
};

export default ProductReviews;
