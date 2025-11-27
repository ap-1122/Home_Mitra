 import React from "react";

const Contact = () => {
    return (
        <div className="container mx-auto my-12 p-8 bg-white rounded-xl shadow-lg text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Contact Us
            </h1>
            <p className="text-lg text-gray-600 mb-4">
                We're here to help! Feel free to reach out to us with any questions or concerns.
            </p>
            <div className="space-y-4">
                <p className="text-xl text-gray-800 font-semibold">
                    Email: <a href="mailto:contact@homemitra.com" className="text-blue-600 hover:underline">contact@homemitra.com</a>
                </p>
                <p className="text-xl text-gray-800 font-semibold">
                    Phone: <a href="tel:+919876543210" className="text-blue-600 hover:underline">+91 98765 43210</a>
                </p>
                <p className="text-xl text-gray-800 font-semibold">
                    Address: 123 Mp Nagar, Bhopal, 462023
                </p>
            </div>
        </div>
    );
};

export default Contact;