import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p className="p-6">Loading...</p>;

  const IMG = "https://image.tmdb.org/t/p/w500";
  const uniqueGenres = [...new Map(movie.genres.map(g => [g.id, g])).values()];

  return (
    <div className="p-6 flex gap-10 text-black max-w-6xl mx-auto">
      {/* POSTER */}
      <img src={IMG + movie.poster_path} alt={movie.title} className="w-72 rounded shadow-lg"/>

      {/* DETAILS */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
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
      </div>
    </div>
  );
}
