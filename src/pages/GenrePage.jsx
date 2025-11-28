import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre, getGenres } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";


export default function GenrePage() {
    const { id } = useParams();
    const [ movies, setMovies ] = useState([]);
    const [ genreName, setGenreName ] = useState("");
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);


    useEffect(() => {
        async function loadMoviesAndName() {
            // Fetch all genres once
            const allGenres = await getGenres();

            // Find genre name
            const match = allGenres.find(g => g.id === parseInt(id));
            if (match) setGenreName(match.name);

            // Fetch movies for selected page
            const response = await getMoviesByGenre(id, page);
            setMovies(Array.isArray(response.results) ? response.results : []);
            setTotalPages(Math.min(response.totalPages, 20));
        }
        loadMoviesAndName();
    }, [id, page]);

    // Reset page when genre changes
    useEffect(() => {
        setPage(1);
    }, [id]);


    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-6">
                {genreName ? `${genreName} Movies` : "Movies"}
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
