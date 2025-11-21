import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre, getGenres } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";

export default function GenrePage() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState("");

    useEffect(() => {
        async function loadMoviesAndName() {
            //  Fetch all genres once
            const allGenres = await getGenres();

            //  Find the genre whose ID matches the URL
            const match = allGenres.find(g => g.id === parseInt(id));

            //  Store the name so we can show it in the title
            if (match) {
                setGenreName(match.name);
            }

            const page1 = await getMoviesByGenre(id, 1);
            const page2 = await getMoviesByGenre(id, 2);
            const page3 = await getMoviesByGenre(id, 3);

            setMovies([...page1, ...page2, ...page3]);
        }
        loadMoviesAndName();
    }, [id]);

    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-6">
                {genreName ? `${genreName} Movies` : "Movies"}
            </h1>

            <MovieGrid movies={movies} />
        </div>
    );
}
