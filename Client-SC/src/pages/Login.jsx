import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const resetEmailRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");

  const navigate = useNavigate();
  const handleResetPassword = async () => {
    try {
      const email = resetEmailRef.current.value;
  
      const response = await axios.post(
        "http://localhost:3000/api/users/forgot-password",
        { email }
      );
  
      if (response.status === 200) {
        setResetPasswordMessage("Password reset link sent to your email.");
      }
    } catch (err) {
      console.error(err);
      setResetPasswordMessage("Failed to send reset link. Please try again.");
    }
  };
  const handleLogin = async () => {
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        const userL = JSON.parse(localStorage.getItem("user"));
       console.log(userL,'useer rooole')
        if (userL.role === "client") {
          navigate("/client/home");
        } else {
          navigate("/seller/home");
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message === "Invalid credentials") {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError("An error occurred while logging in.");
      }
    }
  };

  

  return (
    <div className="min-h-screen flex">
      {/* Background Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-geo-240909-lp.jpg.og.jpg?202501131610')",
        }}
      ></div>

      {/* Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={25} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Login
          </button>

          {/* Forgot Password Link */}
          <p
            className="text-sm text-blue-500 mt-4 cursor-pointer hover:underline"
            onClick={() => setResetPasswordModal(true)}
          >
            Forgot Password?
          </p>
        </div>
      </div>

      {/* Reset Password Modal */}
      {resetPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email to receive a password reset link.
            </p>

            {/* Reset Password Email Input */}
            <div className="mb-4">
              <label
                htmlFor="reset-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="reset-email"
                ref={resetEmailRef}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reset Password Message */}
            {resetPasswordMessage && (
              <p className="text-sm text-green-500 mb-4">{resetPasswordMessage}</p>
            )}

            {/* Reset Password Button */}
            <button
              onClick={handleResetPassword}
              className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Send Reset Link
            </button>

            {/* Close Modal Button */}
            <button
              onClick={() => {
                setResetPasswordModal(false);
                setResetPasswordMessage("");
              }}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}