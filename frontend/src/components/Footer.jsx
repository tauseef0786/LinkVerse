import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-8">
      <p>&copy; {new Date().getFullYear()} LinkVerse. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/chat" className="hover:underline">Messages</Link>
        <Link to="/add-post" className="hover:underline">Add Post</Link>
      </div>
    </footer>
  );
};

export default Footer;
