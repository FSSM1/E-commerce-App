import React, { useEffect, useState } from "react";
import axios from "axios";

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/products/getAll");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Admin Dashboard Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {user?.firstname} Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-green-600">{users.length}</p>
        </div>
      </div>

      {/* Latest Products Section (Last 4 Products) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(-4).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <p className="mt-3 font-bold text-gray-800">{product.name}</p>
              <p className="text-red-500 font-semibold text-lg">${product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Users Section (Last 5 Users) */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Latest Users</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-gray-600 font-semibold">Name</th>
                <th className="p-3 text-gray-600 font-semibold">Email</th>
                <th className="p-3 text-gray-600 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(-5).map((el) => (
                <tr key={el.id} className="border-b border-gray-300">
                  <td className="p-3 text-gray-700">{el.firstname}</td>
                  <td className="p-3 text-gray-700">{el.email}</td>
                  <td className="p-3 text-gray-700">{el.role}</td>
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
