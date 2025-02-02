import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorElement() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.role;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Error Code */}
      <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>

      {/* Error Message */}
      <h2 className="text-3xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/" + role + "/home")}
        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
      >
        Go Back Home
      </button>

      <img
        src="https://cdn-icons-png.flaticon.com/512/755/755014.png"
        alt="Error Illustration"
        className="w-40 mt-8 opacity-80"
      />
    </div>
  );
}

export default ErrorElement;
