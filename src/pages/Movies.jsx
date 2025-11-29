import { useEffect, useState } from "react";
import { getGenres } from "../api/tmdb";
import MovieRow from "../components/MovieRow";

export default function Movies() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((data) => setGenres(data));
  }, []);

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 pl-2">Browse by Genre</h1>

      {genres.map((genre) => (
        <MovieRow key={genre.id} genre={genre} />
      ))}
    </div>
  );
}
