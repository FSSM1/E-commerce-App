import { NavLink } from "react-router-dom";
import NavLinks from "../client/NavLinks";
import ProfileDropdown from "../ProfileDropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import { Heart } from "lucide-react"; // Import heart icon for liked products

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [liked, setLiked] = useState([]);

  const fetchLikedProducts = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/Likes/${user.id}`
      );
      console.log("liked products:", response.data.likedProducts);
      setLiked(response.data.likedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLikedProducts();
    }
  }, []);

  return (
      <div>
      
      

      {/* Liked Products Section */}
      {user && (
        <div className="mt-6 px-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
            <Heart className="text-red-500" /> Liked Products
          </h3>

          {liked.length > 0 ? (
            <div className="flex flex-col gap-4 mt-4">
              {liked.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-lg transition duration-300 flex items-center gap-4"
                >
                  <NavLink to={`/product/${product.id}`} className="flex items-center gap-4">
                    <img
                      src={product.image || "/placeholder.png"} // Replace with product image
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <p className="text-sm font-medium text-gray-800 hover:text-blue-600 transition">
                      {product.name}
                    </p>
                  </NavLink>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">You haven't liked any products yet.</p>
          )}
        </div>
      )}</div>
  );
};

export default Navbar;
