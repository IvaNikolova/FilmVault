import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");


  const handleLogout = async () => {
    await logout();
    navigate("/"); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setQuery(""); // clear input
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🎬 Movie Wishlist</h1>

      {user && (
        <div className="flex items-center gap-6 text-lg">
          {/* Search bar */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-1 rounded bg-gray-700 text-white text-sm focus:outline-none"
            />
          </form>

          <Link to="/movies" className="hover:text-purple-400">Movies</Link>
          <Link to="/wishlist" className="hover:text-purple-400">Wishlist</Link>
          <Link to="/recommendations" className="hover:text-purple-400">Recommendations</Link>

          <button onClick={handleLogout} className="hover:text-red-400 ml-4">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
