import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByCategory } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";

const TITLES = {
    popular: "Popular Movies",
    top_rated: "Top Rated Movies",
    upcoming: "Upcoming Movies",
    now_playing: "Now Playing",
};

export default function CategoryPage() {
    const { type } = useParams();
    const [ movies, setMovies ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);

    useEffect(() => {
        async function loadMovies() {
            const data = await getMoviesByCategory(type, page);
            setMovies(data.results);
            setTotalPages(Math.min(data.total_pages, 20)); 
        }

        loadMovies();
    }, [type, page]);

    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-6">
                {TITLES[type] || "Movies"}
            </h1>

            <MovieGrid movies={movies} />

            <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    );
}
