import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login() {
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate()



const handleLogin = async()=> {
    // e.preventDefault(); 
    
    try {
        const response = await axios.post("http://localhost:3000/api/users/login", {
            email, 
            password
        }); 

        console.log('res data', response)

        if(response.status === 200) {
          const {token, user} =response.data; 
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", JSON.stringify(token))
        }
        navigate('/')

    } catch (err) {
        console.error(err);
        if (err.response.data.message === "Invalid credentials") {
            setError("Incorrect password. Please try again.");
        } else {
            setError("An error logining in ");
        }
    }
} 



  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 py-8">
  <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Login</h1>

    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter Email</label>
      <input
        type="email"
        id="email"
        onChange={(e) => setemail(e.target.value)}
        placeholder="Enter your email"
        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter Password</label>
      <input
        type="password"
        id="password"
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Enter your password"
        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mt-4">
      <button
        onClick={() => handleLogin()}
        className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </div>
  </div>
</div>

  )
}
