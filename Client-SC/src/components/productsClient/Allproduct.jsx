import {  useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../productsClient/SearchContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// eslint-disable-next-line no-unused-vars
import DeleteIcon from '@mui/icons-material/Delete';

const Allproduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const itemsPerPage = 10;

  const { searchTerm } = useContext(SearchContext);

  // Static design code data
  const designCode = [
    { category: 'Substock', cost: 900 },
    { category: 'Shipping', cost: 600 },
    { category: 'Trade', cost: 700 }
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories/getAll");
      setCategories([{ id: 'all', name: 'All' }, ...response.data.data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products/getAll");
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = data;
    
    if (searchTerm) {
      filtered = filtered.filter(el => 
        el.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(el => el.category?.name === selectedCategory);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, data]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const addToCart = async (productId) => {
    try {
      const userId = 1; // Replace with actual user ID from auth
      await axios.post("http://localhost:3000/api/carts/add", {
        userId,
        productId,
        quantity: 1
      });
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Categories Sidebar */}
      <div className="w-64 bg-gray-50 p-6 shadow-md fixed h-full overflow-y-auto">
        <Typography variant="h6" gutterBottom>Categories</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategory(category.name)}
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* Products Table */}
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <Typography variant="body1">{product.name}</Typography>
                    </div>
                  </TableCell>
                  <TableCell align="center">${product.price}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary"
                      onClick={() => addToCart(product.id)}
                      sx={{ mr: 2 }}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/client/products/${product.id}`)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Design Code Section */}
        <Typography variant="h6" gutterBottom>Design Specifications</Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Component</TableCell>
                <TableCell align="right">Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designCode.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell align="right">${item.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </div>
    </div>
  );
};

export default Allproduct;