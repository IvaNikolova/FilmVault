import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSimilarMovies } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";

export default function RelatedMovies() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadRelated() {
      const page1 = await getSimilarMovies(id, 1);
      const page2 = await getSimilarMovies(id, 2);
      const page3 = await getSimilarMovies(id, 3);

      setMovies([...page1, ...page2, ...page3]);
    }

    loadRelated();
  }, [id]);

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-4">Related Movies</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
