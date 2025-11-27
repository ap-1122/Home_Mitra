 import React from "react";
import "./About.css";
const About = () => {
    return (
        <div className="container mx-auto my-12 p-8 bg-white rounded-xl shadow-lg text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About Home Mitra
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Home Mitra is your go-to platform for reliable and high-quality home services. We connect you with verified professionals for all your household needs, from small repairs to major projects.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to simplify your life by providing prompt, efficient, and transparent services right at your doorstep. We are committed to ensuring your satisfaction with every booking.
            </p>
        </div>
    );
};

export default About;