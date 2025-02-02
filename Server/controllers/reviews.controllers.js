// const db = require("../database/index");
// const Review = db.Review;

// module.exports = {
//     submitReview: async (req, res) => {
//         const { userId, productId, rating, comment } = req.body;

//         try {
//           const review = await db.Review.create({
//             userId,
//             productId,
//             rating,
//             comment,
//           });
//           res.status(201).json({ message: "Review submitted successfully!", review });
//         } catch (error) {
//           console.error("Error submitting review:", error);
//           res.status(500).json({ message: "Failed to submit review" });
//         }
//       });

//       // Fetch reviews for a product
//       router.get("/product/:productId", async (req, res) => {
//         const { productId } = req.params;

//         try {
//           const reviews = await db.Review.findAll({
//             where: { productId },
//             include: [{ model: db.User, attributes: ["username"] }], // Include user details
//           });
//           res.status(200).json(reviews);
//         } catch (error) {
//           console.error("Error fetching reviews:", error);
//           res.status(500).json({ message: "Failed to fetch reviews" });
//         }
//     },
//   };

// Submit a review
// const express = require("express");
// const router = express.Router();
// router.post("/submit", submitReview);
// module.exports = router;
////////////////////////////
