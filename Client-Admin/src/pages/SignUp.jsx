import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/signup", {
        firstname,
        email,
        password,
      });
      toast.success("User registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Create an Account</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleAddUser}
          className="w-full bg-red-500 text-white py-3 rounded-md text-lg font-semibold mt-6 hover:bg-red-600"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link to="/login" className="text-red-500 font-medium ml-1">Log in</Link>
        </p>
      </div>
    </section>
  );
}
