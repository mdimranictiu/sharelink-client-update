import React, { useState, useEffect, useRef,useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../AuthContext/AuthProvider";


const NavBar = () => {
const { user, logOut } = useContext(AuthContext);
   const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logOut()
      .then(() => console.log("Sign out successfully"))
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li onClick={() => setMenuOpen(false)}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={() => setMenuOpen(false)}>
            <Link to="/add-link">Add Link</Link>
          </li>
          <li className={user?"hidden":"block"} onClick={() => setMenuOpen(false)}>
        <Link to="/contact-us">Contact Us</Link>
      </li>
      {user && (
        <>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/my-links">My Links</Link>
          </li>
          <li className={!user?"hidden":"block"} onClick={() => setMenuOpen(false)}>
        <Link to="/contact-us">Contact Us</Link>
      </li>
        </>
      )}
    </>
  );

  return (
    <nav className={`fixed bg-[#2A8AA4] top-0 left-0 w-full z-50  shadow-md`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Left Side - Logo */}
        <Link to="/" className="text-2xl font-bold ">
          LinkShare
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden  md:flex space-x-6 text-lg">{links}</ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (
            <button onClick={handleSignOut}  className="px-4 py-2 max-sm:hidden bg-red-500 text-white rounded hover:bg-red-600 transition">
              Log out
            </button>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link to="/login" className="px-4 py-2 text-white rounded hover:bg-white hover:text-[#2A8AA4] transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2  text-white rounded hover:bg-white hover:text-[#2A8AA4] transition">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-3xl text-white">
            <IoIosMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className={`fixed top-16 bg-[#2A8AA4]  left-0 h-full w-[75%] max-w-xs  shadow-lg transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Close Button */}
        <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-white transition">
          <IoClose />
        </button>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-4 text-lg p-6 mt-12">{links}</ul>

        {/* Auth Section (Mobile Only) */}
        <div className="px-2">
          {user ? (
            <button onClick={handleSignOut} className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Log out
            </button>
          ) : (
            <div className="flex flex-col">
             <Link to="/login" className="px-4 py-2 text-white rounded hover:bg-white hover:text-[#2A8AA4] transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2  text-white rounded hover:bg-white hover:text-[#2A8AA4] transition">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
