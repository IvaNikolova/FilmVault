import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    // This is the base URL for TMDB poster images
    const imageBase = "https://image.tmdb.org/t/p/w500";

    return (
        // Wrap the ENTIRE card in a Link to the movie details page
        <Link to={`/movie/${movie.id}`}>
            <div className="w-40 cursor-pointer transform transition duration-300 hover:scale-110">
                {/* Movie Poster */}
                <img
                    src={movie.poster_path ? imageBase + movie.poster_path : "/no-image.jpg"}
                    alt={movie.title}
                    className="rounded-lg shadow-md"
                />

                {/* Movie Title */}
                <h3 className="mt-2 text-sm font-semibold text-black">
                    {movie.title}
                </h3>

                {/* Release Year */}
                <p className="text-gray-400 text-xs">
                    {movie.release_date?.slice(0, 4)}
                </p>
            </div>
        </Link>
    );
}
