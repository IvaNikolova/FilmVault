import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function Search() {
    const [ params ] = useSearchParams();
    const query = params.get("q");
    const [ results, setResults ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ popular, setPopular ] = useState([]);
    
    // Reset page when query changes
    useEffect(() => {
        setPage(1);
    }, [query]);

    // Fetch search results
    useEffect(() => {
        if (!query) return;

        async function loadSearch() {
            const data = await searchMovies(query, page);
            setResults(data.results);
            setTotalPages(Math.min(data.total_pages, 20));
        }

        loadSearch();
    }, [query, page]);

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
                <>
                    <MovieGrid movies={results} />
                    
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </>
            )}

            {/* Popular Right Now section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4 text-black">Popular Right Now</h2>

                <div className="flex gap-4 pb-3 scrollbar-hide">
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
