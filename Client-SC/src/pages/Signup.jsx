import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signup = () => {
  const [role, setRole] = useState("Client"); // Changed from useRef to useState
  const firstname = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        {
          firstname: firstname.current.value,
          email: email.current.value,
          password: password.current.value,
          role: role, // Using updated state value
        }
      );

      toast.success("User registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-geo-240909-lp.jpg.og.jpg?202501131610')",
        }}
      ></div>

      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Create an account</h2>
          <form>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="flex gap-4">
                {["Client", "Seller"].map((option) => (
                  <div
                    key={option}
                    className={`flex-1 text-center py-2 border-2 rounded-lg cursor-pointer transition-all ${
                      role === option
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                    onClick={() => setRole(option)}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                ref={firstname}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                ref={email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                ref={password}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <button
              className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mb-4"
              type="button"
              onClick={handleAddUser}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
