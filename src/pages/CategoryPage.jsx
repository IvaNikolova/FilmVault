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
            const response = await getMoviesByCategory(type, page)
            setMovies(response.results.slice(0, 18))
            setTotalPages(Math.min(response.totalPages, 20));
        }

        loadMovies();
    }, [type, page]);

    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold px-2 pl-2 sm:px-6 lg:px-14">
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
