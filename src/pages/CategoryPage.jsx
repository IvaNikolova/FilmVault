import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByCategory } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";

const TITLES = {
    popular: "Popular Movies",
    top_rated: "Top Rated Movies",
    upcoming: "Upcoming Movies",
    now_playing: "Now Playing",
};

export default function CategoryPage() {
    const { type } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMoviesByCategory(type).then(setMovies);
    }, [type]);

    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-6">
                {TITLES[type] || "Movies"}
            </h1>

            <MovieGrid movies={movies} />
        </div>
    );
}
