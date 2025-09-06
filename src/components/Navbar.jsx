import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 p-4 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo + App Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Taskmate Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">
            <Link to="/">TaskMate</Link>
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>Home</NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? "underline" : ""}>Analytics</NavLink>
          <NavLink to="/add-habit" className={({ isActive }) => isActive ? "underline" : ""}>Add Habit</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "underline" : ""}>Profile</NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 mt-2 px-4 py-2 space-y-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "block underline" : "block"}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => isActive ? "block underline" : "block"}
            onClick={() => setIsOpen(false)}
          >
            Analytics
          </NavLink>
          <NavLink 
            to="/add-habit" 
            className={({ isActive }) => isActive ? "block underline" : "block"}
            onClick={() => setIsOpen(false)}
          >
            Add Habit
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? "block underline" : "block"}
            onClick={() => setIsOpen(false)}
          >
            Profile
          </NavLink>
        </div>
      )}
    </nav>
  );
}
