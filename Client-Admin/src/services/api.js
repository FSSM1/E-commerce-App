
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/products', 
});

export const getAllProducts = async () => {
  try {
    const response = await api.get('/getAll');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/get/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};