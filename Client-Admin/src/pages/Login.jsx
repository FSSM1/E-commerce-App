import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      console.log('res data LOGIN', response.data.user.role);
      
      if (response.status === 200) {
        const { token, user } = response.data;
       if(response.data.user.role==="admin"){
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
      }

      navigate('/');}
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message === "Invalid credentials") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 py-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Login</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input with Toggle Visibility */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={25} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Show error if exists */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mt-4">
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
