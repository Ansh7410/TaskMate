import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import AddHabit from "./pages/AddHabit";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar fixed */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow pt-20 px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/add-habit" element={<AddHabit />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Footer fixed at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
