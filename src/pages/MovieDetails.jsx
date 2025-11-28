import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getSimilarMovies } from "../api/tmdb";
import { useAuth } from "../context/AuthContext";
import { addToWishlist, removeFromWishlist, checkIfInWishlist } from "../firebase";
import MovieCard from "../components/MovieCard";


export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const { user } = useAuth();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
    getSimilarMovies(id).then(setRelated);
  }, [id]);

  // Check if movie is already in wishlist
  useEffect(() => {
    async function checkStatus() {
      if (!user) return;

      const exists = await checkIfInWishlist(id, user.uid);
      setIsSaved(exists);
      setLoadingWishlist(false);
    }

    checkStatus();
  }, [id, user]);

  if (!movie) return <p className="p-6">Loading...</p>;

  const IMG = "https://image.tmdb.org/t/p/w500";
  const uniqueGenres = [...new Map(movie.genres.map(g => [g.id, g])).values()];

  // Handle add/remove button click
  async function toggleWishlist() {
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
    <>
      <div className="p-6 flex gap-10 text-black max-w-6xl mx-auto">
        {/* POSTER */}
        <div className="w-72 h-[430px] rounded shadow-lg overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
          <img
            src={movie.poster_path ? IMG + movie.poster_path : "/no-image.jpg"}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/no-image.jpg";
            }}
          />
        </div>

        {/* DETAILS */}
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          
          <p><strong>Overview</strong></p>
          <p className="text-gray-700 mb-5 leading-relaxed">
            {movie.overview}
          </p>

          <p><strong className="text-black">Genres:</strong>{" "} {uniqueGenres.map((g, index) => (
            <span key={g.id}>
              <Link to={`/genre/${g.id}`} className="text-black-400 hover:underline">
                {g.name}
              </Link>
              {index < uniqueGenres.length - 1 && ", "}
            </span>
            ))}
          </p>

          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} min</p>
          <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
          
          {!loadingWishlist && (
            <button
              onClick={toggleWishlist}
              className={`mt-5 px-4 py-2 rounded-lg text-white font-semibold transition ${
                isSaved ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-800"
              }`}
            >
              {isSaved ? "🤍 Remove from Wishlist" : "❤️Add to Wishlist"}
            </button>
          )}
        </div>
      </div>   
      
      {/* RELATED MOVIES */}
      {related.length > 0 && (
        <div className="ml-8">
          <div className="flex justify-between items-center px-2 mb-3">
            <h2 className="text-xl font-bold text-black">Similar Movies</h2>
            <Link
              to={`/movie/${id}/related`}
              className="text-sm text-black-300 hover:underline"
            >
              See all →
            </Link>
          </div>
          <div className="flex overflow-x-scroll gap-4 pb-3 scrollbar-hide">
            {related.slice(0, 15).map(movie => (
              <div key={movie.id} className="flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
} 
