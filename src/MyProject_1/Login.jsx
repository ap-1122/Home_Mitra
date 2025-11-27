 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './About.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ userId: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userId", credentials.userId);
    alert(`Logged in as ${credentials.userId}`);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-6 text-pink-600 text-center">Login</h2>

        <label className="block mb-2 text-gray-700 font-semibold">Email or Mobile</label>
        <input
          type="text"
          name="userId"
          value={credentials.userId}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter email or mobile number"
        />

        <label className="block mb-2 text-gray-700 font-semibold">Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-6 border rounded"
          placeholder="Enter password"
        />

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-800 text-white w-full py-2 rounded font-semibold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
