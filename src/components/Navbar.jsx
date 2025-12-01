import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Search, CircleUserRound, Clapperboard, LogOut, Heart, Sparkles } from "lucide-react";

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
    setQuery("");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-8xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/movies" className="flex items-center gap-2 pl-2 text-2xl font-extrabold text-white tracking-wide mr-8">
          <Clapperboard size={30} />
          FilmVault
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-4 text-white">
          {[
            ["Popular", "/category/popular"],
            ["Top Rated", "/category/top_rated"],
            ["Upcoming", "/category/upcoming"],
            ["Now Playing", "/category/now_playing"]
          ].map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition ${
                  isActive
                    ? "bg-white/10 text-red-400"
                    : "hover:text-red-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT SIDE */}
        {user && (
          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-md bg-white/5 border border-white/10 focus:border-red-500 focus:ring-red-600 focus:ring-2 text-sm text-white placeholder-gray-400 transition"
              />
            </form>

            {/* USER MENU */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu((prev) => !prev)}
                className="rounded-full p-1 transition"
              >
                <CircleUserRound size={30} className="text-white" />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-4 w-52 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden">

                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white">
                      Hello, {profile?.username || "User"}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>

                  <Link
                    to="/wishlist"
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center text-white gap-2 px-4 py-2 hover:bg-white/5 transition"
                  >
                    <Heart size={16} className="text-red-400" />
                    My Wishlist
                  </Link>

                  <Link
                    to="/recommendations"
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center text-white gap-2 px-4 py-2 hover:bg-white/5 transition"
                  >
                    <Sparkles size={16} className="text-red-400" />
                    Recommendations
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </nav>
  );
}
