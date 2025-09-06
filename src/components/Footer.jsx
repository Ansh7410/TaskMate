import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center md:justify-between text-center md:text-left">
        
        {/* Logo + App Name */}
        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4 md:mb-0">
          <img src={logo} alt="Taskmate Logo" className="h-8 w-8" />
          <h1 className="text-lg font-semibold">Taskmate</h1>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm font-medium mb-4 md:mb-0">
          <Link to="/about" className="hover:text-white">About Us</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-5 text-lg">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} Taskmate. All rights reserved.
      </div>
    </footer>
  );
}
