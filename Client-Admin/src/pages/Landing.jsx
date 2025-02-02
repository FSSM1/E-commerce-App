import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const user1 = JSON.parse(localStorage.getItem("user"));
  console.log(user1,"alaho akbar ");
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/products/getAll");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/categories/getAll");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/users/getAll");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
  }, []);

  return (
    <div className="bg-white-100 p-6">
      <h1 className="text-3xl font-bold mb-6">{user1.firstname} Dashboard</h1>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Categories</h2>
          <p className="text-2xl font-bold">{categories.length}</p>
        </div>
       
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
      </div>

      {/* Recent Products Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 font-bold">{product.name}</p>
              <p className="text-red-500 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Users Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">User ID</th>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Landing;