// src/components/StarRating.jsx
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";

const StarRating = ({ productId, userId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Fetch the user's existing review for the product
  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reviews/product/${productId}`
        );
        const userReview = response.data.find(
          (review) => review.userId === userId
        );
        if (userReview) {
          setRating(userReview.rating); // Set the user's existing rating
        }
      } catch (error) {
        console.error("Error fetching user review:", error);
      }
    };

    fetchUserReview();
  }, [productId, userId]);

  // Handle star click
  const handleStarClick = async (ratingValue) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/reviews/submit",
        {
          userId,
          productId,
          rating: ratingValue,
        }
      );

      if (response.status === 200) {
        alert("Your review has been updated!");
      } else if (response.status === 201) {
        alert("Thank you for your review!");
      }
      setRating(ratingValue); // Update the displayed rating
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Box>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
              color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              fontSize: "24px",
            }}
            onClick={() => handleStarClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733;
          </button>
        );
      })}
    </Box>
  );
};

export default StarRating;
