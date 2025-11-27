//  import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const NavBar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   // Check login status on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("userId");
//     setUserId(storedUser);
//   }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("userId");
//     setUserId(null);
//     alert("Logged out successfully!");
//     navigate("/login");
//     setDropdownOpen(false);
//   };

//   // Entrance restricts page access, will be called in onClick of Link
//   const requireLoginRedirect = (e) => {
//     if (!userId) {
//       e.preventDefault(); // block navigation
//       alert("Please login first!");
//       navigate("/login");
//     }
//   };

//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <nav className="container mx-auto flex justify-between items-center p-4">
//         <Link
//           to="/"
//           className="text-2xl font-bold tracking-wide hover:text-green-600 transition-colors"
//         >
//           Home Mitra
//         </Link>
//         <ul className="flex space-x-6 items-center">
//           <li>
//             <Link
//               to="/"
//               className="hover:text-blue-400 transition-colors"
//               onClick={requireLoginRedirect}
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/services"
//               className="hover:text-blue-400 transition-colors"
//               onClick={requireLoginRedirect}
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/about"
//               className="hover:text-blue-400 transition-colors"
//               onClick={requireLoginRedirect}
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               className="hover:text-blue-400 transition-colors"
//               onClick={requireLoginRedirect}
//             >
//               Contact
//             </Link>
//           </li>

//           {/* Profile icon & dropdown */}
//           {!userId ? (
//             <li>
//               <Link
//                 to="/login"
//                 className="hover:text-pink-500 font-semibold"
//               >
//                 Login
//               </Link>
//             </li>
//           ) : (
//             <li className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="focus:outline-none rounded-full hover:bg-gray-700 p-2"
//                 aria-label="User menu"
//               >
//                 {/* Profile icon SVG */}
//                 <svg
//                   className="w-7 h-7 text-white"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>

//               {dropdownOpen && (
//                 <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 text-gray-800 z-50">
//                   <li>
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 hover:bg-gray-200"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/mybookings"
//                       className="block px-4 py-2 hover:bg-gray-200"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       My Bookings
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-200"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default NavBar;























//without login check simpel login logout navbar

  import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("userId");
      setUserId(storedUser);
    };

    checkUser();

    window.addEventListener("storage", checkUser);
    window.addEventListener("focus", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("focus", checkUser);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert("Logged out successfully!");
    localStorage.clear();
    setUserId(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-green-600 transition-colors"
        >
          Home Mitra
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-400 transition-colors">
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </li>

          {!userId ? (
            <li>
              <Link to="/login" className="hover:text-pink-500 font-semibold">
                Login
              </Link>
            </li>
          ) : (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none rounded-full hover:bg-gray-700 p-2"
                aria-label="User menu"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 text-gray-800 z-50">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mybookings"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
