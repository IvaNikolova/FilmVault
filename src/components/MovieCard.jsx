import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addToWishlist, removeFromWishlist, checkIfInWishlist } from "../firebase";

export default function MovieCard({ movie, isRemovable, onRemove }) {
    const imageBase = "https://image.tmdb.org/t/p/w500";
    const { user } = useAuth();
    const [isSaved, setIsSaved] = useState(false);

    // Check if movie already in wishlist
    useEffect(() => {
        async function checkStatus() {
            if (!user) return;
            const exists = await checkIfInWishlist(movie.id, user.uid);
            setIsSaved(exists);
        }
        checkStatus();
    }, [movie.id, user]);

    // Heart toggle 
    async function toggleWishlist(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!user) return;

        if (isSaved) {
            await removeFromWishlist(movie.id, user.uid);
            setIsSaved(false);
        } else {
            await addToWishlist(movie, user.uid);
            setIsSaved(true);
        }
    }

    return (
        <div className="w-40 relative group">
            {/* Poster + Title (clickable for movie details) */}
            <Link to={`/movie/${movie.id}`}>
                <div className="cursor-pointer transform transition duration-300 group-hover:scale-110">
                <img
                    src={movie.poster_path ? imageBase + movie.poster_path : "/no-image.jpg"}
                    alt={movie.title}
                    className="rounded-lg shadow-md"
                />

                <h3 className="mt-2 text-sm font-semibold text-black">
                    {movie.title}
                </h3>

                <p className="text-gray-400 text-xs">
                    {movie.release_date?.slice(0, 4)}
                </p>
                </div>
            </Link>

            {/* Remove button (wishlist only) */}
            {isRemovable && (
                <button
                    onClick={(e) => {
                        e.preventDefault();   // stop navigation
                        e.stopPropagation();  // stop click bubbling
                        onRemove();
                    }}
                    className="absolute top-1 right-1 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-red-600">
                    ✕
                </button>
            )}

            {/* Heart button (only when not in wishlist page) */}
            {!isRemovable && user && (
                <button
                    onClick={toggleWishlist}
                    className="absolute top-2 right-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                >
                    {isSaved ? "❤️" : "🤍"}
                </button>
            )}
        </div>
    );
}
