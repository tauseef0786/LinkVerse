import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  FaHome,
  FaCommentDots,
  FaPlusCircle,
  FaUser,
  FaCog,
  FaBell,
  FaCompass,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="absolute top-4 left-4 md:hidden text-2xl p-2 rounded-full bg-gray-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-full w-64 bg-gray-900 text-white p-4 z-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        {/* Profile & Hover Dropdown */}
        <div
          className="relative flex items-center justify-center mb-6 cursor-pointer"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <img
            src={user?.profilePicture || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-white"
          />
          {/* Hover Dropdown */}
          {showDropdown && (
            <div className="absolute top-16 left-0 w-32 bg-white text-black shadow-lg rounded">
              {isAuthenticated ? (
                <button
                  className="block w-full px-4 py-2 hover:bg-gray-200 text-center"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 hover:bg-gray-200 text-center"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <FaHome /> <span>Home</span>
          </Link>

          <Link
            to="/chat"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <FaCommentDots /> <span>Messages</span>
          </Link>

          <Link
            to="/add-post"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <FaPlusCircle /> <span>Add Post</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <FaUser /> <span>Profile</span>
          </Link>

          <Link
            to="/explore"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <FaCompass /> <span>Explore</span>
          </Link>

          <Link
            to="/notifications"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <FaBell /> <span>Notifications</span>
          </Link>

          <Link
            to="/settings"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <FaCog /> <span>Settings</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
