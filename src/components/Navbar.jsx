import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; // put your logo in src/assets/

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 p-4 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo + App Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Taskmate Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">
            <Link to="/">TaskMate</Link>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>Home</NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? "underline" : ""}>Analytics</NavLink>
          <NavLink to="/add-habit" className={({ isActive }) => isActive ? "underline" : ""}>Add Habit</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "underline" : ""}>Profile</NavLink>
        </div>
      </div>
    </nav>
  );
}

