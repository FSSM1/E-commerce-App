const db = require("../database/index");
const Review = db.Review;

module.exports = {
  // Post a review
  submitReview: async (req, res) => {
    const { userId, productId, rating, comment } = req.body;

    try {
      // Check if the user has already reviewed the product
      const existingReview = await db.Review.findOne({
        where: { userId, productId },
      });

      if (existingReview) {
        // Update the existing review
        await existingReview.update({ rating, comment });
        res
          .status(200)
          .json({
            message: "Review updated successfully!",
            review: existingReview,
          });
      } else {
        // Create a new review
        const review = await db.Review.create({
          userId,
          productId,
          rating,
          comment,
        });
        res
          .status(201)
          .json({ message: "Review submitted successfully!", review });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      res.status(500).json({ message: "Failed to submit review" });
    }
  },

  // Fetch reviews for a product
  getReviewsByProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const reviews = await Review.findAll({
        where: { productId },
        include: [{ model: db.User, attributes: ["firstname"] }], // Include user details
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  },
};
