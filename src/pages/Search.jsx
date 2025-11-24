import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import MovieCard from "../components/MovieCard";

export default function Search() {
    const [params] = useSearchParams();
    const query = params.get("q");
    const [results, setResults] = useState([]);
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        if (!query) return;
        searchMovies(query).then(setResults);
    }, [query]);

    useEffect(() => {
        getPopularMovies().then(setPopular);
    }, []);


    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-6 text-black">
                Search results for: <span className="text-purple-600">"{query}"</span>
            </h1>

            {/* Search Results section */}
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <MovieGrid movies={results} />
            )}

            {/* Popular Right Now section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4 text-black">Popular Right Now</h2>

                <div className="flex overflow-x-scroll gap-4 pb-3 scrollbar-hide">
                    {popular.slice(0, 15).map(movie => (
                        <div key={movie.id} className="flex-shrink-0">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
