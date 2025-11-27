 import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar"; 
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services"; // Existing
import MyBookings from "./MyBookings"; // New page import
import Profile from "./Profile";
import Login from "./Login";   // Import the Login component

const App = () => {
    return (
        <>
            <div className="min-h-screen bg-cyan-900 font-sans antialiased">
                <NavBar />
                <main className="p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/mybookings" element={<MyBookings />} /> {/* New Route */}
                        <Route path="/profile" element={<Profile />} />
                         <Route path="/login" element={<Login />} />    
                    </Routes>
                </main>
            </div>
        </>
    );
};

export default App;
