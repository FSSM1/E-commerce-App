// src/components/UserReview.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const UserReview = ({ productId, userId }) => {
  const [userReview, setUserReview] = useState(null);

  // Fetch the user's review for the product
  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reviews/product/${productId}`
        );
        const review = response.data.find((review) => review.userId === userId);
        if (review) {
          setUserReview(review);
        }
      } catch (error) {
        console.error("Error fetching user review:", error);
      }
    };

    fetchUserReview();
  }, [productId, userId]);

  return (
    <Box sx={{ mt: 4 }}>
      {userReview ? (
        <Box sx={{ mt: 2 }}></Box>
      ) : (
        <Typography>You have not reviewed this product yet.</Typography>
      )}
    </Box>
  );
};

export default UserReview;
