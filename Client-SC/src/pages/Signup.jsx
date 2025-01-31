import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons

const Signup = () => {
  const [role, setRole] = useState("Client");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleAddUser = async () => {
    if (!firstname || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        {
          firstname,
          email,
          password,
          role,
        }
      );
      console.log("data", response.data);
      navigate("/client/login");
    } catch (err) {
      console.error(err);
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
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="mb-6 relative">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                id="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mb-4"
              type="button"
              onClick={handleAddUser}
            >
              Create Account
            </button>
             {role === "Client" ? <span onClick={()=>{
              navigate("/client/login");
            }}>
              log in
            </span> : 
            <span onClick={()=>{
              navigate("/seller/login");
            }}>
              log in
            </span>
            }
          </form>
          <ToastContainer className="fixed top-4 left-1/2 transform -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
