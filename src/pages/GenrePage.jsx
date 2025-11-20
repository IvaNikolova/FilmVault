import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre, getGenres } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";

export default function GenrePage() {
    const {id} = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState("");

    useEffect(() => {
        getMoviesByGenre(id).then((data) => setMovies(data));
        getGenres().then((genres) => {
            const found = genres.find((g) => g.id === Number(id));
            setGenreName(found ? found.name : "");
        });
    }, [id]);

    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-4">{genreName}</h1>
            <MovieGrid movies={movies} />
        </div>
    );
}
