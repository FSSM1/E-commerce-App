import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box, Pagination } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../productsClient/SearchContext";
import Typography from "@mui/material/Typography";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";

function Allproduct() {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // All products
  const [filteredData, setFilteredData] = useState([]); // Filtered products
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [categories, setCategories] = useState([]); // All categories
  const itemsPerPage = 12;
  const { dispatch } = useCart();

  // Access search term from context
  const { searchTerm } = useContext(SearchContext);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/categories/getAll"
      );
      console.log("Fetched categories:", response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const products = await axios.get(
        "http://127.0.0.1:3000/api/products/getAll"
      );
      console.log("Fetched products:", products.data.data);
      setData(products.data.data);
      setFilteredData(products.data.data); // Initialize filtered data with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchProductsbyCategory = async (id) => {
    try {
      const products = await axios.get(
        `http://127.0.0.1:3000/api/products/productcategory/${id}`
      );
      console.log("Fetched products:", products.data.data);
      setData(products.data.data);
      setFilteredData(products.data.data); // Initialize filtered data with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = data;

    // Filter by search term (name)
    if (searchTerm) {
      filtered = filtered.filter((el) =>
        el.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, selectedCategory, data]);

  // Calculate the number of pages
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  // Get the data for the current page
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex h-screen">
      
      {/* Sidebar for Categories */}
      <div className="w-64 bg-gray-50 p-6 shadow-md fixed left-0 top-[96px] h-full overflow-y-auto">
  <h2 className="text-xl font-bold mb-6 text-gray-800">Categories</h2>
  <ul className="space-y-2">
    <li
      className={`p-3 rounded-lg cursor-pointer transition-all ${
        selectedCategory === "" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100 text-gray-700"
      }`}
      onClick={() => fetchProducts()}
    >
      <span className="font-medium">All</span>
    </li>
    {categories.map((category) => (
      <li
        key={category.id}
        className={`p-3 rounded-lg cursor-pointer transition-all ${
          selectedCategory === category.name ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100 text-gray-700"
        }`}
        onClick={() => fetchProductsbyCategory(category.id)}
      >
        <span className="font-medium">{category.name}</span>
      </li>
    ))}
  </ul>
</div>

      
      {/* Product Grid */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        {currentData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentData.map((el) => (
              <div
                key={el.id}
                className="cursor-pointer flex flex-col"
                onClick={() => navigate(`/client/products/${el.id}`)}
              >
                <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow flex-1 flex flex-col">
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    alt={el.name}
                    height="200"
                    image={el.image}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />

                  {/* Discount Badge */}
                  {el.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      {el.discount}% OFF
                    </div>
                  )}

                  {/* Product Details */}
                  <CardContent className="p-4 flex-1">
                    <Typography gutterBottom variant="h6" className="font-bold">
                      {el.name}
                    </Typography>
                    <div className="flex items-center space-x-2">
                      <Typography variant="h6" className="text-blue-600">
                        ${el.price}
                      </Typography>
                      {el.originalPrice && (
                        <Typography
                          variant="body2"
                          className="text-gray-500 line-through"
                        >
                          ${el.originalPrice}
                        </Typography>
                      )}
                    </div>
                    <Typography variant="body2" className="text-gray-600 mt-2">
                      {el.description}
                    </Typography>
                  </CardContent>

                  {/* Add to Cart Button */}
                  <div className="p-4">
                    <button
                      className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click event
                        dispatch({ type: "ADD_TO_CART", payload: el }); // Add item to cart
                        toast.success("product added to cart sucessfully")
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <Typography variant="h5" className="text-gray-500">
              No products found.
            </Typography>
          </div>
        )}

        {/* Pagination */}
        {currentData.length > 0 && (
          <Box className="flex justify-center mt-8">
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}

export default Allproduct;
