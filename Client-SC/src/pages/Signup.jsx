import React, { useState } from "react";

const Signup = () => {
  const [role, setRole] = useState("Client");

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-geo-240909-lp.jpg.og.jpg?202501131610')" }}>
      </div>

      {/* Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Create an account</h2>
          
          <form>
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="flex gap-4">
                {["Client", "Seller"].map((option) => (
                  <div 
                    key={option} 
                    className={`flex-1 text-center py-2 border-2 rounded-lg cursor-pointer transition-all ${
                      role === option ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                    onClick={() => setRole(option)}
                  >
                    <input 
                      type="radio" 
                      name="role" 
                      value={option} 
                      checked={role === option} 
                      className="hidden"
                      readOnly
                    />
                    <span className="text-sm font-medium text-gray-700">{option}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>

            {/* Create Account Button */}
            <button
              className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mb-4"
              type="button"
            >
              Create Account
            </button>
          </form>

          {/* Sign up with Google Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-black bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" type="button">
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M24 9.5c3.29 0 6.17 1.12 8.47 2.97l6.33-6.32C34.97 2.22 30.23 0 24 0 14.91 0 7.15 5.48 3.34 13.45l7.8 6.05c1.79-5.33 6.79-9 12.86-9z"/>
              <path fill="#34A853" d="M46.65 24.55c0-1.64-.15-3.22-.43-4.77H24v9.05h12.83c-.56 2.87-2.12 5.3-4.48 6.94l7.2 5.56c4.18-3.87 6.95-9.57 6.95-16.78z"/>
              <path fill="#FBBC05" d="M11.14 28.5c-1.04-2.9-1.04-6.1 0-9l-7.8-6.05C.87 16.02 0 19.92 0 24s.87 7.98 2.34 10.55l7.8-6.05z"/>
              <path fill="#EA4335" d="M24 48c6.23 0 11.46-2.05 15.28-5.56l-7.2-5.56c-2.03 1.37-4.6 2.17-8.08 2.17-6.07 0-11.08-3.67-12.86-9l-7.8 6.05C7.15 42.52 14.91 48 24 48z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Log in Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <a href="#" className="text-blue-600 hover:text-blue-500">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
