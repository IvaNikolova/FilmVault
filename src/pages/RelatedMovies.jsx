import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSimilarMovies } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";

export default function RelatedMovies() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function load() {
      const p1 = await getSimilarMovies(id, 1);
      const p2 = await getSimilarMovies(id, 2);
      const p3 = await getSimilarMovies(id, 3);
      const combined = [...p1, ...p2, ...p3];

      // remove duplicates based on movie.id
      const unique = [...new Map(combined.map(m => [m.id, m])).values()];
      setMovies(unique);
    }
    load();
  }, [id]);

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold pl-2">Similar Movies</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
