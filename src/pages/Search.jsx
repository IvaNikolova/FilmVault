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
            const sliced = data.results.slice(0, 18); // ✅ limit to 18

            setResults(sliced);
            setTotalPages(Math.min(data.total_pages, 20));
        }

        loadSearch();
    }, [query, page]);

    useEffect(() => {
        getPopularMovies().then(setPopular);
    }, []);


    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold px-2 pl-2 sm:px-6 lg:px-14">
                Search results for: <span className="text-purple-600">"{query}"</span>
            </h1>

            {/* Search Results section */}
            {results.length === 0 ? (
                <p className="px-2 pl-2 sm:px-6 lg:px-14 pt-10">No results found.</p>
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
                <h2 className="text-2xl font-bold mb-4 pl-2 text-black">Popular Right Now</h2>

                <div className="flex gap-4 py-4 pl-2 overflow-x-auto scrollbar-hide">
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
