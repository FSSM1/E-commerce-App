import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

export default function SignUp() {
  const [firstname, setfirstName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, seterror] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleAddUser();
  }, []);

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        { firstname, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("User registered successfully!");
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message || "Something went wrong");
      } else if (err.request) {
        toast.error("Network error, please try again.");
      } else {
        toast.error("Something went wrong, please try again.");
      }

      console.log("Register user error", err);
    }
  };

  return (
    <section className="h-screen grid place-items-center bg-gray-100 py-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Register
        </h4>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Enter Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            Enter FirstName
          </label>
          <input
            type="text"
            id="firstname"
            onChange={(e) => setfirstName(e.target.value)}
            placeholder="Enter your firstname"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input with Toggle Visibility */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Enter Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={handleAddUser}
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </div>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already a member?
          <Link to="/login" className="ml-2 text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
