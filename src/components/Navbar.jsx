import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); 
 };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🎬 Movie Wishlist</h1>

      <div className="flex items-center gap-6 text-lg">
        <Link to="/movies" className="hover:text-purple-400">Movies</Link>
        <Link to="/wishlist" className="hover:text-purple-400">Wishlist</Link>
        <Link to="/recommendations" className="hover:text-purple-400">Recommendations</Link>
        <button onClick={handleLogout} className="hover:text-red-400 ml-4">Logout</button>
      </div>
    </nav>
  );
}
