import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getSimilarMovies } from "../api/tmdb";
import { useAuth } from "../context/AuthContext";
import { addToWishlist, removeFromWishlist, checkIfInWishlist } from "../firebase";
import MovieCard from "../components/MovieCard";
import { Heart } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const IMG = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
    getSimilarMovies(id).then(setRelated);
  }, [id]);

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

  const uniqueGenres = [...new Map(movie.genres.map((g) => [g.id, g])).values()];

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
    <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* POSTER */}
          <div className="flex-shrink-0 w-full lg:w-80">
            <div className="relative group">
              <div className="absolute inset-0 bg-gray-500/20 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                <img
                  src={movie.poster_path ? IMG + movie.poster_path : "/no-image.jpg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/no-image.jpg")}
                />
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex-1 space-y-6">
            {/* TITLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-black leading-tight">
              {movie.title}
            </h1>

            {/* OVERVIEW */}
            <div>
              <p className="uppercase text-sm tracking-widest text-gray-500 font-semibold mb-2">
                Overview
              </p>
              <p className="text-gray-700 leading-relaxed text-lg max-w-3xl">
                {movie.overview}
              </p>
            </div>

            {/* META GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">

              {/* GENRES */}
              <div>
                <p className="uppercase text-sm tracking-widest text-gray-500 font-semibold mb-2">
                  Genres
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueGenres.map((g) => (
                    <Link key={g.id} to={`/genre/${g.id}`} className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition text-sm font-medium">
                      {g.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* RELEASE DATE */}
              <div>
                <p className="uppercase text-sm tracking-widest text-gray-500 font-semibold mb-2">
                  Release Date
                </p>
                <p className="text-lg font-medium">{movie.release_date}</p>
              </div>

              {/* RUNTIME */}
              <div>
                <p className="uppercase text-sm tracking-widest text-gray-500 font-semibold mb-2">
                  Runtime
                </p>
                <p className="text-lg font-medium">{movie.runtime} min</p>
              </div>

              {/* RATING */}
              <div>
                <p className="uppercase text-sm tracking-widest text-gray-500 font-semibold mb-2">
                  Rating
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-red-500">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">/ 10</span>
                </div>
              </div>
            </div>

            {/* WISHLIST BUTTON */}
            {!loadingWishlist && (
              <div className="">
                <button
                  onClick={toggleWishlist}
                  className={`group relative px-8 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-lg transition-all duration-300
                    ${isSaved
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-black text-white hover:bg-red-500"
                    }hover:scale-105 active:scale-95
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-300/10 opacity-0 group-hover:opacity-100 transition" />
                  <Heart size={22} className={`relative z-10 transition-all ${isSaved ? "fill-white" : ""}`}/>
                  <span className="relative z-10">
                    {isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SIMILAR MOVIES */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-black pl-2">
              Similar Movies
            </h2>
            <Link to={`/movie/${id}/related`} className="text-gray-500 hover:text-red-500 font-semibold transition flex items-center gap-1">
              See all →
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 pl-2 pt-4 pr-2 scrollbar-hide">
            {related.slice(0, 15).map(movie => (
              <div key={movie.id} className="flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
