import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getMoviesByGenre } from "../api/tmdb";
import { Link } from "react-router-dom";

export default function MovieRow({ genre }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMoviesByGenre(genre.id).then((data) => setMovies(data.results));
    }, [genre.id]);

    return (
        <div className="">
            {/* Row Header */}
            <div className="flex justify-between items-center pl-2 mb-0">
                <h2 className="text-xl font-bold text-black">{genre.name}</h2>

                <Link to={`/genre/${genre.id}`} className="text-sm text-black-300 hover:underline">
                    See all →
                </Link>
            </div>

            {/* Horizontal movie list */}
            <div className="flex gap-4 py-4 pl-2 overflow-x-auto max-w-full scrollbar-hide">
                {movies.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className="shrink-0">
                        <MovieCard  key={movie.id} movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
}
