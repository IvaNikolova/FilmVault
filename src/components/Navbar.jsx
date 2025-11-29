import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Search, CircleUserRound } from "lucide-react";

export default function Navbar() {
  const { logout, user, profile } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/movies" className="text-xl font-bold">
        🎬 Movie Wishlist
      </Link>

      <NavLink to="/category/popular" className={({ isActive }) => isActive ? "text-purple-400 font-semibold": "hover:text-purple-400"}>Popular</NavLink>
      <NavLink to="/category/top_rated" className={({ isActive }) => isActive ? "text-purple-400 font-semibold": "hover:text-purple-400"}>Top Rated</NavLink>
      <NavLink to="/category/upcoming" className={({ isActive }) => isActive ? "text-purple-400 font-semibold": "hover:text-purple-400"}>Upcoming</NavLink>
      <NavLink to="/category/now_playing" className={({ isActive }) => isActive ? "text-purple-400 font-semibold": "hover:text-purple-400"}>Now Playing</NavLink>

      {user && (
        <div className="flex items-center gap-6 text-lg">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-800 placeholder-gray-400"
            />
          </form>

          <div className="relative" ref={menuRef}>
            {/* USER ICON */}
            <button
              onClick={() => setOpenMenu(prev => !prev)}
              className="flex mr-5 items-center gap-2 hover:text-purple-400 transition"
            >
              <CircleUserRound size={28} />
            </button>

            {/* DROPDOWN MENU */}
            {openMenu && (
              <div className="absolute right-0 mt-6 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-50">
                <p className="font-semibold px-4 py-2 transition">
                  Hello, {profile?.username || "User"} 
                </p>

                <Link to="/wishlist" onClick={() => setOpenMenu(false)} className="block px-4 py-2 hover:bg-gray-700 transition">
                  My Wishlist
                </Link>

                <Link to="/recommendations" onClick={() => setOpenMenu(false)} className="block px-4 py-2 hover:bg-gray-700 transition">
                  Recommendations
                </Link>

                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition">
                  Sign out
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}
