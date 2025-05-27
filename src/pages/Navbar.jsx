import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClasses = ({ isActive }) =>
    `transition ${
      isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
    }`;




  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold flex items-center gap-2 justify-center tracking-wide">
          C News
        </h1>

        {/* Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li>
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/government" className={linkClasses}>
              Government News
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" className={linkClasses}>
              Games News
            </NavLink>
          </li>
          <li>
            <NavLink to="/technology" className={linkClasses}>
              Technology News
            </NavLink>
          </li>
          <li>
            <NavLink to="/celebrity" className={linkClasses}>
               Celebrity
            </NavLink>
          </li>
          <li>
            <NavLink to="/education" className={linkClasses}>
              Education News
            </NavLink>
          </li>
          <li>
            <NavLink to="/music" className={linkClasses}>
              Music News
            </NavLink>
          </li>

          {/* Conditionally show Login or Logout */}
          {user ? (
            <li>
              <button
                onClick={onLogout}
                className="hover:text-red-400 transition cursor-pointer bg-transparent border-none text-white"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-4 pb-4 text-sm font-medium bg-gray-800">
          <li>
            <NavLink to="/" onClick={toggleMenu} className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/government"
              onClick={toggleMenu}
              className={linkClasses}
            >
              Government News
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" onClick={toggleMenu} className={linkClasses}>
              Games News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/technology"
              onClick={toggleMenu}
              className={linkClasses}
            >
              Technology News
            </NavLink>
          </li>
          <li>
            <NavLink to="/trends" onClick={toggleMenu} className={linkClasses}>
              Latest Trends News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/education"
              onClick={toggleMenu}
              className={linkClasses}
            >
              Education News
            </NavLink>
          </li>
          <li>
            <NavLink to="/music" onClick={toggleMenu} className={linkClasses}>
              Music News
            </NavLink>
          </li>

          {/* Mobile Login / Logout */}
          {user ? (
            <li>
              <button
                onClick={() => {
                  onLogout();
                  toggleMenu();
                }}
                className="hover:text-red-400 transition cursor-pointer bg-transparent border-none text-white"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={linkClasses}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
