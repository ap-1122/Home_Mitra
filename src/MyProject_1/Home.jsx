 import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import Tailwind CSS styles
const Home = () => {
    return (
        <div className="container mx-auto mt-12 p-8 text-center bg-white rounded-xl shadow-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                Your Trusted Home Service Partner
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover reliable and professional services for your home, from cleaning to repairs, all at your fingertips.
            </p>
            <Link 
                to="/services" 
                className="inline-block bg-pink-900 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
                Explore Our Services
            </Link>
        </div>
    );
};

export default Home;