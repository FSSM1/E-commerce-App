import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AverageRating from "../AverageRating";
import StarRating from "../StarRating";
import UserReview from "../UserReview";
const Oneproduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchOneProduct = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/get/${id}`
      );
      console.log(response.data.data);
      setProduct(response.data.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOneProduct(id);
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reviews/product/${id}`
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
  }, [id]);

  // Callback function to update the average rating
  const handleRatingSubmit = async (newRating) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/reviews/product/${id}`
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
      console.error("Error updating average rating:", error);
    }
  };

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Loading product details...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 text-lg mt-2">{product.description}</p>
          <div className="mt-4">
            <p className="text-xl font-semibold text-gray-800">
              Price: <span className="text-green-600">${product.price}</span>
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Quantity: {product.quantity}
            </p>
            <StarRating
              productId={id}
              userId={user.id}
              onRatingSubmit={handleRatingSubmit}
            />
            <UserReview productId={id} userId={user.id} />
            <AverageRating averageRating={averageRating} />
          </div>

          {/* Add to Cart Button */}
          <button className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Oneproduct;
